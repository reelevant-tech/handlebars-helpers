'use strict'

const Handlebars = require('handlebars')
const momentHelpers = require('handlebars-helper-moment')()
const minMaxHelper = require('./helpers/min-max')

Handlebars.registerHelper('moment', momentHelpers.moment)
Handlebars.registerHelper('minMax', minMaxHelper)

module.exports = Handlebars
