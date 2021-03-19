'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register } = require('../../src/helpers/divide')
register(Handlebars)

test('helpers > divide', (t) => {
  t.equal(Handlebars.compile('{{divide 2 3}}')(), '0.6666666666666666')
  t.equal(Handlebars.compile('{{divide "2" 3}}')(), '0.6666666666666666')
  t.equal(Handlebars.compile('{{divide 50 10}}')(), '5')
  t.end()
})
