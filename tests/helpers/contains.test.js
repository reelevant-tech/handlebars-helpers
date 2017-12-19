'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerContains } = require('../../src/helpers/contains')

registerContains(Handlebars)

test('helpers > contains', (assert) => {
  const data = {
    array: ['Solid', 'Liquid', 'Solidus'],
    array2: ['Chell', 'GLaDOS', 'Wheatley'],
    object: {
      one: 'Solid',
      two: 'Liquid',
      three: 'Solidus'
    },
    object2: {
      one: 'Chell',
      two: 'GLaDOS',
      three: 'Wheatley'
    },
    string: 'Solidus Snake',
    string2: 'Solid Snake',
    context: 'confirmed'
  }

  var tpl = Handlebars.compile('{{#contains this "Solidus"}}Yup{{else}}Nope{{/contains}}.')

  assert.equal(tpl(data.array), 'Yup.', 'renders data within block when item is in array')
  assert.equal(tpl(data.array2), 'Nope.', 'renders else block when item is not in array')
  assert.equal(tpl(data.object), 'Yup.', 'renders data within block when item is in object')
  assert.equal(tpl(data.object2), 'Nope.', 'renders else block when item is not in object')
  assert.equal(tpl(data.string), 'Yup.', 'renders data within block when substring is in string')
  assert.equal(tpl(data.string2), 'Nope.', 'renders else block when substring is not in string')

  assert.end()
})
