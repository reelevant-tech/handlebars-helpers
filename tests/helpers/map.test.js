'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerMap } = require('../../src/helpers/map')
const { register: registerConcat } = require('../../src/helpers/concat')

registerMap(Handlebars)
registerConcat(Handlebars)

test('map: should display map with default values', (t) => {
  const data = {
    custom: [{
      rlvt_lat: 10,
      rlvt_lng: -12
    }]
  }
  const text = '{{map lat=custom.0.rlvt_lat lng=custom.0.rlvt_lng }}'
  const template = Handlebars.compile(text)
  const result = template(data, { data: { googleMapKey: 'KEY' } })

  t.equal(result, '<img src="https://maps.googleapis.com/maps/api/staticmap?markers=color:|10,-12&size=280x220&key=KEY" width="280" />')
  t.end()
})

test('map: should display map', (t) => {
  const data = {
    custom: [{
      rlvt_lat: 10,
      rlvt_lng: -12
    }]
  }
  const text = '{{map lat=custom.0.rlvt_lat lng=custom.0.rlvt_lng width=320 height=270 zoom=10 }}'
  const template = Handlebars.compile(text)
  const result = template(data, { data: { googleMapKey: 'KEY' } })

  t.equal(result, '<img src="https://maps.googleapis.com/maps/api/staticmap?markers=color:|10,-12&size=320x270&key=KEY&zoom=10" width="320" />')
  t.end()
})

test('map: should display map with custom key', (t) => {
  const data = {
    custom: [{
      rlvt_lat: 10,
      rlvt_lng: -12
    }]
  }
  const text = '{{map lat=custom.0.rlvt_lat lng=custom.0.rlvt_lng key="KEY2"}}'
  const template = Handlebars.compile(text)
  const result = template(data, { data: { googleMapKey: 'KEY' } })

  t.equal(result, '<img src="https://maps.googleapis.com/maps/api/staticmap?markers=color:|10,-12&size=280x220&key=KEY2" width="280" />')
  t.end()
})

test('map: should display map with custom params', (t) => {
  const data = {
    custom: [{
      rlvt_lat: 10,
      rlvt_lng: -12
    }]
  }
  const text = '{{map lat=custom.0.rlvt_lat lng=custom.0.rlvt_lng maptype="satellite"}}'
  const template = Handlebars.compile(text)
  const result = template(data, { data: { googleMapKey: 'KEY' } })

  t.equal(result, '<img src="https://maps.googleapis.com/maps/api/staticmap?markers=color:|10,-12&size=280x220&key=KEY&maptype=satellite" width="280" />')
  t.end()
})

test('map: should display map with custom marker', (t) => {
  const data = {
    custom: [{
      rlvt_lat: 10,
      rlvt_lng: -12
    }]
  }
  const text = '{{map markers=(concat "color:blue|label:S|" custom.0.rlvt_lat "," custom.0.rlvt_lng)}}'
  const template = Handlebars.compile(text)
  const result = template(data, { data: { googleMapKey: 'KEY' } })

  t.equal(result, '<img src="https://maps.googleapis.com/maps/api/staticmap?&size=280x220&key=KEY&markers=color:blue|label:S|10,-12" width="280" />')
  t.end()
})

test('map: should display default without token', (t) => {
  const data = {
    custom: [{
      rlvt_lat: 10,
      rlvt_lng: -12
    }]
  }
  const text = '{{map lat=custom.0.rlvt_lat lng=custom.0.rlvt_lng height=300}}'
  const template = Handlebars.compile(text)
  const result = template(data, { data: { googleMapKey: undefined } })

  t.equal(result, '<div style="width:280px;height:300px;background:#aadaff;"></div>')
  t.end()
})
