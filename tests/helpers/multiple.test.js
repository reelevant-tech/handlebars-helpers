'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerFloat } = require('../../src/helpers/parse_float')
const { register: registerMultiple } = require('../../src/helpers/multiple')
const { register: registerJustHelpers } = require('../../src/helpers/just_helpers')

registerMultiple(Handlebars)
registerFloat(Handlebars)
registerJustHelpers(Handlebars)

test('helpers > multiple', (t) => {
  t.equal(Handlebars.compile('{{multiple 2 3}}')(), '6')
  t.equal(Handlebars.compile('{{multiple "2" 3}}')(), '6')
  t.equal(Handlebars.compile('{{multiple "2.2" 3}}')(), '6.6')
  t.equal(Handlebars.compile('{{multiple "2.2" 3 1000}}')(), '6600')
  t.equal(Handlebars.compile('{{multiple (parseFloat num) 13}}')({ num: '1,3' }), '16.9')
  t.end()
})

test('helpers > multiple (full combo)', (t) => {
  const str = '{{formatCurrency (multiple (parseFloat num) 13) code="EUR" locale="fr"}}'
  t.equal(Handlebars.compile(str)({ num: '1,3' }), '16,90 €')

  t.end()
})

test('helpers > multiple (with precision)', (t) => {
  t.equal(Handlebars.compile('{{multiple "2.2" 3 3.14 precision=3}}')(), '20.724')
  t.end()
})
