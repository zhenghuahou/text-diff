# text-diff [![Build Status](https://travis-ci.org/jhchen/fast-diff.svg)](https://travis-ci.org/jhchen/fast-diff)

This is a simple module for comparing  text diff , based on the excellent [fast-diff](https://github.com/jhchen/fast-diff) by [Jason Chen](https://github.com/jhchen).

### usage

Assuming you've correctly installed the `npm` module with `npm i text-diff [--save|--save-dev]`:

```js
const diff = require('text-diff')

const txt1 = 'S级免费开发,站内开发'
const txt2 = '付费对外开放'

//one way 
const result1 = main.diffPatch(txt1, txt2)

//the other way is separated by the specified separator
//If no separator is supplied,the default value is a comma
const result2 = main.diffPatchBySeparator(txt1, txt2)
/* 
result1 output :{
    before: "<del>S级免</del>费开<del>发,站内开发</del>"
    after: "<ins>付</ins>费<ins>对外</ins>开<ins>放</ins>"
}

result2 output :{
    before: "<del>S级免费开发,站内开发</del>"
    after: "<ins>付费对外开放</ins>"
}
*/
```

![pic1.png](https://i.loli.net/2020/02/21/GP2nz3ROmLySrbh.png)
