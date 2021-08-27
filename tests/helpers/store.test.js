'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register } = require('../../src/helpers/store')
register(Handlebars)

test('helpers > context', (t) => {
  const storage = new Map()
  t.equal(Handlebars.compile('{{set key 3}}')({ storage }), '')
  t.equal(Handlebars.compile('{{set key 3}}{{get key}}')({ storage }), '3')
  t.equal(Handlebars.compile('{{set key 3}}{{get key}}')({}), '')
  t.equal(Handlebars.compile('{{set key 3}}{{get key}}')(), '')
  t.end()
})
