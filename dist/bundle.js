webpackJsonp([0],[
/* 0 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 21);
var hide = __webpack_require__(/*! ./_hide */ 12);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ 51)('wks');
var uid = __webpack_require__(/*! ./_uid */ 33);
var Symbol = __webpack_require__(/*! ./_global */ 2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 95);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 23);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 11 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 7);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
module.exports = __webpack_require__(/*! ./_descriptors */ 6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 12);
var has = __webpack_require__(/*! ./_has */ 11);
var SRC = __webpack_require__(/*! ./_uid */ 33)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ 21).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 14 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-html.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 23);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 15 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 48);
var defined = __webpack_require__(/*! ./_defined */ 23);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ 49);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var has = __webpack_require__(/*! ./_has */ 11);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 95);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 17 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ 11);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 69)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 18 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 19 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 20 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_strict-method.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ 3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 21 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 22 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 23 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 24 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 25 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-sap.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 21);
var fails = __webpack_require__(/*! ./_fails */ 3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 26 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var IObject = __webpack_require__(/*! ./_iobject */ 48);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var asc = __webpack_require__(/*! ./_array-species-create */ 86);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 27 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-array.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(/*! ./_descriptors */ 6)) {
  var LIBRARY = __webpack_require__(/*! ./_library */ 34);
  var global = __webpack_require__(/*! ./_global */ 2);
  var fails = __webpack_require__(/*! ./_fails */ 3);
  var $export = __webpack_require__(/*! ./_export */ 0);
  var $typed = __webpack_require__(/*! ./_typed */ 61);
  var $buffer = __webpack_require__(/*! ./_typed-buffer */ 92);
  var ctx = __webpack_require__(/*! ./_ctx */ 18);
  var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
  var propertyDesc = __webpack_require__(/*! ./_property-desc */ 32);
  var hide = __webpack_require__(/*! ./_hide */ 12);
  var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
  var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
  var toLength = __webpack_require__(/*! ./_to-length */ 8);
  var toIndex = __webpack_require__(/*! ./_to-index */ 121);
  var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
  var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
  var has = __webpack_require__(/*! ./_has */ 11);
  var classof = __webpack_require__(/*! ./_classof */ 50);
  var isObject = __webpack_require__(/*! ./_is-object */ 4);
  var toObject = __webpack_require__(/*! ./_to-object */ 9);
  var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 83);
  var create = __webpack_require__(/*! ./_object-create */ 37);
  var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
  var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
  var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 85);
  var uid = __webpack_require__(/*! ./_uid */ 33);
  var wks = __webpack_require__(/*! ./_wks */ 5);
  var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 26);
  var createArrayIncludes = __webpack_require__(/*! ./_array-includes */ 52);
  var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 59);
  var ArrayIterators = __webpack_require__(/*! ./es6.array.iterator */ 88);
  var Iterators = __webpack_require__(/*! ./_iterators */ 45);
  var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 56);
  var setSpecies = __webpack_require__(/*! ./_set-species */ 39);
  var arrayFill = __webpack_require__(/*! ./_array-fill */ 87);
  var arrayCopyWithin = __webpack_require__(/*! ./_array-copy-within */ 111);
  var $DP = __webpack_require__(/*! ./_object-dp */ 7);
  var $GOPD = __webpack_require__(/*! ./_object-gopd */ 16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 28 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_metadata.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ 116);
var $export = __webpack_require__(/*! ./_export */ 0);
var shared = __webpack_require__(/*! ./_shared */ 51)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 119))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 29 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ 33)('meta');
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var has = __webpack_require__(/*! ./_has */ 11);
var setDesc = __webpack_require__(/*! ./_object-dp */ 7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 30 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ 5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ 12)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 31 */,
/* 32 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 33 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 34 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 35 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 97);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 70);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 36 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 37 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var dPs = __webpack_require__(/*! ./_object-dps */ 98);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 70);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 69)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 67)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 71).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 38 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 97);
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 70).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 39 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var dP = __webpack_require__(/*! ./_object-dp */ 7);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 40 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 41 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 18);
var call = __webpack_require__(/*! ./_iter-call */ 109);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 83);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 85);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 42 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ 13);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 43 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 7).f;
var has = __webpack_require__(/*! ./_has */ 11);
var TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 44 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-trim.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 23);
var fails = __webpack_require__(/*! ./_fails */ 3);
var spaces = __webpack_require__(/*! ./_string-ws */ 73);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 45 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 46 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 47 */,
/* 48 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 19);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 49 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 50 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ 19);
var TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 51 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 52 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 53 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 54 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 19);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 55 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var cof = __webpack_require__(/*! ./_cof */ 19);
var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 56 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 57 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 58 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(/*! ./_hide */ 12);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 23);
var wks = __webpack_require__(/*! ./_wks */ 5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 59 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_species-constructor.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 60 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var meta = __webpack_require__(/*! ./_meta */ 29);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 56);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 74);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 61 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_typed.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 12);
var uid = __webpack_require__(/*! ./_uid */ 33);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 62 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-forced-pam.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ 34) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(/*! ./_global */ 2)[K];
});


/***/ }),
/* 63 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-of.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 64 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-from.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var forOf = __webpack_require__(/*! ./_for-of */ 41);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 65 */
/*!***************************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/utils/math_utils.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var MathUtils = {
  nearestMultiple: function nearestMultiple(n, multiple) {
    return Math.round(n / multiple) * multiple;
  },

  scaleBetween: function scaleBetween(lo, hi, scale) {
    return lo + (hi - lo) * scale;
  },

  // returns a percentage between hi and lo from a given input
  // e.g percentageBetween2(7, 4, 10) -> .5
  percentageBetween2: function percentageBetween2(input, lo, hi) {
    return (input - lo) / (hi - lo);
  }
};

exports.default = MathUtils;

/***/ }),
/* 66 */
/*!***************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/util.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseBounds = parseBounds;
exports.getWidthOrHeight = getWidthOrHeight;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.findChild = findChild;
exports.detectDrag = detectDrag;
exports.dispatchClicks = dispatchClicks;

var _config = __webpack_require__(/*! ./config */ 133);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseBounds(bounds) {
  bounds.x = bounds.x ? bounds.x : 0;
  bounds.y = bounds.y ? bounds.y : 0;
  if (bounds.width <= 0) {
    console.warn('PhaserListView: bounds.width <= 0');
  } else if (bounds.height <= 0) {
    console.warn('PhaserListView: bounds.height <= 0');
  }
  return bounds;
}

// prefer nominalWidth and nominalHeight
function getWidthOrHeight(displayObject, widthOrHeight) {
  return displayObject['nominal' + capitalizeFirstLetter(widthOrHeight)] || displayObject[widthOrHeight];
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function findChild(children, predicate) {
  var scope = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  if (!children) return false;
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    if (!child) continue;
    if (predicate.call(scope, child)) {
      return child;
    }
    var found = findChild(child.children, predicate, scope);
    if (found) {
      return found;
    }
  }
  return false;
}

function detectDrag(pointer) {
  var distanceX = Math.abs(pointer.positionDown.x - pointer.positionUp.x);
  var distanceY = Math.abs(pointer.positionDown.y - pointer.positionUp.y);
  var time = pointer.timeUp - pointer.timeDown;
  return distanceX > _config2.default.AUTO_DETECT_THRESHOLD || distanceY > _config2.default.AUTO_DETECT_THRESHOLD;
}

function dispatchClicks(pointer, clickables, type) {
  if (type == 'onInputUp' && detectDrag(pointer)) return;
  // SEARCH OBJECT UNDER POINT AS THERE IS NO CLICK PROPAGATION SUPPORT IN PHASER
  var found = findChild(clickables, function (clickable) {
    var pt = clickable.worldPosition;
    var anchor = clickable.anchor;
    var pivot = clickable.pivot;
    var width = clickable.width;
    var height = clickable.height;
    var scale = clickable.scale;

    var x = pt.x - (anchor ? anchor.x * width : 0) - pivot.x * scale.x;
    var y = pt.y - (anchor ? anchor.y * height : 0) - pivot.y * scale.y;
    // console.log('does ', x, y, clickable.width, clickable.height, ' intersect ', pointer.x, pointer.y)
    return clickable.inputEnabled && new Phaser.Rectangle(x, y, clickable.width, clickable.height).contains(pointer.x, pointer.y);
  });
  if (found && found.events && found.events[type] && found.events[type].dispatch) {
    found.events[type].dispatch(found, pointer, true);
  }
  return found;
}

/***/ }),
/* 67 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var document = __webpack_require__(/*! ./_global */ 2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 68 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 21);
var LIBRARY = __webpack_require__(/*! ./_library */ 34);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 96);
var defineProperty = __webpack_require__(/*! ./_object-dp */ 7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 69 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 51)('keys');
var uid = __webpack_require__(/*! ./_uid */ 33);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 70 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 71 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ 2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 72 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ 18)(Function.call, __webpack_require__(/*! ./_object-gopd */ 16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 73 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-ws.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 74 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ 72).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 75 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var defined = __webpack_require__(/*! ./_defined */ 23);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 76 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-sign.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 77 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-expm1.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 78 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var defined = __webpack_require__(/*! ./_defined */ 23);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 79 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 34);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var hide = __webpack_require__(/*! ./_hide */ 12);
var has = __webpack_require__(/*! ./_has */ 11);
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
var $iterCreate = __webpack_require__(/*! ./_iter-create */ 80);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 80 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ 37);
var descriptor = __webpack_require__(/*! ./_property-desc */ 32);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 12)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 81 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 55);
var defined = __webpack_require__(/*! ./_defined */ 23);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 82 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 83 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 84 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 85 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ 50);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
module.exports = __webpack_require__(/*! ./_core */ 21).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 86 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 230);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 87 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_array-fill.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 88 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 30);
var step = __webpack_require__(/*! ./_iter-step */ 112);
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 79)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 89 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_task.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 18);
var invoke = __webpack_require__(/*! ./_invoke */ 102);
var html = __webpack_require__(/*! ./_html */ 71);
var cel = __webpack_require__(/*! ./_dom-create */ 67);
var global = __webpack_require__(/*! ./_global */ 2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ 19)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 90 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_microtask.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var macrotask = __webpack_require__(/*! ./_task */ 89).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ 19)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 91 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/_new-promise-capability.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ 10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 92 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-buffer.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var LIBRARY = __webpack_require__(/*! ./_library */ 34);
var $typed = __webpack_require__(/*! ./_typed */ 61);
var hide = __webpack_require__(/*! ./_hide */ 12);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var fails = __webpack_require__(/*! ./_fails */ 3);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var toIndex = __webpack_require__(/*! ./_to-index */ 121);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var arrayFill = __webpack_require__(/*! ./_array-fill */ 87);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 93 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_user-agent.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 94 */
/*!*******************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/scroller.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math_utils = __webpack_require__(/*! ./utils/math_utils */ 65);

var _math_utils2 = _interopRequireDefault(_math_utils);

var _util = __webpack_require__(/*! ./util */ 66);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ptHelper = new Phaser.Point();

var defaultOptions = {
  from: 0,
  to: 200,
  direction: 'y',
  momentum: false,
  snapping: false,
  bouncing: false,
  deceleration: 0.5, // value between 0 and 1
  overflow: 20,
  snapStep: 10,
  emitMoving: false,
  duration: 2, // (s) duration of the inertial scrolling simulation.
  speedLimit: 3, // set maximum speed. Higher values will allow faster scroll (which comes down to a bigger offset for the duration of the momentum scroll) note: touch motion determines actual speed, this is just a limit.
  flickTimeThreshold: 100, // (ms) determines if a flick occurred: time between last updated movement @ touchmove and time @ touchend, if smaller than this value, trigger inertial scrolling
  offsetThreshold: 30, // (pixels) determines if calculated offset is above this threshold
  acceleration: 0.5, // increase the multiplier by this value, each time the user swipes again when still scrolling. The multiplier is used to multiply the offset. Set to 0 to disable.
  accelerationT: 250, // (ms) time between successive swipes that determines if the multiplier is increased (if lower than this value)
  maxAcceleration: 4,
  time: {}, // contains timestamps of the most recent down, up, and move events
  multiplier: 1, //acceleration multiplier, don't edit here
  swipeEnabled: false,
  swipeThreshold: 5, // (pixels) must move this many pixels for a swipe action
  swipeTimeThreshold: 250, // (ms) determines if a swipe occurred: time between last updated movement @ touchmove and time @ touchend, if smaller than this value, trigger swipe
  minDuration: 0.5,
  addListeners: true
};

// Pure logic scroller
// Originally adapted from http://yusyuslabs.com/tutorial-momentum-scrolling-inside-scrollable-area-with-phaser-js/
//

var Scroller = function () {
  function Scroller(game, clickObject) {
    var maskLimits = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, Scroller);

    this.game = game;
    this.clickObject = clickObject;

    this.maskLimits = maskLimits;

    this.o = this.options = Object.assign({}, defaultOptions, options);

    this._updateMinMax();

    this.dispatchValues = { step: 0, total: 0, percent: 0 };

    this.addListeners();

    this.clickables = [];

    this.isDown = false; // isDown is true when the down event has fired but the up event has not
    this.isScrolling = false; // isScrolling is true when the down event has fired but the complete event has not

    this.scrollObject = {};

    this.init();

    this.tweenScroll = this.game.add.tween(this.scrollObject).to({}, 0, Phaser.Easing.Quartic.Out);
    this.tweenScroll.onUpdateCallback(this.handleUpdate, this);
    this.tweenScroll.onComplete.add(this.handleComplete, this);
  }

  _createClass(Scroller, [{
    key: 'destroy',
    value: function destroy() {
      this.tweenScroll.stop();
      this.removeListeners();
      this.clickObject.destroy();
      this.clickables = null;
      this.options = this.o = null;
      this.maskLimits = null;
      this.enabled = false;
      this.game = null;
      this.dispatchValues = null;
      this.isDown = null;
      this.target = null;
      this.destroyed = true;
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      this.events = {
        onUpdate: new Phaser.Signal(),
        onInputUp: new Phaser.Signal(),
        onInputDown: new Phaser.Signal(),
        onInputMove: new Phaser.Signal(),
        onComplete: new Phaser.Signal(),
        onSwipe: new Phaser.Signal()
      };

      if (this.o.addListeners) {
        this.clickObject.inputEnabled = true;
        this.clickObject.events.onInputDown.add(this.handleDown, this);
        this.clickObject.events.onInputUp.add(this.handleUp, this);
      }
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      if (this.o.addListeners) {
        this.clickObject.events.onInputDown.remove(this.handleDown, this);
        this.clickObject.events.onInputUp.remove(this.handleUp, this);
      }

      for (var property in this.events) {
        if (this.events.hasOwnProperty(property)) {
          this.events[property].dispose();
        }
      }
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.enabled = true;
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.enabled = false;
    }
  }, {
    key: 'init',
    value: function init() {
      this.scrollObject[this.o.direction] = this.o.from;
      this.maxOffset = this.maskLimits[this.o.direction] * this.o.speedLimit;
      this.enable();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.tweenScroll.pause();
      this.o.multiplier = 1;
      this.init();
    }
  }, {
    key: 'setFromTo',
    value: function setFromTo(_from, _to) {
      this.o.from = _from;
      this.o.to = _to;
      this._updateMinMax();
    }
  }, {
    key: 'isTweening',
    value: function isTweening() {
      return this.tweenScroll.isRunning;
    }
  }, {
    key: 'registerClickables',
    value: function registerClickables(clickables) {
      this.clickables = clickables;
    }
  }, {
    key: 'handleDown',
    value: function handleDown(target, pointer) {
      if (!this.enabled) return;
      this.isDown = true;
      // console.log('input down', pointer.y)
      this.target = this.requested = this.scrollObject[this.o.direction];
      this.o.time.down = pointer.timeDown;

      if (this.o.addListeners) this.game.input.addMoveCallback(this.handleMove, this);

      //check if block is currently scrolling and set multiplier
      if (this.isTweening() && this.o.time.down - this.o.time.up < this.o.accelerationT) {
        //swipe while animation was happening, increase multiplier
        this.o.multiplier += this.o.acceleration;
        // console.log('swipe while animation is happening', this.o.multiplier)
      } else {
        //reset
        this.o.multiplier = 1;
      }

      //stop tween for touch-to-stop
      this.tweenScroll.stop();
      this.tweenScroll.pendingDelete = false;

      (0, _util.dispatchClicks)(pointer, this.clickables, 'onInputDown');
      this.events.onInputDown.dispatch(target, pointer);
    }
  }, {
    key: 'handleMove',
    value: function handleMove(pointer, x, y) {
      if (!this.enabled) return;
      this.isScrolling = true;
      _ptHelper.set(x, y);
      this.diff = this.old - _ptHelper[this.o.direction];

      this.diff = this._requestDiff(this.diff, this.target, this.min, this.max, this.o.overflow);

      this.target -= this.diff;

      this.old = _ptHelper[this.o.direction];

      //store timestamp for event
      this.o.time.move = this.game.time.time;

      this.acc = Math.min(Math.abs(this.diff / 30), this.o.maxAcceleration);

      //go ahead and move the block
      this.scrollObject[this.o.direction] = this.target;
      this.handleUpdate();

      if (this.o.emitMoving) this.events.onInputMove.dispatch(pointer, x, y);
    }
  }, {
    key: 'handleUp',
    value: function handleUp(target, pointer) {
      this.isDown = false;
      // console.log('end')
      if (this.o.addListeners) this.game.input.deleteMoveCallback(this.handleMove, this);

      //store timestamp for event
      this.o.time.up = pointer.timeUp;

      if (this.o.time.up - this.o.time.down > this.o.accelerationT) {
        this.o.multiplier = 1; // reset
      }

      var o = {
        duration: 1,
        target: this.target
      };

      // *** BOUNCING
      if (!this.o.bouncing) o.duration = 0.01;

      if (!this.o.infinite && this.scrollObject[this.o.direction] > this.max) {
        this.target = this.max;
        this.tweenTo(o.duration, this.target);
      } else if (!this.o.infinite && this.scrollObject[this.o.direction] < this.min) {
        this.target = this.min;
        this.tweenTo(o.duration, this.target);
      } else {
        // *** MOMENTUM
        this._addMomentum(o);

        // *** SWIPING
        this._addSwiping(o, pointer);

        // *** SNAPPING
        this._addSnapping(o);

        // *** LIMITS
        this._addLimits(o);

        // *** DURATION
        this._calculateDuration(o);

        this.tweenTo(o.duration, o.target);
      }

      (0, _util.dispatchClicks)(pointer, this.clickables, 'onInputUp');
      this.events.onInputUp.dispatch(target, pointer, _util.dispatchClicks);
    }
  }, {
    key: '_addMomentum',
    value: function _addMomentum(o) {
      if (!this.o.momentum) return o.target;

      //distance to move after release
      var offset = Math.pow(this.acc, 2) * this.maskLimits[this.o.direction];
      offset = Math.min(this.maxOffset, offset);
      offset = this.diff > 0 ? -this.o.multiplier * offset : this.o.multiplier * offset;

      if (this.o.time.up - this.o.time.move < this.o.flickTimeThreshold && offset !== 0 && Math.abs(offset) > this.o.offsetThreshold) {
        o.target += offset;
      }
      return o;
    }
  }, {
    key: '_addSwiping',
    value: function _addSwiping(o, pointer) {
      var swipeDistance = Math.abs(this.down - this.current);
      if (this.o.swipeEnabled && this.o.time.up - this.o.time.down < this.o.swipeTimeThreshold && swipeDistance > this.o.swipeThreshold) {
        var direction = pointer[this.o.direction] < this.down ? 'forward' : 'backward';

        if (direction == 'forward') {
          o.target -= this.o.snapStep / 2;
        } else {
          o.target += this.o.snapStep / 2;
        }

        this.events.onSwipe.dispatch(direction);
      }
      return o;
    }
  }, {
    key: '_addSnapping',
    value: function _addSnapping(o) {
      if (!this.o.snapping) {
        return o;
      }
      o.target = _math_utils2.default.nearestMultiple(o.target, this.o.snapStep);
      return o;
    }
  }, {
    key: '_addLimits',
    value: function _addLimits(o) {
      if (this.o.infinite) return o;
      o.target = Math.max(o.target, this.min);
      o.target = Math.min(o.target, this.max);
      return o;
    }
  }, {
    key: '_calculateDuration',
    value: function _calculateDuration(o) {
      var distance = Math.abs(o.target - this.scrollObject[this.o.direction]);
      o.duration = this.o.duration * distance / this.maxOffset;
      o.duration = Math.max(this.o.minDuration, o.duration);
      return o;
    }
  }, {
    key: '_requestDiff',
    value: function _requestDiff(diff, target, min, max, overflow) {
      if (this.o.infinite) return diff;

      var scale = 0;
      if (target > max) {
        scale = (max + overflow - target) / overflow;
        diff *= scale;
      } else if (target < min) {
        scale = -(min - overflow - target) / overflow;
        diff *= scale;
      }
      return diff;
    }
  }, {
    key: 'tweenToSnap',
    value: function tweenToSnap(duration, snapIndex) {
      var target = this.o.from - this.o.snapStep * snapIndex;
      this.tweenTo(duration, target);
    }

    /**
     * [tweenTo tween to scroller to the target]
     * @param  {Number} duration duration in seconds
     * @param  {Number} target   target relative to the scroller space (usually pixels, but can be angle)
     */

  }, {
    key: 'tweenTo',
    value: function tweenTo(duration, target) {
      if (duration == 0) return this.setTo(target);

      //stop a tween if it is currently happening
      var o = _defineProperty({}, this.o.direction, target);

      this.tweenScroll.onUpdateCallback(this.handleUpdate, this);
      this.tweenScroll.onComplete.add(this.handleComplete, this);

      this.tweenScroll.updateTweenData('vEnd', o, -1);
      this.tweenScroll.updateTweenData('duration', duration * 1000, -1);
      this.tweenScroll.updateTweenData('percent ', 0, -1);

      this.tweenScroll.start();
    }

    // TODO - not really sure what this cancel method should do.
    // Obviously it's meant to cancel a currently active scroll...but I'm
    // not sure what expect from that.

  }, {
    key: 'cancel',
    value: function cancel() {
      this.isDown = false;
    }

    /**
     * [setTo sets the scroller to the target]
     * @param  {Number} target   target relative to the scroller space (usually pixels, but can be angle)
     */

  }, {
    key: 'setTo',
    value: function setTo(target) {
      //stop a tween if it is currently happening
      this.scrollObject[this.o.direction] = target;
      this.tweenScroll.stop();

      this.handleUpdate();
      this.handleComplete();
    }
  }, {
    key: 'handleUpdate',
    value: function handleUpdate() {
      if (!this.enabled) return;
      if (this.o.infinite) {
        this.dispatchValues.total = Phaser.Math.wrap(this.scrollObject[this.o.direction], this.min, this.max);
      } else {
        this.dispatchValues.total = this.scrollObject[this.o.direction];
      }

      var step = this.dispatchValues.total - this.previousTotal;
      if (step < -this.length / 2) {
        step = step + this.length;
      } else if (step > this.length / 2) {
        step = step - this.length;
      }

      this.dispatchValues.step = step;
      this.dispatchValues.percent = _math_utils2.default.percentageBetween2(this.dispatchValues.total, this.o.from, this.o.to);
      this.events.onUpdate.dispatch(this.dispatchValues);

      this.previousTotal = this.dispatchValues.total;
    }
  }, {
    key: 'handleComplete',
    value: function handleComplete() {
      if (!this.enabled) return;
      this.isScrolling = false;
      // reset multiplier when finished
      this.o.multiplier = 1;
      this.events.onComplete.dispatch();
    }
  }, {
    key: '_updateMinMax',
    value: function _updateMinMax() {
      this.min = Math.min(this.o.from, this.o.to);
      this.max = Math.max(this.o.from, this.o.to);
      this.length = Math.abs(this.max - this.min);
      this.previousTotal = this.o.from;
    }
  }]);

  return Scroller;
}();

exports.default = Scroller;

/***/ }),
/* 95 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 6) && !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 67)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 96 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 5);


/***/ }),
/* 97 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ 11);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 52)(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 69)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 98 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 7);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getKeys = __webpack_require__(/*! ./_object-keys */ 35);

module.exports = __webpack_require__(/*! ./_descriptors */ 6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 99 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 100 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ 35);
var gOPS = __webpack_require__(/*! ./_object-gops */ 53);
var pIE = __webpack_require__(/*! ./_object-pie */ 49);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IObject = __webpack_require__(/*! ./_iobject */ 48);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ 3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 101 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_bind.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var invoke = __webpack_require__(/*! ./_invoke */ 102);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 102 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_invoke.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 103 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-int.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ 2).parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ 44).trim;
var ws = __webpack_require__(/*! ./_string-ws */ 73);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 104 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-float.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ 2).parseFloat;
var $trim = __webpack_require__(/*! ./_string-trim */ 44).trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ 73) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 105 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_a-number-value.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ 19);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 106 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-integer.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 107 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-log1p.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 108 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_math-fround.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(/*! ./_math-sign */ 76);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 109 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 110 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_array-reduce.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IObject = __webpack_require__(/*! ./_iobject */ 48);
var toLength = __webpack_require__(/*! ./_to-length */ 8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 111 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-copy-within.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var toLength = __webpack_require__(/*! ./_to-length */ 8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 112 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 113 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ 6) && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ 7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ 57)
});


/***/ }),
/* 114 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_perform.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 115 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_promise-resolve.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 91);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 116 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 117);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ 60)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 117 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var create = __webpack_require__(/*! ./_object-create */ 37);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var $iterDefine = __webpack_require__(/*! ./_iter-define */ 79);
var step = __webpack_require__(/*! ./_iter-step */ 112);
var setSpecies = __webpack_require__(/*! ./_set-species */ 39);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var fastKey = __webpack_require__(/*! ./_meta */ 29).fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 118 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 117);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ 60)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 119 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-map.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(/*! ./_array-methods */ 26)(0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var meta = __webpack_require__(/*! ./_meta */ 29);
var assign = __webpack_require__(/*! ./_object-assign */ 100);
var weak = __webpack_require__(/*! ./_collection-weak */ 120);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ 60)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 120 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-weak.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var getWeak = __webpack_require__(/*! ./_meta */ 29).getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 26);
var $has = __webpack_require__(/*! ./_has */ 11);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 121 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_to-index.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 122 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_own-keys.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38);
var gOPS = __webpack_require__(/*! ./_object-gops */ 53);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Reflect = __webpack_require__(/*! ./_global */ 2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 123 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_flatten-into-array.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(/*! ./_is-array */ 54);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var IS_CONCAT_SPREADABLE = __webpack_require__(/*! ./_wks */ 5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 124 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-pad.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var repeat = __webpack_require__(/*! ./_string-repeat */ 75);
var defined = __webpack_require__(/*! ./_defined */ 23);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 125 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-to-array.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ 35);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var isEnum = __webpack_require__(/*! ./_object-pie */ 49).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 126 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-to-json.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ 50);
var from = __webpack_require__(/*! ./_array-from-iterable */ 127);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 127 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ 41);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 128 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-scale.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  gameWidth: 640,
  gameHeight: 960,
  localStorageName: 'phaseres6webpack',
  webfonts: ['Roboto:300', 'Open Sans:300']
});

/***/ }),
/* 133 */
/*!*****************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/config.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Config = {
  AUTO_DETECT_THRESHOLD: 8
};

exports.default = Config;

/***/ }),
/* 134 */
/*!********************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/list_view.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _list_view_core = __webpack_require__(/*! ./list_view_core */ 135);

var _list_view_core2 = _interopRequireDefault(_list_view_core);

var _directional_scroller = __webpack_require__(/*! ./directional_scroller */ 136);

var _directional_scroller2 = _interopRequireDefault(_directional_scroller);

var _util = __webpack_require__(/*! ./util */ 66);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultOptions = {
  direction: 'y',
  autocull: true,
  momentum: true,
  bouncing: true,
  snapping: false,
  overflow: 100,
  padding: 10,
  searchForClicks: false // if you just click on the list view it will search the list view items for onInputDown and onInputUp events.
};

var ListView = function (_ListViewCore) {
  _inherits(ListView, _ListViewCore);

  function ListView(game, parent, bounds) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, ListView);

    // we have to use a new mask instance for the click object or webgl ignores the mask
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ListView).call(this, game, parent, (0, _util.parseBounds)(bounds), Object.assign({}, defaultOptions, options)));

    _this.scroller = new _directional_scroller2.default(_this.game, _this._addMask(bounds), Object.assign({
      from: 0,
      to: 0
    }, _this.options));
    _this.scroller.events.onUpdate.add(function (o) {
      _this._setPosition(o.total);
    });
    _this.events.onAdded.add(function (limit) {
      var _to = Math.min(-limit, 0);
      _this.scroller.setFromTo(0, _to);
      if (_this.options.searchForClicks) {
        _this.scroller.registerClickables(_this.items);
      }
    });
    return _this;
  }

  _createClass(ListView, [{
    key: 'destroy',
    value: function destroy() {
      this.scroller.destroy();
      this.scroller = null;
      _get(Object.getPrototypeOf(ListView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this._setPosition(0);
      this.scroller.reset();
    }
  }]);

  return ListView;
}(_list_view_core2.default);

exports.default = ListView;

/***/ }),
/* 135 */
/*!*************************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/list_view_core.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(/*! ./util */ 66);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  direction: 'y',
  autocull: true,
  padding: 10
};

var ListViewCore = function () {
  function ListViewCore(game, parent, bounds) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, ListViewCore);

    this.game = game;
    this.parent = parent;
    this.bounds = bounds;

    this.o = this.options = Object.assign({}, defaultOptions, options);

    this.items = [];

    if (this.o.direction == 'y') {
      this.p = { xy: 'y', wh: 'height' };
    } else {
      this.p = { xy: 'x', wh: 'width' };
    }

    this.grp = this.game.add.group(parent);
    this.grp.position.set(bounds.x, bounds.y);

    this.events = {
      onAdded: new Phaser.Signal()
    };

    this.position = 0;

    // [MC] - is masking the fastest option here? Cropping the texture may be faster?
    this.grp.mask = this._addMask(bounds);
  }

  /**
   * [add a child to the list
   * stacks them on top of each other by measuring their
   * height and adding custom padding. Optionally you can
   * specify nominalHeight or nominalWidth on the display object,
   * this will take preference over height and width]
   * @param {DisplayObject} child
   */


  _createClass(ListViewCore, [{
    key: 'add',
    value: function add(child) {
      this.items.push(child);
      var xy = 0;
      if (this.grp.children.length > 0) {
        var lastChild = this.grp.getChildAt(this.grp.children.length - 1);
        xy = lastChild[this.p.xy] + (0, _util.getWidthOrHeight)(lastChild, this.p.wh) + this.o.padding;
      }
      child[this.p.xy] = xy;
      this.grp.addChild(child);
      this.length = xy + child[this.p.wh];

      // this._setPosition(this.position)
      this.events.onAdded.dispatch(this.length - this.bounds[this.p.wh]);
      return child;
    }

    /**
     * [addMultiple children to the list]
     * @param {...[DisplayObjects]} children
     */

  }, {
    key: 'addMultiple',
    value: function addMultiple() {
      for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
        children[_key] = arguments[_key];
      }

      children.forEach(this.add, this);
    }
  }, {
    key: 'remove',
    value: function remove(child) {
      this.grp.removeChild(child);
      var index = this.items.indexOf(child);
      if (index == -1) return;
      this.items.splice(index, 1);
      return child;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.events.onAdded.dispose();
      this.events = null;
      this.grp.destroy();
      this.grp = null;
      this.game = null;
      this.parent = null;
      this.items = null;
    }

    /**
     * [removeAll - removes all children from the group]
     * @note This does not reset the position of the ListView.
     */

  }, {
    key: 'removeAll',
    value: function removeAll() {
      this.grp.removeAll();
      this.items = [];
    }

    /**
     * [cull - culls the off-screen list elements]
     * mainly called internally with the autoCull property
     */

  }, {
    key: 'cull',
    value: function cull() {
      for (var i = 0; i < this.items.length; i++) {
        var child = this.items[i];
        child.visible = true;
        if (child[this.p.xy] + (0, _util.getWidthOrHeight)(child, this.p.wh) + this.grp[this.p.xy] < this.bounds[this.p.xy]) {
          child.visible = false;
        } else if (child[this.p.xy] + this.grp[this.p.xy] > this.bounds[this.p.xy] + this.bounds[this.p.wh]) {
          child.visible = false;
        }
      }
    }
  }, {
    key: 'getPositionByItemIndex',
    value: function getPositionByItemIndex(index) {
      return -this.items[index][this.p.xy];
    }

    // @deprecated

  }, {
    key: 'setPosition',
    value: function setPosition(position) {
      this.moveToPosition(position);
    }
  }, {
    key: 'moveToPosition',
    value: function moveToPosition(position) {
      this.scroller.setTo(position);
    }
  }, {
    key: 'moveToItem',
    value: function moveToItem(index) {
      this.scroller.setTo(this.getPositionByItemIndex(index));
    }
  }, {
    key: 'tweenToPosition',
    value: function tweenToPosition(position) {
      var duration = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      this.scroller.tweenTo(duration, position);
    }
  }, {
    key: 'tweenToItem',
    value: function tweenToItem(index) {
      var duration = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      this.scroller.tweenTo(duration, this.getPositionByItemIndex(index));
    }

    /**
     * @private
     */

  }, {
    key: '_setPosition',
    value: function _setPosition(position) {
      this.position = position;
      this.grp[this.p.xy] = this.bounds[this.p.xy] + position;
      if (this.o.autocull) this.cull();
    }

    /**
     * @private
     */

  }, {
    key: '_addMask',
    value: function _addMask(bounds) {
      var mask = this.game.add.graphics(0, 0, this.parent);
      mask.beginFill(0xff0000).drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
      mask.alpha = 0;
      return mask;
    }
  }]);

  return ListViewCore;
}();

