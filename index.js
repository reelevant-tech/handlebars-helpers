'use strict'

const Handlebars = require('handlebars')
const registerMoment = require('./src/helpers/moment').register
const registerMinMax = require('./src/helpers/min-max').register
const registerTimeRange = require('./src/helpers/time-range').register

registerMoment(Handlebars)
registerMinMax(Handlebars)
registerTimeRange(Handlebars)

module.exports = Handlebars
