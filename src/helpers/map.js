'use strict'

module.exports.register = function (Handlebars) {
  // lat, lng, width = '280', height = '220', zoom = '17', options = { data: { token: <token> } }
  Handlebars.registerHelper('map', function ({ hash, data }) {
    let { lat, lng, width = '280', height = '220', key, markers } = hash
    if (!key) key = data.googleMapKey
    if (!key) {
      return new Handlebars.SafeString(`<div style="width:${width}px;height:${height}px;background:#aadaff;"></div>`)
    }

    const secret = data.googleMapSign

    const url = new URL('https://maps.googleapis.com/maps/api/staticmap')

    if (markers === undefined) {
      url.searchParams.append('markers', `color:|${lat},${lng}`)
    }
    url.searchParams.append('size', `${width}x${height}`)
    url.searchParams.append('key', key)

    Object.keys(hash)
      .filter(k => !['lat', 'lng', 'width', 'height', 'key'].includes(k))
      .forEach((property) => {
        const value = hash[property]
        if (Array.isArray(value)) {
          value.forEach((val) => {
            url.searchParams.append(property, val)
          })
        } else {
          url.searchParams.append(property, value)
        }
      })

    if (typeof window === 'undefined' && typeof secret !== 'undefined') {
      const path = url.pathname + url.search
      const bufferSecret = Buffer.from(secret.replace(/-/g, '+').replace(/_/g, '/'), 'base64')

      const crypto = require('crypto')
      const hashedSignature = crypto.createHmac('sha1', bufferSecret)
        .update(path)
        .digest('base64')
        .replace(/\+/g, '-').replace(/\//g, '_')

      url.searchParams.append('signature', hashedSignature)
    }

    return new Handlebars.SafeString(`<img src="${url.toString()}" width="${width}" />`)
  })
}
