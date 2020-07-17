module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('split', function (str) {
    return str.split(';')
  })
}
