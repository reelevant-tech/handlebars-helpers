'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerGroupBy } = require('../../src/helpers/groupBy')
const { register: registerArrayItem } = require('../../src/helpers/array')
registerGroupBy(Handlebars)
registerArrayItem(Handlebars)

test('helpers > groupBy', (t) => {
  t.equal(Handlebars.compile('{{arrayItem (arrayItem (groupBy custom "test") 0) 0 "test"}}')({
    custom: [
      {
        test: 1
      },
      {
        test: 2
      },
      {
        test: 2
      }
    ]
  }), '1')
  t.equal(Handlebars.compile('{{arrayItem (arrayItem (groupBy custom "test" "desc") 0) 0 "test"}}')({
    custom: [
      {
        test: 1
      },
      {
        test: 2
      },
      {
        test: 2
      }
    ]
  }), '2')
  t.equal(Handlebars.compile('{{arrayItem (arrayItem (groupBy custom "test" "asc") 0) 0 "test"}}')({
    custom: [
      {
        test: 1
      },
      {
        test: 2
      },
      {
        test: 2
      }
    ]
  }), '1')
  t.end()
})
