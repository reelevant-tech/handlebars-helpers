'use strict'

module.exports.register = function (Handlebars) {
  var isUndefined = require('lodash/isUndefined')

  Handlebars.registerHelper('minMax', function (value, fallback, min, max) {
    value = value || ''
    fallback = fallback || ''
    if ((!isUndefined(min) && value.length < min) || (!isUndefined(max) && value.length > max)) {
      return fallback
    } else {
      return value
    }
  })
}
