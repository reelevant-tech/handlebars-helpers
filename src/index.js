'use strict'

const Handlebars = require('handlebars')
const { register: registerMinMax } = require('./helpers/min_max')
const { register: registerMoment } = require('./src/helpers/moment')
const { register: registerTimeRange } = require('./helpers/time_range')
const { register: registerJustHelpers } = require('./helpers/just_helpers')

registerMinMax(Handlebars)
registerMoment(Handlebars)
registerTimeRange(Handlebars)
registerJustHelpers(Handlebars)

module.exports = Handlebars
