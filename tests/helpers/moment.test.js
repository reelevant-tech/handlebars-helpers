'usr strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerMoment } = require('../../src/helpers/moment')
const { register: registerHelpers } = require('../../src/helpers/just_helpers')
const REF_YEAR = 1991
const REF_DATE = new Date(new Date().getFullYear(), 10, 29, 0, 0, 0, 0)

registerMoment(Handlebars)
registerHelpers(Handlebars)

/**
 * year is a function of dynamic past time  by year
 * @return {number}
 */
const year = () => REF_DATE.getFullYear() - REF_YEAR

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
  const text1 = `{{moment '${REF_YEAR}-09-29' from=moment}}`
  const text2 = `{{moment to='${REF_YEAR}-09-29'}}`
  const template1 = Handlebars.compile(text1)
  const template2 = Handlebars.compile(text2)
  const result1 = template1({})
  const result2 = template2({})
  assert.equal(result1, `il y a ${year()} ans`, `result should be "il y a ${year()} ans but have ${result1}"`)
  assert.equal(result2, `il y a ${year()} ans`, `result should be "il y a ${year()} ans but have ${result2}"`)

  assert.end()
})

test('helpers > moment > diff', (assert) => {
  const text = `{{moment '${REF_YEAR}-09-29 10:11' diff='${REF_YEAR}-09-29 10:10'}}`
  const template = Handlebars.compile(text)
  const result = template({})

  assert.equal(result, '60000', `it should be 60000 but have ${result}`)

  assert.end()
})

test('helpers > moment > fromNow', (assert) => {
  const text1 = `{{moment '${REF_YEAR}-09-29' fromNow=true}}`
  const template1 = Handlebars.compile(text1)
  const result1 = template1({})

  assert.equal(result1, `${year()} ans`, `result should be "il y a ${year()} ans"`)

  assert.end()
})

test('moment: isToday and isTomorrow', (t) => {
  t.equal(Handlebars.compile('{{isToday timestamp tz="Europe/Paris"}}')({
    timestamp: new Date().getTime()
  }), 'true', 'isToday should be true')
  t.equal(Handlebars.compile('{{isToday timestamp tz="Europe/Paris"}}')({
    timestamp: new Date().getTime() - (24 * 60 * 60 * 1000)
  }), 'false', 'isToday should be false')
  t.equal(Handlebars.compile('{{isTomorrow timestamp tz="Europe/Paris"}}')({
    timestamp: new Date().getTime() + (24 * 60 * 60 * 1000)
  }), 'true', 'isTomorrow should be true')
  t.equal(Handlebars.compile('{{isTomorrow timestamp tz="Europe/Paris"}}')({
    timestamp: new Date().getTime()
  }), 'false', 'isTomorrow should be false')

  const datestring = '2020-07-22 20:00:00'
  t.equal(Handlebars.compile('{{#if (gte (moment datestring tz="UTC" format="H") 18)}}' +
    '{{#if (isToday timestamp tz="Europe/Paris")}}' +
      'today night' +
   '{{else}}' +
      'a night' +
   '{{/if}}' +
  '{{/if}}')({
    timestamp: new Date(datestring).getTime(),
    datestring
  }), 'a night')
  t.end()
})
