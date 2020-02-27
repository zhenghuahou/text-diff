# text-diff [![Build Status](https://travis-ci.org/jhchen/fast-diff.svg)](https://travis-ci.org/jhchen/fast-diff)

This is a simple module for comparing  text diff , based on the excellent [fast-diff](https://github.com/jhchen/fast-diff) by [Jason Chen](https://github.com/jhchen).

### example usage

Assuming you've correctly installed the `npm` module with `npm i simple-text-diff [--save|--save-dev]`:

```js
import diff from 'simple-text-diff'

const txt1 = "S级免费开放,站内开发"
const txt2 = "付费对外开放"

//one way 
const result1 = diff.diffPatch(txt1, txt2)

//the other way is separated by the specified separator
//If no separator is supplied,the default value is a comma
const result2 = diff.diffPatchBySeparator(txt1, txt2)
/* 
result1 output :{
    before: "<del>S级免</del>费开放<del>,站内开发</del>"
    after: "<ins>付</ins>费<ins>对外</ins>开放"
}

result2 output :{
    before: "<del>S级免费开放</del>,<del>站内开发</del>"
    after: "<ins>付费对外开放</ins>"
}
*/
```


![result1 vs result2 ](https://i.loli.net/2020/02/21/aBX9cVzbUxmvwty.png)
