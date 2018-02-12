'use strict'

const test = require('tape')
const Handlebars = require('../../src')

test('helpers > intl > format number', (t) => {
  var tpl = Handlebars.compile('{{formatNumber price style="currency" currency="EUR"}}')

  const frenchContext = { data: { intl: { locales: 'fr-FR' } } }
  const usContext = { data: { intl: { locales: 'en-US' } } }

  t.equal(tpl({price: 20.1}, frenchContext), '20,10 €')
  t.equal(tpl({price: 20.1}, usContext), '€20.10')

  t.end()
})