exports.default = ListViewCore;

/***/ }),
/* 136 */
/*!*******************************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/directional_scroller.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _math_utils = __webpack_require__(/*! ./utils/math_utils */ 65);

var _math_utils2 = _interopRequireDefault(_math_utils);

var _scroller = __webpack_require__(/*! ./scroller */ 94);

var _scroller2 = _interopRequireDefault(_scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DirectionalScroller = function (_Scroller) {
  _inherits(DirectionalScroller, _Scroller);

  function DirectionalScroller(game, clickObject) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, DirectionalScroller);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DirectionalScroller).call(this, game, clickObject, { x: clickObject.width, y: clickObject.height }, options));
  }

  _createClass(DirectionalScroller, [{
    key: 'handleDown',
    value: function handleDown(target, pointer) {
      this.old = this.down = pointer[this.o.direction];
      _get(Object.getPrototypeOf(DirectionalScroller.prototype), 'handleDown', this).call(this, target, pointer);
    }
  }, {
    key: 'handleUp',
    value: function handleUp(target, pointer) {
      this.current = pointer[this.o.direction];
      _get(Object.getPrototypeOf(DirectionalScroller.prototype), 'handleUp', this).call(this, target, pointer);
    }
  }]);

  return DirectionalScroller;
}(_scroller2.default);

exports.default = DirectionalScroller;

/***/ }),
/* 137 */
/*!******************************************!*\
  !*** multi babel-polyfill ./src/main.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */138);
module.exports = __webpack_require__(/*! /Users/alvaramat/Desktop/mato_web_xampp/rayuela/rayuela2018/src/main.js */340);


/***/ }),
/* 138 */
/*!**************************************************!*\
  !*** ./node_modules/babel-polyfill/lib/index.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/shim */ 139);

__webpack_require__(/*! regenerator-runtime/runtime */ 336);

__webpack_require__(/*! core-js/fn/regexp/escape */ 337);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 47)))

/***/ }),
/* 139 */
/*!**************************************!*\
  !*** ./node_modules/core-js/shim.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ 140);
__webpack_require__(/*! ./modules/es6.object.create */ 142);
__webpack_require__(/*! ./modules/es6.object.define-property */ 143);
__webpack_require__(/*! ./modules/es6.object.define-properties */ 144);
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 145);
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 146);
__webpack_require__(/*! ./modules/es6.object.keys */ 147);
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 148);
__webpack_require__(/*! ./modules/es6.object.freeze */ 149);
__webpack_require__(/*! ./modules/es6.object.seal */ 150);
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 151);
__webpack_require__(/*! ./modules/es6.object.is-frozen */ 152);
__webpack_require__(/*! ./modules/es6.object.is-sealed */ 153);
__webpack_require__(/*! ./modules/es6.object.is-extensible */ 154);
__webpack_require__(/*! ./modules/es6.object.assign */ 155);
__webpack_require__(/*! ./modules/es6.object.is */ 156);
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 158);
__webpack_require__(/*! ./modules/es6.object.to-string */ 159);
__webpack_require__(/*! ./modules/es6.function.bind */ 160);
__webpack_require__(/*! ./modules/es6.function.name */ 161);
__webpack_require__(/*! ./modules/es6.function.has-instance */ 162);
__webpack_require__(/*! ./modules/es6.parse-int */ 163);
__webpack_require__(/*! ./modules/es6.parse-float */ 164);
__webpack_require__(/*! ./modules/es6.number.constructor */ 165);
__webpack_require__(/*! ./modules/es6.number.to-fixed */ 166);
__webpack_require__(/*! ./modules/es6.number.to-precision */ 167);
__webpack_require__(/*! ./modules/es6.number.epsilon */ 168);
__webpack_require__(/*! ./modules/es6.number.is-finite */ 169);
__webpack_require__(/*! ./modules/es6.number.is-integer */ 170);
__webpack_require__(/*! ./modules/es6.number.is-nan */ 171);
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 172);
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 173);
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 174);
__webpack_require__(/*! ./modules/es6.number.parse-float */ 175);
__webpack_require__(/*! ./modules/es6.number.parse-int */ 176);
__webpack_require__(/*! ./modules/es6.math.acosh */ 177);
__webpack_require__(/*! ./modules/es6.math.asinh */ 178);
__webpack_require__(/*! ./modules/es6.math.atanh */ 179);
__webpack_require__(/*! ./modules/es6.math.cbrt */ 180);
__webpack_require__(/*! ./modules/es6.math.clz32 */ 181);
__webpack_require__(/*! ./modules/es6.math.cosh */ 182);
__webpack_require__(/*! ./modules/es6.math.expm1 */ 183);
__webpack_require__(/*! ./modules/es6.math.fround */ 184);
__webpack_require__(/*! ./modules/es6.math.hypot */ 185);
__webpack_require__(/*! ./modules/es6.math.imul */ 186);
__webpack_require__(/*! ./modules/es6.math.log10 */ 187);
__webpack_require__(/*! ./modules/es6.math.log1p */ 188);
__webpack_require__(/*! ./modules/es6.math.log2 */ 189);
__webpack_require__(/*! ./modules/es6.math.sign */ 190);
__webpack_require__(/*! ./modules/es6.math.sinh */ 191);
__webpack_require__(/*! ./modules/es6.math.tanh */ 192);
__webpack_require__(/*! ./modules/es6.math.trunc */ 193);
__webpack_require__(/*! ./modules/es6.string.from-code-point */ 194);
__webpack_require__(/*! ./modules/es6.string.raw */ 195);
__webpack_require__(/*! ./modules/es6.string.trim */ 196);
__webpack_require__(/*! ./modules/es6.string.iterator */ 197);
__webpack_require__(/*! ./modules/es6.string.code-point-at */ 198);
__webpack_require__(/*! ./modules/es6.string.ends-with */ 199);
__webpack_require__(/*! ./modules/es6.string.includes */ 200);
__webpack_require__(/*! ./modules/es6.string.repeat */ 201);
__webpack_require__(/*! ./modules/es6.string.starts-with */ 202);
__webpack_require__(/*! ./modules/es6.string.anchor */ 203);
__webpack_require__(/*! ./modules/es6.string.big */ 204);
__webpack_require__(/*! ./modules/es6.string.blink */ 205);
__webpack_require__(/*! ./modules/es6.string.bold */ 206);
__webpack_require__(/*! ./modules/es6.string.fixed */ 207);
__webpack_require__(/*! ./modules/es6.string.fontcolor */ 208);
__webpack_require__(/*! ./modules/es6.string.fontsize */ 209);
__webpack_require__(/*! ./modules/es6.string.italics */ 210);
__webpack_require__(/*! ./modules/es6.string.link */ 211);
__webpack_require__(/*! ./modules/es6.string.small */ 212);
__webpack_require__(/*! ./modules/es6.string.strike */ 213);
__webpack_require__(/*! ./modules/es6.string.sub */ 214);
__webpack_require__(/*! ./modules/es6.string.sup */ 215);
__webpack_require__(/*! ./modules/es6.date.now */ 216);
__webpack_require__(/*! ./modules/es6.date.to-json */ 217);
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ 218);
__webpack_require__(/*! ./modules/es6.date.to-string */ 220);
__webpack_require__(/*! ./modules/es6.date.to-primitive */ 221);
__webpack_require__(/*! ./modules/es6.array.is-array */ 223);
__webpack_require__(/*! ./modules/es6.array.from */ 224);
__webpack_require__(/*! ./modules/es6.array.of */ 225);
__webpack_require__(/*! ./modules/es6.array.join */ 226);
__webpack_require__(/*! ./modules/es6.array.slice */ 227);
__webpack_require__(/*! ./modules/es6.array.sort */ 228);
__webpack_require__(/*! ./modules/es6.array.for-each */ 229);
__webpack_require__(/*! ./modules/es6.array.map */ 231);
__webpack_require__(/*! ./modules/es6.array.filter */ 232);
__webpack_require__(/*! ./modules/es6.array.some */ 233);
__webpack_require__(/*! ./modules/es6.array.every */ 234);
__webpack_require__(/*! ./modules/es6.array.reduce */ 235);
__webpack_require__(/*! ./modules/es6.array.reduce-right */ 236);
__webpack_require__(/*! ./modules/es6.array.index-of */ 237);
__webpack_require__(/*! ./modules/es6.array.last-index-of */ 238);
__webpack_require__(/*! ./modules/es6.array.copy-within */ 239);
__webpack_require__(/*! ./modules/es6.array.fill */ 240);
__webpack_require__(/*! ./modules/es6.array.find */ 241);
__webpack_require__(/*! ./modules/es6.array.find-index */ 242);
__webpack_require__(/*! ./modules/es6.array.species */ 243);
__webpack_require__(/*! ./modules/es6.array.iterator */ 88);
__webpack_require__(/*! ./modules/es6.regexp.constructor */ 244);
__webpack_require__(/*! ./modules/es6.regexp.to-string */ 245);
__webpack_require__(/*! ./modules/es6.regexp.flags */ 113);
__webpack_require__(/*! ./modules/es6.regexp.match */ 246);
__webpack_require__(/*! ./modules/es6.regexp.replace */ 247);
__webpack_require__(/*! ./modules/es6.regexp.search */ 248);
__webpack_require__(/*! ./modules/es6.regexp.split */ 249);
__webpack_require__(/*! ./modules/es6.promise */ 250);
__webpack_require__(/*! ./modules/es6.map */ 116);
__webpack_require__(/*! ./modules/es6.set */ 118);
__webpack_require__(/*! ./modules/es6.weak-map */ 119);
__webpack_require__(/*! ./modules/es6.weak-set */ 251);
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ 252);
__webpack_require__(/*! ./modules/es6.typed.data-view */ 253);
__webpack_require__(/*! ./modules/es6.typed.int8-array */ 254);
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ 255);
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ 256);
__webpack_require__(/*! ./modules/es6.typed.int16-array */ 257);
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ 258);
__webpack_require__(/*! ./modules/es6.typed.int32-array */ 259);
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ 260);
__webpack_require__(/*! ./modules/es6.typed.float32-array */ 261);
__webpack_require__(/*! ./modules/es6.typed.float64-array */ 262);
__webpack_require__(/*! ./modules/es6.reflect.apply */ 263);
__webpack_require__(/*! ./modules/es6.reflect.construct */ 264);
__webpack_require__(/*! ./modules/es6.reflect.define-property */ 265);
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 266);
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 267);
__webpack_require__(/*! ./modules/es6.reflect.get */ 268);
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 269);
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 270);
__webpack_require__(/*! ./modules/es6.reflect.has */ 271);
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 272);
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 273);
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 274);
__webpack_require__(/*! ./modules/es6.reflect.set */ 275);
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 276);
__webpack_require__(/*! ./modules/es7.array.includes */ 277);
__webpack_require__(/*! ./modules/es7.array.flat-map */ 278);
__webpack_require__(/*! ./modules/es7.array.flatten */ 279);
__webpack_require__(/*! ./modules/es7.string.at */ 280);
__webpack_require__(/*! ./modules/es7.string.pad-start */ 281);
__webpack_require__(/*! ./modules/es7.string.pad-end */ 282);
__webpack_require__(/*! ./modules/es7.string.trim-left */ 283);
__webpack_require__(/*! ./modules/es7.string.trim-right */ 284);
__webpack_require__(/*! ./modules/es7.string.match-all */ 285);
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ 286);
__webpack_require__(/*! ./modules/es7.symbol.observable */ 287);
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 288);
__webpack_require__(/*! ./modules/es7.object.values */ 289);
__webpack_require__(/*! ./modules/es7.object.entries */ 290);
__webpack_require__(/*! ./modules/es7.object.define-getter */ 291);
__webpack_require__(/*! ./modules/es7.object.define-setter */ 292);
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ 293);
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ 294);
__webpack_require__(/*! ./modules/es7.map.to-json */ 295);
__webpack_require__(/*! ./modules/es7.set.to-json */ 296);
__webpack_require__(/*! ./modules/es7.map.of */ 297);
__webpack_require__(/*! ./modules/es7.set.of */ 298);
__webpack_require__(/*! ./modules/es7.weak-map.of */ 299);
__webpack_require__(/*! ./modules/es7.weak-set.of */ 300);
__webpack_require__(/*! ./modules/es7.map.from */ 301);
__webpack_require__(/*! ./modules/es7.set.from */ 302);
__webpack_require__(/*! ./modules/es7.weak-map.from */ 303);
__webpack_require__(/*! ./modules/es7.weak-set.from */ 304);
__webpack_require__(/*! ./modules/es7.global */ 305);
__webpack_require__(/*! ./modules/es7.system.global */ 306);
__webpack_require__(/*! ./modules/es7.error.is-error */ 307);
__webpack_require__(/*! ./modules/es7.math.clamp */ 308);
__webpack_require__(/*! ./modules/es7.math.deg-per-rad */ 309);
__webpack_require__(/*! ./modules/es7.math.degrees */ 310);
__webpack_require__(/*! ./modules/es7.math.fscale */ 311);
__webpack_require__(/*! ./modules/es7.math.iaddh */ 312);
__webpack_require__(/*! ./modules/es7.math.isubh */ 313);
__webpack_require__(/*! ./modules/es7.math.imulh */ 314);
__webpack_require__(/*! ./modules/es7.math.rad-per-deg */ 315);
__webpack_require__(/*! ./modules/es7.math.radians */ 316);
__webpack_require__(/*! ./modules/es7.math.scale */ 317);
__webpack_require__(/*! ./modules/es7.math.umulh */ 318);
__webpack_require__(/*! ./modules/es7.math.signbit */ 319);
__webpack_require__(/*! ./modules/es7.promise.finally */ 320);
__webpack_require__(/*! ./modules/es7.promise.try */ 321);
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ 322);
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ 323);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ 324);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ 325);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ 326);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ 327);
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ 328);
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ 329);
__webpack_require__(/*! ./modules/es7.reflect.metadata */ 330);
__webpack_require__(/*! ./modules/es7.asap */ 331);
__webpack_require__(/*! ./modules/es7.observable */ 332);
__webpack_require__(/*! ./modules/web.timers */ 333);
__webpack_require__(/*! ./modules/web.immediate */ 334);
__webpack_require__(/*! ./modules/web.dom.iterable */ 335);
module.exports = __webpack_require__(/*! ./modules/_core */ 21);


/***/ }),
/* 140 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 11);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var META = __webpack_require__(/*! ./_meta */ 29).KEY;
var $fails = __webpack_require__(/*! ./_fails */ 3);
var shared = __webpack_require__(/*! ./_shared */ 51);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var uid = __webpack_require__(/*! ./_uid */ 33);
var wks = __webpack_require__(/*! ./_wks */ 5);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 96);
var wksDefine = __webpack_require__(/*! ./_wks-define */ 68);
var enumKeys = __webpack_require__(/*! ./_enum-keys */ 141);
var isArray = __webpack_require__(/*! ./_is-array */ 54);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
var _create = __webpack_require__(/*! ./_object-create */ 37);
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ 99);
var $GOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var $DP = __webpack_require__(/*! ./_object-dp */ 7);
var $keys = __webpack_require__(/*! ./_object-keys */ 35);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 38).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 49).f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ 53).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ 34)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 141 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 35);
var gOPS = __webpack_require__(/*! ./_object-gops */ 53);
var pIE = __webpack_require__(/*! ./_object-pie */ 49);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 142 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.create.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ 37) });


/***/ }),
/* 143 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-property.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 6), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ 7).f });


/***/ }),
/* 144 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-properties.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 6), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ 98) });


/***/ }),
/* 145 */
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

__webpack_require__(/*! ./_object-sap */ 25)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 146 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-prototype-of.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);

__webpack_require__(/*! ./_object-sap */ 25)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 147 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.keys.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var $keys = __webpack_require__(/*! ./_object-keys */ 35);

__webpack_require__(/*! ./_object-sap */ 25)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 148 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ 25)('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ 99).f;
});


/***/ }),
/* 149 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.freeze.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 29).onFreeze;

__webpack_require__(/*! ./_object-sap */ 25)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 150 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.seal.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 29).onFreeze;

__webpack_require__(/*! ./_object-sap */ 25)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 151 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.prevent-extensions.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 29).onFreeze;

__webpack_require__(/*! ./_object-sap */ 25)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 152 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-frozen.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 25)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 153 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-sealed.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 25)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 154 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-extensible.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 25)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 155 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ 100) });


/***/ }),
/* 156 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ 157) });


/***/ }),
/* 157 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_same-value.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 158 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 72).set });


/***/ }),
/* 159 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ 50);
var test = {};
test[__webpack_require__(/*! ./_wks */ 5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ 13)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 160 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.bind.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Function', { bind: __webpack_require__(/*! ./_bind */ 101) });


/***/ }),
/* 161 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.name.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ 6) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 162 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.has-instance.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var HAS_INSTANCE = __webpack_require__(/*! ./_wks */ 5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(/*! ./_object-dp */ 7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 163 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-int.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 103);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 164 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-float.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 104);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 165 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.constructor.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 11);
var cof = __webpack_require__(/*! ./_cof */ 19);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 74);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var fails = __webpack_require__(/*! ./_fails */ 3);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16).f;
var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var $trim = __webpack_require__(/*! ./_string-trim */ 44).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(/*! ./_object-create */ 37)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(/*! ./_descriptors */ 6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ 13)(global, NUMBER, $Number);
}


/***/ }),
/* 166 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-fixed.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 105);
var repeat = __webpack_require__(/*! ./_string-repeat */ 75);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 167 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-precision.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $fails = __webpack_require__(/*! ./_fails */ 3);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 105);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 168 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.epsilon.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 169 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-finite.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var _isFinite = __webpack_require__(/*! ./_global */ 2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 170 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-integer.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ 106) });


/***/ }),
/* 171 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-nan.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 172 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-safe-integer.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var isInteger = __webpack_require__(/*! ./_is-integer */ 106);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 173 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.max-safe-integer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 174 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.min-safe-integer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 175 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-float.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 104);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 176 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-int.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 103);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 177 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.acosh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var log1p = __webpack_require__(/*! ./_math-log1p */ 107);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 178 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.asinh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 179 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.atanh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 180 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cbrt.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var sign = __webpack_require__(/*! ./_math-sign */ 76);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 181 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.clz32.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 182 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cosh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 183 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.expm1.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $expm1 = __webpack_require__(/*! ./_math-expm1 */ 77);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 184 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.fround.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { fround: __webpack_require__(/*! ./_math-fround */ 108) });


/***/ }),
/* 185 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.hypot.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ 0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 186 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.imul.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ 0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 187 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log10.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 188 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log1p.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { log1p: __webpack_require__(/*! ./_math-log1p */ 107) });


/***/ }),
/* 189 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log2.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 190 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sign.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { sign: __webpack_require__(/*! ./_math-sign */ 76) });


/***/ }),
/* 191 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sinh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 77);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 192 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.tanh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 77);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 193 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.trunc.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 194 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.from-code-point.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 195 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.raw.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toLength = __webpack_require__(/*! ./_to-length */ 8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 196 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.trim.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ 44)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 197 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ 78)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 79)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 198 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.code-point-at.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 78)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 199 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.ends-with.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var context = __webpack_require__(/*! ./_string-context */ 81);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 82)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 200 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.includes.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(/*! ./_export */ 0);
var context = __webpack_require__(/*! ./_string-context */ 81);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 82)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 201 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ 75)
});


/***/ }),
/* 202 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var context = __webpack_require__(/*! ./_string-context */ 81);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 82)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 203 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.anchor.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ 14)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 204 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.big.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ 14)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 205 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.blink.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ 14)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 206 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.bold.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ 14)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 207 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fixed.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ 14)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 208 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontcolor.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ 14)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 209 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontsize.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ 14)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 210 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.italics.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ 14)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 211 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.link.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ 14)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 212 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.small.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ 14)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 213 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.strike.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ 14)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 214 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sub.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ 14)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 215 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sup.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ 14)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 216 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.now.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 217 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-json.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 218 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-iso-string.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ 0);
var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ 219);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 219 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-iso-string.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(/*! ./_fails */ 3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 220 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-string.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(/*! ./_redefine */ 13)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 221 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-primitive.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ 12)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 222));


/***/ }),
/* 222 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-primitive.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 223 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.is-array.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ 54) });


/***/ }),
/* 224 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ 18);
var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var call = __webpack_require__(/*! ./_iter-call */ 109);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 83);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var createProperty = __webpack_require__(/*! ./_create-property */ 84);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 85);

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 56)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 225 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.of.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var createProperty = __webpack_require__(/*! ./_create-property */ 84);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 226 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.join.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 48) != Object || !__webpack_require__(/*! ./_strict-method */ 20)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 227 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.slice.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var html = __webpack_require__(/*! ./_html */ 71);
var cof = __webpack_require__(/*! ./_cof */ 19);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 228 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.sort.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ 20)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 229 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.for-each.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $forEach = __webpack_require__(/*! ./_array-methods */ 26)(0);
var STRICT = __webpack_require__(/*! ./_strict-method */ 20)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 230 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var isArray = __webpack_require__(/*! ./_is-array */ 54);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 231 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.map.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $map = __webpack_require__(/*! ./_array-methods */ 26)(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 232 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.filter.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $filter = __webpack_require__(/*! ./_array-methods */ 26)(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 233 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.some.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $some = __webpack_require__(/*! ./_array-methods */ 26)(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 234 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.every.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $every = __webpack_require__(/*! ./_array-methods */ 26)(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 235 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 110);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 236 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce-right.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 110);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 237 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.index-of.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $indexOf = __webpack_require__(/*! ./_array-includes */ 52)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 20)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 238 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.last-index-of.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 20)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 239 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.copy-within.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(/*! ./_array-copy-within */ 111) });

__webpack_require__(/*! ./_add-to-unscopables */ 30)('copyWithin');


/***/ }),
/* 240 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.fill.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { fill: __webpack_require__(/*! ./_array-fill */ 87) });

__webpack_require__(/*! ./_add-to-unscopables */ 30)('fill');


/***/ }),
/* 241 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 26)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 30)(KEY);


/***/ }),
/* 242 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 26)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 30)(KEY);


/***/ }),
/* 243 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.species.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ 39)('Array');


/***/ }),
/* 244 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 74);
var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 55);
var $flags = __webpack_require__(/*! ./_flags */ 57);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ 6) && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ 3)(function () {
  re2[__webpack_require__(/*! ./_wks */ 5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ 13)(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ 39)('RegExp');


/***/ }),
/* 245 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ 113);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $flags = __webpack_require__(/*! ./_flags */ 57);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(/*! ./_redefine */ 13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(/*! ./_fails */ 3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 246 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.match.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ 58)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 247 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ 58)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 248 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.search.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ 58)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 249 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ 58)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(/*! ./_is-regexp */ 55);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 250 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.promise.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 34);
var global = __webpack_require__(/*! ./_global */ 2);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var classof = __webpack_require__(/*! ./_classof */ 50);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 59);
var task = __webpack_require__(/*! ./_task */ 89).set;
var microtask = __webpack_require__(/*! ./_microtask */ 90)();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ 91);
var perform = __webpack_require__(/*! ./_perform */ 114);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 115);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 42)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ 43)($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ 39)(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ 21)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 56)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 251 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-set.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ 120);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(/*! ./_collection */ 60)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 252 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.array-buffer.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $typed = __webpack_require__(/*! ./_typed */ 61);
var buffer = __webpack_require__(/*! ./_typed-buffer */ 92);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var ArrayBuffer = __webpack_require__(/*! ./_global */ 2).ArrayBuffer;
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 59);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(/*! ./_set-species */ 39)(ARRAY_BUFFER);


/***/ }),
/* 253 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.data-view.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ 61).ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ 92).DataView
});


/***/ }),
/* 254 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int8-array.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 255 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 256 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 257 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int16-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 258 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint16-array.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 259 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int32-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 260 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint32-array.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 261 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float32-array.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 262 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float64-array.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 263 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.apply.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var rApply = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ 3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 264 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.construct.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ 0);
var create = __webpack_require__(/*! ./_object-create */ 37);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var bind = __webpack_require__(/*! ./_bind */ 101);
var rConstruct = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 265 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.define-property.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(/*! ./_object-dp */ 7);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 266 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.delete-property.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16).f;
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 267 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.enumerate.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ 80)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 268 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var has = __webpack_require__(/*! ./_has */ 11);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 269 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 270 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var getProto = __webpack_require__(/*! ./_object-gpo */ 17);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 271 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.has.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 272 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.is-extensible.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 273 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.own-keys.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(/*! ./_own-keys */ 122) });


/***/ }),
/* 274 */
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 275 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(/*! ./_object-dp */ 7);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var has = __webpack_require__(/*! ./_has */ 11);
var $export = __webpack_require__(/*! ./_export */ 0);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 276 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
var setProto = __webpack_require__(/*! ./_set-proto */ 72);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 277 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.includes.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(/*! ./_export */ 0);
var $includes = __webpack_require__(/*! ./_array-includes */ 52)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 30)('includes');


/***/ }),
/* 278 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flat-map.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 123);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 86);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 30)('flatMap');


/***/ }),
/* 279 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flatten.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 123);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 86);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 30)('flatten');


/***/ }),
/* 280 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.at.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 78)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 281 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-start.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 124);
var userAgent = __webpack_require__(/*! ./_user-agent */ 93);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 282 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-end.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 124);
var userAgent = __webpack_require__(/*! ./_user-agent */ 93);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 283 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-left.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 44)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 284 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-right.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 44)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 285 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.match-all.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 23);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 55);
var getFlags = __webpack_require__(/*! ./_flags */ 57);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(/*! ./_iter-create */ 80)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 286 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 68)('asyncIterator');


/***/ }),
/* 287 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.observable.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 68)('observable');


/***/ }),
/* 288 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(/*! ./_export */ 0);
var ownKeys = __webpack_require__(/*! ./_own-keys */ 122);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var createProperty = __webpack_require__(/*! ./_create-property */ 84);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 289 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.values.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $values = __webpack_require__(/*! ./_object-to-array */ 125)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 290 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.entries.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $entries = __webpack_require__(/*! ./_object-to-array */ 125)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 291 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-getter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 62), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 292 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-setter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 62), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 293 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-getter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 62), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 294 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-setter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 62), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 295 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 126)('Map') });


/***/ }),
/* 296 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 126)('Set') });


/***/ }),
/* 297 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(/*! ./_set-collection-of */ 63)('Map');


/***/ }),
/* 298 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(/*! ./_set-collection-of */ 63)('Set');


/***/ }),
/* 299 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(/*! ./_set-collection-of */ 63)('WeakMap');


/***/ }),
/* 300 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(/*! ./_set-collection-of */ 63)('WeakSet');


/***/ }),
/* 301 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(/*! ./_set-collection-from */ 64)('Map');


/***/ }),
/* 302 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(/*! ./_set-collection-from */ 64)('Set');


/***/ }),
/* 303 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(/*! ./_set-collection-from */ 64)('WeakMap');


/***/ }),
/* 304 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(/*! ./_set-collection-from */ 64)('WeakSet');


/***/ }),
/* 305 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.global.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.G, { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 306 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.system.global.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'System', { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 307 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.error.is-error.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ 0);
var cof = __webpack_require__(/*! ./_cof */ 19);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 308 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.clamp.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 309 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.deg-per-rad.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 310 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.degrees.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 311 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.fscale.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var scale = __webpack_require__(/*! ./_math-scale */ 128);
var fround = __webpack_require__(/*! ./_math-fround */ 108);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 312 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.iaddh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 313 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.isubh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 314 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.imulh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 315 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.rad-per-deg.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 316 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.radians.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 317 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.scale.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { scale: __webpack_require__(/*! ./_math-scale */ 128) });


/***/ }),
/* 318 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.umulh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 319 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.signbit.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 320 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.finally.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 21);
var global = __webpack_require__(/*! ./_global */ 2);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 59);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 115);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 321 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.try.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ 0);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 91);
var perform = __webpack_require__(/*! ./_perform */ 114);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 322 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.define-metadata.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 323 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.delete-metadata.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 324 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 325 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ 118);
var from = __webpack_require__(/*! ./_array-from-iterable */ 127);
var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 326 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 327 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 328 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-metadata.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 329 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 330 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.metadata.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 331 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/es7.asap.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(/*! ./_export */ 0);
var microtask = __webpack_require__(/*! ./_microtask */ 90)();
var process = __webpack_require__(/*! ./_global */ 2).process;
var isNode = __webpack_require__(/*! ./_cof */ 19)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 332 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.observable.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(/*! ./_export */ 0);
var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 21);
var microtask = __webpack_require__(/*! ./_microtask */ 90)();
var OBSERVABLE = __webpack_require__(/*! ./_wks */ 5)('observable');
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var hide = __webpack_require__(/*! ./_hide */ 12);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(/*! ./_set-species */ 39)('Observable');


/***/ }),
/* 333 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/web.timers.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var userAgent = __webpack_require__(/*! ./_user-agent */ 93);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 334 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/web.immediate.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $task = __webpack_require__(/*! ./_task */ 89);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 335 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ 88);
var getKeys = __webpack_require__(/*! ./_object-keys */ 35);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 12);
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
var wks = __webpack_require__(/*! ./_wks */ 5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 336 */
/*!*********************************************************************************!*\
  !*** ./node_modules/babel-polyfill/node_modules/regenerator-runtime/runtime.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 47)))

/***/ }),
/* 337 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/fn/regexp/escape.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ 338);
module.exports = __webpack_require__(/*! ../../modules/_core */ 21).RegExp.escape;


/***/ }),
/* 338 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/core.regexp.escape.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ 0);
var $re = __webpack_require__(/*! ./_replacer */ 339)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 339 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_replacer.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 340 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pixi__ = __webpack_require__(/*! pixi */ 129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pixi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_pixi__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_p2__ = __webpack_require__(/*! p2 */ 130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_p2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_p2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser__ = __webpack_require__(/*! phaser */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__states_Boot__ = __webpack_require__(/*! ./states/Boot */ 345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__states_Splash__ = __webpack_require__(/*! ./states/Splash */ 346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__states_Game__ = __webpack_require__(/*! ./states/Game */ 348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config__ = __webpack_require__(/*! ./config */ 132);










class Game extends __WEBPACK_IMPORTED_MODULE_2_phaser___default.a.Game {
  constructor() {
    const docElement = document.documentElement;
    const width = docElement.clientWidth > __WEBPACK_IMPORTED_MODULE_6__config__["a" /* default */].gameWidth ? __WEBPACK_IMPORTED_MODULE_6__config__["a" /* default */].gameWidth : docElement.clientWidth;
    const height = docElement.clientHeight > __WEBPACK_IMPORTED_MODULE_6__config__["a" /* default */].gameHeight ? __WEBPACK_IMPORTED_MODULE_6__config__["a" /* default */].gameHeight : docElement.clientHeight;

    super(width, height, __WEBPACK_IMPORTED_MODULE_2_phaser___default.a.AUTO, "content", null);

    this.state.add("Boot", __WEBPACK_IMPORTED_MODULE_3__states_Boot__["a" /* default */], false);
    this.state.add("Splash", __WEBPACK_IMPORTED_MODULE_4__states_Splash__["a" /* default */], false);
    this.state.add("Game", __WEBPACK_IMPORTED_MODULE_5__states_Game__["a" /* default */], false);

    // With Cordova with need to wait that the device
    // Is ready so we will call the Boot state in another file

    if (!window.cordova) {
      this.state.start("Boot");
    }
  }
}

window.game = new Game();

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
      this.receivedEvent("deviceready");
      // When the device is ready, start Phaser Boot state.
      window.game.state.start("Boot");
    },

    receivedEvent: function (id) {
      console.log("Received Event: " + id);
    }
  };

  app.initialize();
}

/***/ }),
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */
/*!****************************!*\
  !*** ./src/states/Boot.js ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webfontloader__ = __webpack_require__(/*! webfontloader */ 131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webfontloader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_webfontloader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(/*! ../config */ 132);




/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
  init() {
    this.stage.backgroundColor = "#e1e2e1";
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload() {
    if (__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].webfonts.length) {
      __WEBPACK_IMPORTED_MODULE_1_webfontloader___default.a.load({
        google: {
          families: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].webfonts
        },
        active: this.fontsLoaded
      });
    }

    let text = this.add.text(this.world.centerX, this.world.centerY, "loading fonts", { font: "16px Arial", fill: "#dddddd", align: "center" });
    text.anchor.setTo(0.5, 0.5);

    this.load.image("loaderBg", "./assets/images/loader-bg.png");
    this.load.image("loaderBar", "./assets/images/loader-bar.png");
  }

  render() {
    if (__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].webfonts.length && this.fontsReady) {
      this.state.start("Splash");
    }
    if (!__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].webfonts.length) {
      this.state.start("Splash");
    }
  }

  fontsLoaded() {
    this.fontsReady = true;
  }
});

/***/ }),
/* 346 */
/*!******************************!*\
  !*** ./src/states/Splash.js ***!
  \******************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(/*! ../utils */ 347);



