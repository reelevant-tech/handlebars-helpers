'use strict'

const Handlebars = require('handlebars')
// var registerMoment = require('./src/helpers/moment').register
const { register: registerMinMax } = require('./helpers/min-max')
const { register: registerTimeRange } = require('./helpers/time-range')

// registerMoment(Handlebars)
registerMinMax(Handlebars)
registerTimeRange(Handlebars)
require('handlebars-helpers')(
  [
    'array',
    'collection',
    'comparison',
    'date',
    'html',
    'inflection',
    'markdown',
    'match',
    'math',
    'misc',
    'number',
    'object',
    'regex',
    'string',
    'url'
  ],
  { handlebars: Handlebars }
)

module.exports = Handlebars
