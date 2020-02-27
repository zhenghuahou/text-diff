type ArrItem = Array<string>;
type TextItem = string | number | undefined;

interface DiffType {
  INSERT: number;
  EQUAL: number;
  DELETE: number;
  [propName: string]: any;
}

interface DataParams {
  revisionArr: ArrItem;
  intersectArr: ArrItem;
  isBefore?: boolean
}
interface DiffPatchResult {
  before: string;
  after: string;
}
interface CollectionType {
  originalArr: ArrItem;
  compareArr: ArrItem;
  intersectArr: ArrItem;
}

interface DiffResult {
  diffPatchBySeparator(oldText:TextItem,newText:TextItem,separator:TextItem): DiffPatchResult;
  diffPatch(oldText:string,newText:string): DiffPatchResult;
}


const Diff = require('fast-diff')
const { INSERT, EQUAL, DELETE } = <DiffType>Diff

function format(operation: number, txt: string = ''): string {
  if (!txt) return txt
  if (operation === DELETE) {
    txt = `<del>${txt}</del>`
  } else if (operation === INSERT) {
    txt = `<ins>${txt}</ins>`
  }
  return txt
}

/**
 * 单个字符比较,得到`before`,`after`格式化文本
 * @param oldText 
 * @param newText 
 */
function diffPatch(oldText: string = '', newText: string = ''): DiffPatchResult {
  const result = Diff(`${oldText}`, `${newText}`)
  return result.reduce(
    (accumulator: DiffPatchResult, cur: [number, string]) => {
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

function getCollection(oldText: string, newText: string, separator: string): CollectionType {
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

/**
 * 
 * 返回处理过的格式化文本
 */
function getPatchText({
  revisionArr = [],
  intersectArr = [],
  isBefore = true
}: DataParams): string {
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

/**
 * 通过指定分隔符比较文本,得到`before`,`after`格式化文本
 * @param oldText 
 * @param newText 
 * @param separator 
 */
function diffPatchBySeparator(oldText: TextItem = '', newText: TextItem = '', separator: TextItem = ','): DiffPatchResult {
  const { originalArr, compareArr, intersectArr } = getCollection(
    `${oldText}`,
    `${newText}`,
    `${separator}`
  )

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


export default  <DiffResult>{
  diffPatch:diffPatch,
  diffPatchBySeparator:diffPatchBySeparator
}