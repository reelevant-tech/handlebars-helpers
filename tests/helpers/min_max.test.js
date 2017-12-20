'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerMinMax } = require('../../src/helpers/min_max')

registerMinMax(Handlebars)

test('minMax: should fallback when value is under min', (t) => {
  const data = {
    value: 'foo',
    fallback: 'bar'
  }
  const text = '{{minMax value fallback 4}}'
  const template = Handlebars.compile(text)
  const result = template(data)

  t.equal(result, 'bar')
  t.end()
})
