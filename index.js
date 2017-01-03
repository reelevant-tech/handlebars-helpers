'use strict'

const Handlebars = require('handlebars')
const registerMoment = require('./helpers/moment').register
const minMaxHelper = require('./helpers/min-max')

Handlebars.registerHelper('minMax', minMaxHelper)
registerMoment(Handlebars)

module.exports = Handlebars
