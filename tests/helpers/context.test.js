'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register } = require('../../src/helpers/context')
register(Handlebars)

test('helpers > context', (t) => {
  t.equal(Handlebars.compile('{{setContext key 3}}')(), '')
  t.equal(Handlebars.compile('{{setContext key 3}}{{getContext key}}')(), '3')
  t.end()
})
