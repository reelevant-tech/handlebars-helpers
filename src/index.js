'use strict'

const Handlebars = require('handlebars')
const { register: registerMinMax } = require('./helpers/min_max')
const { register: registerMoment } = require('./helpers/moment')
const { register: registerTimeRange } = require('./helpers/time_range')
const { register: registerJustHelpers } = require('./helpers/just_helpers')
const { register: registerContains } = require('./helpers/contains')
const { register: registerSlice } = require('./helpers/slice_helper')
const { register: registerMap } = require('./helpers/map')
const { register: registerConcat } = require('./helpers/concat')
const HandlebarsIntl = require('handlebars-intl')

registerMinMax(Handlebars)
registerMoment(Handlebars)
registerTimeRange(Handlebars)
registerJustHelpers(Handlebars)
registerContains(Handlebars)
registerSlice(Handlebars)
registerMap(Handlebars)
registerConcat(Handlebars)
HandlebarsIntl.registerWith(Handlebars)

module.exports = Handlebars
