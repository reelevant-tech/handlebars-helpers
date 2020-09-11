module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('parseFloat', function (str) {
    if (typeof str !== 'string') {
      return str
    }
    return parseFloat(str.replace(/,([0-9]{1,2})$/, '.$1').replace(/,/g, ''))
  })
}
