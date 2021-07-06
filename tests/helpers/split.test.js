'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerSplit } = require('../../src/helpers/split')
const { register: registerArray } = require('../../src/helpers/array')
registerSplit(Handlebars)
registerArray(Handlebars)

test('helpers > split', (t) => {
  t.equal(Handlebars.compile('{{arrayItem (split "1;2") 0}}')(), '1')
  t.equal(Handlebars.compile('{{arrayItem (split "1;2") 1}}')(), '2')
  t.end()
})

test('helpers > splitOn', (t) => {
  t.equal(Handlebars.compile('{{arrayItem (splitOn "," "1,2") 0}}')(), '1')
  t.equal(Handlebars.compile('{{arrayItem (splitOn "," "1,2") 1}}')(), '2')
  t.end()
})
