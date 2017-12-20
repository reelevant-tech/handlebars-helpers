'usr strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerMoment } = require('../../src/helpers/moment')

registerMoment(Handlebars)

test('helpers > moment > empty', (assert) => {
  const text = `{{moment}}`
  const template = Handlebars.compile(text)
  const result = template({})

  assert.true(result, 'should be here')

  assert.end()
})

test('moment: format with timezone and locale', (t) => {
  const timestamp = 1483446951347
  const text = '{{moment timestamp tz="Europe/Paris" format="dddd DD MMM HH:mm" locale="fr"}}'

  const template = Handlebars.compile(text)
  const result = template({ timestamp })

  t.equal(result, 'mardi 03 janv. 13:35')
  t.end()
})

test('helpers > moment > format with default timezone and locale', (t) => {
  const timestamp = 1483446951347
  const text = '{{moment timestamp format="dddd DD MMM HH:mm"}}'

  const template = Handlebars.compile(text)
  const result = template({ timestamp })

  t.equal(result, 'mardi 03 janv. 13:35')
  t.end()
})

test('helpers > moment > format with `undefined` timezone', (t) => {
  const timestamp = 1483446951347
  const text = '{{moment timestamp tz=timezone format="dddd DD MMM HH:mm" locale="fr"}}'

  const template = Handlebars.compile(text)
  const result = template({ timestamp })

  t.equal(result, 'mardi 03 janv. 13:35')
  t.end()
})

test('helpers > moment > from/to', (assert) => {
  const text1 = `{{moment '1991-09-29' from=moment}}`
  const text2 = `{{moment to='1991-09-29'}}`
  const template1 = Handlebars.compile(text1)
  const template2 = Handlebars.compile(text2)
  const result1 = template1({})
  const result2 = template2({})

  assert.equal(result1, 'il y a 26 ans', 'result should be `il y a 26 ans`')
  assert.equal(result2, 'il y a 26 ans', 'result should be `il y a 26 ans`')

  assert.end()
})

test('helpers > moment > diff', (assert) => {
  const text = `{{moment '1991-09-29 10:11' diff='1991-09-29 10:10'}}`
  const template = Handlebars.compile(text)
  const result = template({})

  assert.equal(result, '60000')

  assert.end()
})

test('helpers > moment > fromNow', (assert) => {
  const text1 = `{{moment '1991-09-29' fromNow=true}}`
  const template1 = Handlebars.compile(text1)
  const result1 = template1({})

  assert.equal(result1, '26 ans', 'result should be `il y a 26 ans`')

  assert.end()
})
