'use strict'

const { isObject } = require('lodash')

module.exports.register = function (Handlebars) {
  /**
   * this helper allow to get substring
   * Handlebars set a context (Object) in params. If no param setted, context will be in str.
   * If str is setted, context will in start ...
   * isObject is used to check if a given param is the context or not
   * @param {String} str - original string to process
   * @param {Number} start - start index (included)
   * @param {Number} stendart - end index (excluded)
   */
  Handlebars.registerHelper('substring', function (str, start, end) {
    if ((start !== undefined && !isObject(start)) && end !== undefined && !isObject(end)) {
      return str.slice(start, end)
    } else if (((start === undefined || isObject(start)) && (end === undefined || isObject(start))) && !isObject(str)) {
      return str
    } else if ((start !== undefined && !isObject(start)) || (end !== undefined && !isObject(end))) {
      return str.slice(start !== undefined ? start : end)
    }
    return ''
  })
}
