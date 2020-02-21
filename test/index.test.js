const diff = require('../index')

const case1 = [1, 2]
const case2 = ['S级免费开发,站内开发', '付费对外开放']
const case3 = ['', '付费对外开放']
const case4 = ['付费对外开放', '']
const case5 = ['', '']
const case6 = ['S级免费开放,br,站内开放,ccccdad,dd,br,a,ee', '付费对外开放,br,bbb']

test(`diffPatch(${case1[0]}, ${case1[1]}):`, () => {
  expect(diff.diffPatch(case1[0], case1[1])).toEqual({
    after: '<ins>2</ins>',
    before: '<del>1</del>'
  })
})

test(`diffPatch("${case2[0]}", "${case2[1]}"):`, () => {
  expect(diff.diffPatch(case2[0], case2[1])).toEqual({
    after: '<ins>付</ins>费<ins>对外</ins>开<ins>放</ins>',
    before: '<del>S级免</del>费开<del>发,站内开发</del>'
  })
})

test(`diffPatch("${case3[0]}", "${case3[1]}"):`, () => {
  expect(diff.diffPatch(case3[0], case3[1])).toEqual({
    after: '<ins>付费对外开放</ins>',
    before: ''
  })
})

test(`diffPatch("${case4[0]}", "${case4[1]}"):`, () => {
  expect(diff.diffPatch(case4[0], case4[1])).toEqual({
    after: '',
    before: '<del>付费对外开放</del>'
  })
})

test(`diffPatch("${case5[0]}", "${case5[1]}"):`, () => {
  expect(diff.diffPatch(case5[0], case5[1])).toEqual({
    after: '',
    before: ''
  })
})

test(`diffPatchBySeparator(${case1[0]}, ${case1[1]}):`, () => {
  expect(diff.diffPatchBySeparator(case1[0], case1[1])).toEqual({
    after: '<ins>2</ins>',
    before: '<del>1</del>'
  })
})

test(`diffPatchBySeparator("${case2[0]}", "${case2[1]}"):`, () => {
  expect(diff.diffPatchBySeparator(case2[0], case2[1])).toEqual({
    after: '<ins>付费对外开放</ins>',
    before: '<del>S级免费开发</del>,<del>站内开发</del>'
  })
})


test(`diffPatchBySeparator("${case3[0]}", "${case3[1]}"):`, () => {
  expect(diff.diffPatchBySeparator(case3[0], case3[1])).toEqual({
    after: '<ins>付费对外开放</ins>',
    before: ''
  })
})


test(`diffPatchBySeparator("${case4[0]}", "${case4[1]}"):`, () => {
  expect(diff.diffPatchBySeparator(case4[0], case4[1])).toEqual({
    after: '',
    before: '<del>付费对外开放</del>'
  })
})



test(`diffPatchBySeparator("${case5[0]}", "${case5[1]}"):`, () => {
  expect(diff.diffPatchBySeparator(case5[0], case5[1])).toEqual({
    after: '',
    before: ''
  })
})

test(`diffPatchBySeparator("${case6[0]}", "${case6[1]}",'br'):`, () => {
  expect(diff.diffPatchBySeparator(case6[0], case6[1],'br')).toEqual({
    after: '<ins>付费对外开放,</ins>br<ins>,bbb</ins>',
    before: '<del>S级免费开放,</del>br<del>,站内开放,ccccdad,dd,</del>br<del>,a,ee</del>'
  })
})