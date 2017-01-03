'use strict'

const test = require('tape')
const Handlebars = require('./')

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

test('moment: format', (t) => {
  const timestamp = 1483446951347
  const text = '{{moment timestamp format="DD MMM HH:mm"}}'

  const template = Handlebars.compile(text)
  const result = template({ timestamp })

  t.equal(result, '03 Jan 13:35')
  t.end()
})
