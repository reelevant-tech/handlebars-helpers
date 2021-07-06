
module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('arrayItem', function (array, index) {
    if (Array.isArray(array) === false) return null
    if (typeof index !== 'number') return null
    if (index > array.length) return null
    return array[index]
  })
}
