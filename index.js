const Diff = require('fast-diff')
const { INSERT, EQUAL, DELETE } = Diff

function format(operation, txt = '') {
  if (!txt) return txt
  if (operation === DELETE) {
    txt = `<del>${txt}</del>`
  } else if (operation === INSERT) {
    txt = `<ins>${txt}</ins>`
  }
  return txt
}
//单个字符比较,得到`before`,`after`格式化文本
function diffPatch(oldText = '', newText = '') {
  const result = Diff(`${oldText}`, `${newText}`)
  return result.reduce(
    (accumulator, cur) => {
      const [operation, str] = cur
      let { before, after } = accumulator
      // operation值为-1,0按照result顺序拼接得到`before`字符串
      if (operation === DELETE || operation === EQUAL) {
        before += format(operation, str)
      }
      //operation值为0,1按照result顺序拼接得到`after`字符串
      if (operation === INSERT || operation === EQUAL) {
        after += format(operation, str)
      }
      return { before, after }
    },
    { before: '', after: '' }
  )
}

function getCollection(oldText, newText, separator) {
  const originalArr = oldText.split(separator)
  const compareArr = newText.split(separator)
  const originalSet = new Set(originalArr)
  //算出originalArr与compareArr的交集
  const intersectArr = compareArr.filter(x => originalSet.has(x))
  return {
    originalArr,
    compareArr,
    intersectArr
  }
}

//返回处理过的格式化文本
function getPatchText({
  revisionArr = [],
  intersectArr = [],
  isBefore = true
} = {}) {
  const intersectLen = intersectArr.length
  const { separator } = Diff
  const r = revisionArr.reduce((accumulator, cur) => {
    let operation
    if (intersectLen && intersectArr.includes(cur)) {
      //有交集,即是没有变动的文本
      operation = EQUAL
    } else {
      operation = isBefore ? DELETE : INSERT
    }
    return (accumulator += format(operation, cur) + separator)
  }, '')
  return separator.length
    ? r.slice(0, -separator.length)
    : r.slice(0)
}

//通过指定分隔符比较文本,得到`before`,`after`格式化文本
function diffPatchBySeparator(oldText = '', newText = '', separator = ',') {
  const { originalArr, compareArr, intersectArr } = getCollection(
    `${oldText}`,
    `${newText}`,
    separator
  )

  //缓存`separator`
  Diff.separator = separator

  const before = getPatchText({ revisionArr: originalArr, intersectArr })
  const after = getPatchText({
    revisionArr: compareArr,
    intersectArr,
    isBefore: false
  })
  return {
    before,
    after
  }
}

module.exports = {
  diffPatch,
  diffPatchBySeparator
}
