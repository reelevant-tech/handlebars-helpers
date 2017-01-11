'use strict'

module.exports.register = function (Handlebars) {
  const isUndefined = require('lodash/isUndefined')

  Handlebars.registerHelper('minMax', function (value = '', fallback = '', min, max, options) {
    if ((!isUndefined(min) && value.length < min) || (!isUndefined(max) && value.length > max)) {
      return fallback
    } else {
      return value
    }
  })
}
