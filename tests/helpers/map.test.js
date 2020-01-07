'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerMap } = require('../../src/helpers/map')

registerMap(Handlebars)

test('map: should display map with default values', (t) => {
  const data = {
    custom: [{
      rlvt_lat: 10,
      rlvt_lng: -12
    }]
  }
  const text = '{{map custom.0.rlvt_lat custom.0.rlvt_lng }}'
  const template = Handlebars.compile(text)
  const result = template(data, { data: { googleMapKey: 'KEY' } })

  t.equal(result, '<img src="https://maps.googleapis.com/maps/api/staticmap?markers=color:%7C10,-12&amp;zoom=17&amp;size=280x220&amp;key=KEY" width="280" />')
  t.end()
})

test('map: should display map without key', (t) => {
  const data = {
    custom: [{
      rlvt_lat: 10,
      rlvt_lng: -12
    }]
  }
  const text = '{{map custom.0.rlvt_lat custom.0.rlvt_lng }}'
  const template = Handlebars.compile(text)
  const result = template(data)

  t.equal(result, '<img src="https://maps.googleapis.com/maps/api/staticmap?markers=color:%7C10,-12&amp;zoom=17&amp;size=280x220&amp;key=undefined" width="280" />')
  t.end()
})

test('map: should display map', (t) => {
  const data = {
    custom: [{
      rlvt_lat: 10,
      rlvt_lng: -12
    }]
  }
  const text = '{{map custom.0.rlvt_lat custom.0.rlvt_lng 320 270 10 }}'
  const template = Handlebars.compile(text)
  const result = template(data, { data: { googleMapKey: 'KEY' } })

  t.equal(result, '<img src="https://maps.googleapis.com/maps/api/staticmap?markers=color:%7C10,-12&amp;zoom=10&amp;size=320x270&amp;key=KEY" width="320" />')
  t.end()
})
