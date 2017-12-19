'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerMoment } = require('../../src/helpers/moment')

registerMoment(Handlebars)

test('helpers > duration > empty', (assert) => {
  const text = `{{duration}}`
  const template = Handlebars.compile(text)
  const result = template({})

  assert.equal(result, '0', 'should return `0`')

  assert.end()
})

test('helpers > duration > { hours: 2, minutes: 33 }', (assert) => {
  const text = `{{duration duration}}`
  const template = Handlebars.compile(text)
  const result = template({ duration: { hours: 2, minutes: 33 } })

  assert.equal(result, '9180000', 'should return `9180000` ms')

  assert.end()
})

test('helpers > duration > { hours: 2, minutes: 33 } / humanize', (assert) => {
  const text = `{{duration duration humanize=null}}`
  const template = Handlebars.compile(text)
  const result = template({ duration: { hours: 2, minutes: 33 } })

  assert.equal(result, '3 heures', 'should return `3 heures`')

  assert.end()
})

test('helpers > duration > { hours: 2, minutes: 33 } / humanize / en', (assert) => {
  const text = `{{duration duration humanize=null locale='en'}}`
  const template = Handlebars.compile(text)
  const result = template({ duration: { hours: 2, minutes: 33 } })

  assert.equal(result, '3 hours', 'should return `3 hours`')

  assert.end()
})

test('helpers > duration > { hours: 2, minutes: 33 } / asHours ', (assert) => {
  const text = `{{duration duration asHours=null}}`
  const template = Handlebars.compile(text)
  const result = template({ duration: { hours: 2, minutes: 33 } })

  assert.equal(result, '2.55', 'should return `3 hours`')

  assert.end()
})

test('helpers > duration > { days: 12, hours: 10, minutes: 10 } / asHours ', (assert) => {
  const text = `{{duration duration asDays=null}}`
  const template = Handlebars.compile(text)
  const result = template({ duration: { days: 12, hours: 2, minutes: 33 } })

  assert.equal(result, '12.10625', 'should return `12.10625`')

  assert.end()
})
