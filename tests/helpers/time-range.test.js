'use strict'

const test = require('tape')
const moment = require('moment-timezone')
const proxyquire = require('proxyquire')
const Handlebars = require('handlebars')

const registerTimeRange = proxyquire('../../src/helpers/time-range', {
  'moment-timezone': () => {
    return moment('2017-01-10 10:12').tz('Europe/Paris') // mock date 10 January - Tuesday - 10:12am
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

  t.test('should display `else` code if user is not inside the range', (t) => {
    const text = `{{#timeRange tuesday="de 11h à 17h"}}
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
    const text = `{{#timeRange tuesday="de 2h à 5h et de 12h a 17h"}}
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
    const text = `{{#timeRange tz="Europe/Paris" tuesday="de 9h à 17h"}}
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
    const text = `{{#timeRange tz="Europe/Paris" tuesday="de 9h30 à 12h et de 14h a 17h"}}
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
    const text = `{{#timeRange tz="Europe/Paris" tuesday="de 1h30 à 9h et de 10h a 12h"}}
                    yes
                  {{else}}
                    no
                  {{/timeRange}}`

    const template = Handlebars.compile(text)
    const result = template({})

    t.true(result.includes('yes'), 'result should be a text which contains `yes`')
    t.end()
  })
})

