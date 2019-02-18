'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerContains } = require('../../src/helpers/slice_helper')

registerContains(Handlebars)

test('helpers > slice no params', (t) => {
  const context = { data: { intl: { locales: 'fr-FR' } } }
  var tpl = Handlebars.compile('{{slice}}')
  t.equal(tpl({}, context), '')
  t.end()
})

test('helpers > slice on string', (t) => {
  const context = { data: { intl: { locales: 'fr-FR' } } }
  var tpl = Handlebars.compile('{{slice str}}')
  t.equal(tpl({str: 'first sentance'}, context), 'first sentance')
  t.end()
})

test('helpers > slice on string with start and end', (t) => {
  const context = { data: { intl: { locales: 'fr-FR' } } }
  const str = 'first sentance'
  const excpected = str.slice(2, 4)
  var tpl = Handlebars.compile('{{slice str start end}}')
  t.equal(tpl({str, start: 2, end: 4}, context), excpected)
  t.end()
})

test('helpers > slice on string with start and end, end < start ', (t) => {
  const context = { data: { intl: { locales: 'fr-FR' } } }
  const str = 'first sentance'
  const excpected = str.slice(2, 1)
  var tpl = Handlebars.compile('{{slice str start end}}')
  t.equal(tpl({str, start: 2, end: 1}, context), excpected)
  t.end()
})

test('helpers > slice on string with start', (t) => {
  const context = { data: { intl: { locales: 'fr-FR' } } }
  const str = 'first sentance'
  const excpected = str.slice(2)
  var tpl = Handlebars.compile('{{slice str start}}')
  t.equal(tpl({str, start: 2}, context), excpected)
  t.end()
})
