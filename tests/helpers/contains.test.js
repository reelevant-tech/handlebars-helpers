'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerContains } = require('../../src/helpers/contains')

registerContains(Handlebars)

test('helpers > contains > fail', (assert) => {
  const text = `{{#contains myStr "Solidus"}}Yup{{else}}Nope{{/contains}}`

  const template = Handlebars.compile(text)
  const result = template({ myStr: 'Coucou solidus' })

  assert.equal(result, 'Nope')
  assert.end()
})

test('helpers > contains > works', (assert) => {
  const text = `{{#contains myStr "Solidus"}}Yup{{else}}Nope{{/contains}}`

  const template = Handlebars.compile(text)
  const result = template({ myStr: 'Non moi cest Solidus avec un S majuscule' })

  assert.equal(result, 'Yup')
  assert.end()
})
