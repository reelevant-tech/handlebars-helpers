'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register } = require('../../src/helpers/parse_float')

register(Handlebars)

test('helpers > parseFloat', (t) => {
  t.equal(Handlebars.compile('{{parseFloat 2}}')(), '2')
  t.equal(Handlebars.compile('{{parseFloat 2.2}}')(), '2.2')
  t.equal(Handlebars.compile('{{parseFloat "2"}}')(), '2')
  t.equal(Handlebars.compile('{{parseFloat "2,2"}}')(), '2.2')
  t.equal(Handlebars.compile('{{parseFloat "2,22"}}')(), '2.22')
  t.end()
})

test('helpers > parseFloat (US notation)', (t) => {
  t.equal(Handlebars.compile('{{parseFloat "2,2000"}}')(), '22000')
  t.equal(Handlebars.compile('{{parseFloat "2,2000.2"}}')(), '22000.2')
  t.equal(Handlebars.compile('{{parseFloat "2,2000.22"}}')(), '22000.22')
  t.end()
})
