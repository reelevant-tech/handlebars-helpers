'use strict'

const { isObject } = require('lodash')

module.exports.register = function (Handlebars) {
  /**
   * this helper allow to get substring
   * Handlebars set a context (Object) in params. If no param setted, context will be in str. If str is setted, context will in start ...
   * isObject is used to check if a given param is the context or not
   * @param {String} str - original string to process
   * @param {Number} start - start index (included)
   * @param {Number} stendart - end index (excluded)
   */
  Handlebars.registerHelper('slice', function (str, start, end) {
    // {{slice 'toto tata' 1 2}}
    if ((start != null && !isObject(start)) && (end != null && !isObject(end))) {
      return str.slice(start, end)
    // {{slice 'toto tata'}}
    } else if ((start == null || isObject(start)) && !isObject(str)) {
      return str
    // {{slice 'toto tata' 1}}
    } else if ((start != null && !isObject(start))) {
      return str.slice(start)
    }
    return ''
  })
}
