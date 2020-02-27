"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Diff = require('fast-diff');

var _ref = Diff,
    INSERT = _ref.INSERT,
    EQUAL = _ref.EQUAL,
    DELETE = _ref.DELETE;

function format(operation) {
  var txt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (!txt) return txt;

  if (operation === DELETE) {
    txt = "<del>".concat(txt, "</del>");
  } else if (operation === INSERT) {
    txt = "<ins>".concat(txt, "</ins>");
  }

  return txt;
}
/**
 * 单个字符比较,得到`before`,`after`格式化文本
 * @param oldText 
 * @param newText 
 */


function diffPatch() {
  var oldText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var newText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var result = Diff("".concat(oldText), "".concat(newText));
  return result.reduce(function (accumulator, cur) {
    var _cur = _slicedToArray(cur, 2),
        operation = _cur[0],
        str = _cur[1];

    var before = accumulator.before,
        after = accumulator.after; // operation值为-1,0按照result顺序拼接得到`before`字符串

    if (operation === DELETE || operation === EQUAL) {
      before += format(operation, str);
    } //operation值为0,1按照result顺序拼接得到`after`字符串


    if (operation === INSERT || operation === EQUAL) {
      after += format(operation, str);
    }

    return {
      before: before,
      after: after
    };
  }, {
    before: '',
    after: ''
  });
}

function getCollection(oldText, newText, separator) {
  var originalArr = oldText.split(separator);
  var compareArr = newText.split(separator);
  var originalSet = new Set(originalArr); //算出originalArr与compareArr的交集

  var intersectArr = compareArr.filter(function (x) {
    return originalSet.has(x);
  });
  return {
    originalArr: originalArr,
    compareArr: compareArr,
    intersectArr: intersectArr
  };
}
/**
 * 
 * 返回处理过的格式化文本
 */


function getPatchText(_ref2) {
  var _ref2$revisionArr = _ref2.revisionArr,
      revisionArr = _ref2$revisionArr === void 0 ? [] : _ref2$revisionArr,
      _ref2$intersectArr = _ref2.intersectArr,
      intersectArr = _ref2$intersectArr === void 0 ? [] : _ref2$intersectArr,
      _ref2$isBefore = _ref2.isBefore,
      isBefore = _ref2$isBefore === void 0 ? true : _ref2$isBefore;
  var intersectLen = intersectArr.length;
  var separator = Diff.separator;
  var r = revisionArr.reduce(function (accumulator, cur) {
    var operation;

    if (intersectLen && intersectArr.includes(cur)) {
      //有交集,即是没有变动的文本
      operation = EQUAL;
    } else {
      operation = isBefore ? DELETE : INSERT;
    }

    return accumulator += format(operation, cur) + separator;
  }, '');
  return separator.length ? r.slice(0, -separator.length) : r.slice(0);
}
/**
 * 通过指定分隔符比较文本,得到`before`,`after`格式化文本
 * @param oldText 
 * @param newText 
 * @param separator 
 */


function diffPatchBySeparator() {
  var oldText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var newText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';

  var _getCollection = getCollection("".concat(oldText), "".concat(newText), "".concat(separator)),
      originalArr = _getCollection.originalArr,
      compareArr = _getCollection.compareArr,
      intersectArr = _getCollection.intersectArr;

  Diff.separator = separator;
  var before = getPatchText({
    revisionArr: originalArr,
    intersectArr: intersectArr
  });
  var after = getPatchText({
    revisionArr: compareArr,
    intersectArr: intersectArr,
    isBefore: false
  });
  return {
    before: before,
    after: after
  };
}

module.exports = {
  diffPatch: diffPatch,
  diffPatchBySeparator: diffPatchBySeparator
};