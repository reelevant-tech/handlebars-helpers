'use strict'

const justHelpers = require('just-handlebars-helpers')

module.exports.register = function (Handlebars) {
  justHelpers.registerHelpers(Handlebars)
}
