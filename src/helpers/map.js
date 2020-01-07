'use strict'

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('map', function (lat, lng, width = '280', height = '220', zoom = '17') {
    if (typeof width === 'object') {
      width = '280'
    }
    const key = process.env.GOOGLEMAP_KEY
    return new Handlebars.SafeString(`<img src="https://maps.googleapis.com/maps/api/staticmap?markers=color:%7C${lat},${lng}&amp;zoom=${zoom}&amp;size=${width}x${height}&amp;key=${key}" width="${width}" />`)
  })
}
