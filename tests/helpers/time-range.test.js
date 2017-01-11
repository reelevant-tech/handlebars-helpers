'use strict'

const test = require('tape')
const moment = require('moment-timezone')
const proxyquire = require('proxyquire')
const Handlebars = require('handlebars')

const registerTimeRange = proxyquire('../../src/helpers/time-range', {
  'moment-timezone': () => {
    return moment('2017-01-10T10:12:00.000+01:00') // mock date 10 January - Tuesday - 10:12am UTC + 1
  }
}).register

registerTimeRange(Handlebars)

test('timerange:', (t) => {
  t.test('should display `else` code if current is not in props', (t) => {
    const text = `{{#timeRange monday="de 11h à 17h"}}
                    yes
                  {{else}}
                    no
                  {{/timeRange}}`

    const template = Handlebars.compile(text)
    const result = template({})

    t.true(result.includes('no'), 'result should be a text which contains `no`')
    t.end()
  })

  t.test('should display `else` code if user is not inside the range in the timezone', (t) => {
    const text = `{{#timeRange tz="America/Los_Angeles" tuesday="de 2h à 3h"}}
                    yes
                  {{else}}
                    no
                  {{/timeRange}}`

    const template = Handlebars.compile(text)
    const result = template({})

    t.true(result.includes('no'), 'result should be a text which contains `no`')
    t.end()
  })

  t.test('should display `else` code if user is not inside the range', (t) => {
    const text = `{{#timeRange tuesday="de 8h à 10h et de 12h a 17h"}}
                    yes
                  {{else}}
                    no
                  {{/timeRange}}`

    const template = Handlebars.compile(text)
    const result = template({})

    t.true(result.includes('no'), 'result should be a text which contains `no`')
    t.end()
  })

  t.test('should display `else` code with wrong input', (t) => {
    const text = `{{#timeRange tuesday="de 11h à 17h et de"}}
                    yes
                  {{else}}
                    no
                  {{/timeRange}}`

    const template = Handlebars.compile(text)
    const result = template({})

    t.true(result.includes('no'), 'result should be a text which contains `no`')
    t.end()
  })

  t.test('should display correct code if we are in correct range', (t) => {
    const text = `{{#timeRange tz="America/Los_Angeles" tuesday="de 1h à 2h"}}
                    yes
                  {{else}}
                    no
                  {{/timeRange}}`

    const template = Handlebars.compile(text)
    const result = template({})

    t.true(result.includes('yes'), 'result should be a text which contains `yes`')
    t.end()
  })

  t.test('should display correct code if we are in correct range', (t) => {
    const text = `{{#timeRange tz="America/Los_Angeles" tuesday="de 0h à 2h et de 3h a 4h"}}
                    yes
                  {{else}}
                    no
                  {{/timeRange}}`

    const template = Handlebars.compile(text)
    const result = template({})

    t.true(result.includes('yes'), 'result should be a text which contains `yes`')
    t.end()
  })

  t.test('should display correct code if we are in correct range', (t) => {
    const text = `{{#timeRange tz="Europe/Paris" tuesday="de 6h30 à 9h et de 10h a 12h"}}
                    yes
                  {{else}}
                    no
                  {{/timeRange}}`

    const template = Handlebars.compile(text)
    const result = template({})

    t.true(result.includes('yes'), 'result should be a text which contains `yes`')
    t.end()
  })

  t.test('should display correct code with current data context', (t) => {
    const text = `{{#timeRange tz="Europe/Paris" tuesday="de 6h30 à 9h et de 10h a 12h"}}
                    yes {{ myVar }}
                  {{else}}
                    no
                  {{/timeRange}}`

    const template = Handlebars.compile(text)
    const result = template({myVar: 'mySwagyVar'})

    t.true(result.includes('yes'), 'result should be a text which contains `yes`')
    t.true(result.includes('mySwagyVar'), 'result should contains `mySwagyVars`')
    t.end()
  })
})

