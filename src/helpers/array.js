
module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('arrayItem', function (array, index, property) {
    if (Array.isArray(array) === false) return null
    if (typeof index !== 'number') return null
    if (index > array.length) return null
    const record = array[index]
    return typeof property === 'string' ? record[property] : record
  })
}
