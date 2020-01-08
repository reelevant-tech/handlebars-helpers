'use strict'

module.exports.register = function (Handlebars) {
  // lat, lng, width = '280', height = '220', zoom = '17', options = { data: { token: <token> } }
  Handlebars.registerHelper('map', function ({ hash, data }) {
    let { lat, lng, width = '280', height = '220', key, markers } = hash
    if (!key) key = data.googleMapKey
    if (!key) {
      return new Handlebars.SafeString(`<div style="width:${width}px;height:${height}px;background:#aadaff;"></div>`)
    }
    let url = `https://maps.googleapis.com/maps/api/staticmap?${markers === undefined ? `markers=color:|${lat},${lng}` : ''}&size=${width}x${height}&key=${key}`
    Object.keys(hash)
      .filter(k => !['lat', 'lng', 'width', 'height', 'key'].includes(k))
      .forEach((property) => {
        const value = hash[property]
        url += `&${property}=${value}`
      })
    return new Handlebars.SafeString(`<img src="${url}" width="${width}" />`)
  })
}
