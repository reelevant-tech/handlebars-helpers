'use strict'

const Handlebars = require('handlebars')
// var registerMoment = require('./src/helpers/moment').register
const { register: registerMinMax } = require('./helpers/min-max')
const { register: registerTimeRange } = require('./helpers/time-range')

const { register: registerJustHelpers } = require('./helpers/just-helpers')

// registerMoment(Handlebars)
registerMinMax(Handlebars)
registerTimeRange(Handlebars)

registerJustHelpers(Handlebars)

module.exports = Handlebars
