'use strict'

const test = require('tape')
const { getMinutes, inRange } = require('../../src/services/time')

test('getMinutes', (t) => {
  t.test('when `time` is falsy', (t) => {
    t.notOk(getMinutes(), 'should be undefined with undefined')
    t.notOk(getMinutes(false), 'should be undefined with false')
    t.notOk(getMinutes(null), 'should be undefined with null')
    t.notOk(getMinutes(''), 'should be undefined with empty string')
    t.notOk(getMinutes(0), 'should be undefined with 0')
    t.notOk(getMinutes(NaN), 'should be undefined with NaN')
    t.end()
  })

  t.test('when `time` is not an object', (t) => {
    t.notOk(getMinutes([]), 'should be undefined with empty array')
    t.notOk(getMinutes('fake string'), 'should be undefined with string')
    t.notOk(getMinutes(1234), 'should be undefined with number')
    t.end()
  })

  t.test('when `time` object has missing props', (t) => {
    t.notOk(getMinutes({}), 'should be undefined with empty object')
    t.notOk(getMinutes({h: 12}), 'should be undefined with missing `m`')
    t.notOk(getMinutes({m: 0}), 'should be undefined with missing `h`')
    t.end()
  })

  t.test('when `time` is correct', (t) => {
    t.equal(getMinutes({ h: 10, m: 0 }), 600, 'should be equal to 600')
    t.equal(getMinutes({ h: 10, m: 30 }), 630, 'should be equal to 630')
    t.equal(getMinutes({ h: 22, m: 30 }), 1350, 'should be equal to 630')
    t.equal(getMinutes({ h: 14, m: 12 }), 852, 'should be equal to 630')
    t.end()
  })
})

test('inRange', (t) => {
  t.test('when `time`, `start` or `end` are incorrect', (t) => {
    t.false(inRange(), 'should be false with undefined props')
    t.false(inRange({h: 10, m: 10}), 'should be false with missing start/end')
    t.false(inRange({h: 10, m: 10}, {h: 10, m: 12}), 'should be false with missing end')
    t.false(inRange({h: 10, m: 10}, null, {h: 11, m: 0}), 'should be false with missing start')
    t.end()
  })

  t.test('when it works', (t) => {
    t.true(inRange({h: 10, m: 10}, {h: 10, m: 0}, {h: 11, m: 0}))
    t.true(inRange({h: 12, m: 30}, {h: 8, m: 0}, {h: 18, m: 0}))
    t.end()
  })
})
