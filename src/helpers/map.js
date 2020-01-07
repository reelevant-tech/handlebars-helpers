'use strict'

module.exports.register = function (Handlebars) {
  // lat, lng, width = '280', height = '220', zoom = '17', options = { data: { token: <token> } }
  Handlebars.registerHelper('map', function (lat, lng) {
    const args = Array.from(arguments).splice(2) // remove lat and lng
    let options = { data: {} }
    let width = '280'
    let height = '220'
    let zoom = '17'
    if (args.length === 1) {
      ([ options ] = args)
    } else if (args.length === 2) {
      ([ width, options ] = args)
    } else if (args.length === 3) {
      ([ width, height, options ] = args)
    } else if (args.length === 4) {
      ([ width, height, zoom, options ] = args)
    }
    const key = options.data.googleMapKey
    return new Handlebars.SafeString(`<img src="https://maps.googleapis.com/maps/api/staticmap?markers=color:%7C${lat},${lng}&amp;zoom=${zoom}&amp;size=${width}x${height}&amp;key=${key}" width="${width}" />`)
  })
}
