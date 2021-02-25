# text-diff [![Build Status](https://travis-ci.org/jhchen/fast-diff.svg)](https://travis-ci.org/jhchen/fast-diff)

This is a simple text comparison package implemented in typescript , based on the excellent [fast-diff](https://github.com/jhchen/fast-diff) by [Jason Chen](https://github.com/jhchen).

### example usage

Assuming you've correctly installed the `npm` module with `npm i simple-text-diff [--save|--save-dev]`:

```js
import diff from 'simple-text-diff'
const oldText = 'One difference is that interfaces create a new name that is used everywhere. Type aliases don’t create a new name — for instance, error messages won’t use the alias name. In the code below, hovering over interfaced in an editor will show that it returns an Interface, but will show that aliased returns object literal type.Wish you happy'
const newText = 'One diffenec is that interfaces create a new name that is used everywhere. Type aliases don’t create a new name — for instance, error messages won’t use the alias name. In the code below, hovering over interfaced in an editor will show that it returns an Interface, but will show that aliased returns object literal type.Hope you will be happy every day'

//one way 
const result1 = diff.diffPatch(oldText, newText)

//the other way is separated by the specified separator
//If no separator is supplied,the default value is a comma
const result2 = diff.diffPatchBySeparator(oldText, newText,'.')
```

The comparison results are shown in the figure below:

![demo.png](https://i.loli.net/2020/02/28/KWX9BbgrLeuk2tf.png)
