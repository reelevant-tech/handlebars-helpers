module.exports.register = function (Handlebars) {
  const getStorage = (options) => {
    if (typeof options !== 'object') return {}
    if (typeof options.data !== 'object') return {}
    if (typeof options.data.root !== 'object') return {}
    if (typeof options.data.root.storage !== 'object') return {}
    return options.data.root.storage
  }
  Handlebars.registerHelper('get', function (key, options) {
    return getStorage(options)[key]
  })
  Handlebars.registerHelper('set', function (key, value, options) {
    getStorage(options)[key] = value
    return null
  })
}
