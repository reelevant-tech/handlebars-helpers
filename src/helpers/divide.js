module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('divide', function (...args) {
    return parseFloat(args[0]) / parseFloat(args[1])
  })
}
