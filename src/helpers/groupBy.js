
module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('groupBy', function (array, keyName, sort) {
    if (Array.isArray(array) === false) return null
    if (typeof keyName !== 'string') return null
    const groupedBy = new Map()
    array.forEach((record) => {
      const keyValue = record[keyName]
      const records = groupedBy.get(keyValue) || []
      records.push(record)
      groupedBy.set(keyValue, records)
    })
    const flatten = Array.from(groupedBy.values())
    if (sort === 'asc') {
      return flatten.sort((a, b) => {
        return a.length - b.length
      })
    }
    if (sort === 'desc') {
      return flatten.sort((a, b) => {
        return b.length - a.length
      })
    }
    return flatten
  })
}
