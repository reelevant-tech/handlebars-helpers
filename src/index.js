'use strict'

const Handlebars = require('handlebars')
const { register: registerMinMax } = require('./helpers/min_max')
const { register: registerMoment } = require('./helpers/moment')
const { register: registerTimeRange } = require('./helpers/time_range')
const { register: registerJustHelpers } = require('./helpers/just_helpers')
const { register: registerContains } = require('./helpers/contains')

registerMinMax(Handlebars)
registerMoment(Handlebars)
registerTimeRange(Handlebars)
registerJustHelpers(Handlebars)
registerContains(Handlebars)

module.exports = Handlebars
