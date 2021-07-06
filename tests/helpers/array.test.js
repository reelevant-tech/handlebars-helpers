'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerSplit } = require('../../src/helpers/split')
const { register: registerArray } = require('../../src/helpers/array')
registerSplit(Handlebars)
registerArray(Handlebars)

test('helpers > arrayItem', (t) => {
  t.equal(Handlebars.compile('{{arrayItem (split "1;2") 111}}')(), '')
  t.equal(Handlebars.compile('{{arrayItem (split "1;2") -1}}')(), '')
  t.equal(Handlebars.compile('{{arrayItem (split "1;2") a}}')(), '')
  t.equal(Handlebars.compile('{{arrayItem 0 a}}')(), '')
  t.equal(Handlebars.compile('{{arrayItem a a}}')(), '')
  t.equal(Handlebars.compile('{{arrayItem [] a}}')(), '')
  t.equal(Handlebars.compile('{{arrayItem (split "1;2") 0}}')(), '1')
  t.equal(Handlebars.compile('{{arrayItem (split "1;2") 1}}')(), '2')
  t.end()
})