/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
  init() {}

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "loaderBg");
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "loaderBar");
    Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* centerGameObjects */])([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    //
    // load your assets
    //
    this.load.image("bg", "./assets/images/bg.png");
    this.load.image("header", "./assets/images/header.png");
    this.load.image("choiceBtn", "./assets/images/choiceBtn.png");

    this.load.json("story", "./ink/story.ink.json");
  }

  create() {
    this.state.start("Game");
  }
});

/***/ }),
/* 347 */
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: centerGameObjects */
/*! exports used: centerGameObjects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const centerGameObjects = objects => {
	objects.forEach(function (object) {
		object.anchor.setTo(0.5);
	});
};
/* harmony export (immutable) */ __webpack_exports__["a"] = centerGameObjects;


/***/ }),
/* 348 */
/*!****************************!*\
  !*** ./src/states/Game.js ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inkjs__ = __webpack_require__(/*! inkjs */ 349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_inkjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_inkjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser_list_view__ = __webpack_require__(/*! phaser-list-view */ 350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser_list_view___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_phaser_list_view__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sprites_MessageBox__ = __webpack_require__(/*! ../sprites/MessageBox */ 355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sprites_WaitingMessageBox__ = __webpack_require__(/*! ../sprites/WaitingMessageBox */ 356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sprites_BitmapSprite__ = __webpack_require__(/*! ../sprites/BitmapSprite */ 357);








/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
  init() {}

  preload() {}

  create() {
    this.story = new __WEBPACK_IMPORTED_MODULE_1_inkjs__["Story"](this.cache.getJSON("story"));

    const parent = this.world;
    const bounds = new __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Rectangle(0, 96, 640, 768);
    const options = {
      direction: "y",
      overflow: 100,
      padding: 6,
      searchForClicks: true
    };

    this.color = "";
    this.colorbox = "";
    this.sprite_anchor = 0;
    this.colorClock = "";
    this.x = 0;
    this.y = 0;
    this.tag_state = "";

    this.state = {
      messageColor: "",
      messageTextColor: "",
      messageAnchor: "",
      messageTimeColor: "",
      messageX: 0,
      messageY: 0,
      messageTag: ""
    };

    this.listView = new __WEBPACK_IMPORTED_MODULE_2_phaser_list_view__["ListView"](this, parent, bounds, options);

    //Empezamos la historia
    this.continueStory();

    //add header
    this.add.sprite(0, 0, "header");
    this.choicesGroup = this.add.group();
    let bottom = this.add.sprite(640 / 2, 0, "header");
    bottom.y = 960 - bottom.height / 2;
    bottom.angle = 180;
    bottom.anchor.set(0.5);
  }

  spawnElements(elements) {
    var last = elements.texts[elements.texts.length - 1].delay;

    elements.texts.forEach((e, i) => {
      this.time.events.add(e.delay, this.addTextToView, this, {
        text: e.text,
        delay: e.delay,
        tags: e.tags
      });
    }, this);

    console.log();

    this.time.events.add(last + 1000, this.spawnChoices, this, elements);
  }

  spawnChoices(elements) {
    var items = elements.choices.length * 64;
    var posY = 864 - items;

    elements.choices.forEach((e, i) => {
      let choiceBtn = this.add.sprite(0, posY + i * 64, "choiceBtn");
      choiceBtn.inputEnabled = true;

      let txt2 = this.game.add.text(Math.floor(choiceBtn.x + choiceBtn.width / 2), 64 / 2, e.text, {
        font: "26px Roboto",
        fill: "#fff",
        align: "center",
        textAlign: "center",
        wordWrap: true,
        wordWrapWidth: 640
      });
      txt2.anchor.set(0.5);

      choiceBtn.addChild(txt2);

      choiceBtn.events.onInputDown.add(() => {
        this.story.ChooseChoiceIndex(e.index);
        this.choicesGroup.removeAll();
        this.continueStory();
        this.add.tween(groupView.position).to({ y: groupView.position.y + items }, 1000, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Easing.Cubic.InOut, true);
      }, this);

      this.choicesGroup.add(choiceBtn);
    }, this);

    this.add.tween(this.choicesGroup).from({ y: 400 }, 1000, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Easing.Cubic.InOut, true);

    let groupView = this.listView.grp;
    this.add.tween(groupView.position).to({ y: groupView.position.y - items }, 1000, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Easing.Cubic.InOut, true);

    // ->
  }

  addTextToViewCharger(delay) {
    let box = new __WEBPACK_IMPORTED_MODULE_4__sprites_WaitingMessageBox__["a" /* default */]({ game: this.game, x: 0, y: 0 });
    box.name = "waiting";
    //wating == name -> delete -> delete
    this.listView.add(box);
    this.game.time.events.add(delay, this.remove, this);
  }

  addTextToView(data) {
    if (data.tags != undefined) {
      switch (data.tags[0]) {
        case "rigth":
          this.color = "#fcfcfc";
          this.colorbox = "#111111";
          this.colorClock = "#999";
          this.sprite_anchor = 1;
          this.tag_state = "rigth";
          this.x = 640;
          break;
        case "left":
          this.color = "#000";
          this.colorbox = "#fcfcfc";
          this.colorClock = "#df78ef";
          this.sprite_anchor = 0;
          this.tag_state = "left";
          this.x = 10;
          break;
      }
    }

    this.left_style = {
      font: "26px Open Sans",
      fill: this.color,
      align: "left",
      wordWrap: true,
      wordWrapWidth: 470
    };

    this.left_style2 = {
      font: "16px Roboto",
      fill: "#f0f0f0",
      align: "left",
      wordWrap: true,
      wordWrapWidth: 470
    };

    let text_span = 0;
    let time_span = 32;
    let txt = this.game.add.text(text_span, 0, data.text, this.left_style);

    let bmd = this.bmdTexture(txt.height + time_span, data.text, {
      time: "20:23",
      posy: txt.height - time_span,
      state: this.tag_state
    });

    let messageBox = new __WEBPACK_IMPORTED_MODULE_5__sprites_BitmapSprite__["a" /* default */]({
      game: this.game,
      x: this.x,
      y: 0,
      asset: bmd
    });

    messageBox.anchor.x = this.sprite_anchor;
    messageBox.scale.y = 0;
    messageBox.scale.x = 0;

    this.add.tween(messageBox.scale).to({ y: 1, x: 1 }, 300, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Easing.Cubic.InOut, true);

    this.listView.add(messageBox);
    this.moveToLast(txt.height + time_span);

    txt.destroy();
  }

  wrapText(ctx, txt, x, y, maxWidth, lineHeight) {
    var words = txt.split(" ");
    var line = "";

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    ctx.fillText(line, x, y);
    console.log(y);
  }

  bmdTexture(height, text, clock) {
    let rectX = 20;
    let rectY = 0;
    let rectWidth = 500;
    let rectHeight = height;
    let cornerRadius = 20;
    let span = 5;
    let shadow_span = 10;

    let bmd = this.add.bitmapData(500 + shadow_span + 20, height + shadow_span);

    bmd.ctx.lineJoin = "round";
    bmd.ctx.lineWidth = cornerRadius;

    //Blur para crear un efecto de sombreado
    bmd.ctx.fillStyle = this.color;
    bmd.ctx.strokeStyle = this.color;
    bmd.ctx.save();
    bmd.ctx.shadowColor = "#888888";
    bmd.ctx.shadowOffsetY = 2;
    bmd.ctx.shadowBlur = 8;
    if (this.tag_state === "left") {
      bmd.ctx.moveTo(rectX - 20, rectY + 20);
      bmd.ctx.lineTo(105, -25);
      bmd.ctx.lineTo(25, 36);
    }
    bmd.ctx.strokeRect(rectX + cornerRadius / 2, rectY + cornerRadius / 2, rectWidth - cornerRadius, rectHeight - cornerRadius);
    bmd.ctx.restore();

    bmd.ctx.rect(rectX + cornerRadius / 2, rectY + cornerRadius / 2, rectWidth - cornerRadius, rectHeight - cornerRadius);
    bmd.ctx.fill();

    bmd.ctx.font = "26px Open Sans";
    bmd.ctx.fillStyle = this.colorbox;

    this.wrapText(bmd.ctx, text, rectX + 32, rectY + 26 + 16, 470, 26 * 1.42857);

    //Time Omagatoki
    bmd.ctx.font = "16px Roboto";
    bmd.ctx.fillStyle = this.colorClock;

    let clockPos = this.tag_state === "rigth" ? rectWidth - 100 : rectX + 32;
    let addText = this.tag_state === "left" ? "" : "✓✓";

    this.wrapText(bmd.ctx, addText, clockPos - 26, clock.posy + 32, 470, 26 * 1.42857);
    this.wrapText(bmd.ctx, clock.time, clockPos, clock.posy + 32, 470, 26 * 1.42857);

    return bmd;
  }

  moveToLast(height) {
    let span = 0;
    let start = this.listView.position;
    let dist = this.listView.length - 768 - start;

    if (dist < 0) {
      dist = 0;
    } else {
      span += height + 32;
    }

    this.listView.tweenToPosition(-(start + dist) - span, 0.3);
  }

  continueStory() {
    let elements = {
      texts: [],
      choices: [],
      tags: []
    };

    let i = 1;

    while (this.story.canContinue) {
      let text = this.story.Continue();

      elements.texts.push({
        text: text,
        delay: i * 1000 + text.length * 4,
        tags: this.story.currentTags
      });

      if (!this.story.canContinue) {
        elements.choices = this.story.currentChoices;
        this.spawnElements(elements);
      }

      i++;
    }
  }
});

/***/ }),
/* 349 */
/*!***********************************************!*\
  !*** ./node_modules/inkjs/dist/ink-es2015.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! exports used: Story */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports) :
	typeof define === 'function' && define.amd ? define('inkjs', ['exports'], factory) :
	(factory((global.inkjs = global.inkjs || {})));
}(this, (function (exports) { 'use strict';

	class Path$1{
		constructor(/*polymorphic constructor*/){
			this._isRelative;
			this._components = [];
			
			if (typeof arguments[0] == 'string'){
				this.componentsString = arguments[0];
			}
			else if (arguments[0] instanceof Component && arguments[1] instanceof Path$1){
				this._components.push(arguments[0]);
				this._components = this._components.concat(arguments[1]);
			}
			else if (arguments[0] instanceof Array){
				this._components = this._components.concat(arguments[0]);
				this._isRelative = !!arguments[1];
			}
		}
		get isRelative(){
			return this._isRelative;
		}
		get components(){
			return this._components;
		}
		get head(){
			if (this.components.length > 0) {
				return this.components[0];
			} else {
				return null;
			}
		}
		get tail(){
			if (this.components.length >= 2) {
				var tailComps = this.components.slice(1, this.components.length);//careful, the original code uses length-1 here. This is because the second argument of List.GetRange is a number of elements to extract, wherease Array.slice uses an index
				return new Path$1(tailComps);
			}
			else {
				return Path$1.self;
			}
		}
		get length(){
			return this.components.length;
		}
		get lastComponent(){
			if (this.components.length > 0) {
				return this.components[this.components.length - 1];
			} else {
				return null;
			}
		}
		get containsNamedComponent(){
			for (var i = 0, l = this.components.length; i < l; i++){
				if (!this.components[i].isIndex){
					return true;
				}
			}
			return false;
		}
		static get self(){
			var path = new Path$1();
			path._isRelative = true;
			return path;
		}
		
		PathByAppendingPath(pathToAppend){
			var p = new Path$1();

			var upwardMoves = 0;
			for (var i = 0; i < pathToAppend.components.length; ++i) {
				if (pathToAppend.components[i].isParent) {
					upwardMoves++;
				} else {
					break;
				}
			}

			for (var i = 0; i < this.components.length - upwardMoves; ++i) {
				p.components.push(this.components[i]);
			}

			for(var i = upwardMoves; i < pathToAppend.components.length; ++i) {
				p.components.push(pathToAppend.components[i]);
			}

			return p;
		}
		get componentsString(){
			var compsStr = this.components.join(".");
			if (this.isRelative)
				return "." + compsStr;
			else
				return compsStr;
		}
		set componentsString(value){
			this.components.length = 0;

			var componentsStr = value;
			
			if (componentsStr == null || componentsStr == '') return;

			// When components start with ".", it indicates a relative path, e.g.
			//   .^.^.hello.5
			// is equivalent to file system style path:
			//  ../../hello/5
			if (componentsStr[0] == '.') {
				this._isRelative = true;
				componentsStr = componentsStr.substring(1);
			}

			var componentStrings = componentsStr.split('.');
			componentStrings.forEach(str => {
				//we need to distinguish between named components that start with a number, eg "42somewhere", and indexed components
				//the normal parseInt won't do for the detection because it's too relaxed.
				//see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
				if (/^(\-|\+)?([0-9]+|Infinity)$/.test(str)){
					this.components.push(new Component(parseInt(str)));
				}
				else{
					this.components.push(new Component(str));
				}
			});
		}
		toString(){
			return this.componentsString;
		}
		Equals(otherPath){
			if (otherPath == null)
				return false;

			if (otherPath.components.length != this.components.length)
				return false;

			if (otherPath.isRelative != this.isRelative)
				return false;
			
			//the original code uses SequenceEqual here, so we need to iterate over the components manually.
			for (var i = 0, l = otherPath.components.length; i < l; i++){
				//it's not quite clear whether this test should use Equals or a simple == operator, see https://github.com/y-lohse/inkjs/issues/22
				if (!otherPath.components[i].Equals(this.components[i])) return false;
			}

			return true;
		}
	}

	class Component{
		constructor(indexOrName){
			if (typeof indexOrName == 'string'){
				this._index = -1;
				this._name = indexOrName;
			}
			else{
				this._index = parseInt(indexOrName);
				this._name = null;
			}
		}
		get index(){
			return this._index;
		}
		get name(){
			return this._name;
		}
		get isIndex(){
			return this.index >= 0;
		}
		get isParent(){
			return this.name == Path$1.parentId;
		}
		
		static ToParent(){
			return new Component(Path$1.parentId);
		}
		toString(){
			if (this.isIndex) {
				return this.index.toString();
			} else {
				return this.name;
			}
		}
		Equals(otherComp){
			if (otherComp != null && otherComp.isIndex == this.isIndex) {
				if (this.isIndex) {
					return this.index == otherComp.index;   
				} else {
					return this.name == otherComp.name;
				}
			}

			return false;
		}
	}

	Path$1.parentId = "^";
	Path$1.Component = Component;

	class Object$1{
		constructor(){
			this.parent = null;
			this._path = null;
		}
		get path(){
			if (this._path == null) {

				if (this.parent == null) {
					this._path = new Path$1();
				} else {
					// Maintain a Stack so that the order of the components
					// is reversed when they're added to the Path.
					// We're iterating up the hierarchy from the leaves/children to the root.
					var comps = [];

					var child = this;
	//				Container container = child.parent as Container;
					var container = child.parent;

					while (container instanceof Container) {

						var namedChild = child;
						if (namedChild.name && namedChild.hasValidName) {
							comps.unshift(new Path$1.Component(namedChild.name));
						} else {
							comps.unshift(new Path$1.Component(container.content.indexOf(child)));
						}

						child = container;
	//					container = container.parent as Container;
						container = container.parent;
					}

					this._path = new Path$1(comps);
				}

			}

			return this._path;
		}
		get rootContentContainer(){
			var ancestor = this;
			while (ancestor.parent) {
				ancestor = ancestor.parent;
			}
			return ancestor;
		}
		
		ResolvePath(path){
			if (path.isRelative) {
				var nearestContainer = this;

				if (nearestContainer instanceof Container === false) {
					if (this.parent == null) console.warn("Can't resolve relative path because we don't have a parent");
					
					nearestContainer = this.parent;
					if (nearestContainer.constructor.name !== 'Container') console.warn("Expected parent to be a container");
					
					//Debug.Assert (path.components [0].isParent);
					path = path.tail;
				}
				
				return nearestContainer.ContentAtPath(path);
			} else {
				return this.rootContentContainer.ContentAtPath(path);
			}
		}
		ConvertPathToRelative(globalPath){
			var ownPath = this.path;

			var minPathLength = Math.min(globalPath.components.length, ownPath.components.length);
			var lastSharedPathCompIndex = -1;

			for (var i = 0; i < minPathLength; ++i) {
				var ownComp = ownPath.components[i];
				var otherComp = globalPath.components[i];

				if (ownComp.Equals(otherComp)) {
					lastSharedPathCompIndex = i;
				} else {
					break;
				}
			}

			// No shared path components, so just use global path
			if (lastSharedPathCompIndex == -1)
				return globalPath;

			var numUpwardsMoves = (ownPath.components.length-1) - lastSharedPathCompIndex;

			var newPathComps = [];

			for(var up = 0; up < numUpwardsMoves; ++up)
				newPathComps.push(Path$1.Component.ToParent());

			for (var down = lastSharedPathCompIndex + 1; down < globalPath.components.length; ++down)
				newPathComps.push(globalPath.components[down]);

			var relativePath = new Path$1(newPathComps, true);
			return relativePath;
		}
		CompactPathString(otherPath){
			var globalPathStr = null;
			var relativePathStr = null;
			
			if (otherPath.isRelative) {
				relativePathStr = otherPath.componentsString;
				globalPathStr = this.path.PathByAppendingPath(otherPath).componentsString;
			} 
			else {
				var relativePath = this.ConvertPathToRelative(otherPath);
				relativePathStr = relativePath.componentsString;
				globalPathStr = otherPath.componentsString;
			}

			if (relativePathStr.Length < globalPathStr.Length) 
				return relativePathStr;
			else
				return globalPathStr;
		}	
		Copy(){
			throw "Not Implemented";
		}
		//SetCHild works slightly diferently in the js implementation. SInce we can't pass an objets property by reference, we instead pass the object and the property string.
		SetChild(obj, prop, value){
			if (obj[prop])
				obj[prop] = null;

			obj[prop] = value;

			if( obj[prop] )
				obj[prop].parent = this;
		}
	}

	class StringBuilder{
		constructor(str){
			str = (typeof str !== 'undefined') ? str.toString() : '';
			this._string = str;
		}
		get Length(){
			return this._string.length;
		}
		Append(str){
			this._string += str;
		}
		AppendLine(str){
			if (typeof str !== 'undefined') this.Append(str);
			this._string += "\n";
		}
		AppendFormat(format){
			//taken from http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
			var args = Array.prototype.slice.call(arguments, 1);
			return format.replace(/{(\d+)}/g, function(match, number){
				return typeof args[number] != 'undefined' ? args[number] : match;
			});
		}
		toString(){
			return this._string;
		}
	}

	class InkListItem{
		constructor(fullNameOrOriginName, itemName){
			if (itemName !== undefined){
				this.originName = fullNameOrOriginName;
				this.itemName = itemName;
			}
			else{
				var nameParts = fullNameOrOriginName.toString().split('.');
	            this.originName = nameParts[0];
	            this.itemName = nameParts[1];
			}
		}
		static Null(){
			return new InkListItem(null, null);
		}
		isNull(){
			return this.originName == null && this.itemName == null;
		}
		get fullName(){
			return ((this.originName !== null) ? this.originName : "?") + "." + this.itemName;
		}
		toString(){
			return this.fullname;
		}
		Equals(obj){
			if (obj instanceof InkListItem) {
	//			var otherItem = (InkListItem)obj;
				var otherItem = obj;
				return otherItem.itemName   == this.itemName 
					&& otherItem.originName == this.originName;
			}

			return false;
		}
		//GetHashCode not implemented
		toString(){
			//WARNING: experimental. InkListItem are structs and are used as keys inside hashes. In js, we can't use an object as a key, as the key needs to be a string. C# gets around that with the internal GetHashCode, and the js equivalent to that is toString. So here, toString acts as C#'s GetHashCode
			var originCode = '0';
			var itemCode = (this.itemName) ? this.itemName.toString() : 'null';
			if (this.originName != null)
				originCode = this.originName.toString();
			
			return originCode + itemCode;
		}
	}

	//in C#, rawlists are based on dictionnary; the equivalent of a dictionnary in js is Object, but we can't use that or it will conflate dictionnary items and InkList class properties.
	//instead InkList-js has a special _values property wich contains the actual "Dictionnary", and a few Dictionnary methods are re-implemented on InkList. This also means directly iterating over the InkList won't work as expected. Maybe we can return a proxy if that's required.
	//@TODO: actually we could use a Map for this.
	class InkList {
		constructor(polymorphicArgument, originStory){
			this._keys = {};
			this._values = {};
			this.origins = null;
			this._originNames = null;
			
			//polymorphioc constructor
			if (polymorphicArgument){
				if (polymorphicArgument instanceof InkList){
					var otherList = polymorphicArgument;
					otherList.forEach((kv)=>{
						this.Add(kv.Key, kv.Value);
					});
					
					this._originNames = otherList._originNames;
				}
				else if (typeof polymorphicArgument === 'string'){
					this.SetInitialOriginName(polymorphicArgument);
					
					var def = null;
					if (def = originStory.listDefinitions.TryGetDefinition(polymorphicArgument, def)){
						this.origins = [def];
					}
					else{
						throw new Error("InkList origin could not be found in story when constructing new list: " + singleOriginListName);
					}
				}
				else if (polymorphicArgument.hasOwnProperty('Key') && polymorphicArgument.hasOwnProperty('Value')){
					var singleElement = polymorphicArgument;
					this.Add(singleElement.Key, singleElement.Value);
				}
			}
		}
		forEach(fn){
			for (var key in this._values){
				fn({
					Key: this._keys[key],
					Value: this._values[key]
				});
			}
		}
		AddItem(itemOrItemName){
			if (itemOrItemName instanceof InkListItem){
				var item = itemOrItemName;
				
				if (item.originName == null) {
						this.AddItem(item.itemName);
						return;
				}

				this.origins.forEach((origin)=>{
					if (origin.name == item.originName) {
							var intVal;
							intVal = origin.TryGetValueForItem(item, intVal);
							if (intVal !== undefined) {
									this.Add(item, intVal);
									return;
							} else {
									throw "Could not add the item " + item + " to this list because it doesn't exist in the original list definition in ink.";
							}
					}
				});

				throw "Failed to add item to list because the item was from a new list definition that wasn't previously known to this list. Only items from previously known lists can be used, so that the int value can be found.";
			}
			else{
				var itemName = itemOrItemName;
				
				var foundListDef = null;

				this.origins.forEach((origin)=>{
					if (origin.ContainsItemWithName(itemName)) {
							if (foundListDef != null) {
									throw "Could not add the item " + itemName + " to this list because it could come from either " + origin.name + " or " + foundListDef.name;
							} else {
									foundListDef = origin;
							}
					}
				});

				if (foundListDef == null)
						throw "Could not add the item " + itemName + " to this list because it isn't known to any list definitions previously associated with this list.";

				var item = new InkListItem(foundListDef.name, itemName);
				var itemVal = foundListDef.ValueForItem(item);
				this.Add(item, itemVal);
			}
		}
		ContainsItemNamed(itemName){
			var contains = false;
			this.forEach(itemWithValue => {
					if (itemWithValue.Key.itemName == itemName) contains = true;
			});
			return contains;
		}
		ContainsKey(key){
			return key in this._values;
		}
		Add(key, value){
			this._keys[key] = key;
			this._values[key] = value;
		}
		Remove(key){
			delete this._values[key];
			delete this._keys[key];
		}
		get Count(){
			return Object.keys(this._values).length;
		}
		get originOfMaxItem(){
			if (this.origins == null) return null;

			var maxOriginName = this.maxItem.Key.originName;
			var result = null;
			this.origins.every(function(origin){
				if (origin.name == maxOriginName){
					result = origin;
					return false;
				}
				else return true;
			});
			
			return result;
		}
		get originNames(){
			if (this.Count > 0) {
				if (this._originNames == null && this.Count > 0)
					this._originNames = [];
				else
					this._originNames.length = 0;

				this.forEach((itemAndValue)=>{
					this._originNames.push(itemAndValue.Key.originName);
				});
			}

			return this._originNames;
		}
		SetInitialOriginName(initialOriginName){
			this._originNames = [initialOriginName];
		}
		SetInitialOriginNames(initialOriginNames){
			if (initialOriginNames == null)
					this._originNames = null;
			else
					this._originNames = initialOriginNames.slice();//store a copy
		}
		get maxItem(){
			var max = {
				Key: null,
				Value: null
			};
			this.forEach(function(kv){
				if (max.Key === null || kv.Value > max.Value)
					max = kv;
			});
			
			return max;
		}
		get minItem(){
			var min = {
				Key: null,
				Value: null
			};
			this.forEach(function(kv){
				if (min.Key === null || kv.Value < min.Value)
					min = kv;
			});
			
			return min;
		}
		get inverse(){
			var list = new InkList();
			if (this.origins != null) {
				this.origins.forEach((origin)=>{
					origin.items.forEach((itemAndValue)=>{
						if (!this.ContainsKey(itemAndValue.Key))
							list.Add(itemAndValue.Key, itemAndValue.Value);
					});
				});
			}
			return list;
		}
		get all(){
			var list = new InkList();
			if (this.origins != null) {
				this.origins.forEach(function(origin){
					origin.items.forEach(function(itemAndValue){
						list.Add(itemAndValue.Key, itemAndValue.Value);
					});
				});
			}
			return list;
		}
		Union(otherList){
			var union = new InkList(this);
			otherList.forEach(function(kv){
				union.Add(kv.Key, kv.Value);
			});
			return union;
		}
		Intersect(otherList){
			var intersection = new InkList();
			this.forEach(function(kv){
				if (otherList.ContainsKey(kv.Key))
					intersection.Add(kv.Key, kv.Value);
			});
			return intersection;
		}
		Without(listToRemove){
			var result = new InkList(this);
			listToRemove.forEach(function(kv){
				result.Remove(kv.Key);
			});
			return result;
		}
		Contains(otherList){
			var contains = true;
			otherList.forEach((kv)=>{
				if (!this.ContainsKey(kv.Key)) contains = false;
			});
			return contains;
		}
		GreaterThan(otherList){
			if (this.Count == 0) return false;
			if (otherList.Count == 0) return true;

			// All greater
			return this.minItem.Value > otherList.maxItem.Value;
		}
		GreaterThanOrEquals(otherList){
			if (this.Count == 0) return false;
			if (otherList.Count == 0) return true;

			return this.minItem.Value >= otherList.minItem.Value
				&& this.maxItem.Value >= otherList.maxItem.Value;
		}
		LessThan(otherList){
			if (otherList.Count == 0) return false;
			if (this.Count == 0) return true;

			return this.maxItem.Value < otherList.minItem.Value;
		}
		LessThanOrEquals(otherList){
			if (otherList.Count == 0) return false;
			if (this.Count == 0) return true;

			return this.maxItem.Value <= otherList.maxItem.Value
				&& this.minItem.Value <= otherList.minItem.Value;
		}
		MaxAsList(){
			if (this.Count > 0)
				return new InkList(this.maxItem);
			else
				return new InkList();
		}
		MinAsList(){
			if (this.Count > 0)
				return new InkList(this.minItem);
			else
				return new InkList();
		}
		Equals(other){
	//		var otherInkList = other as InkList;
			var otherInkList = other;
			if (otherInkList instanceof InkList === false) return false;
			if (otherInkList.Count != this.Count) return false;

			var equals = true;
			this.forEach(function(kv){
				if (!otherInkList.ContainsKey(kv.Key))
					equals = false;
			});

			return equals;
		}
		//GetHashCode not implemented
		toString(){
			var ordered = [];
			this.forEach(function(kv){
				ordered.push(kv);
			});
			ordered = ordered.sort((a, b) => {
				return (a.Value === b.Value) ? 0 : ((a.Value > b.Value) ? 1 : -1);
			});

			var sb = new StringBuilder();
			for (var i = 0; i < ordered.length; i++) {
				if (i > 0)
					sb.Append(", ");

				var item = ordered[i].Key;
				sb.Append(item.itemName);
			}

			return sb.toString();
		}
		//casting a InkList to a Number, for somereason, actually gives a number. This messes up the type detection when creating a Value from a InkList. Returning NaN here prevents that.
		valueOf(){
			return NaN;
		}
	}

	var ValueType = {
		// Used in coersion
		Int: 0,
		Float: 1,
		List: 2,
		String: 3,

		// Not used for coersion described above
		DivertTarget: 4,
		VariablePointer: 5
	};

	class AbstractValue extends Object$1{
		constructor(val){
			super();
			this._valueType;
			this._isTruthy;
			this._valueObject;
		}
		get valueType(){
			return this._valueType;
		}
		get isTruthy(){
			return this._isTruthy;
		}
		get valueObject(){
			return this._valueObject;
		}
		
		Cast(newType){
			throw "Trying to casting an AbstractValue";
		}
		static Create(val){
			// Implicitly convert bools into ints
			if (typeof val === 'boolean'){
				var b = !!val;
				val = (b) ? 1 : 0;
			}

			if (Number.isInteger(Number(val))) {
				return new IntValue(val);
			} else if (!isNaN(val)) {
				return new FloatValue(val);
			} else if (typeof val === 'string') {
				return new StringValue(val);
			} else if (val instanceof Path$1) {
				return new DivertTargetValue(val);
			} else if (val instanceof InkList) {
				return new ListValue(val);
			}
		
			return null;
		}
		Copy(val){
			return AbstractValue.Create(val);
		}
	}

	class Value extends AbstractValue{
		constructor(val){
			super();
			this.value = val;
		}
		get value(){
			return this._value;
		}
		set value(value){
			this._value = value;
		}
		get valueObject(){
			return this.value;
		}
		toString(){
			return this.value.toString();
		}
	}

	class IntValue extends Value{
		constructor(val){
			super(val || 0);
			this._valueType = ValueType.Int;
		}
		get isTruthy(){
			return this.value != 0;
		}
		get valueType(){
			return ValueType.Int;
		}
		
		Cast(newType){
			if (newType == this.valueType) {
				return this;
			}

			if (newType == ValueType.Float) {
				return new FloatValue(parseFloat(this.value));
			}

			if (newType == ValueType.String) {
				return new StringValue("" + this.value);
			}

			throw "Unexpected type cast of Value to new ValueType";
		}
	}

	class FloatValue extends Value{
		constructor(val){
			super(val || 0.0);
			this._valueType = ValueType.Float;
		}
		get isTruthy(){
			return this._value != 0.0;
		}
		get valueType(){
			return ValueType.Float;
		}
		
		Cast(newType){
			if (newType == this.valueType) {
				return this;
			}

			if (newType == ValueType.Int) {
				return new IntValue(parseInt(this.value));
			}

			if (newType == ValueType.String) {
				return new StringValue("" + this.value);
			}

			throw "Unexpected type cast of Value to new ValueType";
		}
	}

	class StringValue extends Value{
		constructor(val){
			super(val || '');
			this._valueType = ValueType.String;
			
			this._isNewline = (this.value == "\n");
			this._isInlineWhitespace = true;
			
			this.value.split().every(c => {
				if (c != ' ' && c != '\t'){
					this._isInlineWhitespace = false;
					return false;
				}
				
				return true;
			});
		}
		get valueType(){
			return ValueType.String;
		}
		get isTruthy(){
			return this.value.length > 0;
		}
		get isNewline(){
			return this._isNewline;
		}
		get isInlineWhitespace(){
			return this._isInlineWhitespace;
		}
		get isNonWhitespace(){
			return !this.isNewline && !this.isInlineWhitespace;
		}
		
		Cast(newType){
			if (newType == this.valueType) {
				return this;
			}

			if (newType == ValueType.Int) {

				var parsedInt;
				if (parsedInt = parseInt(value)) {
					return new IntValue(parsedInt);
				} else {
					return null;
				}
			}

			if (newType == ValueType.Float) {
				var parsedFloat;
				if (parsedFloat = parsedFloat(value)) {
					return new FloatValue(parsedFloat);
				} else {
					return null;
				}
			}

			throw "Unexpected type cast of Value to new ValueType";
		}
	}

	class DivertTargetValue extends Value{
		constructor(targetPath){
			super(targetPath);
			
			this._valueType = ValueType.DivertTarget;
		}
		get targetPath(){
			return this.value;
		}
		set targetPath(value){
			this.value = value;
		}
		get isTruthy(){
			throw "Shouldn't be checking the truthiness of a divert target";
		}
		
		Cast(newType){
			if (newType == this.valueType)
				return this;

			throw "Unexpected type cast of Value to new ValueType";
		}
		toString(){
			return "DivertTargetValue(" + this.targetPath + ")";
		}
	}

	class VariablePointerValue extends Value{
		constructor(variableName, contextIndex){
			super(variableName);
			
			this._valueType = ValueType.VariablePointer;
			this.contextIndex = (typeof contextIndex !== 'undefined') ? contextIndex : -1;
		}
		get variableName(){
			return this.value;
		}
		set variableName(value){
			this.value = value;
		}
		get isTruthy(){
			throw "Shouldn't be checking the truthiness of a variable pointer";
		}
		
		Cast(newType){
			if (newType == this.valueType)
				return this;

			throw "Unexpected type cast of Value to new ValueType";
		}
		toString(){
			return "VariablePointerValue(" + this.variableName + ")";
		}
		Copy(){
			return new VariablePointerValue(this.variableName, this.contextIndex);
		}
	}

	class ListValue extends Value{
		get valueType(){
			return ValueType.List;
		}
		get isTruthy(){
			var isTruthy = false;
			this.value.forEach(function(kv){
				var listItemIntValue = kv.Value;
				if (listItemIntValue != 0)
					isTruthy = true; 
			});
			return isTruthy;
		}
		Cast(newType){
			 if (newType == ValueType.Int) {
				var max = this.value.maxItem;
				if( max.Key.isNull )
					return new IntValue(0);
				else
					return new IntValue(max.Value);
			}

			else if (newType == ValueType.Float) {
				var max = this.value.maxItem;
				if (max.Key.isNull)
					return new FloatValue(0.0);
				else
					return new FloatValue(parseFloat(max.Value));
			}

			else if (newType == ValueType.String) {
				var max = value.maxItem;
				if (max.Key.isNull)
					return new StringValue("");
				else {
					return new StringValue(max.Key.toString());
				}
			}

			if (newType == this.valueType)
				return this;

			throw "Unexpected type cast of Value to new ValueType";
		}
		constructor(listOrSingleItem, singleValue){
			super(null);
			
			this._valueType = ValueType.List;
			
			if (listOrSingleItem instanceof InkList){
				this.value = new InkList(listOrSingleItem);
			}
			else if (listOrSingleItem !== undefined && singleValue !== undefined){
				this.value = new InkList({
					Key: listOrSingleItem,
					Value: singleValue
				});
			}
			else{
				this.value = new InkList();
			}
		}
		static RetainListOriginsForAssignment(oldValue, newValue){
	//		var oldList = oldValue as ListValue;
			var oldList = oldValue;
	//		var newList = newValue as ListValue;
			var newList = newValue;

			// When assigning the emtpy list, try to retain any initial origin names
			if (oldList instanceof ListValue && newList instanceof ListValue && newList.value.Count == 0)
				newList.value.SetInitialOriginNames(oldList.value.originNames);
		}
	}

	class StoryException extends Error{
		constructor(message) {
			super(message);
			this.message = message;
			this.name = 'StoryException';
		}
	}

	class Container extends Object$1{//also implements INamedContent. Not sure how to do it cleanly in JS.
		constructor(){
			super();
			this.name = '';
			
			this._content = [];
			this.namedContent = {};
			
			this.visitsShouldBeCounted = false;
			this.turnIndexShouldBeCounted = false;
			this.countingAtStartOnly = false;
			
			this.CountFlags = {
				Visits: 1,
				Turns: 2,
				CountStartOnly: 4
			};
			
			this._pathToFirstLeafContent = null;
		}
		get hasValidName(){
			return this.name != null && this.name.length > 0;
		}
		get content(){
			return this._content;
		}
		set content(value){
			this.AddContent(value);
		}
		get namedOnlyContent(){
			var namedOnlyContentDict = {};
			
			for (var key in this.namedContent){
				namedOnlyContentDict[key] = this.namedContent[key];
			}

			this.content.forEach(c => {
	//			var named = c as INamedContent;
				var named = c;
				if (named.name && named.hasValidName) {
					delete namedOnlyContentDict[named.name];
				}
			});

			if (Object.keys(namedOnlyContentDict).length == 0)
				namedOnlyContentDict = null;

			return namedOnlyContentDict;
		}
		set namedOnlyContent(value){
			var existingNamedOnly = this.namedOnlyContent;
			if (existingNamedOnly != null) {
				for (var key in existingNamedOnly){
					delete this.namedContent[key];
				}
			}

			if (value == null)
				return;

			for (var key in value){
	//			var named = kvPair.Value as INamedContent;
				var named = value[key];
				if( named.name && typeof named.hasValidName !== 'undefined' )
					this.AddToNamedContentOnly(named);
			}
		}
		get countFlags(){
			var flags = 0;
			if (this.visitsShouldBeCounted)    flags |= this.CountFlags.Visits;
			if (this.turnIndexShouldBeCounted) flags |= this.CountFlags.Turns;
			if (this.countingAtStartOnly)      flags |= this.CountFlags.CountStartOnly;

			// If we're only storing CountStartOnly, it serves no purpose,
			// since it's dependent on the other two to be used at all.
			// (e.g. for setting the fact that *if* a gather or choice's
			// content is counted, then is should only be counter at the start)
			// So this is just an optimisation for storage.
			if (flags == this.CountFlags.CountStartOnly) {
				flags = 0;
			}

			return flags;
		}
		set countFlags(value){
			 var flag = value;
			if ((flag & this.CountFlags.Visits) > 0) this.visitsShouldBeCounted = true;
			if ((flag & this.CountFlags.Turns) > 0)  this.turnIndexShouldBeCounted = true;
			if ((flag & this.CountFlags.CountStartOnly) > 0) this.countingAtStartOnly = true;
		}
		get pathToFirstLeafContent(){
			if( this._pathToFirstLeafContent == null )
				this._pathToFirstLeafContent = this.path.PathByAppendingPath(this.internalPathToFirstLeafContent);

			return this._pathToFirstLeafContent;
		}
		get internalPathToFirstLeafContent(){
			var path = new Path ();
			var container = this;
			while (container instanceof Container) {
				if (container.content.length > 0) {
					path.components.push(new Path.Component(0));
	//				container = container.content [0] as Container;
					container = container.content[0];
				}
			}
			return path;
		}
		
		AddContent(contentObj){
			if (contentObj instanceof Array){
				contentObj.forEach(c => {
					this.AddContent(c);
				});
			}
			else{
				this._content.push(contentObj);
				
				if (contentObj.parent) {
	                throw "content is already in " + contentObj.parent;
	            }
				
				contentObj.parent = this;

				this.TryAddNamedContent(contentObj);
			}
		}
		TryAddNamedContent(contentObj){
			//so here, in the reference implementation, contentObj is casted to an INamedContent
			//but here we use js-style duck typing: if it implements the same props as the interface, we treat it as valid
			if (contentObj.hasValidName && contentObj.name){
				this.AddToNamedContentOnly(contentObj);
			}
		}
		AddToNamedContentOnly(namedContentObj){
			if (namedContentObj instanceof Object$1 === false) console.warn("Can only add Runtime.Objects to a Runtime.Container");
			namedContentObj.parent = this;

			this.namedContent[namedContentObj.name] = namedContentObj;
		}
		ContentAtPath(path, partialPathLength){
			partialPathLength = (typeof partialPathLength !== 'undefined') ? partialPathLength : path.components.length;

			var currentContainer = this;
			var currentObj = this;

			for (var i = 0; i < partialPathLength; ++i) {
				var comp = path.components[i];
				if (!(currentContainer instanceof Container))
					throw "Path continued, but previous object wasn't a container: " + currentObj;
				
				currentObj = currentContainer.ContentWithPathComponent(comp);
	//			currentContainer = currentObj as Container;
				currentContainer = currentObj;
			}

			return currentObj;
		}
		InsertContent(contentObj, index){
			this.content[i] = contentObj;

			if (contentObj.parent) {
				throw "content is already in " + contentObj.parent;
			}

			contentObj.parent = this;

			this.TryAddNamedContent(contentObj);
		}
		AddContentsOfContainer(otherContainer){
			this.content = this.content.concat(otherContainer.content);
			
			otherContainer.content.forEach(obj => {
				obj.parent = this;
				this.TryAddNamedContent(obj);
			});
		}
		ContentWithPathComponent(component){
			if (component.isIndex) {

				if (component.index >= 0 && component.index < this.content.length) {
					return this.content[component.index];
				}

				// When path is out of range, quietly return nil
				// (useful as we step/increment forwards through content)
				else {
					return null;
				}

			} 

			else if (component.isParent) {
				return this.parent;
			}

			else {
				var foundContent = null;
				if (foundContent = this.namedContent[component.name]){
					return foundContent;
				}
				else {
					throw new StoryException("Content '"+component.name+"' not found at path: '"+this.path+"'");
				}
			}
		}
		BuildStringOfHierarchy(sb, indentation, pointedObj){
			if (arguments.length == 0){
				var sb = new StringBuilder();
				this.BuildStringOfHierarchy(sb, 0, null);
				return sb.toString();
			}
			
			function appendIndentation(){
				var spacesPerIndent = 4;
				for(var i = 0; i < spacesPerIndent*indentation; ++i) { 
					sb.Append(" "); 
				}
			}

			appendIndentation();
			sb.Append("[");

			if (this.hasValidName) {
				sb.AppendFormat(" ({0})", this.name);
			}

			if (this == pointedObj) {
				sb.Append("  <---");
			}

			sb.AppendLine();

			indentation++;

			for (var i = 0; i < this.content.length; ++i) {

				var obj = this.content[i];

				if (obj instanceof Container) {

					var container = obj;

					container.BuildStringOfHierarchy(sb, indentation, pointedObj);

				} else {
					appendIndentation();
					if (obj instanceof StringValue) {
						sb.Append("\"");
						sb.Append(obj.toString().replace("\n", "\\n"));
						sb.Append("\"");
					} else {
						sb.Append(obj.toString());
					}
				}

				if (i != this.content.length - 1) {
					sb.Append(",");
				}

				if ( !(obj instanceof Container) && obj == pointedObj ) {
					sb.Append("  <---");
				}

				sb.AppendLine();
			}


			var onlyNamed = {};
			
			for (var key in this.namedContent){
				if (this.content.indexOf(this.namedContent[key]) >= 0) {
					continue;
				} else {
					onlyNamed[key] = this.namedContent[key];
				}
			}

			if (Object.keys(onlyNamed).length > 0) {
				appendIndentation();
				sb.AppendLine("-- named: --");

				for (var key in onlyNamed){
					if (!(onlyNamed[key] instanceof Container)) console.warn("Can only print out named Containers");
					
					var container = onlyNamed[key];
					container.BuildStringOfHierarchy(sb, indentation, pointedObj);
					sb.Append("\n");
				}
			}


			indentation--;

			appendIndentation();
			sb.Append("]");
		}
	}

	class Glue extends Object$1{
		constructor(type){
			super();
			this.glueType = type;
		}
		get isLeft(){
			return this.glueType == GlueType.Left;
		}
		get isBi(){
			return this.glueType == GlueType.Bidirectional;
		}
		get isRight(){
			return this.glueType == GlueType.Right;
		}
		toString(){
			switch (this.glueType) {
			case GlueType.Bidirectional: return "BidirGlue";
			case GlueType.Left: return "LeftGlue";
			case GlueType.Right: return "RightGlue";
			}
			
			return "UnexpectedGlueType";
		}
	}

	let GlueType = {
		Bidirectional: 0,
		Left: 1,
	    Right: 2
	};

	class ControlCommand extends Object$1{
		constructor(commandType){
			super();
			this._commandType = (typeof commandType != 'undefined') ? commandType : CommandType.NotSet;
		}
		get commandType(){
			return this._commandType;
		}
		copy(){
			return new ControlCommand(this.commandType);
		}
		toString(){
			return this.commandType.toString();
		}
		static EvalStart(){
			return new ControlCommand(CommandType.EvalStart);
		}
		static EvalOutput(){
			return new ControlCommand(CommandType.EvalOutput);
		}
		static EvalEnd(){
			return new ControlCommand(CommandType.EvalEnd);
		}
		static Duplicate(){
			return new ControlCommand(CommandType.Duplicate);
		}
		static PopEvaluatedValue(){
			return new ControlCommand(CommandType.PopEvaluatedValue);
		}
		static PopFunction(){
			return new ControlCommand(CommandType.PopFunction);
		}
		static PopTunnel(){
			return new ControlCommand(CommandType.PopTunnel);
		}
		static BeginString(){
			return new ControlCommand(CommandType.BeginString);
		}
		static EndString(){
			return new ControlCommand(CommandType.EndString);
		}
		static NoOp(){
			return new ControlCommand(CommandType.NoOp);
		}
		static ChoiceCount(){
			return new ControlCommand(CommandType.ChoiceCount);
		}
		static TurnsSince(){
			return new ControlCommand(CommandType.TurnsSince);
		}
		static ReadCount(){
			return new ControlCommand(CommandType.ReadCount);
		}
		static Random(){
			return new ControlCommand(CommandType.Random);
		}
		static SeedRandom(){
			return new ControlCommand(CommandType.SeedRandom);
		}
		static VisitIndex(){
			return new ControlCommand(CommandType.VisitIndex);
		}
		static SequenceShuffleIndex(){
			return new ControlCommand(CommandType.SequenceShuffleIndex);
		}
		static StartThread(){
			return new ControlCommand(CommandType.StartThread);
		}
		static Done(){
			return new ControlCommand(CommandType.Done);
		}
		static End(){
			return new ControlCommand(CommandType.End);
		}
		static ListFromInt(){
			return new ControlCommand(CommandType.ListFromInt);
		}
		static ListRange(){
			return new ControlCommand(CommandType.ListRange);
		}
	}

	var CommandType = {
		NotSet: -1,
		EvalStart: 0,
		EvalOutput: 1,
		EvalEnd: 2,
		Duplicate: 3,
		PopEvaluatedValue: 4,
		PopFunction: 5,
		PopTunnel: 6,
		BeginString: 7,
		EndString: 8,
		NoOp: 9,
		ChoiceCount: 10,
		TurnsSince: 11,
		Random: 12,
		SeedRandom: 13,
		VisitIndex: 14,
		SequenceShuffleIndex: 15,
		StartThread: 16,
		Done: 17,
		End: 18,
		ListFromInt: 19,
		ListRange: 20,
		ReadCount: 21
	};
	CommandType.TOTAL_VALUES = Object.keys(CommandType).length - 1;//-1 because NotSet shoudn't count
	ControlCommand.CommandType = CommandType;

	let PushPopType = {
		Tunnel: 0,
		Function: 1,
	};

	class Divert extends Object$1{
		constructor(stackPushType){
			super();
			this._targetPath;
			this._targetContent;
			
			this.variableDivertName;
			this.pushesToStack;
			this.stackPushType;
			
			this.isExternal;
			this.isConditional;
			this.externalArgs;
			
			//actual constructor
			this.pushesToStack = false;
			if (stackPushType){
				this.pushesToStack = true;
				this.stackPushType = stackPushType;
			}
		}
		get targetPath(){
			// Resolve any relative paths to global ones as we come across them
			if (this._targetPath != null && this._targetPath.isRelative) {
				var targetObj = this.targetContent;
				if (targetObj) {
					this._targetPath = targetObj.path;
				}
			}
			
			return this._targetPath;
		}
		set targetPath(value){
			this._targetPath = value;
			this._targetContent = null;
		}
		get targetContent(){
			if (this._targetContent == null) {
				this._targetContent = this.ResolvePath(this._targetPath);
			}

			return this._targetContent;
		}
		get targetPathString(){
			if (this.targetPath == null)
				return null;

			return this.CompactPathString(this.targetPath);
		}
		set targetPathString(value){
			if (value == null) {
				this.targetPath = null;
			} else {
				this.targetPath = new Path$1(value);
			}
		}
		get hasVariableTarget(){
			return this.variableDivertName != null;
		}
		
		Equals(obj){
	//		var otherDivert = obj as Divert;
			var otherDivert = obj;
			if (otherDivert instanceof Divert) {
				if (this.hasVariableTarget == otherDivert.hasVariableTarget) {
					if (this.hasVariableTarget) {
						return this.variableDivertName == otherDivert.variableDivertName;
					} else {
						return this.targetPath.Equals(otherDivert.targetPath);
					}
				}
			}
			return false;
		}
		toString(){
			if (this.hasVariableTarget) {
				return "Divert(variable: " + this.variableDivertName + ")";
			}
			else if (this.targetPath == null) {
				return "Divert(null)";
			} else {

				var sb = new StringBuilder;

				var targetStr = this.targetPath.toString();
	//			int? targetLineNum = DebugLineNumberOfPath (targetPath);
				var targetLineNum = null;
				if (targetLineNum != null) {
					targetStr = "line " + targetLineNum;
				}

				sb.Append("Divert");
				if (this.pushesToStack) {
					if (this.stackPushType == PushPopType.Function) {
						sb.Append(" function");
					} else {
						sb.Append(" tunnel");
					}
				}

				sb.Append(" (");
				sb.Append(targetStr);
				sb.Append(")");

				return sb.toString();
			}
		}
	}

	class ChoicePoint extends Object$1{
		constructor(onceOnly){
			super();
			this._pathOnChoice;
			this.hasCondition;
			this.hasStartContent;
			this.hasChoiceOnlyContent;
			this.onceOnly;
			this.isInvisibleDefault;
			
			this.onceOnly = !!onceOnly;
		}
		get pathOnChoice(){
			if (this._pathOnChoice != null && this._pathOnChoice.isRelative) {
				var choiceTargetObj = this.choiceTarget;
				if (choiceTargetObj) {
					this._pathOnChoice = choiceTargetObj.path;
				}
			}
			return this._pathOnChoice;
		}
		get choiceTarget(){
			//return this.ResolvePath (_pathOnChoice) as Container;
			return this.ResolvePath(this._pathOnChoice);
		}
		get pathStringOnChoice(){
			return this.CompactPathString(this.pathOnChoice);
		}
		set pathStringOnChoice(value){
			this.pathOnChoice = new Path$1(value);
		}
		get flags(){
			var flags = 0;
			if (this.hasCondition)         flags |= 1;
			if (this.hasStartContent)      flags |= 2;
			if (this.hasChoiceOnlyContent) flags |= 4;
			if (this.isInvisibleDefault)   flags |= 8;
			if (this.onceOnly)             flags |= 16;
			return flags;
		}
		set flags(value){
			this.hasCondition = (value & 1) > 0;
			this.hasStartContent = (value & 2) > 0;
			this.hasChoiceOnlyContent = (value & 4) > 0;
			this.isInvisibleDefault = (value & 8) > 0;
			this.onceOnly = (value & 16) > 0;
		}
		set pathOnChoice(value){
			this._pathOnChoice = value;
		}
		
		toString(){
	//		int? targetLineNum = DebugLineNumberOfPath (pathOnChoice);
			var targetLineNum = null;
			var targetString = this.pathOnChoice.toString();

			if (targetLineNum != null) {
				targetString = " line " + targetLineNum;
			} 

			return "Choice: -> " + targetString;
		}
	}

	class VariableReference extends Object$1{
		constructor(name){
			super();
			this.name = name;
			this.pathForCount;
		}
		get containerForCount(){
			return this.ResolvePath(this.pathForCount);
		}
		get pathStringForCount(){
			if( this.pathForCount == null )
				return null;

			return this.CompactPathString(this.pathForCount);
		}
		set pathStringForCount(value){
			if (value == null)
				this.pathForCount = null;
			else
				this.pathForCount = new Path$1(value);
		}
		
		toString(){
			if (this.name != null) {
				return "var(" + this.name + ")";
			} else {
				var pathStr = this.pathStringForCount;
				return "read_count(" + pathStr + ")";
			}
		}
	}

	class VariableAssignment extends Object$1{
		constructor(variableName, isNewDeclaration){
			super();
			this._variableName = variableName || null;
			this._isNewDeclaration = !!isNewDeclaration;
			this.isGlobal;
		}
		get variableName(){
			return this._variableName;
		}
		get isNewDeclaration(){
			return this._isNewDeclaration;
		}
		
		toString(){
			return "VarAssign to " + this.variableName;
		}
	}

	class Void extends Object$1{}

	//misses delegates, probably the returns from function calls
	class NativeFunctionCall extends Object$1{
		constructor(name){
			super();
			this.name = name;
			this._numberOfParameters;
			
			this._prototype;
			this._isPrototype;
			this._operationFuncs = null;	
			
			NativeFunctionCall.GenerateNativeFunctionsIfNecessary();
		}
		get name(){
			return this._name;
		}
		set name(value){
			this._name = value;
			if( !this._isPrototype )
				this._prototype = NativeFunctionCall._nativeFunctions[this._name];
		}
		get numberOfParameters(){
			if (this._prototype) {
				return this._prototype.numberOfParameters;
			} else {
				return this._numberOfParameters;
			}
		}
		set numberOfParameters(value){
			this._numberOfParameters = value;
		}
		
		static internalConstructor(name, numberOfParamters){
			var nativeFunc = new NativeFunctionCall(name);
			nativeFunc._isPrototype = true;
			nativeFunc.numberOfParameters = numberOfParamters;
			return nativeFunc;
		}
		static CallWithName(functionName){
			return new NativeFunctionCall(functionName);
		}
		static CallExistsWithName(functionName){
			this.GenerateNativeFunctionsIfNecessary();
			return this._nativeFunctions[functionName];
		}
		Call(parameters){
			if (this._prototype) {
				return this._prototype.Call(parameters);
			}

			if (this.numberOfParameters != parameters.length) {
				throw "Unexpected number of parameters";
			}
			
			var hasList  = false;
			parameters.forEach(p => {
				if (p instanceof Void) throw new StoryException("Attempting to perform operation on a void value. Did you forget to 'return' a value from a function you called here?");
				if (p instanceof ListValue)
					hasList = true;
			});
			
			if (parameters.length == 2 && hasList){
				return this.CallBinaryListOperation(parameters);
			}

			var coercedParams = this.CoerceValuesToSingleType(parameters);
			var coercedType = coercedParams[0].valueType;

			//Originally CallType gets a type parameter that is used to do some casting, but we can do without.
			if (coercedType == ValueType.Int) {
				return this.CallType(coercedParams);
			} else if (coercedType == ValueType.Float) {
				return this.CallType(coercedParams);
			} else if (coercedType == ValueType.String) {
				return this.CallType(coercedParams);
			} else if (coercedType == ValueType.DivertTarget) {
				return this.CallType(coercedParams);
			} else if (coercedType == ValueType.List) {
				return this.CallType(coercedParams);
			}

			return null;
		}
		CallType(parametersOfSingleType){
			var param1 = parametersOfSingleType[0];
			var valType = param1.valueType;

			var val1 = param1;

			var paramCount = parametersOfSingleType.length;

			if (paramCount == 2 || paramCount == 1) {

				var opForTypeObj = this._operationFuncs[valType];
				if (!opForTypeObj) {
					throw new StoryException("Cannot perform operation '"+this.name+"' on "+valType);
				}

				// Binary
				if (paramCount == 2) {
					var param2 = parametersOfSingleType[1];

					var val2 = param2;

					var opForType = opForTypeObj;

					// Return value unknown until it's evaluated
					var resultVal = opForType(val1.value, val2.value);

					return Value.Create(resultVal);
				} 

				// Unary
				else {

					var opForType = opForTypeObj;

					var resultVal = opForType(val1.value);

					return Value.Create(resultVal);
				}  
			}

			else {
				throw "Unexpected number of parameters to NativeFunctionCall: " + parametersOfSingleType.length;
			}
		}
		CallBinaryListOperation(parameters)
		{
			// List-Int addition/subtraction returns a List (e.g. "alpha" + 1 = "beta")
			if ((this.name == "+" || this.name == "-") && parameters[0] instanceof ListValue && parameters[1] instanceof IntValue)
				return this.CallListIncrementOperation(parameters);

	//		var v1 = parameters [0] as Value;
			var v1 = parameters[0];
	//		var v2 = parameters [1] as Value;
			var v2 = parameters[1];

			// And/or with any other type requires coerscion to bool (int)
			if ((this.name == "&&" || this.name == "||") && (v1.valueType != ValueType.List || v2.valueType != ValueType.List)) {
	//			var op = _operationFuncs [ValueType.Int] as BinaryOp<int>;
				var op = this._operationFuncs[ValueType.Int];
				var result = op(v1.isTruthy ? 1 : 0, v2.isTruthy ? 1 : 0);
				return new IntValue(result);
			}

			// Normal (list • list) operation
			if (v1.valueType == ValueType.List && v2.valueType == ValueType.List)
				return this.CallType([v1, v2]);

			throw new StoryException("Can not call use '" + this.name + "' operation on " + v1.valueType + " and " + v2.valueType);
		}
		CallListIncrementOperation(listIntParams)
		{
			var listVal = listIntParams[0];
			var intVal = listIntParams[1];


			var resultInkList = new InkList();

			listVal.value.forEach(listItemWithValue => {
				var listItem = listItemWithValue.Key;
				var listItemValue = listItemWithValue.Value;

				// Find + or - operation
				var intOp = this._operationFuncs[ValueType.Int];

				// Return value unknown until it's evaluated
				var targetInt = intOp(listItemValue, intVal.value);

				// Find this item's origin (linear search should be ok, should be short haha)
				var itemOrigin = null;
				listVal.value.origins.forEach(function(origin){
					if (origin.name == listItem.originName) {
						itemOrigin = origin;
						return false;
					}
				});
				if (itemOrigin != null) {
					var incrementedItem = itemOrigin.TryGetItemWithValue(targetInt);
					if (incrementedItem.exists)
						resultInkList.Add(incrementedItem.item, targetInt);
				}
			});

			return new ListValue(resultInkList);
		}
		CoerceValuesToSingleType(parametersIn){
			var valType = ValueType.Int;
			
			var specialCaseList = null;

			// Find out what the output type is
			// "higher level" types infect both so that binary operations
			// use the same type on both sides. e.g. binary operation of
			// int and float causes the int to be casted to a float.
			parametersIn.forEach(obj => {
				var val = obj;
				if (val.valueType > valType) {
					valType = val.valueType;
				}
				
				if (val.valueType == ValueType.List) {
	//				 specialCaseList = val as ListValue;
					 specialCaseList = val;
				}
			});

			// Coerce to this chosen type
			var parametersOut = [];
			
			if (valType == ValueType.List) {
				parametersIn.forEach(function(val){
					if (val.valueType == ValueType.List) {
						parametersOut.push(val);
					} else if (val.valueType == ValueType.Int) {
						var intVal = parseInt(val.valueObject);
						var list = specialCaseList.value.originOfMaxItem;

						var item = list.TryGetItemWithValue(intVal);
						if (item.exists) {
							var castedValue = new ListValue(item.item, intVal);
							parametersOut.push(castedValue);
						} else
							throw new StoryException("Could not find List item with the value " + intVal + " in " + list.name);
					} else
						throw new StoryException("Cannot mix Lists and " + val.valueType + " values in this operation");
				});
			} 

			// Normal Coercing (with standard casting)
			else {
				parametersIn.forEach(function(val){
					var castedValue = val.Cast(valType);
					parametersOut.push(castedValue);
				});
			}

			return parametersOut;
		}
		static GenerateNativeFunctionsIfNecessary(){
			if (this._nativeFunctions == null) {
				this._nativeFunctions = {};

				// Int operations
				this.AddIntBinaryOp(this.Add,      (x, y) => {return x + y});
				this.AddIntBinaryOp(this.Subtract, (x, y) => {return x - y});
				this.AddIntBinaryOp(this.Multiply, (x, y) => {return x * y});
				this.AddIntBinaryOp(this.Divide,   (x, y) => {return parseInt(x / y)});
				this.AddIntBinaryOp(this.Mod,      (x, y) => {return x % y}); 
				this.AddIntUnaryOp(this.Negate,   x => {return -x}); 

				this.AddIntBinaryOp(this.Equal,    (x, y) => {return x == y ? 1 : 0});
				this.AddIntBinaryOp(this.Greater,  (x, y) => {return x > y  ? 1 : 0});
				this.AddIntBinaryOp(this.Less,     (x, y) => {return x < y  ? 1 : 0});
				this.AddIntBinaryOp(this.GreaterThanOrEquals, (x, y) => {return x >= y ? 1 : 0});
				this.AddIntBinaryOp(this.LessThanOrEquals, (x, y) => {return x <= y ? 1 : 0});
				this.AddIntBinaryOp(this.NotEquals, (x, y) => {return x != y ? 1 : 0});
				this.AddIntUnaryOp(this.Not,       x => {return (x == 0) ? 1 : 0}); 

				this.AddIntBinaryOp(this.And,      (x, y) => {return x != 0 && y != 0 ? 1 : 0});
				this.AddIntBinaryOp(this.Or,       (x, y) => {return x != 0 || y != 0 ? 1 : 0});

				this.AddIntBinaryOp(this.Max,      (x, y) => {return Math.max(x, y)});
				this.AddIntBinaryOp(this.Min,      (x, y) => {return Math.min(x, y)});

				// Float operations
				this.AddFloatBinaryOp(this.Add,      (x, y) => {return x + y});
				this.AddFloatBinaryOp(this.Subtract, (x, y) => {return x - y});
				this.AddFloatBinaryOp(this.Multiply, (x, y) => {return x * y});
				this.AddFloatBinaryOp(this.Divide,   (x, y) => {return x / y});
				this.AddFloatBinaryOp(this.Mod,      (x, y) => {return x % y}); // TODO: Is this the operation we want for floats?
				this.AddFloatUnaryOp(this.Negate,   x => {return -x}); 

				this.AddFloatBinaryOp(this.Equal,    (x, y) => {return x == y ? 1 : 0});
				this.AddFloatBinaryOp(this.Greater,  (x, y) => {return x > y  ? 1 : 0});
				this.AddFloatBinaryOp(this.Less,     (x, y) => {return x < y  ? 1 : 0});
				this.AddFloatBinaryOp(this.GreaterThanOrEquals, (x, y) => {return x >= y ? 1 : 0});
				this.AddFloatBinaryOp(this.LessThanOrEquals, (x, y) => {return x <= y ? 1 : 0});
				this.AddFloatBinaryOp(this.NotEquals, (x, y) => {return x != y ? 1 : 0});
				this.AddFloatUnaryOp(this.Not,       x => {return (x == 0.0) ? 1 : 0}); 

				this.AddFloatBinaryOp(this.And,      (x, y) => {return x != 0.0 && y != 0.0 ? 1 : 0});
				this.AddFloatBinaryOp(this.Or,       (x, y) => {return x != 0.0 || y != 0.0 ? 1 : 0});

				this.AddFloatBinaryOp(this.Max,      (x, y) => {return Math.max(x, y)});
				this.AddFloatBinaryOp(this.Min,      (x, y) => {return Math.min(x, y)});

				// String operations
				this.AddStringBinaryOp(this.Add,     	(x, y) => {return x + y}); // concat
				this.AddStringBinaryOp(this.Equal,   	(x, y) => {return x === y ? 1 : 0});
				this.AddStringBinaryOp(this.NotEquals,(x, y) => {return !(x === y) ? 1 : 0});
				
				this.AddListBinaryOp(this.Add, 		 (x, y) => {return x.Union(y)});
				this.AddListBinaryOp(this.Subtract,  (x, y) => {return x.Without(y)});
				this.AddListBinaryOp(this.Has, 		 (x, y) => {return x.Contains(y) ? 1 : 0});
				this.AddListBinaryOp(this.Hasnt, 	 (x, y) => {return x.Contains(y) ? 0 : 1});
				this.AddListBinaryOp(this.Intersect, (x, y) => {return x.Intersect(y)});
				
				this.AddListBinaryOp(this.Equal, 				(x, y) => {return x.Equals(y) ? 1 : 0});
				this.AddListBinaryOp(this.Greater, 				(x, y) => {return x.GreaterThan(y) ? 1 : 0});
				this.AddListBinaryOp(this.Less, 				(x, y) => {return x.LessThan(y) ? 1 : 0});
				this.AddListBinaryOp(this.GreaterThanOrEquals, 	(x, y) => {return x.GreaterThanOrEquals(y) ? 1 : 0});
				this.AddListBinaryOp(this.LessThanOrEquals, 	(x, y) => {return x.LessThanOrEquals(y) ? 1 : 0});
				this.AddListBinaryOp(this.NotEquals, 			(x, y) => {return !x.Equals(y) ? 1 : 0});

				this.AddListBinaryOp (this.And, 				(x, y) => {return x.Count > 0 && y.Count > 0 ? 1 : 0});
	      this.AddListBinaryOp (this.Or,  				(x, y) => {return x.Count > 0 || y.Count > 0 ? 1 : 0});
				
				this.AddListUnaryOp(this.Not, (x) => {return x.Count == 0 ? 1 : 0});

				this.AddListUnaryOp(this.Invert, (x) => {return x.inverse});
				this.AddListUnaryOp(this.All, (x) => {return x.all});
				this.AddListUnaryOp(this.ListMin, (x) => {return x.MinAsList()});
				this.AddListUnaryOp(this.ListMax, (x) => {return x.MaxAsList()});
				this.AddListUnaryOp(this.Count,  (x) => {return x.Count});
				this.AddListUnaryOp(this.ValueOfList,  (x) => {return x.maxItem.Value});

				// Special case: The only operation you can do on divert target values
				var divertTargetsEqual = (d1, d2) => {
					return d1.Equals(d2) ? 1 : 0;
				};
				this.AddOpToNativeFunc(this.Equal, 2, ValueType.DivertTarget, divertTargetsEqual);
			}
		}
		AddOpFuncForType(valType, op){
			if (this._operationFuncs == null) {
				this._operationFuncs = {};
			}

			this._operationFuncs[valType] = op;
		}
		static AddOpToNativeFunc(name, args, valType, op){
			var nativeFunc = this._nativeFunctions[name];
			if (!nativeFunc) {
				nativeFunc = NativeFunctionCall.internalConstructor(name, args);
				this._nativeFunctions[name] = nativeFunc;
			}

			nativeFunc.AddOpFuncForType(valType, op);
		}
		
		static AddIntBinaryOp(name, op){
			this.AddOpToNativeFunc(name, 2, ValueType.Int, op);
		}
		static AddIntUnaryOp(name, op){
			this.AddOpToNativeFunc(name, 1, ValueType.Int, op);
		}
		
		static AddFloatBinaryOp(name, op){
			this.AddOpToNativeFunc(name, 2, ValueType.Float, op);
		}
		static AddFloatUnaryOp(name, op){
			this.AddOpToNativeFunc(name, 1, ValueType.Float, op);
		}
		
		static AddStringBinaryOp(name, op){
			this.AddOpToNativeFunc(name, 2, ValueType.String, op);
		}
		
		static AddListBinaryOp(name, op){
			this.AddOpToNativeFunc(name, 2, ValueType.List, op);
		}
		static AddListUnaryOp(name, op){
			this.AddOpToNativeFunc(name, 1, ValueType.List, op);
		}
		
		toString(){
			return "Native '" + this.name + "'";
		}
	}

	NativeFunctionCall.Add 		= "+";
	NativeFunctionCall.Subtract = "-";
	NativeFunctionCall.Divide   = "/";
	NativeFunctionCall.Multiply = "*";
	NativeFunctionCall.Mod      = "%";
	NativeFunctionCall.Negate   = "_";

	NativeFunctionCall.Equal    = "==";
	NativeFunctionCall.Greater  = ">";
	NativeFunctionCall.Less     = "<";
	NativeFunctionCall.GreaterThanOrEquals = ">=";
	NativeFunctionCall.LessThanOrEquals = "<=";
	NativeFunctionCall.NotEquals   = "!=";
	NativeFunctionCall.Not      = "!";

	NativeFunctionCall.And      = "&&";
	NativeFunctionCall.Or       = "||";

	NativeFunctionCall.Min      = "MIN";
	NativeFunctionCall.Max      = "MAX";

	NativeFunctionCall.Has      = "?";
	NativeFunctionCall.Hasnt    = "!?";
	NativeFunctionCall.Intersect = "^";

	NativeFunctionCall.ListMin   = "LIST_MIN";
	NativeFunctionCall.ListMax   = "LIST_MAX";
	NativeFunctionCall.All       = "LIST_ALL";
	NativeFunctionCall.Count     = "LIST_COUNT";
	NativeFunctionCall.ValueOfList = "LIST_VALUE";
	NativeFunctionCall.Invert    = "LIST_INVERT";

	NativeFunctionCall._nativeFunctions = null;

	class Tag extends Object$1{
		constructor(tagText){
			super();
			this._text = tagText.toString() || '';
		}
		get text(){
			return this._text;
		}
		toString(){
			return "# " + this._text;
		}
	}

	class Choice{
		constructor(choice){
			this.text;
			this.index;
			this.choicePoint;
			this.threadAtGeneration;
			
			this._originalThreadIndex;
			this._originalChoicePath;
			
			if (choice) this.choicePoint = choice;
		}
		get pathStringOnChoice(){
			return this.choicePoint.pathStringOnChoice;
		}
		get sourcePath(){
			return this.choicePoint.path.componentsString;
		}
	}

	class ListDefinition{
		constructor(name, items){
			this._name = name || '';
			this._items = null;
			this._rawListItemsKeys = null;
			this._itemNameToValues = items || {};
		}
		get name(){
			return this._name;
		}
		get items(){
			if (this._items == null){
				this._items = {};
				this._rawListItemsKeys = {};
				for (var key in this._itemNameToValues){
					var item = new InkListItem(this.name, key);
					this._rawListItemsKeys[item] = item;
					this._items[item] = this._itemNameToValues[key];
				}
			}
			this._items.forEach = this.forEachItems.bind(this);
			
			return this._items;
		}
		forEachItems(fn){
			for (var key in this._rawListItemsKeys){
				fn({
					Key: this._rawListItemsKeys[key],
					Value: this._items[key]
				});
			}
		}
		ValueForItem(item){
			var intVal = this._itemNameToValues[item.itemName];
			if (intVal !== undefined)
				return intVal;
			else
				return 0;
		}
		ContainsItem(item){
			if (item.originName != this.name) return false;

			return (item.itemName in this._itemNameToValues);
		}
		ContainsItemWithName(itemName){
			return this._itemNameToValues[itemName] !== undefined;
		}
		TryGetItemWithValue(val, item){//item was an out
			//the original function returns a boolean and has a second parameter called item that is an `out`. Both are needed and we can't just return the item because it'll always be truthy. Instead, we return an object containing the bool and the item
			for (var key in this._itemNameToValues){
				if (this._itemNameToValues[key] == val) {
					item = new InkListItem(this.name, key);
					return {
						item :item,
						exists: true
					};
				}
			}

			item = InkListItem.Null;
			return {
				item :item,
				exists: false
			};
		}
		TryGetValueForItem(item, intval){//intval is an out
			intVal = this._itemNameToValues[item.itemName];
			return intVal;
		}
		ListRange(min, max){
			var rawList = new InkList();
			for (var key in this._itemNameToValues){
				if (this._itemNameToValues[key] >= min && this._itemNameToValues[key] <= max) {
					var item = new InkListItem(this.name, key);
					rawList.Add(item, this._itemNameToValues[key]);
				}
			}
			return new ListValue(rawList);
		}
	}

	class ListDefinitionsOrigin{
		constructor(lists){
			this._lists = {};
			
			lists.forEach((list)=>{
				this._lists[list.name] = list;
			});
		}
		get lists(){
			var listOfLists = [];
			
			for (var key in this._lists){
				listOfLists.push(this._lists[key]);
			}
			return listOfLists;
		}
		TryGetDefinition(name, def){
			//initially, this function returns a boolean and the second parameter is an out.
			return (name in this._lists) ? this._lists[name] : def;
		}
		FindSingleItemListWithName(name){
			var item = InkListItem.Null;
			var list = null;

			var nameParts = name.split('.');
			if (nameParts.length == 2) {
				item = new InkListItem(nameParts[0], nameParts[1]);
				list = this.TryGetDefinition(item.originName, list);
			} else {
				for (var key in this._lists){
					var listWithItem = this._lists[key];
					item = new InkListItem(key, name);
					if (listWithItem.ContainsItem(item)) {
						list = listWithItem;
						break;
					}
				}
			}
			
			if (list != null) {
				var itemValue = list.ValueForItem(item);
				return new ListValue(item, itemValue);
			}

			return null;
		}
	}

	class JsonSerialisation{
		static ListToJArray(serialisables){
			var jArray = [];
			serialisables.forEach(s => {
				jArray.push(this.RuntimeObjectToJToken(s));
			});
			return jArray;
		}
		static JArrayToRuntimeObjList(jArray, skipLast){
			var count = jArray.length;
			if (skipLast) count--;
			
			var list = [];
			
			for (var i = 0; i < count; i++){
				var jTok = jArray[i];
				var runtimeObj = this.JTokenToRuntimeObject(jTok);
				list.push(runtimeObj);
			}
			
			return list;
		}
		static JObjectToDictionaryRuntimeObjs(jObject){
			var dict = {};

			for (var key in jObject){
				dict[key] = this.JTokenToRuntimeObject(jObject[key]);
			}

			return dict;
		}
		static DictionaryRuntimeObjsToJObject(dictionary){
			var jsonObj = {};

			for (var key in dictionary){
	//			var runtimeObj = keyVal.Value as Runtime.Object;
				var runtimeObj = dictionary[key];
				if (runtimeObj instanceof Object$1)
					jsonObj[key] = this.RuntimeObjectToJToken(runtimeObj);
			}

			return jsonObj;
		}
		static JObjectToIntDictionary(jObject){
			var dict = {};
			for (var key in jObject){
				dict[key] = parseInt(jObject[key]);
			}
			return dict;
		}
		static IntDictionaryToJObject(dict){
			var jObj = {};
			for (var key in dict){
				jObj[key] = dict[key];
			}
			return jObj;
		}
		static JTokenToRuntimeObject(token){
			//@TODO probably find a more robust way to detect numbers, isNaN seems happy to accept things that really aren't numberish.
			if (!isNaN(token) && token !== "\n"){//JS thinks "\n" is a number
				return Value.Create(token);
			}
			
			if (typeof token === 'string'){
				var str = token.toString();

				// String value
				var firstChar = str[0];
				if (firstChar == '^')
					return new StringValue(str.substring(1));
				else if(firstChar == "\n" && str.length == 1)
					return new StringValue("\n");

				// Glue
				if (str == "<>")
					return new Glue(GlueType.Bidirectional);
				else if(str == "G<")
					return new Glue(GlueType.Left);
				else if(str == "G>")
					return new Glue(GlueType.Right);

				// Control commands (would looking up in a hash set be faster?)
				for (var i = 0; i < _controlCommandNames.length; ++i) {
					var cmdName = _controlCommandNames[i];
					if (str == cmdName) {
						return new ControlCommand(i);
					}
				}

				// Native functions
				if (str == "L^") str = "^";
				if( NativeFunctionCall.CallExistsWithName(str) )
					return NativeFunctionCall.CallWithName(str);

				// Pop
				if (str == "->->")
					return ControlCommand.PopTunnel();
				else if (str == "~ret")
					return ControlCommand.PopFunction();

				// Void
				if (str == "void")
					return new Void ();
			}
			
			if (typeof token === 'object' && token instanceof Array === false){
				var obj = token;
				var propValue;

				// Divert target value to path
				if (obj["^->"]){
					propValue = obj["^->"];
					return new DivertTargetValue(new Path$1(propValue.toString()));
				}
					
				// VariablePointerValue
				if (obj["^var"]) {
					propValue = obj["^var"];
					var varPtr = new VariablePointerValue(propValue.toString());
					if (obj["ci"]){
						propValue = obj["ci"];
						varPtr.contextIndex = parseInt(propValue);
					}
					return varPtr;
				}

				// Divert
				var isDivert = false;
				var pushesToStack = false;
				var divPushType = PushPopType.Function;
				var external = false;
				if (propValue = obj["->"]) {
					isDivert = true;
				}
				else if (propValue = obj["f()"]) {
					isDivert = true;
					pushesToStack = true;
					divPushType = PushPopType.Function;
				}
				else if (propValue = obj["->t->"]) {
					isDivert = true;
					pushesToStack = true;
					divPushType = PushPopType.Tunnel;
				}
				else if (propValue = obj["x()"]) {
					isDivert = true;
					external = true;
					pushesToStack = false;
					divPushType = PushPopType.Function;
				}
				
				if (isDivert) {
					var divert = new Divert();
					divert.pushesToStack = pushesToStack;
					divert.stackPushType = divPushType;
					divert.isExternal = external;

					var target = propValue.toString();

					if (propValue = obj["var"])
						divert.variableDivertName = target;
					else
						divert.targetPathString = target;
					
					divert.isConditional = !!obj["c"];

					if (external) {
						if (propValue = obj["exArgs"])
							divert.externalArgs = parseInt(propValue);
					}

					return divert;
				}

				// Choice
				if (propValue = obj["*"]) {
					var choice = new ChoicePoint();
					choice.pathStringOnChoice = propValue.toString();

					if (propValue = obj["flg"])
						choice.flags = parseInt(propValue);

					return choice;
				}

				// Variable reference
				if (propValue = obj["VAR?"]) {
					return new VariableReference(propValue.toString());
				} else if (propValue = obj["CNT?"]) {
					var readCountVarRef = new VariableReference();
					readCountVarRef.pathStringForCount = propValue.toString();
					return readCountVarRef;
				}

				// Variable assignment
				var isVarAss = false;
				var isGlobalVar = false;
				if (propValue = obj["VAR="]) {
					isVarAss = true;
					isGlobalVar = true;
				} else if (propValue = obj["temp="]) {
					isVarAss = true;
					isGlobalVar = false;
				}
				if (isVarAss) {
					var varName = propValue.toString();
					var isNewDecl = !obj["re"];
					var varAss = new VariableAssignment(varName, isNewDecl);
					varAss.isGlobal = isGlobalVar;
					return varAss;
				}
				if (obj["#"] !== undefined){
					propValue = obj["#"];
					return new Tag(propValue.toString());
				}
				//list value
				if (propValue = obj["list"]) {
	//				var listContent = (Dictionary<string, object>)propValue;
					var listContent = propValue;
					var rawList = new InkList();
					if (propValue = obj["origins"]) {
	//					var namesAsObjs = (List<object>)propValue;
						var namesAsObjs = propValue;
	//					rawList.SetInitialOriginNames(namesAsObjs.Cast<string>().ToList());
						rawList.SetInitialOriginNames(namesAsObjs);
					}
					
					for (var key in listContent){
						var nameToVal = listContent[key];
						var item = new InkListItem(key);
						var val = parseInt(nameToVal);
						rawList.Add(item, val);
					}
					
					return new ListValue(rawList);
				}

				if (obj["originalChoicePath"] != null)
					return this.JObjectToChoice(obj);
			}
			
			// Array is always a Runtime.Container
			if (token instanceof Array){
				return this.JArrayToContainer(token);
			}
			
			if (token == null)
	                return null;
			
			throw "Failed to convert token to runtime object: " + JSON.stringify(token);
		}
		static RuntimeObjectToJToken(obj){
	//		var container = obj as Container;
			var container = obj;
			if (container instanceof Container) {
				return this.ContainerToJArray(container);
			}

	//		var divert = obj as Divert;
			var divert = obj;
			if (divert instanceof Divert) {
				var divTypeKey = "->";
				if (divert.isExternal)
					divTypeKey = "x()";
				else if (divert.pushesToStack) {
					if (divert.stackPushType == PushPopType.Function)
						divTypeKey = "f()";
					else if (divert.stackPushType == PushPopType.Tunnel)
						divTypeKey = "->t->";
				}

				var targetStr;
				if (divert.hasVariableTarget)
					targetStr = divert.variableDivertName;
				else
					targetStr = divert.targetPathString;

				var jObj = {};
				jObj[divTypeKey] = targetStr;

				if (divert.hasVariableTarget)
					jObj["var"] = true;
				
				if (divert.isConditional)
					jObj["c"] = true;

				if (divert.externalArgs > 0)
					jObj["exArgs"] = divert.externalArgs;

				return jObj;
			}

	//		var choicePoint = obj as ChoicePoint;
			var choicePoint = obj;
			if (choicePoint instanceof ChoicePoint) {
				var jObj = {};
				jObj["*"] = choicePoint.pathStringOnChoice;
				jObj["flg"] = choicePoint.flags;
				return jObj;
			}

	//		var intVal = obj as IntValue;
			var intVal = obj;
			if (intVal instanceof IntValue)
				return intVal.value;

	//		var floatVal = obj as FloatValue;
			var floatVal = obj;
			if (floatVal instanceof FloatValue)
				return floatVal.value;

	//		var strVal = obj as StringValue;
			var strVal = obj;
			if (strVal instanceof StringValue) {
				if (strVal.isNewline)
					return "\n";
				else
					return "^" + strVal.value;
			}
			
	//		var listVal = obj as ListValue;
			var listVal = obj;
			if (listVal instanceof ListValue) {
				return this.InkListToJObject(listVal);
			}

	//		var divTargetVal = obj as DivertTargetValue;
			var divTargetVal = obj;
			if (divTargetVal instanceof DivertTargetValue)
				return {
					"^->": divTargetVal.value.componentsString
				};

	//		var varPtrVal = obj as VariablePointerValue;
			var varPtrVal = obj;
			if (varPtrVal instanceof VariablePointerValue)
				return {
					"^var": varPtrVal.value,
					"ci": varPtrVal.contextIndex
				};

	//		var glue = obj as Runtime.Glue;
			var glue = obj;
			if (glue instanceof Glue) {
				if (glue.isBi)
					return "<>";
				else if (glue.isLeft)
					return "G<";
				else
					return "G>";
			}

	//		var controlCmd = obj as ControlCommand;
			var controlCmd = obj;
			if (controlCmd instanceof ControlCommand) {
				return _controlCommandNames[parseInt(controlCmd.commandType)];
			}

	//		var nativeFunc = obj as Runtime.NativeFunctionCall;
			var nativeFunc = obj;
			if (nativeFunc instanceof NativeFunctionCall) {
				var name = nativeFunc.name;

				// Avoid collision with ^ used to indicate a string
				if (name == "^") name = "L^";
				return name;
			}

			// Variable reference
	//		var varRef = obj as VariableReference;
			var varRef = obj;
			if (varRef instanceof VariableReference) {
				var jObj = {};
				var readCountPath = varRef.pathStringForCount;
				if (readCountPath != null) {
					jObj["CNT?"] = readCountPath;
				} else {
					jObj["VAR?"] = varRef.name;
				}

				return jObj;
			}

			// Variable assignment
	//		var varAss = obj as VariableAssignment;
			var varAss = obj;
			if (varAss instanceof VariableAssignment) {
				var key = varAss.isGlobal ? "VAR=" : "temp=";
				var jObj = {};
				jObj[key] = varAss.variableName;

				// Reassignment?
				if (!varAss.isNewDeclaration)
					jObj["re"] = true;

				return jObj;
			}

	//		var voidObj = obj as Void;
			var voidObj = obj;
			if (voidObj instanceof Void)
				return "void";
		
	//		var tag = obj as Tag;
			var tag = obj;
			if (tag instanceof Tag) {
				var jObj = {};
				jObj["#"] = tag.text;
				return jObj;
			}

			// Used when serialising save state only
	//		var choice = obj as Choice;
			var choice = obj;
			if (choice instanceof Choice)
				return this.ChoiceToJObject(choice);

			throw "Failed to convert runtime object to Json token: " + obj;
		}
		static ContainerToJArray(container){
			var jArray = this.ListToJArray(container.content);

			// Container is always an array [...]
			// But the final element is always either:
			//  - a dictionary containing the named content, as well as possibly
			//    the key "#" with the count flags
			//  - null, if neither of the above
			var namedOnlyContent = container.namedOnlyContent;
			var countFlags = container.countFlags;
			if (namedOnlyContent != null && namedOnlyContent.length > 0 || countFlags > 0 || container.name != null) {

				var terminatingObj;
				if (namedOnlyContent != null) {
					terminatingObj = this.DictionaryRuntimeObjsToJObject(namedOnlyContent);

					// Strip redundant names from containers if necessary
					for (var key in terminatingObj){
	//					var subContainerJArray = namedContentObj.Value as JArray;
						var subContainerJArray = terminatingObj[key];
						if (subContainerJArray != null) {
	//						var attrJObj = subContainerJArray [subContainerJArray.Count - 1] as JObject;
							var attrJObj = subContainerJArray[subContainerJArray.length - 1];
							if (attrJObj != null) {
								delete attrJObj["#n"];
								if (Object.keys(attrJObj).length == 0)
									subContainerJArray[subContainerJArray.length - 1] = null;
							}
						}
					}

				} else
					terminatingObj = {};

				if( countFlags > 0 )
					terminatingObj["#f"] = countFlags;

				if( container.name != null )
					terminatingObj["#n"] = container.name;

				jArray.push(terminatingObj);
			} 

			// Add null terminator to indicate that there's no dictionary
			else {
				jArray.push(null);
			}

			return jArray;
		}
		static JArrayToContainer(jArray){
			var container = new Container();
			container.content = this.JArrayToRuntimeObjList(jArray, true);

			// Final object in the array is always a combination of
			//  - named content
			//  - a "#" key with the countFlags
			// (if either exists at all, otherwise null)
	//		var terminatingObj = jArray [jArray.Count - 1] as JObject;
			var terminatingObj = jArray[jArray.length - 1];
			if (terminatingObj != null) {

				var namedOnlyContent = {};
				
				for (var key in terminatingObj){
					if (key == "#f") {
						container.countFlags = parseInt(terminatingObj[key]);
					} else if (key == "#n") {
						container.name = terminatingObj[key].toString();
					} else {
						var namedContentItem = this.JTokenToRuntimeObject(terminatingObj[key]);
	//					var namedSubContainer = namedContentItem as Container;
						var namedSubContainer = namedContentItem;
						if (namedSubContainer instanceof Container)
							namedSubContainer.name = key;
						namedOnlyContent[key] = namedContentItem;
					}
				}

				container.namedOnlyContent = namedOnlyContent;
			}

			return container;
		}
		static JObjectToChoice(jObj){
			var choice = new Choice();
			choice.text = jObj["text"].toString();
			choice.index = parseInt(jObj["index"]);
			choice.originalChoicePath = jObj["originalChoicePath"].toString();
			choice.originalThreadIndex = parseInt(jObj["originalThreadIndex"]);
			return choice;
		}
		static ChoiceToJObject(choice){
			var jObj = {};
			jObj["text"] = choice.text;
			jObj["index"] = choice.index;
			jObj["originalChoicePath"] = choice.originalChoicePath;
			jObj["originalThreadIndex"] = choice.originalThreadIndex;
			return jObj;
		}
		static InkListToJObject (listVal){
			var rawList = listVal.value;

			var dict = {};

			var content = {};
			
			rawList.forEach(function(itemAndValue){
				var item = itemAndValue.Key;
				var val = itemAndValue.Value;
				content[item.toString()] = val;
			});

			dict["list"] = content;

			if (rawList.Count == 0 && rawList.originNames != null && rawList.originNames.length > 0) {
	//			dict["origins"] = rawList.originNames.Cast<object> ().ToList ();
				dict["origins"] = rawList.originNames;
			}

			return dict;
		}
		static ListDefinitionsToJToken(origin){
			var result = {};
			
			origin.lists.forEach(function(def){
				var listDefJson = {};
				def.items.forEach(function(itemToVal){
					var item = itemToVal.Key;
					var val = itemToVal.Value;
					listDefJson[item.itemName] = val;
				});
				
				result[def.name] = listDefJson;
			});
			
			return result;
		}
		static JTokenToListDefinitions(obj){
	//		var defsObj = (Dictionary<string, object>)obj;
			var defsObj = obj;

			var allDefs = [];
			
			for (var key in defsObj){
				var name = key.toString();
	//			var listDefJson = (Dictionary<string, object>)kv.Value;
				var listDefJson = defsObj[key];

				// Cast (string, object) to (string, int) for items
				var items = {};
				
				for (var nameValueKey in listDefJson){
					var nameValue = listDefJson[nameValueKey];
					items[nameValueKey] = parseInt(nameValue);
				}

				var def = new ListDefinition(name, items);
				allDefs.push(def);
			}

			return new ListDefinitionsOrigin(allDefs);
		}
	}

	var _controlCommandNames = [];

	_controlCommandNames[ControlCommand.CommandType.EvalStart] = "ev";
	_controlCommandNames[ControlCommand.CommandType.EvalOutput] = "out";
	_controlCommandNames[ControlCommand.CommandType.EvalEnd] = "/ev";
	_controlCommandNames[ControlCommand.CommandType.Duplicate] = "du";
	_controlCommandNames[ControlCommand.CommandType.PopEvaluatedValue] = "pop";
	_controlCommandNames[ControlCommand.CommandType.PopFunction] = "~ret";
	_controlCommandNames[ControlCommand.CommandType.PopTunnel] = "->->";
	_controlCommandNames[ControlCommand.CommandType.BeginString] = "str";
	_controlCommandNames[ControlCommand.CommandType.EndString] = "/str";
	_controlCommandNames[ControlCommand.CommandType.NoOp] = "nop";
	_controlCommandNames[ControlCommand.CommandType.ChoiceCount] = "choiceCnt";
	_controlCommandNames[ControlCommand.CommandType.TurnsSince] = "turns";
	_controlCommandNames[ControlCommand.CommandType.ReadCount] = "readc";
	_controlCommandNames[ControlCommand.CommandType.Random] = "rnd";
	_controlCommandNames[ControlCommand.CommandType.SeedRandom] = "srnd";
	_controlCommandNames[ControlCommand.CommandType.VisitIndex] = "visit";
	_controlCommandNames[ControlCommand.CommandType.SequenceShuffleIndex] = "seq";
	_controlCommandNames[ControlCommand.CommandType.StartThread] = "thread";
	_controlCommandNames[ControlCommand.CommandType.Done] = "done";
	_controlCommandNames[ControlCommand.CommandType.End] = "end";
	_controlCommandNames[ControlCommand.CommandType.ListFromInt] = "listInt";
	_controlCommandNames[ControlCommand.CommandType.ListRange] = "range";

	for (var i$1 = 0; i$1 < ControlCommand.CommandType.TOTAL_VALUES; ++i$1) {
		if (_controlCommandNames[i$1] == null)
			throw "Control command not accounted for in serialisation";
	}

	class Element{
		constructor(type, container, contentIndex, inExpressionEvaluation){
			this.currentContainer = container;
			this.currentContentIndex = contentIndex;
			this.inExpressionEvaluation = inExpressionEvaluation || false;
			this.temporaryVariables = {};
			this.type = type;
		}
		get currentObject(){
			if (this.currentContainer && this.currentContentIndex < this.currentContainer.content.length) {
				return this.currentContainer.content[this.currentContentIndex];
			}

			return null;
		}
		set currentObject(value){
			var currentObj = value;
			if (currentObj == null) {
				this.currentContainer = null;
				this.currentContentIndex = 0;
				return;
			}

	//		currentContainer = currentObj.parent as Container;
			this.currentContainer = currentObj.parent;
			if (this.currentContainer instanceof Container)
				this.currentContentIndex = this.currentContainer.content.indexOf(currentObj);

			// Two reasons why the above operation might not work:
			//  - currentObj is already the root container
			//  - currentObj is a named container rather than being an object at an index
			if (this.currentContainer instanceof Container === false || this.currentContentIndex == -1) {
	//			currentContainer = currentObj as Container;
				this.currentContainer = currentObj;
				this.currentContentIndex = 0;
			}
		}
		Copy(){
			var copy = new Element(this.type, this.currentContainer, this.currentContentIndex, this.inExpressionEvaluation);
			Object.assign(copy.temporaryVariables, this.temporaryVariables);
			return copy;
		}
	}

	class Thread{
		constructor(jsonToken, storyContext){
			this.callstack = [];
			this.threadIndex = 0;
			this.previousContentObject = null;
			
			if (jsonToken && storyContext){
				var jThreadObj = jsonToken;
				this.threadIndex = parseInt(jThreadObj["threadIndex"]);

				var jThreadCallstack = jThreadObj["callstack"];
				
				jThreadCallstack.forEach(jElTok => {
					var jElementObj = jElTok;

					var pushPopType = parseInt(jElementObj["type"]);

					var currentContainer = null;
					var contentIndex = 0;

					var currentContainerPathStr = null;
					var currentContainerPathStrToken = jElementObj["cPath"];
					if (typeof currentContainerPathStrToken !== 'undefined') {
						currentContainerPathStr = currentContainerPathStrToken.toString();
	//					currentContainer = storyContext.ContentAtPath (new Path(currentContainerPathStr)) as Container;
						currentContainer = storyContext.ContentAtPath(new Path$1(currentContainerPathStr));
						contentIndex = parseInt(jElementObj["idx"]);
					}

					var inExpressionEvaluation = !!jElementObj["exp"];

					var el = new Element(pushPopType, currentContainer, contentIndex, inExpressionEvaluation);

					var jObjTemps = jElementObj["temp"];
					el.temporaryVariables = JsonSerialisation.JObjectToDictionaryRuntimeObjs(jObjTemps);

					this.callstack.push(el);
				});
				
				var prevContentObjPath = jThreadObj["previousContentObject"];
				if(typeof prevContentObjPath  !== 'undefined') {
					var prevPath = new Path$1(prevContentObjPath.toString());
					this.previousContentObject = storyContext.ContentAtPath(prevPath);
				}
			}
		}
		get jsonToken(){
			var threadJObj = {};

			var jThreadCallstack = [];
			this.callstack.forEach(el => {
				var jObj = {};
				if (el.currentContainer) {
					jObj["cPath"] = el.currentContainer.path.componentsString;
					jObj["idx"] = el.currentContentIndex;
				}
				jObj["exp"] = el.inExpressionEvaluation;
				jObj["type"] = parseInt(el.type);
				jObj["temp"] = JsonSerialisation.DictionaryRuntimeObjsToJObject(el.temporaryVariables);
				jThreadCallstack.push(jObj);
			});

			threadJObj["callstack"] = jThreadCallstack;
			threadJObj["threadIndex"] = this.threadIndex;
			
			if (this.previousContentObject != null)
				threadJObj["previousContentObject"] = this.previousContentObject.path.toString();

			return threadJObj;
		}
		Copy(){
			var copy = new Thread();
			copy.threadIndex = this.threadIndex;
			this.callstack.forEach(e => {
				copy.callstack.push(e.Copy());
			});
			copy.previousContentObject = this.previousContentObject;
			return copy;
		}
	}

	class CallStack{
		constructor(copyOrrootContentContainer){
			this._threads = [];
			this._threadCounter = 0;
			this._threads.push(new Thread());
			
			if (copyOrrootContentContainer instanceof CallStack){
				this._threads = [];
				
				copyOrrootContentContainer._threads.forEach(otherThread => {
					this._threads.push(otherThread.Copy());
				});
			}
			else{
	        	this._threads[0].callstack.push(new Element(PushPopType.Tunnel, copyOrrootContentContainer, 0));
			}
		}
		get currentThread(){
			return this._threads[this._threads.length - 1];
		}
		set currentThread(value){
			if (this._threads.length != 1) console.warn("Shouldn't be directly setting the current thread when we have a stack of them");
			
			this._threads.length = 0;
			this._threads.push(value);
		}
		get callStack(){
			return this.currentThread.callstack;
		}
		get elements(){
			return this.callStack;
		}
		get depth(){
			return this.elements.length;
		}
		get currentElement(){
			return this.callStack[this.callStack.length - 1];
		}
		get currentElementIndex(){
			return this.callStack.length - 1;
		}
		get canPop(){
			return this.callStack.length > 1;
		}
		get canPopThread(){
			return this._threads.length > 1;
		}
		
		CanPop(type){
			if (!this.canPop)
				return false;

			if (type == null)
				return true;

			return this.currentElement.type == type;
		}
		Pop(type){
			if (this.CanPop(type)) {
				this.callStack.pop();
				return;
			} else {
				throw "Mismatched push/pop in Callstack";
			}
		}
		Push(type){
			// When pushing to callstack, maintain the current content path, but jump out of expressions by default
			this.callStack.push(new Element(type, this.currentElement.currentContainer, this.currentElement.currentContentIndex, false));
		}
		PushThread(){
			var newThread = this.currentThread.Copy();
			this._threadCounter++;
			newThread.threadIndex = this._threadCounter;
			this._threads.push(newThread);
		}
		PopThread(){
			if (this.canPopThread) {
				this._threads.splice(this._threads.indexOf(this.currentThread), 1);//should be equivalent to a pop()
			} else {
				throw "Can't pop thread";
			}
		}
		SetJsonToken(token, storyContext){
			this._threads.length = 0;

			var jObject = token;

			var jThreads = jObject["threads"];
			
			jThreads.forEach(jThreadTok => {
				var thread = new Thread(jThreadTok, storyContext);
				this._threads.push(thread);
			});

			this._threadCounter = parseInt(jObject["threadCounter"]);
		}
		GetJsonToken(){
			var jObject = {};

			var jThreads = [];
			this._threads.forEach(thread => {
				jThreads.push(thread.jsonToken);
			});

			jObject["threads"] = jThreads;
			jObject["threadCounter"] = this._threadCounter;

			return jObject;
		}
		GetTemporaryVariableWithName(name, contextIndex){
			contextIndex = (typeof contextIndex === 'undefined') ? -1 : contextIndex;
			
			if (contextIndex == -1) 
				contextIndex = this.currentElementIndex + 1;
			
			var varValue = null;

			var contextElement = this.callStack[contextIndex - 1];

			if (varValue = contextElement.temporaryVariables[name]) {
				return varValue;
			} else {
				return null;
			}
		}
		SetTemporaryVariable(name, value, declareNew, contextIndex){
			contextIndex = (typeof contextIndex === 'undefined') ? -1 : contextIndex;
			
			if (contextIndex == -1) 
				contextIndex = this.currentElementIndex + 1;

			var contextElement = this.callStack[contextIndex - 1];

			if (!declareNew && !contextElement.temporaryVariables[name]) {
				throw new StoryException("Could not find temporary variable to set: " + name);
			}
			
			var oldValue;
			if( oldValue = contextElement.temporaryVariables[name] )
				ListValue.RetainListOriginsForAssignment(oldValue, value);

			contextElement.temporaryVariables[name] = value;
		}
		ContextForVariableNamed(name){
			// Current temporary context?
			// (Shouldn't attempt to access contexts higher in the callstack.)
			if (this.currentElement.temporaryVariables[name]) {
				return this.currentElementIndex + 1;
			} 

			// Global
			else {
				return 0;
			}
		}
		ThreadWithIndex(index){
			var filtered = this._threads.filter(t => {
				if (t.threadIndex == index) return t;
			});
			
			return filtered[0];
		}
	}

	//still needs: 
	// - varchanged events
	// - see if the internal getenumarators are needed
	class VariablesState{
		constructor(callStack, listDefsOrigin){
			this._globalVariables = {};
			this._callStack = callStack;
			this._listDefsOrigin = listDefsOrigin;
			
			this._batchObservingVariableChanges = null;
			this._changedVariables = null;
			
			//the way variableChangedEvent is a bit different than the reference implementation. Originally it uses the C# += operator to add delegates, but in js we need to maintain an actual collection of delegates (ie. callbacks)
			//to register a new one, there is a special ObserveVariableChange method below.
			this.variableChangedEvent = null;
			this.variableChangedEventCallbacks = [];
			
			//if es6 proxies are available, use them.
			try{
				//the proxy is used to allow direct manipulation of global variables. It first tries to access the objetcs own property, and if none is found it delegates the call to the $ method, defined below
				var p = new Proxy(this, {
					get: function(target, name){
						return (name in target) ? target[name] : target.$(name);
					},
					set: function(target, name, value){
						if (name in target) target[name] = value;
						else target.$(name, value);
						return true;//returning a fasly value make sthe trap fail
					}
				});
				
				return p;
			}
			catch(e){
				//thr proxy object is not available in this context. we should warn the dev but writting to the console feels a bit intrusive.
	//			console.log("ES6 Proxy not available - direct manipulation of global variables can't work, use $() instead.");
			}
		}
		get callStack(){
			return this._callStack;
		}
		set callStack(callStack){
			this._callStack = callStack;
		}
		get batchObservingVariableChanges(){
			return this._batchObservingVariableChanges;
		}
		set batchObservingVariableChanges(value){
			value = !!value;
			this._batchObservingVariableChanges = value;
			if (value) {
				this._changedVariables = [];
			} 

			// Finished observing variables in a batch - now send 
			// notifications for changed variables all in one go.
			else {
				if (this._changedVariables != null) {
					this._changedVariables.forEach(variableName => {
						var currentValue = this._globalVariables[variableName];
						this.variableChangedEvent(variableName, currentValue);
					});
				}

				this._changedVariables = null;
			}
		}
		get jsonToken(){
			return JsonSerialisation.DictionaryRuntimeObjsToJObject(this._globalVariables);
		}
		set jsonToken(value){
			this._globalVariables = JsonSerialisation.JObjectToDictionaryRuntimeObjs(value);
		}
		
		/**
		 * This function is specific to the js version of ink. It allows to register a callback that will be called when a variable changes. The original code uses `state.variableChangedEvent += callback` instead.
		 * @param {function} callback 
		 */
		ObserveVariableChange(callback){
			if (this.variableChangedEvent == null){
				this.variableChangedEvent = (variableName, newValue) => {
					this.variableChangedEventCallbacks.forEach(cb => {
						cb(variableName, newValue);
					});
				};
			}
			
			this.variableChangedEventCallbacks.push(callback);
		}
		CopyFrom(toCopy){
			this._globalVariables = Object.assign({}, toCopy._globalVariables);
			
			this.variableChangedEvent = toCopy.variableChangedEvent;

			if (toCopy.batchObservingVariableChanges != this.batchObservingVariableChanges) {

				if (toCopy.batchObservingVariableChanges) {
					this._batchObservingVariableChanges = true;
					this._changedVariables = toCopy._changedVariables;
				} else {
					this._batchObservingVariableChanges = false;
					this._changedVariables = null;
				}
			}
		}
		GetVariableWithName(name,contextIndex){
			if (typeof contextIndex === 'undefined') contextIndex = -1;
			
			var varValue = this.GetRawVariableWithName(name, contextIndex);

			// Get value from pointer?
	//		var varPointer = varValue as VariablePointerValue;
			var varPointer = varValue;
			if (varPointer instanceof VariablePointerValue) {
				varValue = this.ValueAtVariablePointer(varPointer);
			}

			return varValue;
		}
		GetRawVariableWithName(name, contextIndex){
			var varValue = null;

			// 0 context = global
			if (contextIndex == 0 || contextIndex == -1) {
				if ( varValue = this._globalVariables[name] )
					return varValue;
				
				var listItemValue = this._listDefsOrigin.FindSingleItemListWithName(name);
				if (listItemValue)
					return listItemValue;
			}

			// Temporary
			varValue = this._callStack.GetTemporaryVariableWithName(name, contextIndex);

			if (varValue == null)
				throw "RUNTIME ERROR: Variable '"+name+"' could not be found in context '"+contextIndex+"'. This shouldn't be possible so is a bug in the ink engine. Please try to construct a minimal story that reproduces the problem and report to inkle, thank you!";

			return varValue;
		}
		ValueAtVariablePointer(pointer){
			 return this.GetVariableWithName(pointer.variableName, pointer.contextIndex);
		}
		Assign(varAss, value){
			var name = varAss.variableName;
			var contextIndex = -1;

			// Are we assigning to a global variable?
			var setGlobal = false;
			if (varAss.isNewDeclaration) {
				setGlobal = varAss.isGlobal;
			} else {
				setGlobal = !!this._globalVariables[name];
			}

			// Constructing new variable pointer reference
			if (varAss.isNewDeclaration) {
	//			var varPointer = value as VariablePointerValue;
				var varPointer = value;
				if (varPointer instanceof VariablePointerValue) {
					var fullyResolvedVariablePointer = this.ResolveVariablePointer(varPointer);
					value = fullyResolvedVariablePointer;
				}

			} 

			// Assign to existing variable pointer?
			// Then assign to the variable that the pointer is pointing to by name.
			else {

				// De-reference variable reference to point to
				var existingPointer = null;
				do {
	//				existingPointer = GetRawVariableWithName (name, contextIndex) as VariablePointerValue;
					existingPointer = this.GetRawVariableWithName(name, contextIndex);
					if (existingPointer instanceof VariablePointerValue) {
						name = existingPointer.variableName;
						contextIndex = existingPointer.contextIndex;
						setGlobal = (contextIndex == 0);
					}
				} while(existingPointer instanceof VariablePointerValue);
			}


			if (setGlobal) {
				this.SetGlobal(name, value);
			} else {
				this._callStack.SetTemporaryVariable(name, value, varAss.isNewDeclaration, contextIndex);
			}
		}
		RetainListOriginsForAssignment(oldValue, newValue){
	//		var oldList = oldValue as ListValue;
			var oldList = oldValue;
	//		var newList = newValue as ListValue;
			var newList = newValue;
			
			if (oldList instanceof ListValue && newList instanceof ListValue && newList.value.Count == 0)
				newList.value.SetInitialOriginNames(oldList.value.originNames);
		}
		SetGlobal(variableName, value){
			var oldValue = null;
			oldValue = this._globalVariables[variableName];
			
			ListValue.RetainListOriginsForAssignment(oldValue, value);

			this._globalVariables[variableName] = value;

			if (this.variableChangedEvent != null && value !== oldValue) {

				if (this.batchObservingVariableChanges) {
					this._changedVariables.push(variableName);
				} else {
					this.variableChangedEvent(variableName, value);
				}
			}
		}
		ResolveVariablePointer(varPointer){
			var contextIndex = varPointer.contextIndex;

			if( contextIndex == -1 )
				contextIndex = this.GetContextIndexOfVariableNamed(varPointer.variableName);

			var valueOfVariablePointedTo = this.GetRawVariableWithName(varPointer.variableName, contextIndex);

			// Extra layer of indirection:
			// When accessing a pointer to a pointer (e.g. when calling nested or 
			// recursive functions that take a variable references, ensure we don't create
			// a chain of indirection by just returning the final target.
	//		var doubleRedirectionPointer = valueOfVariablePointedTo as VariablePointerValue;
			var doubleRedirectionPointer = valueOfVariablePointedTo;
			if (doubleRedirectionPointer instanceof VariablePointerValue) {
				return doubleRedirectionPointer;
			} 

			// Make copy of the variable pointer so we're not using the value direct from
			// the runtime. Temporary must be local to the current scope.
			else {
				return new VariablePointerValue(varPointer.variableName, contextIndex);
			}
		}
		GetContextIndexOfVariableNamed(varName){
			if (this._globalVariables[varName])
				return 0;

			return this._callStack.currentElementIndex;
		}
		//the original code uses a magic getter and setter for global variables, allowing things like variableState['varname]. This is not quite possible in js without a Proxy, so it is replaced with this $ function.
		$(variableName, value){
			if (typeof value === 'undefined'){
				var varContents = this._globalVariables[variableName];
				if ( typeof varContents !== 'undefined' )
		//			return (varContents as Runtime.Value).valueObject;
					return varContents.valueObject;
				else
					return null;
			}
			else{
				if (typeof this._globalVariables[variableName] === 'undefined'){
					throw new StoryException("Variable '" + variableName + "' doesn't exist, so can't be set.");
				}
				
				var val = Value.Create(value);
				if (val == null) {
					if (value == null) {
						throw new StoryException("Cannot pass null to VariableState");
					} else {
						throw new StoryException("Invalid value passed to VariableState: "+value.toString());
					}
				}

				this.SetGlobal(variableName, val);
			}
		}
	}

	//Taken from https://gist.github.com/blixt/f17b47c62508be59987b
	//Ink uses a seedable PRNG of which there is none in native javascript.
	class PRNG{
		constructor(seed){
			this._seed = seed % 2147483647;
	  		if (this._seed <= 0) this._seed += 2147483646;
		}
		next(){
			return this._seed = this._seed * 16807 % 2147483647;
		}
		nextFloat(){
			return (this.next() - 1) / 2147483646;
		}
	}

	class StoryState{
		constructor(story){		
			//actual constructor
			this.story = story;
			
			this._outputStream = [];
			this._outputStreamTextDirty = true;
			this._outputStreamTagsDirty = true;
			this.OutputStreamDirty();

			this._evaluationStack = [];

			this.callStack = new CallStack(story.rootContentContainer);
			this._variablesState = new VariablesState(this.callStack, story.listDefinitions);

			this._visitCounts = {};
			this._turnIndices = {};
			this._currentTurnIndex = -1;
			
			this.divertedTargetObject = null;

			var timeSeed = (new Date()).getTime();
			this.storySeed = (new PRNG(timeSeed)).next() % 100;
			this.previousRandom = 0;

			this._currentChoices = [];
			this._currentText = null;
			this._currentTags = null;
			this._currentErrors = null;
			
			this.didSafeExit = false;
			
			this._isExternalFunctionEvaluation = false;
			this._originalCallstack = null;
			this._originalEvaluationStackHeight = 0;

			this.GoToStart();
		}
		get currentChoices(){
			// If we can continue generating text content rather than choices,
			// then we reflect the choice list as being empty, since choices
			// should always come at the end.
			if ( this.canContinue ) return [];
			return this._currentChoices;
		}
		get generatedChoices(){
			return this._currentChoices;
		}
		get currentErrors(){
			return this._currentErrors;
		}
		get visitCounts(){
			return this._visitCounts;
		}
		get turnIndices(){
			return this._turnIndices;
		}
		get currentTurnIndex(){
			return this._currentTurnIndex;
		}
		get variablesState(){
			return this._variablesState;
		}
		get currentContentObject(){
			return this.callStack.currentElement.currentObject;
		}
		set currentContentObject(value){
			this.callStack.currentElement.currentObject = value;
		}
		get canContinue(){
			return this.currentContentObject != null && !this.hasError;
		}
		get hasError(){
			return this.currentErrors != null && this.currentErrors.length > 0;
		}
		get inExpressionEvaluation(){
			return this.callStack.currentElement.inExpressionEvaluation;
		}
		set inExpressionEvaluation(value){
			this.callStack.currentElement.inExpressionEvaluation = value;
		}
		get evaluationStack(){
			return this._evaluationStack;
		}
		get outputStreamEndsInNewline(){
			if (this._outputStream.length > 0) {

				for (var i = this._outputStream.length - 1; i >= 0; i--) {
					var obj = this._outputStream[i];
					if (obj instanceof ControlCommand) // e.g. BeginString
						break;
					var text = this._outputStream[i];
					if (text instanceof StringValue) {
						if (text.isNewline)
							return true;
						else if (text.isNonWhitespace)
							break;
					}
				}
			}

			return false;
		}
		get outputStreamContainsContent(){
			for (var i = 0; i < this._outputStream.length; i++){
				if (this._outputStream[i] instanceof StringValue)
					return true;
			}
			return false;
		}
		get currentGlueIndex(){
			for (var i = this._outputStream.length - 1; i >= 0; i--) {
				var c = this._outputStream[i];
	//			var glue = c as Glue;
				var glue = c;
				if (glue instanceof Glue)
					return i;
				else if (c instanceof ControlCommand) // e.g. BeginString
					break;
			}
			return -1;
		}
		get currentRightGlue(){
			for (var i = this._outputStream.length - 1; i >= 0; i--) {
				var c = this._outputStream[i];
	//			var glue = c as Glue;
				var glue = c;
				if (glue instanceof Glue && glue.isRight)
					return glue;
				else if (c instanceof ControlCommand) // e.g. BeginString
					break;
			}
			return null;
		}
		get inStringEvaluation(){
			for (var i = this._outputStream.length - 1; i >= 0; i--) {
	//			var cmd = this._outputStream[i] as ControlCommand;
				var cmd = this._outputStream[i];
				if (cmd instanceof ControlCommand && cmd.commandType == ControlCommand.CommandType.BeginString) {
					return true;
				}
			}

			return false;
		}
		get currentText(){
			if( this._outputStreamTextDirty ) {
				var sb = new StringBuilder();

				this._outputStream.forEach(outputObj => {
		//			var textContent = outputObj as StringValue;
					var textContent = outputObj;
					if (textContent instanceof StringValue) {
						sb.Append(textContent.value);
					}
				});

				this._currentText = sb.toString();
				this._outputStreamTextDirty = false;
			}
			
			return this._currentText;
		}
		get currentTags(){
			if( this._outputStreamTagsDirty ) {
				this._currentTags = [];

				this._outputStream.forEach(outputObj => {
		//			var tag = outputObj as Tag;
					var tag = outputObj;
					if (tag instanceof Tag) {
						this._currentTags.push(tag.text);
					}
				});
				
				this._outputStreamTagsDirty = false;
			}
			
			return this._currentTags;
		}
		get outputStream(){
			return this._outputStream;
		}
		get currentPath(){
			if (this.currentContentObject == null)
				return null;

			return this.currentContentObject.path;
		}
		set currentPath(value){
			if (value != null)
				this.currentContentObject = this.story.ContentAtPath(value);
			else
				this.currentContentObject = null;
		}
		get currentContainer(){
			return this.callStack.currentElement.currentContainer;
		}
		get previousContentObject(){
			return this.callStack.currentThread.previousContentObject;
		}
		set previousContentObject(value){
			this.callStack.currentThread.previousContentObject = value;
		}
		get callstackDepth(){
			return this.callStack.depth;
		}
		get jsonToken(){
			var obj = {};

			var choiceThreads = null;
			this._currentChoices.forEach(c => {
				c.originalChoicePath = c.choicePoint.path.componentsString;
				c.originalThreadIndex = c.threadAtGeneration.threadIndex;

				if( this.callStack.ThreadWithIndex(c.originalThreadIndex) == null ) {
					if( choiceThreads == null )
						choiceThreads = {};

					choiceThreads[c.originalThreadIndex.toString()] = c.threadAtGeneration.jsonToken;
				}
			});
			
			if( this.choiceThreads != null )
				obj["choiceThreads"] = this.choiceThreads;


			obj["callstackThreads"] = this.callStack.GetJsonToken();
			obj["variablesState"] = this.variablesState.jsonToken;

			obj["evalStack"] = JsonSerialisation.ListToJArray(this.evaluationStack);

			obj["outputStream"] = JsonSerialisation.ListToJArray(this._outputStream);

			obj["currentChoices"] = JsonSerialisation.ListToJArray(this._currentChoices);
			
			if( this.divertedTargetObject != null )
				obj["currentDivertTarget"] = this.divertedTargetObject.path.componentsString;

			obj["visitCounts"] = JsonSerialisation.IntDictionaryToJObject(this.visitCounts);
			obj["turnIndices"] = JsonSerialisation.IntDictionaryToJObject(this.turnIndices);
			obj["turnIdx"] = this.currentTurnIndex;
			obj["storySeed"] = this.storySeed;

			obj["inkSaveVersion"] = StoryState.kInkSaveStateVersion;

			// Not using this right now, but could do in future.
			obj["inkFormatVersion"] = this.story.inkVersionCurrent;

			return obj;
		}
		set jsonToken(value){
			var jObject = value;

			var jSaveVersion = jObject["inkSaveVersion"];
			if (jSaveVersion == null) {
				throw new StoryException("ink save format incorrect, can't load.");
			}
			else if (parseInt(jSaveVersion) < StoryState.kMinCompatibleLoadVersion) {
				throw new StoryException("Ink save format isn't compatible with the current version (saw '"+jSaveVersion+"', but minimum is "+StoryState.kMinCompatibleLoadVersion+"), so can't load.");
			}

			this.callStack.SetJsonToken(jObject["callstackThreads"], this.story);
			this.variablesState.jsonToken = jObject["variablesState"];

			this._evaluationStack = JsonSerialisation.JArrayToRuntimeObjList(jObject["evalStack"]);

			this._outputStream = JsonSerialisation.JArrayToRuntimeObjList(jObject["outputStream"]);
			this.OutputStreamDirty();

	//		currentChoices = Json.JArrayToRuntimeObjList<Choice>((JArray)jObject ["currentChoices"]);
			this._currentChoices = JsonSerialisation.JArrayToRuntimeObjList(jObject["currentChoices"]);

			var currentDivertTargetPath = jObject["currentDivertTarget"];
			if (currentDivertTargetPath != null) {
				var divertPath = new Path$1(currentDivertTargetPath.toString());
				this.divertedTargetObject = this.story.ContentAtPath(divertPath);
			}

			this._visitCounts = JsonSerialisation.JObjectToIntDictionary(jObject["visitCounts"]);
			this._turnIndices = JsonSerialisation.JObjectToIntDictionary(jObject["turnIndices"]);
			this._currentTurnIndex = parseInt(jObject["turnIdx"]);
			this.storySeed = parseInt(jObject["storySeed"]);

	//		var jChoiceThreads = jObject["choiceThreads"] as JObject;
			var jChoiceThreads = jObject["choiceThreads"];
			
			this._currentChoices.forEach(c => {
				c.choicePoint = this.story.ContentAtPath(new Path$1(c.originalChoicePath));

				var foundActiveThread = this.callStack.ThreadWithIndex(c.originalThreadIndex);
				if( foundActiveThread != null ) {
					c.threadAtGeneration = foundActiveThread;
				} else {
					var jSavedChoiceThread = jChoiceThreads[c.originalThreadIndex.toString()];
					c.threadAtGeneration = new CallStack.Thread(jSavedChoiceThread, this.story);
				}
			});
		}
		
		MatchRightGlueForLeftGlue(leftGlue){
			if (!leftGlue.isLeft) return null;
			
			for (var i = this._outputStream.length - 1; i >= 0; i--) {
				var c = this._outputStream[i];
	//			var g = c as Glue;
				var g = c;
				if (g instanceof Glue && g.isRight && g.parent == leftGlue.parent) {
					return g;
				} else if (c instanceof ControlCommand) // e.g. BeginString
					break;
			}
			
			return null;
		}
		GoToStart(){
			this.callStack.currentElement.currentContainer = this.story.mainContentContainer;
	        this.callStack.currentElement.currentContentIndex = 0;
		}
		ResetErrors(){
			this._currentErrors = null;
		}
		ResetOutput(){
			this._outputStream.length = 0;
			this.OutputStreamDirty();
		}
		PushEvaluationStack(obj){
	//		var listValue = obj as ListValue;
			var listValue = obj;
			if (listValue instanceof ListValue) {

				// Update origin when list is has something to indicate the list origin
				var rawList = listValue.value;
				var names = rawList.originNames;
				if (names != null) {
					var origins = [];
					
					names.forEach((n)=>{
						var def = null;
						def = this.story.listDefinitions.TryGetDefinition(n, def);
						if( origins.indexOf(def) < 0 )
							origins.push(def);
					});

					rawList.origins = origins;
				}
			}
			
			this.evaluationStack.push(obj);
		}
		PopEvaluationStack(numberOfObjects){
			if (!numberOfObjects){
				var obj = this.evaluationStack.pop();
				return obj;
			}
			else{
				if(numberOfObjects > this.evaluationStack.length) {
	                throw "trying to pop too many objects";
	            }

	            var popped = this.evaluationStack.splice(this.evaluationStack.length - numberOfObjects, numberOfObjects);
	            return popped;
			}
		}
		PeekEvaluationStack(){
			 return this.evaluationStack[this.evaluationStack.length - 1];
		}
		PushToOutputStream(obj){
	//		var text = obj as StringValue;
			var text = obj;
			if (text instanceof StringValue) {
				var listText = this.TrySplittingHeadTailWhitespace(text);
				if (listText != null) {
					listText.forEach(textObj => {
						this.PushToOutputStreamIndividual(textObj);	
					});
					return;
				}
			}

			this.PushToOutputStreamIndividual(obj);
			this.OutputStreamDirty();
		}
		TrySplittingHeadTailWhitespace(single){
			var str = single.value;

			var headFirstNewlineIdx = -1;
			var headLastNewlineIdx = -1;
			for (var i = 0; i < str.length; ++i) {
				var c = str[i];
				if (c == '\n') {
					if (headFirstNewlineIdx == -1)
						headFirstNewlineIdx = i;
					headLastNewlineIdx = i;
				}
				else if (c == ' ' || c == '\t')
					continue;
				else
					break;
			}

			var tailLastNewlineIdx = -1;
			var tailFirstNewlineIdx = -1;
			for (var i = 0; i < str.length; ++i) {
				var c = str[i];
				if (c == '\n') {
					if (tailLastNewlineIdx == -1)
						tailLastNewlineIdx = i;
					tailFirstNewlineIdx = i;
				}
				else if (c == ' ' || c == '\t')
					continue;
				else
					break;
			}

			// No splitting to be done?
			if (headFirstNewlineIdx == -1 && tailLastNewlineIdx == -1)
				return null;

			var listTexts = [];
			var innerStrStart = 0;
			var innerStrEnd = str.length;

			if (headFirstNewlineIdx != -1) {
				if (headFirstNewlineIdx > 0) {
					var leadingSpaces = str.substring(0, headFirstNewlineIdx);
					listTexts.push(leadingSpaces);
				}
				listTexts.push(new StringValue("\n"));
				innerStrStart = headLastNewlineIdx + 1;
			}

			if (tailLastNewlineIdx != -1) {
				innerStrEnd = tailFirstNewlineIdx;
			}

			if (innerStrEnd > innerStrStart) {
				var innerStrText = str.substring(innerStrStart, innerStrEnd - innerStrStart);
				listTexts.push(new StringValue(innerStrText));
			}

			if (tailLastNewlineIdx != -1 && tailFirstNewlineIdx > headLastNewlineIdx) {
				listTexts.push(new StringValue("\n"));
				if (tailLastNewlineIdx < str.length - 1) {
					var numSpaces = (str.Length - tailLastNewlineIdx) - 1;
					var trailingSpaces = new StringValue(str.substring(tailLastNewlineIdx + 1, numSpaces));
					listTexts.push(trailingSpaces);
				}
			}

			return listTexts;
		}
		PushToOutputStreamIndividual(obj){
			var glue = obj;
			var text = obj;

			var includeInOutput = true;

			if (glue instanceof Glue) {
				// Found matching left-glue for right-glue? Close it.
				var existingRightGlue = this.currentRightGlue;
				var foundMatchingLeftGlue = !!(glue.isLeft && existingRightGlue && glue.parent == existingRightGlue.parent);
				var matchingRightGlue = null;
				
				if (glue.isLeft)
					matchingRightGlue = this.MatchRightGlueForLeftGlue(glue);

				// Left/Right glue is auto-generated for inline expressions 
				// where we want to absorb newlines but only in a certain direction.
				// "Bi" glue is written by the user in their ink with <>
				if (glue.isLeft || glue.isBi) {
					this.TrimNewlinesFromOutputStream(matchingRightGlue);
				}

				includeInOutput = glue.isBi || glue.isRight;
			}

			else if( text instanceof StringValue ) {

				if (this.currentGlueIndex != -1) {

					// Absorb any new newlines if there's existing glue
					// in the output stream.
					// Also trim any extra whitespace (spaces/tabs) if so.
					if (text.isNewline) {
						this.TrimFromExistingGlue();
						includeInOutput = false;
					} 

					// Able to completely reset when 
					else if (text.isNonWhitespace) {
						this.RemoveExistingGlue();
					}
				} else if (text.isNewline) {
					if (this.outputStreamEndsInNewline || !this.outputStreamContainsContent)
						includeInOutput = false;
				}
			}

			if (includeInOutput) {
				this._outputStream.push(obj);
				this.OutputStreamDirty();
			}
		}
		TrimNewlinesFromOutputStream(rightGlueToStopAt){
			var removeWhitespaceFrom = -1;
			var rightGluePos = -1;
			var foundNonWhitespace = false;

			// Work back from the end, and try to find the point where
			// we need to start removing content. There are two ways:
			//  - Start from the matching right-glue (because we just saw a left-glue)
			//  - Simply work backwards to find the first newline in a string of whitespace
			var i = this._outputStream.length-1;
			while (i >= 0) {
				var obj = this._outputStream[i];
	//			var cmd = obj as ControlCommand;
				var cmd = obj;
	//			var txt = obj as StringValue;
				var txt = obj;
	//			var glue = obj as Glue;
				var glue = obj;

				if (cmd instanceof ControlCommand || (txt instanceof StringValue && txt.isNonWhitespace)) {
					foundNonWhitespace = true;
					if( rightGlueToStopAt == null )
						break;
				} else if (rightGlueToStopAt && glue instanceof Glue && glue == rightGlueToStopAt) {
					rightGluePos = i;
					break;
				} else if (txt instanceof StringValue && txt.isNewline && !foundNonWhitespace) {
					removeWhitespaceFrom = i;
				}
				i--;
			}

			// Remove the whitespace
			if (removeWhitespaceFrom >= 0) {
				i=removeWhitespaceFrom;
				while(i < this._outputStream.length) {
	//				var text = _outputStream [i] as StringValue;
					var text = this._outputStream[i];
					if (text instanceof StringValue) {
						this._outputStream.splice(i, 1);
					} else {
						i++;
					}
				}
			}

			if (rightGlueToStopAt && rightGluePos > -1) {
				i = rightGluePos;
				while(i < this._outputStream.length) {
					if (this._outputStream[i] instanceof Glue && (this._outputStream[i]).isRight) {
						this.outputStream.splice(i, 1);
					} else {
						i++;
					}
				}
			}
			
			this.OutputStreamDirty();
		}
		TrimFromExistingGlue(){
			var i = this.currentGlueIndex;
			while (i < this._outputStream.length) {
	//			var txt = _outputStream [i] as StringValue;
				var txt = this._outputStream[i];
				if (txt instanceof StringValue && !txt.isNonWhitespace)
					this._outputStream.splice(i, 1);
				else
					i++;
			}
			
			this.OutputStreamDirty();
		}
		RemoveExistingGlue(){
			for (var i = this._outputStream.length - 1; i >= 0; i--) {
				var c = this._outputStream[i];
				if (c instanceof Glue) {
					this._outputStream.splice(i, 1);
				} else if( c instanceof ControlCommand ) { // e.g. BeginString
					break;
				}
			}
			
			this.OutputStreamDirty();
		}
		ForceEnd(){
			while (this.callStack.canPopThread)
				this.callStack.PopThread();

			while (this.callStack.canPop)
				this.callStack.Pop();

			this._currentChoices.length = 0;
			
			this.currentContentObject = null;
			this.previousContentObject = null;

			this.didSafeExit = true;
		}
		SetChosenPath(path){
			// Changing direction, assume we need to clear current set of choices
			this._currentChoices.length = 0;

			this.currentPath = path;

			this._currentTurnIndex++;
		}
		StartExternalFunctionEvaluation(funcContainer, args){
			 // We'll start a new callstack, so keep hold of the original,
			// as well as the evaluation stack so we know if the function 
			// returned something
			this._originalCallstack = this.callStack;
			this._originalEvaluationStackHeight = this.evaluationStack.length;

			// Create a new base call stack element.
			this.callStack = new CallStack(funcContainer);
			this.callStack.currentElement.type = PushPopType.Function;
			
			this._variablesState.callStack = this.callStack;

			// By setting ourselves in external function evaluation mode,
			// we're saying it's okay to end the flow without a Done or End,
			// but with a ~ return instead.
			this._isExternalFunctionEvaluation = true;
			
			this.PassArgumentsToEvaluationStack(args);
		}
		PassArgumentsToEvaluationStack(args){
			// Pass arguments onto the evaluation stack
			if (args != null) {
				for (var i = 0; i < args.length; i++) {
					if (!(typeof args[i] === 'number' || typeof args[i] === 'string')) {
						throw "ink arguments when calling EvaluateFunction / ChoosePathStringWithParameters  must be int, float or string";
					}

					this.PushEvaluationStack(Value.Create(args[i]));
				}
			}
		}
		TryExitExternalFunctionEvaluation(){
			if (this._isExternalFunctionEvaluation && this.callStack.elements.length == 1 && this.callStack.currentElement.type == PushPopType.Function) {
				this.currentContentObject = null;
				this.didSafeExit = true;
				return true;
			}

			return false;
		}
		CompleteExternalFunctionEvaluation(){
			// Do we have a returned value?
			// Potentially pop multiple values off the stack, in case we need
			// to clean up after ourselves (e.g. caller of EvaluateFunction may 
			// have passed too many arguments, and we currently have no way to check for that)
			var returnedObj = null;
			while (this.evaluationStack.length > this._originalEvaluationStackHeight) {
				var poppedObj = this.PopEvaluationStack();
				if (returnedObj == null)
					returnedObj = poppedObj;
			}
			
			// Restore our own state
			this.callStack = this._originalCallstack;
			this._originalCallstack = null;
			this._originalEvaluationStackHeight = 0;
			
			this._variablesState.callStack = this.callStack;

			if (returnedObj) {
				if (returnedObj instanceof Void)
					return null;

				// Some kind of value, if not void
	//			var returnVal = returnedObj as Runtime.Value;
				var returnVal = returnedObj;

				// DivertTargets get returned as the string of components
				// (rather than a Path, which isn't public)
				if (returnVal.valueType == ValueType.DivertTarget) {
					return returnVal.valueObject.toString();
				}

				// Other types can just have their exact object type:
				// int, float, string. VariablePointers get returned as strings.
				return returnVal.valueObject;
			}

			return null;
		}
		AddError(message){
			if (this._currentErrors == null) {
				this._currentErrors = [];
			}

			this._currentErrors.push(message);
		}
		OutputStreamDirty(){
			this._outputStreamTextDirty = true;
			this._outputStreamTagsDirty = true;
		}
		VisitCountAtPathString(pathString){
			var visitCountOut;
			if (visitCountOut = this.visitCounts[pathString])
				return visitCountOut;

			return 0;
		}
		Copy(){
			var copy = new StoryState(this.story);

			copy.outputStream.push.apply(copy.outputStream, this._outputStream);
			this.OutputStreamDirty();
			
			copy._currentChoices.push.apply(copy._currentChoices, this._currentChoices);

			if (this.hasError) {
				copy.currentErrors = [];
				copy.currentErrors.push.apply(copy.currentErrors, this.currentErrors);
			}

			copy.callStack = new CallStack(this.callStack);
			if (this._originalCallstack) copy._originalCallstack = new CallStack(this._originalCallstack);
			
			copy._variablesState = new VariablesState(copy.callStack, this.story.listDefinitions);
			copy.variablesState.CopyFrom(this.variablesState);

			copy.evaluationStack.push.apply(copy.evaluationStack, this.evaluationStack);
	    copy._originalEvaluationStackHeight = this._originalEvaluationStackHeight;

			if (this.divertedTargetObject != null)
				copy.divertedTargetObject = this.divertedTargetObject;

			copy.previousContentObject = this.previousContentObject;
			
			copy._isExternalFunctionEvaluation = this._isExternalFunctionEvaluation;
			
			copy._visitCounts = {};
			for (var keyValue in this._visitCounts) {
			      	copy._visitCounts[keyValue] = this._visitCounts[keyValue];
			}
			copy._turnIndices = {};
			for (var keyValue in this._turnIndices) {
				copy._turnIndices[keyValue] = this._turnIndices[keyValue];
			}
	  		
			copy._currentTurnIndex = this.currentTurnIndex;
			copy.storySeed = this.storySeed;
			copy.previousRandom = this.previousRandom;

			copy.didSafeExit = this.didSafeExit;

			return copy;
		}
		
		toJson(indented){
			return JSON.stringify(this.jsonToken, null, (indented) ? 2 : 0);
		}
		LoadJson(jsonString){
			this.jsonToken = JSON.parse(jsonString);
		}
	}

	StoryState.kInkSaveStateVersion = 7;
	StoryState.kMinCompatibleLoadVersion = 6;

	if (!Number.isInteger) {
		Number.isInteger = function isInteger (nVal) {
			return typeof nVal === "number" && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal;
		};
	}

	class Story extends Object$1{
		constructor(jsonString, lists){
			super();
			
			lists = lists || null;
			
			this.inkVersionCurrent = 17;
			this.inkVersionMinimumCompatible = 16;
			
			this._variableObservers = null;
			this._externals = {};
			this._prevContainerSet = null;
			this._listDefinitions = null;
			
			if (jsonString instanceof Container){
				this._mainContentContainer = jsonString;
				
				if (lists != null)
					this._listDefinitions = new ListDefinitionsOrigin(lists);
			}
			else{
				//the original version only accepts a string as a constructor, but this is javascript and it's almost easier to get a JSON value than a string, so we're silently accepting both
				var rootObject = (typeof jsonString === 'string') ? JSON.parse(jsonString) : jsonString;

				var versionObj = rootObject["inkVersion"];
				if (versionObj == null)
					throw "ink version number not found. Are you sure it's a valid .ink.json file?";

				var formatFromFile = parseInt(versionObj);
				if (formatFromFile > this.inkVersionCurrent){
					throw "Version of ink used to build story was newer than the current verison of the engine";
				}
				else if (formatFromFile < this.inkVersionMinimumCompatible){
					throw "Version of ink used to build story is too old to be loaded by this verison of the engine";
				}
				else if (formatFromFile != this.inkVersionCurrent){
					console.warn("WARNING: Version of ink used to build story doesn't match current version of engine. Non-critical, but recommend synchronising.");
				}

				var rootToken = rootObject["root"];
				if (rootToken == null)
					throw "Root node for ink not found. Are you sure it's a valid .ink.json file?";
				
				var listDefsObj;
	            if (listDefsObj = rootObject["listDefs"]) {
	                this._listDefinitions = JsonSerialisation.JTokenToListDefinitions(listDefsObj);
	            }

				this._mainContentContainer = JsonSerialisation.JTokenToRuntimeObject(rootToken);

				this._hasValidatedExternals = null;
				this.allowExternalFunctionFallbacks = false;

				this.ResetState();
			}
		}
		
		get currentChoices(){
			// Don't include invisible choices for external usage.
			var choices = [];
			
			this._state.currentChoices.forEach(c => {
				if (!c.choicePoint.isInvisibleDefault) {
					c.index = choices.length;
					choices.push(c);
				}
			});
			
			return choices;
		}
		get currentText(){
			return this.state.currentText;
		}
		get currentTags(){
			return this.state.currentTags;
		}
		get currentErrors(){
			return this.state.currentErrors;
		}
		get hasError(){
			return this.state.hasError;
		}
		get variablesState(){
			return this.state.variablesState;
		}
		get listDefinitions (){
			return this._listDefinitions;
		}
		get state(){
			return this._state;
		}
		
		get mainContentContainer(){
			if (this._temporaryEvaluationContainer) {
				return this._temporaryEvaluationContainer;
			} else {
				return this._mainContentContainer;
			}
		}
		get canContinue(){
			return this.state.canContinue;
		}
		
		get globalTags(){
			return this.TagsAtStartOfFlowContainerWithPathString("");
		}
		
		ToJsonString(){
			var rootContainerJsonList = JsonSerialisation.RuntimeObjectToJToken(this._mainContentContainer);

			var rootObject = {};
			rootObject["inkVersion"] = this.inkVersionCurrent;
			rootObject["root"] = rootContainerJsonList;
			
			if (this._listDefinitions != null)
				rootObject["listDefs"] = JsonSerialisation.ListDefinitionsToJToken(this._listDefinitions);

			return JSON.stringify(rootObject);
		}
		ResetState(){
			this._state = new StoryState(this);
			this._state.variablesState.ObserveVariableChange(this.VariableStateDidChangeEvent.bind(this));
			
			this.ResetGlobals();
		}
		ResetErrors(){
			this._state.ResetErrors();
		}
		ResetCallstack(){
			this._state.ForceEnd();
		}
		ResetGlobals(){
			if (this._mainContentContainer.namedContent["global decl"]){
				var originalPath = this.state.currentPath;

				this.ChoosePathString("global decl");

				// Continue, but without validating external bindings,
				// since we may be doing this reset at initialisation time.
				this.ContinueInternal();

				this.state.currentPath = originalPath;
			}
		}
		Continue(){
			if (!this._hasValidatedExternals)
				this.ValidateExternalBindings();

			return this.ContinueInternal();
		}
		ContinueInternal(){
			if (!this.canContinue) {
				throw new StoryException("Can't continue - should check canContinue before calling Continue");
			}

			this._state.ResetOutput();

			this._state.didSafeExit = false;

			this._state.variablesState.batchObservingVariableChanges = true;

			try {

				var stateAtLastNewline = null;

				// The basic algorithm here is:
				//
				//     do { Step() } while( canContinue && !outputStreamEndsInNewline );
				//
				// But the complexity comes from:
				//  - Stepping beyond the newline in case it'll be absorbed by glue later
				//  - Ensuring that non-text content beyond newlines are generated - i.e. choices,
				//    which are actually built out of text content.
				// So we have to take a snapshot of the state, continue prospectively,
				// and rewind if necessary.
				// This code is slightly fragile :-/ 
				//

				do {

					// Run main step function (walks through content)
					this.Step();

					// Run out of content and we have a default invisible choice that we can follow?
					if( !this.canContinue ) {
						this.TryFollowDefaultInvisibleChoice();
					}

					// Don't save/rewind during string evaluation, which is e.g. used for choices
					if( !this.state.inStringEvaluation ) {

						// We previously found a newline, but were we just double checking that
						// it wouldn't immediately be removed by glue?
						if( stateAtLastNewline != null ) {

							// Cover cases that non-text generated content was evaluated last step
							var currText = this.currentText;
							var prevTextLength = stateAtLastNewline.currentText.length;
							var prevTagCount = stateAtLastNewline.currentTags.length;

							// Output has been extended?
							if( currText !== stateAtLastNewline.currentText || prevTagCount != this.currentTags.length ) {

								// Original newline still exists?
								if( currText.length >= prevTextLength && currText[prevTextLength-1] == '\n' ) {

									this.RestoreStateSnapshot(stateAtLastNewline);
									break;
								}

								// Newline that previously existed is no longer valid - e.g.
								// glue was encounted that caused it to be removed.
								else {
									stateAtLastNewline = null;
								}
							}

						}

						// Current content ends in a newline - approaching end of our evaluation
						if( this.state.outputStreamEndsInNewline ) {

							// If we can continue evaluation for a bit:
							// Create a snapshot in case we need to rewind.
							// We're going to continue stepping in case we see glue or some
							// non-text content such as choices.
							if( this.canContinue ) {
									// Don't bother to record the state beyond the current newline.
									// e.g.:
									// Hello world\n			// record state at the end of here
									// ~ complexCalculation()   // don't actually need this unless it generates text
									if( stateAtLastNewline == null ) {
	                                	stateAtLastNewline = this.StateSnapshot();
									}	
							} 

							// Can't continue, so we're about to exit - make sure we
							// don't have an old state hanging around.
							else {
								stateAtLastNewline = null;
							}

						}

					}

				} while(this.canContinue);

				// Need to rewind, due to evaluating further than we should?
				if( stateAtLastNewline != null ) {
					this.RestoreStateSnapshot(stateAtLastNewline);
				}

				// Finished a section of content / reached a choice point?
				if( !this.canContinue ) {

					if( this.state.callStack.canPopThread ) {
						this.Error("Thread available to pop, threads should always be flat by the end of evaluation?");
					}

					if( this.state.generatedChoices.length == 0 && !this.state.didSafeExit && this._temporaryEvaluationContainer == null) {
						if( this.state.callStack.CanPop(PushPopType.Tunnel) ) {
							this.Error("unexpectedly reached end of content. Do you need a '->->' to return from a tunnel?");
						} else if( this.state.callStack.CanPop(PushPopType.Function) ) {
							this.Error("unexpectedly reached end of content. Do you need a '~ return'?");
						} else if( !this.state.callStack.canPop ) {
							this.Error("ran out of content. Do you need a '-> DONE' or '-> END'?");
						} else {
							this.Error("unexpectedly reached end of content for unknown reason. Please debug compiler!");
						}
					}

				}


			} catch(e) {
				throw e;
				this.AddError(e.Message, e.useEndLineNumber);
			} finally {
				this.state.didSafeExit = false;
				
				this._state.variablesState.batchObservingVariableChanges = false;
			}

			return this.currentText;
		}
		ContinueMaximally(){
			var sb = new StringBuilder();

			while (this.canContinue) {
				sb.Append(this.Continue());
			}

			return sb.toString();
		}
		ContentAtPath(path){
			return this.mainContentContainer.ContentAtPath(path);
		}
		StateSnapshot(){
			return this.state.Copy();
		}
		RestoreStateSnapshot(state){
			this._state = state;
		}
		Step(){
			var shouldAddToStream = true;

			// Get current content
			var currentContentObj = this.state.currentContentObject;
			if (currentContentObj == null) {
				return;
			}
			// Step directly to the first element of content in a container (if necessary)
	//		Container currentContainer = currentContentObj as Container;
			var currentContainer = currentContentObj;
			while(currentContainer instanceof Container) {

				// Mark container as being entered
				this.VisitContainer(currentContainer, true);

				// No content? the most we can do is step past it
				if (currentContainer.content.length == 0)
					break;

				currentContentObj = currentContainer.content[0];
				this.state.callStack.currentElement.currentContentIndex = 0;
				this.state.callStack.currentElement.currentContainer = currentContainer;

	//			currentContainer = currentContentObj as Container;
				currentContainer = currentContentObj;
			}
			currentContainer = this.state.callStack.currentElement.currentContainer;

			// Is the current content object:
			//  - Normal content
			//  - Or a logic/flow statement - if so, do it
			// Stop flow if we hit a stack pop when we're unable to pop (e.g. return/done statement in knot
			// that was diverted to rather than called as a function)
			var isLogicOrFlowControl = this.PerformLogicAndFlowControl(currentContentObj);

			// Has flow been forced to end by flow control above?
			if (this.state.currentContentObject == null) {
				return;
			}

			if (isLogicOrFlowControl) {
				shouldAddToStream = false;
			}

			// Choice with condition?
	//		var choicePoint = currentContentObj as ChoicePoint;
			var choicePoint = currentContentObj;
			if (choicePoint instanceof ChoicePoint) {
				var choice = this.ProcessChoice(choicePoint);
				if (choice) {
					this.state.generatedChoices.push(choice);
				}

				currentContentObj = null;
				shouldAddToStream = false;
			}

			// If the container has no content, then it will be
			// the "content" itself, but we skip over it.
			if (currentContentObj instanceof Container) {
				shouldAddToStream = false;
			}

			// Content to add to evaluation stack or the output stream
			if (shouldAddToStream) {

				// If we're pushing a variable pointer onto the evaluation stack, ensure that it's specific
				// to our current (possibly temporary) context index. And make a copy of the pointer
				// so that we're not editing the original runtime object.
	//			var varPointer = currentContentObj as VariablePointerValue;
				var varPointer = currentContentObj;
				if (varPointer instanceof VariablePointerValue && varPointer.contextIndex == -1) {

					// Create new object so we're not overwriting the story's own data
					var contextIdx = this.state.callStack.ContextForVariableNamed(varPointer.variableName);
					currentContentObj = new VariablePointerValue(varPointer.variableName, contextIdx);
				}

				// Expression evaluation content
				if (this.state.inExpressionEvaluation) {
					this.state.PushEvaluationStack(currentContentObj);
				}
				// Output stream content (i.e. not expression evaluation)
				else {
					this.state.PushToOutputStream(currentContentObj);
				}
			}

			// Increment the content pointer, following diverts if necessary
			this.NextContent();

			// Starting a thread should be done after the increment to the content pointer,
			// so that when returning from the thread, it returns to the content after this instruction.
	//		var controlCmd = currentContentObj as ControlCommand;
			var controlCmd = currentContentObj;
			if (controlCmd instanceof ControlCommand && controlCmd.commandType == ControlCommand.CommandType.StartThread) {
				this.state.callStack.PushThread();
			}
		}
		VisitContainer(container, atStart){
			if (!container.countingAtStartOnly || atStart) {
				if (container.visitsShouldBeCounted)
					this.IncrementVisitCountForContainer(container);

				if (container.turnIndexShouldBeCounted)
					this.RecordTurnIndexVisitToContainer(container);
			}
		}
		VisitChangedContainersDueToDivert(){
			var previousContentObject = this.state.previousContentObject;
			var newContentObject = this.state.currentContentObject;
			
			if (!newContentObject)
				return;
	            
			// First, find the previously open set of containers
			this._prevContainerSet = [];
			if (previousContentObject) {
	//			Container prevAncestor = previousContentObject as Container ?? previousContentObject.parent as Container;
				var prevAncestor = (previousContentObject instanceof Container) ? previousContentObject : previousContentObject.parent;
				while (prevAncestor instanceof Container) {
					this._prevContainerSet.push(prevAncestor);
	//				prevAncestor = prevAncestor.parent as Container;
					prevAncestor = prevAncestor.parent;
				}
			}

			// If the new object is a container itself, it will be visited automatically at the next actual
			// content step. However, we need to walk up the new ancestry to see if there are more new containers
			var currentChildOfContainer = newContentObject;
	//		Container currentContainerAncestor = currentChildOfContainer.parent as Container;
			var currentContainerAncestor = currentChildOfContainer.parent;
			while (currentContainerAncestor instanceof Container && this._prevContainerSet.indexOf(currentContainerAncestor) < 0) {

				// Check whether this ancestor container is being entered at the start,
				// by checking whether the child object is the first.
				var enteringAtStart = currentContainerAncestor.content.length > 0 
					&& currentChildOfContainer == currentContainerAncestor.content[0];

				// Mark a visit to this container
				this.VisitContainer(currentContainerAncestor, enteringAtStart);

				currentChildOfContainer = currentContainerAncestor;
	//			currentContainerAncestor = currentContainerAncestor.parent as Container;
				currentContainerAncestor = currentContainerAncestor.parent;
			}
		}
		ProcessChoice(choicePoint){
			var showChoice = true;

			// Don't create choice if choice point doesn't pass conditional
			if (choicePoint.hasCondition) {
				var conditionValue = this.state.PopEvaluationStack();
				if (!this.IsTruthy(conditionValue)) {
					showChoice = false;
				}
			}

			var startText = "";
			var choiceOnlyText = "";

			if (choicePoint.hasChoiceOnlyContent) {
	//			var choiceOnlyStrVal = state.PopEvaluationStack () as StringValue;
				var choiceOnlyStrVal = this.state.PopEvaluationStack();
				choiceOnlyText = choiceOnlyStrVal.value;
			}

			if (choicePoint.hasStartContent) {
	//			var startStrVal = state.PopEvaluationStack () as StringValue;
				var startStrVal = this.state.PopEvaluationStack();
				startText = startStrVal.value;
			}

			// Don't create choice if player has already read this content
			if (choicePoint.onceOnly) {
				var visitCount = this.VisitCountForContainer(choicePoint.choiceTarget);
				if (visitCount > 0) {
					showChoice = false;
				}
			}

			var choice = new Choice(choicePoint);
			choice.threadAtGeneration = this.state.callStack.currentThread.Copy();

			// We go through the full process of creating the choice above so
			// that we consume the content for it, since otherwise it'll
			// be shown on the output stream.
			if (!showChoice) {
				return null;
			}

			// Set final text for the choice
			choice.text = startText + choiceOnlyText;

			return choice;
		}
		IsTruthy(obj){
			var truthy = false;
			if (obj instanceof Value) {
				var val = obj;

				if (val instanceof DivertTargetValue) {
					var divTarget = val;
					this.Error("Shouldn't use a divert target (to " + divTarget.targetPath + ") as a conditional value. Did you intend a function call 'likeThis()' or a read count check 'likeThis'? (no arrows)");
					return false;
				}

				return val.isTruthy;
			}
			return truthy;
		}
		PerformLogicAndFlowControl(contentObj){
			if( contentObj == null ) {
				return false;
			}

			// Divert
			if (contentObj instanceof Divert) {
				var currentDivert = contentObj;
				
				if (currentDivert.isConditional) {
					var conditionValue = this.state.PopEvaluationStack();

					// False conditional? Cancel divert
					if (!this.IsTruthy(conditionValue))
						return true;
				}
				
				if (currentDivert.hasVariableTarget) {
					var varName = currentDivert.variableDivertName;

					var varContents = this.state.variablesState.GetVariableWithName(varName);

					if (!(varContents instanceof DivertTargetValue)) {

	//					var intContent = varContents as IntValue;
						var intContent = varContents;

						var errorMessage = "Tried to divert to a target from a variable, but the variable (" + varName + ") didn't contain a divert target, it ";
						if (intContent instanceof IntValue && intContent.value == 0) {
							errorMessage += "was empty/null (the value 0).";
						} else {
							errorMessage += "contained '" + varContents + "'.";
						}

						this.Error(errorMessage);
					}

					var target = varContents;
					this.state.divertedTargetObject = this.ContentAtPath(target.targetPath);

				} else if (currentDivert.isExternal) {
					this.CallExternalFunction(currentDivert.targetPathString, currentDivert.externalArgs);
					return true;
				} else {
					this.state.divertedTargetObject = currentDivert.targetContent;
				}

				if (currentDivert.pushesToStack) {
					this.state.callStack.Push(currentDivert.stackPushType);
				}

				if (this.state.divertedTargetObject == null && !currentDivert.isExternal) {

					// Human readable name available - runtime divert is part of a hard-written divert that to missing content
					if (currentDivert && currentDivert.debugMetadata.sourceName != null) {
						this.Error("Divert target doesn't exist: " + currentDivert.debugMetadata.sourceName);
					} else {
						this.Error("Divert resolution failed: " + currentDivert);
					}
				}

				return true;
			} 

			// Start/end an expression evaluation? Or print out the result?
			else if( contentObj instanceof ControlCommand ) {
				var evalCommand = contentObj;

				switch (evalCommand.commandType) {

				case ControlCommand.CommandType.EvalStart:
					if (this.state.inExpressionEvaluation) console.warn("Already in expression evaluation?");
					this.state.inExpressionEvaluation = true;
					break;

				case ControlCommand.CommandType.EvalEnd:
					if (!this.state.inExpressionEvaluation) console.warn("Not in expression evaluation mode");
					this.state.inExpressionEvaluation = false;
					break;

				case ControlCommand.CommandType.EvalOutput:

					// If the expression turned out to be empty, there may not be anything on the stack
					if (this.state.evaluationStack.length > 0) {

						var output = this.state.PopEvaluationStack();

						// Functions may evaluate to Void, in which case we skip output
						if (output != null && !(output instanceof Void)) {
							// TODO: Should we really always blanket convert to string?
							// It would be okay to have numbers in the output stream the
							// only problem is when exporting text for viewing, it skips over numbers etc.
							var text = new StringValue(output.toString());

							this.state.PushToOutputStream(text);
						}

					}
					break;

				case ControlCommand.CommandType.NoOp:
					break;

				case ControlCommand.CommandType.Duplicate:
					this.state.PushEvaluationStack(this.state.PeekEvaluationStack());
					break;

				case ControlCommand.CommandType.PopEvaluatedValue:
					this.state.PopEvaluationStack();
					break;

				case ControlCommand.CommandType.PopFunction:
				case ControlCommand.CommandType.PopTunnel:

					var popType = evalCommand.commandType == ControlCommand.CommandType.PopFunction ?
						PushPopType.Function : PushPopType.Tunnel;
						
					var overrideTunnelReturnTarget = null;
					if (popType == PushPopType.Tunnel) {
						var popped = this.state.PopEvaluationStack();
	//					overrideTunnelReturnTarget = popped as DivertTargetValue;
						overrideTunnelReturnTarget = popped;
						if (overrideTunnelReturnTarget instanceof DivertTargetValue === false) {
							if (popped instanceof Void === false){
								throw "Expected void if ->-> doesn't override target";
							} else {
								overrideTunnelReturnTarget = null;
							}
						}
					}

					if (this.state.TryExitExternalFunctionEvaluation()){
						break;
					}
					else if (this.state.callStack.currentElement.type != popType || !this.state.callStack.canPop) {

						var names = {};
						names[PushPopType.Function] = "function return statement (~ return)";
						names[PushPopType.Tunnel] = "tunnel onwards statement (->->)";

						var expected = names[this.state.callStack.currentElement.type];
						if (!this.state.callStack.canPop)
							expected = "end of flow (-> END or choice)";

						var errorMsg = "Found " + names[popType] + ", when expected " + expected;

						this.Error(errorMsg);
					} 

					else {
						this.state.callStack.Pop();
						
						if (overrideTunnelReturnTarget)
							this.state.divertedTargetObject = this.ContentAtPath(overrideTunnelReturnTarget.targetPath);
					}
					break;

				case ControlCommand.CommandType.BeginString:
					this.state.PushToOutputStream(evalCommand);

					if (!this.state.inExpressionEvaluation) console.warn("Expected to be in an expression when evaluating a string");
					this.state.inExpressionEvaluation = false;
					break;

				case ControlCommand.CommandType.EndString:

					var contentStackForString = [];

					var outputCountConsumed = 0;
					for (var i = this.state.outputStream.length - 1; i >= 0; --i) {
						var obj = this.state.outputStream[i];

						outputCountConsumed++;

	//					var command = obj as ControlCommand;
						var command = obj;
						if (command instanceof ControlCommand && command.commandType == ControlCommand.CommandType.BeginString) {
							break;
						}

						if( obj instanceof StringValue )
							contentStackForString.push(obj);
					}

					// Consume the content that was produced for this string
					this.state.outputStream.splice(this.state.outputStream.length - outputCountConsumed, outputCountConsumed);

					//the C# version uses a Stack for contentStackForString, but we're using a simple array, so we need to reverse it before using it
					contentStackForString = contentStackForString.reverse();
						
					// Build string out of the content we collected
					var sb = new StringBuilder();
					contentStackForString.forEach(c => {
						sb.Append(c.toString());
					});

					// Return to expression evaluation (from content mode)
					this.state.inExpressionEvaluation = true;
					this.state.PushEvaluationStack(new StringValue(sb.toString()));
					break;

				case ControlCommand.CommandType.ChoiceCount:
					var choiceCount = this.state.generatedChoices.length;
					this.state.PushEvaluationStack(new IntValue(choiceCount));
					break;

				case ControlCommand.CommandType.TurnsSince:
				case ControlCommand.CommandType.ReadCount:
					var target = this.state.PopEvaluationStack();
					if( !(target instanceof DivertTargetValue) ) {
						var extraNote = "";
						if( target instanceof IntValue )
							extraNote = ". Did you accidentally pass a read count ('knot_name') instead of a target ('-> knot_name')?";
						this.Error("TURNS_SINCE / READ_COUNT expected a divert target (knot, stitch, label name), but saw "+target+extraNote);
						break;
					}

	//				var divertTarget = target as DivertTargetValue;
					var divertTarget = target;
	//				var container = ContentAtPath (divertTarget.targetPath) as Container;
					var container = this.ContentAtPath(divertTarget.targetPath);

					var eitherCount; 
					if (evalCommand.commandType == ControlCommand.CommandType.TurnsSince)
						eitherCount = this.TurnsSinceForContainer(container);
					else
						eitherCount = this.VisitCountForContainer(container);

					this.state.PushEvaluationStack(new IntValue(eitherCount));
					break;

				case ControlCommand.CommandType.Random:
					var maxInt = this.state.PopEvaluationStack();
					var minInt = this.state.PopEvaluationStack();

					if (minInt == null || minInt instanceof IntValue === false)
						this.Error("Invalid value for minimum parameter of RANDOM(min, max)");

					if (maxInt == null || minInt instanceof IntValue === false)
						this.Error("Invalid value for maximum parameter of RANDOM(min, max)");

					// +1 because it's inclusive of min and max, for e.g. RANDOM(1,6) for a dice roll.
					var randomRange = maxInt.value - minInt.value + 1;
					if (randomRange <= 0)
						this.Error("RANDOM was called with minimum as " + minInt.value + " and maximum as " + maxInt.value + ". The maximum must be larger");

					var resultSeed = this.state.storySeed + this.state.previousRandom;
					var random = new PRNG(resultSeed);

					var nextRandom = random.next();
					var chosenValue = (nextRandom % randomRange) + minInt.value;
					this.state.PushEvaluationStack(new IntValue(chosenValue));

					// Next random number (rather than keeping the Random object around)
					this.state.previousRandom = nextRandom;
					break;
						
				case ControlCommand.CommandType.SeedRandom:
					var seed = this.state.PopEvaluationStack();
					if (seed == null || seed instanceof IntValue === false)
						this.Error("Invalid value passed to SEED_RANDOM");

					// Story seed affects both RANDOM and shuffle behaviour
					this.state.storySeed = seed.value;
					this.state.previousRandom = 0;

					// SEED_RANDOM returns nothing.
					this.state.PushEvaluationStack(new Void());
					break;
						
				case ControlCommand.CommandType.VisitIndex:
					var count = this.VisitCountForContainer(this.state.currentContainer) - 1; // index not count
					this.state.PushEvaluationStack(new IntValue(count));
					break;

				case ControlCommand.CommandType.SequenceShuffleIndex:
					var shuffleIndex = this.NextSequenceShuffleIndex();
					this.state.PushEvaluationStack(new IntValue(shuffleIndex));
					break;

				case ControlCommand.CommandType.StartThread:
					// Handled in main step function
					break;

				case ControlCommand.CommandType.Done:

					// We may exist in the context of the initial
					// act of creating the thread, or in the context of
					// evaluating the content.
					if (this.state.callStack.canPopThread) {
						this.state.callStack.PopThread();
					} 

					// In normal flow - allow safe exit without warning
					else {
						this.state.didSafeExit = true;
						
						// Stop flow in current thread
						this.state.currentContentObject = null;
					}

					break;

				// Force flow to end completely
				case ControlCommand.CommandType.End:
					this.state.ForceEnd();
					break;
						
				case ControlCommand.CommandType.ListFromInt:
	//				var intVal = state.PopEvaluationStack () as IntValue;
					var intVal = parseInt(this.state.PopEvaluationStack());
	//				var listNameVal = state.PopEvaluationStack () as StringValue;
					var listNameVal = this.state.PopEvaluationStack().toString();

					var generatedListValue = null;

					var foundListDef;
					if (foundListDef = this.listDefinitions.TryGetDefinition(listNameVal, foundListDef)) {
						var foundItem = foundListDef.TryGetItemWithValue(intVal.value);
						if (foundItem.exists) {
							generatedListValue = new ListValue(foundItem.item, intVal.value);
						}
					} else {
						throw new StoryException("Failed to find LIST called " + listNameVal.value);
					}

					if (generatedListValue == null)
						generatedListValue = new ListValue();

					this.state.PushEvaluationStack(generatedListValue);
					break;
						
				case ControlCommand.CommandType.ListRange:
					var max = this.state.PopEvaluationStack();
					var min = this.state.PopEvaluationStack();

	//				var targetList = state.PopEvaluationStack () as ListValue;
					var targetList = this.state.PopEvaluationStack();

					if (targetList instanceof ListValue === false || targetList == null || min == null || max == null)
						throw new StoryException("Expected list, minimum and maximum for LIST_RANGE");

					// Allow either int or a particular list item to be passed for the bounds,
					// so wrap up a function to handle this casting for us.
					var IntBound = function IntBound(obj){
	//					var listValue = obj as ListValue;
						var listValue = obj;
						if (listValue instanceof ListValue) {
							return parseInt(listValue.value.maxItem.Value);
						}

	//					var intValue = obj as IntValue;
						var intValue = obj;
						if (intValue instanceof IntValue) {
							return intValue.value;
						}

						return -1;
					};

					var minVal = IntBound(min);
					var maxVal = IntBound(max);
					if (minVal == -1)
						throw new StoryException("Invalid min range bound passed to LIST_VALUE(): " + min);

					if (maxVal == -1)
						throw new StoryException("Invalid max range bound passed to LIST_VALUE(): " + max);

					// Extract the range of items from the origin list
					var result = new ListValue();
					var origins = targetList.value.origins;

					if (origins != null) {
						origins.forEach(function(origin){
							var rangeFromOrigin = origin.ListRange(minVal, maxVal);
							rangeFromOrigin.value.forEach(function(kv){
								result.value.Add(kv.Key, kv.Value);
							});
						});
					}

					this.state.PushEvaluationStack(result);
					break;

				default:
					this.Error("unhandled ControlCommand: " + evalCommand);
					break;
				}

				return true;
			}

			// Variable assignment
			else if( contentObj instanceof VariableAssignment ) {
				var varAss = contentObj;
				var assignedVal = this.state.PopEvaluationStack();
				
				// When in temporary evaluation, don't create new variables purely within
				// the temporary context, but attempt to create them globally
				//var prioritiseHigherInCallStack = _temporaryEvaluationContainer != null;

				this.state.variablesState.Assign(varAss, assignedVal);

				return true;
			}

			// Variable reference
			else if( contentObj instanceof VariableReference ) {
				var varRef = contentObj;
				var foundValue = null;


				// Explicit read count value
				if (varRef.pathForCount != null) {

					var container = varRef.containerForCount;
					var count = this.VisitCountForContainer(container);
					foundValue = new IntValue(count);
				}

				// Normal variable reference
				else {

					foundValue = this.state.variablesState.GetVariableWithName(varRef.name);

					if (foundValue == null) {
						this.Error("Uninitialised variable: " + varRef.name);
						foundValue = new IntValue(0);
					}
				}

				this.state.PushEvaluationStack(foundValue);

				return true;
			}

			// Native function call
			else if (contentObj instanceof NativeFunctionCall) {
				var func = contentObj;
				var funcParams = this.state.PopEvaluationStack(func.numberOfParameters);
				var result = func.Call(funcParams);
				this.state.PushEvaluationStack(result);
				return true;
			}

			// No control content, must be ordinary content
			return false;
		}
		ChoosePathString(path, args){
			args = args || [];
			this.state.PassArgumentsToEvaluationStack(args);
			this.ChoosePath(new Path$1(path));
		}
		ChoosePath(p){
			this.state.SetChosenPath(p);

			// Take a note of newly visited containers for read counts etc
			this.VisitChangedContainersDueToDivert();
		}
		ChooseChoiceIndex(choiceIdx){
			choiceIdx = choiceIdx;
			var choices = this.currentChoices;
			if (choiceIdx < 0 || choiceIdx > choices.length) console.warn("choice out of range");

			// Replace callstack with the one from the thread at the choosing point, 
			// so that we can jump into the right place in the flow.
			// This is important in case the flow was forked by a new thread, which
			// can create multiple leading edges for the story, each of
			// which has its own context.
			var choiceToChoose = choices[choiceIdx];
			this.state.callStack.currentThread = choiceToChoose.threadAtGeneration;

			this.ChoosePath(choiceToChoose.choicePoint.choiceTarget.path);
		}
		HasFunction(functionName){
			try {
				return this.ContentAtPath(new Path$1(functionName)) instanceof Container;
			} catch(e) {
				return false;
			}
		}
		EvaluateFunction(functionName, args, returnTextOutput){
			//EvaluateFunction behaves slightly differently than the C# version. In C#, you can pass a (second) parameter `out textOutput` to get the text outputted by the function. This is not possible in js. Instead, we maintain the regular signature (functionName, args), plus an optional third parameter returnTextOutput. If set to true, we will return both the textOutput and the returned value, as an object.
			returnTextOutput = !!returnTextOutput;
			
			if (functionName == null) {
				throw "Function is null";
			} 
			else if (functionName == '' || functionName.trim() == '') {
				throw "Function is empty or white space.";
			}

			var funcContainer = null;
			try {
				funcContainer = this.ContentAtPath(new Path$1(functionName));
			} catch (e) {
				if (e.message.indexOf("not found") >= 0)
					throw "Function doesn't exist: '" + functionName + "'";
				else
					throw e;
			}
			
			this.state.StartExternalFunctionEvaluation(funcContainer, args);
			
			// Evaluate the function, and collect the string output
			var stringOutput = new StringBuilder();
			while (this.canContinue) {
				stringOutput.Append(this.Continue());
			}
			var textOutput = stringOutput.toString();
			
			var result = this.state.CompleteExternalFunctionEvaluation();

			return (returnTextOutput) ? {'returned': result, 'output': textOutput} : result;
		}
		EvaluateExpression(exprContainer){
			var startCallStackHeight = this.state.callStack.elements.length;

			this.state.callStack.Push(PushPopType.Tunnel);

			this._temporaryEvaluationContainer = exprContainer;

			this.state.GoToStart();

			var evalStackHeight = this.state.evaluationStack.length;

			this.Continue();

			this._temporaryEvaluationContainer = null;

			// Should have fallen off the end of the Container, which should
			// have auto-popped, but just in case we didn't for some reason,
			// manually pop to restore the state (including currentPath).
			if (this.state.callStack.elements.length > startCallStackHeight) {
				this.state.callStack.Pop();
			}

			var endStackHeight = this.state.evaluationStack.length;
			if (endStackHeight > evalStackHeight) {
				return this.state.PopEvaluationStack();
			} else {
				return null;
			}
		}
		CallExternalFunction(funcName, numberOfArguments){
			var func = this._externals[funcName];
			var fallbackFunctionContainer = null;

			var foundExternal = typeof func !== 'undefined';

			// Try to use fallback function?
			if (!foundExternal) {
				if (this.allowExternalFunctionFallbacks) {
	//				fallbackFunctionContainer = ContentAtPath (new Path (funcName)) as Container;
					fallbackFunctionContainer = this.ContentAtPath(new Path$1(funcName));
					if (!(fallbackFunctionContainer instanceof Container)) console.warn("Trying to call EXTERNAL function '" + funcName + "' which has not been bound, and fallback ink function could not be found.");

					// Divert direct into fallback function and we're done
					this.state.callStack.Push(PushPopType.Function);
					this.state.divertedTargetObject = fallbackFunctionContainer;
					return;

				} else {
					console.warn("Trying to call EXTERNAL function '" + funcName + "' which has not been bound (and ink fallbacks disabled).");
				}
			}

			// Pop arguments
			var args = [];
			for (var i = 0; i < numberOfArguments; ++i) {
	//			var poppedObj = state.PopEvaluationStack () as Value;
				var poppedObj = this.state.PopEvaluationStack();
				var valueObj = poppedObj.valueObject;
				args.push(valueObj);
			}

			// Reverse arguments from the order they were popped,
			// so they're the right way round again.
			args.reverse();

			// Run the function!
			var funcResult = func(args);

			// Convert return value (if any) to the a type that the ink engine can use
			var returnObj = null;
			if (funcResult != null) {
				returnObj = Value.Create(funcResult);
				if (returnObj == null) console.warn("Could not create ink value from returned object of type " + (typeof funcResult));
			} else {
				returnObj = new Void();
			}

			this.state.PushEvaluationStack(returnObj);
		}
		TryCoerce(value){
			//we're skipping type coercition in this implementation. First of, js is loosely typed, so it's not that important. Secondly, there is no clean way (AFAIK) for the user to describe what type of parameters he/she expects.
			return value;
		}
		BindExternalFunctionGeneral(funcName, func){
			if (this._externals[funcName]) console.warn("Function '" + funcName + "' has already been bound.");
			this._externals[funcName] = func;
		}
		BindExternalFunction(funcName, func){
			if (!func) console.warn("Can't bind a null function");

			this.BindExternalFunctionGeneral(funcName, (args) => {
				if (args.length < func.length) console.warn("External function expected " + func.length + " arguments");
				
				var coercedArgs = [];
				for (var i = 0, l = args.length; i < l; i++){
					coercedArgs[i] = this.TryCoerce(args[i]);
				}
				return func.apply(null, coercedArgs);
			});
		}
		UnbindExternalFunction(funcName){
			if (typeof this._externals[funcName] === 'undefined') console.warn("Function '" + funcName + "' has not been bound.");
			delete this._externals[funcName];
		}
		ValidateExternalBindings(containerOrObject, missingExternals){
			if (!containerOrObject){
				var missingExternals = [];
				this.ValidateExternalBindings(this._mainContentContainer, missingExternals);
	            this._hasValidatedExternals = true;
				
				// No problem! Validation complete
				if( missingExternals.length == 0 ) {
					this._hasValidatedExternals = true;
				} 

				// Error for all missing externals
				else {
					var message = "Error: Missing function binding for external";
					message += (missingExternals.length > 1) ? "s" : "";
					message += ": '";
					message += missingExternals.join("', '");
					message += "' ";
					message += (this.allowExternalFunctionFallbacks) ? ", and no fallback ink function found." : " (ink fallbacks disabled)";

					this.Error(message);
				}
			}
			else if (containerOrObject instanceof Container){
				var c = containerOrObject;
				
				c.content.forEach(innerContent => {
					this.ValidateExternalBindings(innerContent, missingExternals);
				});
				for (var key in c.namedContent){
					this.ValidateExternalBindings(c.namedContent[key], missingExternals);
				}
			}
			else{
				var o = containerOrObject;
				//the following code is already taken care of above in this implementation
	//			var container = o as Container;
	//            if (container) {
	//                ValidateExternalBindings (container, missingExternals);
	//                return;
	//            }

	//            var divert = o as Divert;
	            var divert = o;
	            if (divert instanceof Divert && divert.isExternal) {
	                var name = divert.targetPathString;

	                if (!this._externals[name]) {
						if( this.allowExternalFunctionFallbacks ) {
							var fallbackFound = !!this.mainContentContainer.namedContent[name];
							if( !fallbackFound ) {
								missingExternals.push(name);
							}
						} else {
							missingExternals.push(name);
						}
	                }
	            }
			}
		}
		ObserveVariable(variableName, observer){
			if (this._variableObservers == null)
				this._variableObservers = {};

			if (this._variableObservers[variableName]) {
				this._variableObservers[variableName].push(observer);
			} else {
				this._variableObservers[variableName] = [observer];
			}
		}
		ObserveVariables(variableNames, observers){
			for (var i = 0, l = variableNames.length; i < l; i++){
				this.ObserveVariable(variableNames[i], observers[i]);
			}
		}
		RemoveVariableObserver(observer, specificVariableName){
			if (this._variableObservers == null)
				return;

			// Remove observer for this specific variable
			if (typeof specificVariableName !== 'undefined') {
				if (this._variableObservers[specificVariableName]) {
					this._variableObservers[specificVariableName].splice(this._variableObservers[specificVariableName].indexOf(observer), 1);
				}
			} 

			// Remove observer for all variables
			else {
				for (var varName in this._variableObservers){
					this._variableObservers[varName].splice(this._variableObservers[varName].indexOf(observer), 1);
				}
			}
		}
		VariableStateDidChangeEvent(variableName, newValueObj){
			if (this._variableObservers == null)
				return;
			
			var observers = this._variableObservers[variableName];
			if (typeof observers !== 'undefined') {

				if (!(newValueObj instanceof Value)) {
					throw "Tried to get the value of a variable that isn't a standard type";
				}
	//			var val = newValueObj as Value;
				var val = newValueObj;

				observers.forEach(function(observer){
					observer(variableName, val.valueObject);
				});
			}
		}
		TagsForContentAtPath(path){
			return this.TagsAtStartOfFlowContainerWithPathString(path);
		}
		TagsAtStartOfFlowContainerWithPathString(pathString){
			var path = new Path$1(pathString);

			// Expected to be global story, knot or stitch
	//		var flowContainer = ContentAtPath (path) as Container;
			var flowContainer = this.ContentAtPath(path);
			while(true) {
				var firstContent = flowContainer.content[0];
				if (firstContent instanceof Container)
					flowContainer = firstContent;
				else break;
			}
			

			// Any initial tag objects count as the "main tags" associated with that story/knot/stitch
			var tags = null;
			
			flowContainer.content.every(c => {
	//			var tag = c as Runtime.Tag;
				var tag = c;
				if (tag instanceof Tag) {
					if (tags == null) tags = [];
					tags.push(tag.text);
					return true;
				} else return false;
			});

			return tags;
		}
		BuildStringOfHierarchy(){
			var sb = new StringBuilder();

			this.mainContentContainer.BuildStringOfHierarchy(sb, 0, this.state.currentContentObject);

	    return sb.toString();
		}
		BuildStringOfContainer(container){
			var sb = new StringBuilder();
			container.BuildStringOfHierarchy(sb, 0, this.state.currentContentObject);
			return sb.toString();
		}
		NextContent(){
			// Setting previousContentObject is critical for VisitChangedContainersDueToDivert
			this.state.previousContentObject = this.state.currentContentObject;
			
			// Divert step?
			if (this.state.divertedTargetObject != null) {

				this.state.currentContentObject = this.state.divertedTargetObject;
				this.state.divertedTargetObject = null;

				// Internally uses state.previousContentObject and state.currentContentObject
				this.VisitChangedContainersDueToDivert();

				// Diverted location has valid content?
				if (this.state.currentContentObject != null) {
					return;
				}

				// Otherwise, if diverted location doesn't have valid content,
				// drop down and attempt to increment.
				// This can happen if the diverted path is intentionally jumping
				// to the end of a container - e.g. a Conditional that's re-joining
			}

			var successfulPointerIncrement = this.IncrementContentPointer();

			// Ran out of content? Try to auto-exit from a function,
			// or finish evaluating the content of a thread
			if (!successfulPointerIncrement) {

				var didPop = false;

				if (this.state.callStack.CanPop(PushPopType.Function)) {

					// Pop from the call stack
					this.state.callStack.Pop(PushPopType.Function);

					// This pop was due to dropping off the end of a function that didn't return anything,
					// so in this case, we make sure that the evaluator has something to chomp on if it needs it
					if (this.state.inExpressionEvaluation) {
						this.state.PushEvaluationStack(new Void());
					}

					didPop = true;
				} 

				else if (this.state.callStack.canPopThread) {
					this.state.callStack.PopThread();

					didPop = true;
				}
				else {
					this.state.TryExitExternalFunctionEvaluation();
				}

				// Step past the point where we last called out
				if (didPop && this.state.currentContentObject != null) {
					this.NextContent();
				}
			}
		}
		IncrementContentPointer(){
			var successfulIncrement = true;

			var currEl = this.state.callStack.currentElement;
			currEl.currentContentIndex++;

			// Each time we step off the end, we fall out to the next container, all the
			// while we're in indexed rather than named content
			while (currEl.currentContentIndex >= currEl.currentContainer.content.length) {

				successfulIncrement = false;

	//			Container nextAncestor = currEl.currentContainer.parent as Container;
				var nextAncestor = currEl.currentContainer.parent;
				if (nextAncestor instanceof Container === false) {
					break;
				}

				var indexInAncestor = nextAncestor.content.indexOf(currEl.currentContainer);
				if (indexInAncestor == -1) {
					break;
				}

				currEl.currentContainer = nextAncestor;
				currEl.currentContentIndex = indexInAncestor + 1;

				successfulIncrement = true;
			}

			if (!successfulIncrement)
				currEl.currentContainer = null;

			return successfulIncrement;
		}
		TryFollowDefaultInvisibleChoice(){
			var allChoices = this._state.currentChoices;

			// Is a default invisible choice the ONLY choice?
			var invisibleChoices = allChoices.filter(c => {
				return c.choicePoint.isInvisibleDefault;
			});
			if (invisibleChoices.length == 0 || allChoices.length > invisibleChoices.length)
				return false;

			var choice = invisibleChoices[0];

			this.ChoosePath(choice.choicePoint.choiceTarget.path);

			return true;
		}
		VisitCountForContainer(container){
			if( !container.visitsShouldBeCounted ) {
				console.warn("Read count for target ("+container.name+" - on "+container.debugMetadata+") unknown. The story may need to be compiled with countAllVisits flag (-c).");
				return 0;
			}

			var count = 0;
			var containerPathStr = container.path.toString();
			count = this.state.visitCounts[containerPathStr] || count;
			return count;
		}
		IncrementVisitCountForContainer(container){
			var count = 0;
			var containerPathStr = container.path.toString();
			if (this.state.visitCounts[containerPathStr]) count = this.state.visitCounts[containerPathStr];
			count++;
			this.state.visitCounts[containerPathStr] = count;
		}
		RecordTurnIndexVisitToContainer(container){
			var containerPathStr = container.path.toString();
			this.state.turnIndices[containerPathStr] = this.state.currentTurnIndex;
		}
		TurnsSinceForContainer(container){
			if( !container.turnIndexShouldBeCounted ) {
				this.Error("TURNS_SINCE() for target ("+container.name+" - on "+container.debugMetadata+") unknown. The story may need to be compiled with countAllVisits flag (-c).");
			}
			
			var containerPathStr = container.path.toString();
			var index = this.state.turnIndices[containerPathStr];
			if (typeof index !== 'undefined') {
				return this.state.currentTurnIndex - index;
			} else {
				return -1;
			}
		}
		NextSequenceShuffleIndex(){
	//		var numElementsIntVal = state.PopEvaluationStack () as IntValue;
			var numElementsIntVal = this.state.PopEvaluationStack();
			if (!(numElementsIntVal instanceof IntValue)) {
				this.Error("expected number of elements in sequence for shuffle index");
				return 0;
			}

			var seqContainer = this.state.currentContainer;

			var numElements = numElementsIntVal.value;

	//		var seqCountVal = state.PopEvaluationStack () as IntValue;
			var seqCountVal = this.state.PopEvaluationStack();
			var seqCount = seqCountVal.value;
			var loopIndex = seqCount / numElements;
			var iterationIndex = seqCount % numElements;

			// Generate the same shuffle based on:
			//  - The hash of this container, to make sure it's consistent
			//    each time the runtime returns to the sequence
			//  - How many times the runtime has looped around this full shuffle
			var seqPathStr = seqContainer.path.toString();
			var sequenceHash = 0;
			for (var i = 0, l = seqPathStr.length; i < l; i++){
				sequenceHash += seqPathStr.charCodeAt[i] || 0;
			}
			var randomSeed = sequenceHash + loopIndex + this.state.storySeed;
			var random = new PRNG(parseInt(randomSeed));

			var unpickedIndices = [];
			for (var i = 0; i < numElements; ++i) {
				unpickedIndices.push(i);
			}

			for (var i = 0; i <= iterationIndex; ++i) {
				var chosen = random.next() % unpickedIndices.length;
				var chosenIndex = unpickedIndices[chosen];
				unpickedIndices.splice(chosen, 1);

				if (i == iterationIndex) {
					return chosenIndex;
				}
			}

			throw "Should never reach here";
		}
		Error(message, useEndLineNumber){
			var e = new StoryException(message);
	//		e.useEndLineNumber = useEndLineNumber;
			throw e;
		}
		AddError(message, useEndLineNumber){
	//		var dm = this.currentDebugMetadata;
			var dm = null;
			
			if (dm != null) {
				var lineNum = useEndLineNumber ? dm.endLineNumber : dm.startLineNumber;
				message = "RUNTIME ERROR: '" + dm.fileName + "' line " + lineNum + ": " + message;
			}
			else {
				message = "RUNTIME ERROR: " + message;
			}

			this.state.AddError(message);
			
			// In a broken state don't need to know about any other errors.
			this.state.ForceEnd();
		}
	}

	exports.Story = Story;

	Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 350 */
/*!****************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/index.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! exports used: ListView */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollerEventDispatcher = exports.BasicSwiper = exports.DirectionalScroller = exports.WheelScroller = exports.SwipeCarousel = exports.ListViewCore = exports.ListView = exports.Scroller = undefined;

var _scroller = __webpack_require__(/*! ./scroller */ 94);

var _scroller2 = _interopRequireDefault(_scroller);

var _list_view = __webpack_require__(/*! ./list_view */ 134);

var _list_view2 = _interopRequireDefault(_list_view);

var _list_view_core = __webpack_require__(/*! ./list_view_core */ 135);

var _list_view_core2 = _interopRequireDefault(_list_view_core);

var _swipe_carousel = __webpack_require__(/*! ./swipe_carousel */ 351);

var _swipe_carousel2 = _interopRequireDefault(_swipe_carousel);

var _wheel_scroller = __webpack_require__(/*! ./wheel_scroller */ 352);

var _wheel_scroller2 = _interopRequireDefault(_wheel_scroller);

var _directional_scroller = __webpack_require__(/*! ./directional_scroller */ 136);

var _directional_scroller2 = _interopRequireDefault(_directional_scroller);

var _basic_swiper = __webpack_require__(/*! ./basic_swiper */ 353);

var _basic_swiper2 = _interopRequireDefault(_basic_swiper);

var _scroller_event_dispatcher = __webpack_require__(/*! ./scroller_event_dispatcher */ 354);

var _scroller_event_dispatcher2 = _interopRequireDefault(_scroller_event_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhaserListView = {
  Scroller: _scroller2.default,
  ListView: _list_view2.default,
  ListViewCore: _list_view_core2.default,
  SwipeCarousel: _swipe_carousel2.default,
  WheelScroller: _wheel_scroller2.default,
  DirectionalScroller: _directional_scroller2.default,
  BasicSwiper: _basic_swiper2.default,
  ScrollerEventDispatcher: _scroller_event_dispatcher2.default
};

exports.Scroller = _scroller2.default;
exports.ListView = _list_view2.default;
exports.ListViewCore = _list_view_core2.default;
exports.SwipeCarousel = _swipe_carousel2.default;
exports.WheelScroller = _wheel_scroller2.default;
exports.DirectionalScroller = _directional_scroller2.default;
exports.BasicSwiper = _basic_swiper2.default;
exports.ScrollerEventDispatcher = _scroller_event_dispatcher2.default;

// NOTE: we should only attach to the window in a production build

window.PhaserListView = PhaserListView;

exports.default = PhaserListView;

/***/ }),
/* 351 */
/*!*************************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/swipe_carousel.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _list_view = __webpack_require__(/*! ./list_view */ 134);

var _list_view2 = _interopRequireDefault(_list_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultOptions = {
  direction: 'x',
  autocull: true,
  momentum: false,
  bouncing: true,
  snapping: true,
  overflow: 100,
  padding: 10,
  swipeEnabled: true,
  offset: {
    x: 100
  }
};

var SwipeCarousel = function (_ListView) {
  _inherits(SwipeCarousel, _ListView);

  function SwipeCarousel(game, parent, bounds) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, SwipeCarousel);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SwipeCarousel).call(this, game, parent, bounds, Object.assign({}, defaultOptions, options)));

    _this.scroller.options.snapStep = bounds.width + _this.o.padding;
    return _this;
  }

  return SwipeCarousel;
}(_list_view2.default);

