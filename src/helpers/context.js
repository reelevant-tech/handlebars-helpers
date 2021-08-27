module.exports.register = function (Handlebars) {
  const context = new Map()
  Handlebars.registerHelper('getContext', function (key) {
    return context.get(key)
  })
  Handlebars.registerHelper('setContext', function (key, value) {
    context.set(key, value)
    return null
  })
}
