'use strict'

const test = require('tape')
const Handlebars = require('../../src')

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

// test('moment: format with timezone and locale', (t) => {
//   const timestamp = 1483446951347
//   const text = '{{moment timestamp tz="Europe/Paris" format="dddd DD MMM HH:mm" locale="fr"}}'
//
//   const template = Handlebars.compile(text)
//   const result = template({ timestamp })
//
//   t.equal(result, 'mardi 03 janv. 13:35')
//   t.end()
// })
//
// test('moment: format with default timezone and locale', (t) => {
//   const timestamp = 1483446951347
//   const text = '{{moment timestamp format="dddd DD MMM HH:mm"}}'
//
//   const template = Handlebars.compile(text)
//   const result = template({ timestamp })
//
//   t.equal(result, 'mardi 03 janv. 13:35')
//   t.end()
// })
//
// test('moment: format with `undefined` timezone', (t) => {
//   const timestamp = 1483446951347
//   const text = '{{moment timestamp tz=timezone format="dddd DD MMM HH:mm" locale="fr"}}'
//
//   const template = Handlebars.compile(text)
//   const result = template({ timestamp })
//
//   t.equal(result, 'mardi 03 janv. 13:35')
//   t.end()
// })