exports.default = SwipeCarousel;

/***/ }),
/* 352 */
/*!*************************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/wheel_scroller.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _math_utils = __webpack_require__(/*! ./utils/math_utils */ 65);

var _math_utils2 = _interopRequireDefault(_math_utils);

var _scroller = __webpack_require__(/*! ./scroller */ 94);

var _scroller2 = _interopRequireDefault(_scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Phaser$Math = Phaser.Math;
var radToDeg = _Phaser$Math.radToDeg;
var degToRad = _Phaser$Math.degToRad;

var _ptHelper = new Phaser.Point();

var defaultOptions = {
  direction: 'angle',
  infinite: false,
  speedLimit: 1.5
};

var WheelScroller = function (_Scroller) {
  _inherits(WheelScroller, _Scroller);

  function WheelScroller(game, clickObject) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, WheelScroller);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(WheelScroller).call(this, game, clickObject, { angle: clickObject.width / 2 }, Object.assign({}, defaultOptions, options)));
  }

  // extends Scroller.handleDown


  _createClass(WheelScroller, [{
    key: 'handleDown',
    value: function handleDown(target, pointer) {
      if (!this.enabled) return;
      this.centerPoint = this.clickObject.toGlobal(new Phaser.Point(0, 0));
      _ptHelper.set(pointer.x, pointer.y);
      this.old = this.down = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint));
      this.fullDiff = 0;

      _get(Object.getPrototypeOf(WheelScroller.prototype), 'handleDown', this).call(this, target, pointer);
    }

    // overrides Scroller.handleMove

  }, {
    key: 'handleMove',
    value: function handleMove(pointer, x, y) {
      if (!this.enabled) return;
      this.isScrolling = true;
      _ptHelper.set(x, y);
      var currentRotation = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint));
      var rotations = 0;

      var diffRotation = this.old - currentRotation;
      this.diff = radToDeg(diffRotation);

      if (this.diff > 180) {
        rotations = 1;
      } else if (this.diff < -180) {
        rotations = -1;
      }

      if (rotations != 0) {
        var fullCircle = rotations * degToRad(360);
        diffRotation -= fullCircle;
        this.diff = radToDeg(diffRotation);
      }

      this.diff = this._requestDiff(this.diff, this.target, this.min, this.max, this.o.overflow);

      this.fullDiff -= this.diff;

      this.target -= this.diff;

      if (this.o.infinite) {
        this.target = this._wrapTarget(this.target, this.min, this.max);
      }

      this.old = currentRotation;

      //store timestamp for event
      this.o.time.move = this.game.time.time;

      var diameter = this.clickObject.width;
      var circumference = Math.PI * diameter;
      var sectorLength = circumference * (this.diff / 360);
      this.acc = Math.min(Math.abs(sectorLength / 30), this.o.maxAcceleration);

      //go ahead and move the block
      this.scrollObject[this.o.direction] = this.target;
      this.handleUpdate();

      if (this.o.emitMoving) this.events.onInputMove.dispatch({ pointer: pointer, x: x, y: y });
    }

    // extends Scroller.handleDown

  }, {
    key: 'handleUp',
    value: function handleUp(target, pointer) {
      _ptHelper.set(pointer.x, pointer.y);
      this.current = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint));

      _get(Object.getPrototypeOf(WheelScroller.prototype), 'handleUp', this).call(this, target, pointer);
    }
  }, {
    key: '_wrapTarget',
    value: function _wrapTarget(target, min, max) {
      var diff = 0;
      if (target > max) {
        diff = target - max;
        target = min + diff;
      } else if (target < min) {
        diff = min - target;
        target = max - diff;
      }
      return target;
    }
  }]);

  return WheelScroller;
}(_scroller2.default);

