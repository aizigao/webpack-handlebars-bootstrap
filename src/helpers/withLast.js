var util = require('handlebars-utils');


/**
 * Use the last item or `n` items in an array as context inside a block.
 * Opposite of [withFirst](#withFirst).
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{#withLast array}}
 *   {{this}}
 * {{/withLast}}
 * <!-- results in: 'c' -->
 * ```
 * @param {Array} `array`
 * @param {Number} `idx` The starting index.
 * @param {Object} `options`
 * @return {String}
 * @block
 * @api public
 */

module.exports = function withLast (array, idx, options) {
  if (util.isUndefined(array)) return '';
  array = util.result(array);

  if (!util.isUndefined(idx)) {
    idx = parseFloat(util.result(idx));
  }

  if (util.isUndefined(idx)) {
    options = idx;
    return options.fn(array[array.length - 1]);
  }

  array = array.slice(-idx);
  var len = array.length, i = -1;
  var result = '';
  while (++i < len) {
    result += options.fn(array[i]);
  }
  return result;
};


