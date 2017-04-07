/**
 * These functions make dealing with objects easier.
 * Things like strong dot notations and object diffing
 */

// Find all the keys in a, that have different values to those in
// b. Equality is only checked in a shallow manner
const shallowObjectDiff = (a, b) => {
  const output = {}
  Object.keys(a)
    .filter(k => a[k] !== b[k])
    .forEach(k => output[k] = a[k])
  return output
}

// this takes an object where the keys are all string notation ids
// and ensures the target object only contains those leaves
const stringKeyObjectFilter = (obj, fields) => {
  const output = {}
  Object.keys(fields).forEach(k => {
    dotSet(output, k, dotGet(obj, k))
  })
  return output
}

export {
  shallowObjectDiff,
  stringKeyObjectFilter
}

// simpler versions of .get() and .set() for dot notation
const dotGet = (obj, field) => {
  return field.split('.').reduce((o, k) => {
    return o ? o[k] : undefined
  }, obj)
}

const dotSet = (obj, field, val) => {
  const keys = field.split('.')
  return keys.reduce((o, k, i) => {
    if(i === keys.length - 1){
      o[k] = val
    }else if(!o[k]){
      o[k] = {}
    }
    return o[k]
  }, obj)
}

/**
 * Polyfill for Object.keys
 *
 * @see: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
 */
if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

      var result = [];

      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }

      if (hasDontEnumBug) {
        for (var i=0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }
      return result;
    }
  })()
}