exports.default = WheelScroller;

/***/ }),
/* 353 */
/*!***********************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/basic_swiper.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math_utils = __webpack_require__(/*! ./utils/math_utils */ 65);

var _math_utils2 = _interopRequireDefault(_math_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ptHelper = new Phaser.Point();
var defaultOptions = {
  from: 0,
  to: 200,
  direction: 'y',
  snapStep: 10,
  duration: 1, // (s) duration of the inertial scrolling simulation.
  time: {}, // contains timestamps of the most recent down, up, and move events
  swipeThreshold: 5, // (pixels) must move this many pixels for a swipe action
  swipeTimeThreshold: 250, // (ms) determines if a swipe occurred: time between last updated movement @ touchmove and time @ touchend, if smaller than this value, trigger swipe
  addListeners: true
};

// ** WORK IN PROGRESS **
//
// Similar to the Scroller class but there is no focus on a start and end of the scroll surface.
// For example with Scroller if you swiped left 3 times you would continue to go further left and
// closer to the end of the limit.
// With BasicSwiper if you swiped left 3 times, each time you receive values between -1 and 1, depending
// on the direction you swipe.
//
// TODO - consolidate BasicSwiper and Scroller. At least they could share same functions
//

var BasicSwiper = function () {
  function BasicSwiper(game, clickObject) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, BasicSwiper);

    this.game = game;
    this.clickObject = clickObject;

    this.o = this.options = Object.assign({}, defaultOptions, options);

    this._updateMinMax();

    this.addListeners();

    this.scrollObject = {};
    this.scrollObject[this.o.direction] = this.o.from;

    // set tween that will be re-used for moving scrolling sprite
    this.tweenScroll = this.game.add.tween(this.scrollObject).to({}, 0, Phaser.Easing.Quartic.Out);
    this.tweenScroll.onUpdateCallback(this.handleUpdate, this);
    this.tweenScroll.onComplete.add(this.handleComplete, this);
  }

  _createClass(BasicSwiper, [{
    key: 'addListeners',
    value: function addListeners() {
      this.events = {
        onUpdate: new Phaser.Signal(),
        onInputUp: new Phaser.Signal(),
        onInputDown: new Phaser.Signal(),
        onInputMove: new Phaser.Signal(),
        onComplete: new Phaser.Signal(),
        onSwipe: new Phaser.Signal()
      };

      this.enable();

      if (this.o.addListeners) {
        this.clickObject.inputEnabled = true;
        this.clickObject.events.onInputDown.add(this.handleDown, this);
        this.clickObject.events.onInputUp.add(this.handleUp, this);
      }
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      if (this.o.addListeners) {
        this.clickObject.events.onInputDown.remove(this.handleDown, this);
        this.clickObject.events.onInputUp.remove(this.handleUp, this);
      }

      for (var property in this.events) {
        if (this.events.hasOwnProperty(property)) {
          this.events[property].removeAll();
        }
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.removeListeners();
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.enabled = true;
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.enabled = false;
    }
  }, {
    key: 'isTweening',
    value: function isTweening() {
      return this.tweenScroll.isRunning;
    }
  }, {
    key: 'handleDown',
    value: function handleDown(target, pointer) {
      if (!this.enabled) {
        this.clickBlocked = true;
        return;
      }
      this.clickBlocked = false;
      // console.log('handle down', pointer[this.o.direction])
      this.isDown = true;
      // console.log('input down', pointer.y)
      this.old = this.down = pointer[this.o.direction];
      this.target = 0;
      this.o.time.down = pointer.timeDown;

      if (this.o.addListeners) this.game.input.addMoveCallback(this.handleMove, this);

      //stop tween for touch-to-stop
      this.tweenScroll.stop();
      this.tweenScroll.pendingDelete = false;

      this.events.onInputDown.dispatch(target, pointer);
    }
  }, {
    key: 'handleMove',
    value: function handleMove(pointer, x, y) {
      if (!this.enabled) return;
      _ptHelper.set(x, y);
      this.diff = this.old - _ptHelper[this.o.direction];
      // console.log('diff', this.diff)
      this.target -= this.diff;

      this.old = _ptHelper[this.o.direction];

      //store timestamp for event
      this.o.time.move = this.game.time.time;

      //go ahead and move the block
      this.scrollObject[this.o.direction] = this.target;
      this.handleUpdate();

      if (this.o.emitMoving) this.events.onInputMove.dispatch(pointer, x, y);
    }
  }, {
    key: 'handleUp',
    value: function handleUp(target, pointer) {
      if (!this.enabled || this.clickBlocked) return;
      this.isDown = false;
      // console.log('end')
      if (this.o.addListeners) this.game.input.deleteMoveCallback(this.handleMove, this);

      //store timestamp for event
      this.o.time.up = pointer.timeUp;

      var o = {
        duration: this.o.duration,
        target: this.target
      };

      // *** SWIPING
      this._addSwiping(o, pointer);

      // *** SNAPPING
      this._addSnapping(o);

      this.tweenTo(o.duration, o.target);

      this.events.onInputUp.dispatch(target, pointer);
    }
  }, {
    key: '_addSwiping',
    value: function _addSwiping(o, pointer) {
      var swipeDistance = Math.abs(this.down - this.old);
      if (this.o.time.up - this.o.time.down < this.o.swipeTimeThreshold && swipeDistance > this.o.swipeThreshold) {
        var direction = pointer[this.o.direction] < this.down ? 'forward' : 'backward';

        if (direction == 'forward') {
          o.target -= this.o.snapStep / 2;
        } else {
          o.target += this.o.snapStep / 2;
        }

        this.events.onSwipe.dispatch(direction);
      }
      return o;
    }
  }, {
    key: '_addSnapping',
    value: function _addSnapping(o) {
      o.target = _math_utils2.default.nearestMultiple(o.target, this.o.snapStep);
      return o;
    }
  }, {
    key: 'tweenTo',
    value: function tweenTo(duration, target) {
      // console.log('tweenTo', duration, target)
      //stop a tween if it is currently happening
      var o = {};
      o[this.o.direction] = target;

      this.tweenScroll.onUpdateCallback(this.handleUpdate, this);
      this.tweenScroll.onComplete.add(this.handleComplete, this);

      this.tweenScroll.updateTweenData('vEnd', o, -1);
      this.tweenScroll.updateTweenData('duration', duration * 1000, -1);
      this.tweenScroll.updateTweenData('percent ', 0, -1);

      this.tweenScroll.start();
    }

    // dispatches a value between -1 and 1 depending on the direction of the swipe action.

  }, {
    key: 'handleUpdate',
    value: function handleUpdate() {
      this.events.onUpdate.dispatch(_math_utils2.default.scaleBetween(-1, 1, _math_utils2.default.percentageBetween2(this.scrollObject[this.o.direction], -this.length, this.length)));
    }
  }, {
    key: 'handleComplete',
    value: function handleComplete() {
      // reset multiplier when finished
      this.o.multiplier = 1;
      this.events.onComplete.dispatch();
    }
  }, {
    key: '_updateMinMax',
    value: function _updateMinMax() {
      this.min = Math.min(this.o.from, this.o.to);
      this.max = Math.max(this.o.from, this.o.to);
      this.length = Math.abs(this.max - this.min);
      this.o.snapStep = this.length;
    }
  }]);

  return BasicSwiper;
}();

