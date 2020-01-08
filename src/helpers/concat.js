module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('concat', function () {
    return Array.from(arguments).filter(a => typeof a !== 'object').join('')
  })
}
