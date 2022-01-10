'use strict'

const test = require('tape')
const Handlebars = require('handlebars')

const { register: registerMap } = require('../../src/helpers/map')
const { register: registerConcat } = require('../../src/helpers/concat')
const { register: registerSplit } = require('../../src/helpers/split')

registerMap(Handlebars)
registerSplit(Handlebars)
registerConcat(Handlebars)

const toIMGUrl = (url, size = 280) => `<img src="${Buffer.from(url).toString('base64')}" width="${size}" />`

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

  t.equal(result, toIMGUrl('https://maps.googleapis.com/maps/api/staticmap?markers=color%3A%7C10%2C-12&size=280x220&key=KEY'))
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

  t.equal(result, toIMGUrl('https://maps.googleapis.com/maps/api/staticmap?markers=color%3A%7C10%2C-12&size=320x270&key=KEY&zoom=10', 320))
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

  t.equal(result, toIMGUrl('https://maps.googleapis.com/maps/api/staticmap?markers=color%3A%7C10%2C-12&size=280x220&key=KEY2'))
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

  t.equal(result, toIMGUrl('https://maps.googleapis.com/maps/api/staticmap?markers=color%3A%7C10%2C-12&size=280x220&key=KEY&maptype=satellite'))
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

  t.equal(result, toIMGUrl('https://maps.googleapis.com/maps/api/staticmap?size=280x220&key=KEY&markers=color%3Ablue%7Clabel%3AS%7C10%2C-12'))
  t.end()
})

test('map: should display map with custom marker', (t) => {
  const data = {
    custom: [{
      rlvt_lat: 10,
      rlvt_lng: -12
    }]
  }
  const text = '{{map markers=(split (concat "color:blue|label:S|" custom.0.rlvt_lat "," custom.0.rlvt_lng ";" "color:green|label:S|" 1.10 "," 1.12))}}'
  const template = Handlebars.compile(text)
  const result = template(data, { data: { googleMapKey: 'KEY' } })

  t.equal(result, toIMGUrl('https://maps.googleapis.com/maps/api/staticmap?size=280x220&key=KEY&markers=color%3Ablue%7Clabel%3AS%7C10%2C-12&markers=color%3Agreen%7Clabel%3AS%7C1.1%2C1.12'))
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

test('map: should display map', (t) => {
  const data = {
    custom: [{
      rlvt_lat: 10,
      rlvt_lng: -12
    }]
  }
  const text = '{{map lat=custom.0.rlvt_lat lng=custom.0.rlvt_lng width=320 height=270 zoom=10 }}'
  const template = Handlebars.compile(text)
  const result = template(data, { data: { googleMapKey: 'KEY', googleMapSign: 'SIGN' } })

  t.equal(result, toIMGUrl('https://maps.googleapis.com/maps/api/staticmap?markers=color%3A%7C10%2C-12&size=320x270&key=KEY&zoom=10&signature=2zSd5g9WsY5yFMYQtjM8XEOUAVk%3D', 320))
  t.end()
})