exports.default = BasicSwiper;

/***/ }),
/* 354 */
/*!************************************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/scroller_event_dispatcher.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(/*! ./util */ 66);

var _config = __webpack_require__(/*! ./config */ 133);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  direction: 'auto',
  autoDetectThreshold: _config2.default.AUTO_DETECT_THRESHOLD
};

// Scroller Event Dispatcher is a centralized place to listener for events useful for scrollers
// The main feature of this class is the 'auto detect' for x and y directions.
// If you set 'direction' to 'auto', events won't dispatch until a direction is detected.
//

var ScrollerEventDispatcher = function () {
  function ScrollerEventDispatcher(game, clickObject) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, ScrollerEventDispatcher);

    this.game = game;
    this.clickObject = clickObject;
    this.clickables = [];

    this.o = this.options = Object.assign({}, defaultOptions, options);

    this.addListeners();
  }

  _createClass(ScrollerEventDispatcher, [{
    key: 'addListeners',
    value: function addListeners() {
      this.events = {
        onInputUp: new Phaser.Signal(),
        onInputDown: new Phaser.Signal(),
        onInputMove: new Phaser.Signal(),
        onDirectionSet: new Phaser.Signal()
      };

      this.clickObject.inputEnabled = true;
      this.enable();
      this.clickObject.events.onInputDown.add(this.handleDown, this);
      this.clickObject.events.onInputUp.add(this.handleUp, this);
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      this.clickObject.events.onInputDown.remove(this.handleDown, this);
      this.clickObject.events.onInputUp.remove(this.handleUp, this);

      for (var property in this.events) {
        if (this.events.hasOwnProperty(property)) {
          this.events[property].removeAll();
        }
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.removeListeners();
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.enabled = true;
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.enabled = false;
    }
  }, {
    key: 'setDirection',
    value: function setDirection(direction) {
      this.direction = direction;
      this.events.onDirectionSet.dispatch(direction);
    }

    /**
     * [registerClickables]
     * If a standard click occurs on the dispatcher surface we want to handle the click.
     * @param  {Array[DisplayObjects]} clickables - Check these clickables AND their children for standard phaser input events.
     *                                              e.g. displayObject.events.onInputUp
     */

  }, {
    key: 'registerClickables',
    value: function registerClickables(clickables) {
      this.clickables = clickables;
    }
  }, {
    key: 'dispatchClicks',
    value: function dispatchClicks(pointer, clickables, type) {
      var found = (0, _util.dispatchClicks)(pointer, clickables, type);
      if (type == 'onInputDown') {
        this.currentDown = found;
      }
      return found;
    }
  }, {
    key: 'handleDown',
    value: function handleDown(target, pointer) {
      var _this = this;

      if (!this.enabled) {
        this.clickBlocked = true;
        return;
      }
      this.clickBlocked = false;

      if (this.o.direction == 'auto') {
        this.direction = null;
        this.old = null;
      } else {
        this.setDirection(this.o.direction);
        this.old = this.down = pointer[this.direction];
      }

      this.game.input.addMoveCallback(this.handleMove, this);

      this.dispatchClicks(pointer, this.clickables, 'onInputDown');
      this.events.onInputDown.dispatch(target, pointer, function (clickables, type) {
        return _this.dispatchClicks(pointer, clickables, 'onInputDown');
      });
    }
  }, {
    key: 'handleMove',
    value: function handleMove(pointer, x, y) {
      if (!this.enabled) return;

      if (!this.direction && this.o.direction == 'auto') {
        var xDist = Math.abs(pointer.positionDown.x - x);
        var yDist = Math.abs(pointer.positionDown.y - y);
        if (xDist > this.o.autoDetectThreshold || yDist > this.o.autoDetectThreshold) {
          this._cancelCurrentDown(pointer);
          var direction = xDist > yDist ? 'x' : 'y';
          this.setDirection(direction);
        } else {
          return;
        }
      }

      this.events.onInputMove.dispatch(pointer, x, y);
    }
  }, {
    key: 'handleUp',
    value: function handleUp(target, pointer) {
      var _this2 = this;

      if (!this.enabled || this.clickBlocked) return;
      this.game.input.deleteMoveCallback(this.handleMove, this);
      this.dispatchClicks(pointer, this.clickables, 'onInputUp');
      this.events.onInputUp.dispatch(target, pointer, function (clickables, type) {
        return _this2.dispatchClicks(pointer, clickables, 'onInputUp');
      });
      this.currentDown = null;
    }
  }, {
    key: '_cancelCurrentDown',
    value: function _cancelCurrentDown(pointer) {
      if (this.currentDown && this.currentDown.events && this.currentDown.events.onInputUp) {
        this.currentDown.events.onInputUp.dispatch(this.currentDown, pointer, false);
      }
      this.currentDown = null;
    }
  }]);

  return ScrollerEventDispatcher;
}();

exports.default = ScrollerEventDispatcher;

/***/ }),
/* 355 */
/*!***********************************!*\
  !*** ./src/sprites/MessageBox.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);


/* unused harmony default export */ var _unused_webpack_default_export = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Sprite {
  constructor({ game, x, y, height, color }) {
    super(game, x, y, height, color);
  }

  show() {
    this.game.add.tween(this).to({ x: 500 }, 600, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Easing.Cubic.Out, true);
  }
});

/***/ }),
/* 356 */
/*!******************************************!*\
  !*** ./src/sprites/WaitingMessageBox.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);


/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Graphics {
	constructor({ game, x, y, height, color }) {
		super(game, x, y);

		this.beginFill(0x000000, 1);
		this.drawRect(x, y, 40, 40);
	}
});

/***/ }),
/* 357 */
/*!*************************************!*\
  !*** ./src/sprites/BitmapSprite.js ***!
  \*************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);


/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Sprite {
	constructor({ game, x, y, asset }) {
		super(game, x, y, asset);
	}
});

/***/ })
],[137]);
//# sourceMappingURL=bundle.js.map