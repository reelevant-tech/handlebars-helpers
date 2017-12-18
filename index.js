'use strict'

var Handlebars = require('handlebars')
// var registerMoment = require('./src/helpers/moment').register
var registerMinMax = require('./src/helpers/min-max').register
var registerTimeRange = require('./src/helpers/time-range').register

// registerMoment(Handlebars)
registerMinMax(Handlebars)
registerTimeRange(Handlebars)
require('handlebars-helpers')({
  handlebars: Handlebars
})

module.exports = Handlebars
