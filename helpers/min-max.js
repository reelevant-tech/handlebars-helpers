'use strict'

const isUndefined = require('lodash/isUndefined')

module.exports = (value = '', fallback = '', min, max, options) => {
  if ((!isUndefined(min) && value.length < min) || (!isUndefined(max) && value.length > max)) {
    return fallback
  } else {
    return value
  }
}
