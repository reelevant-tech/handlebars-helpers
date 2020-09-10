function decimalLength (n) {
  const matches = n.toString().match(/\.(\d+)$/)
  return (matches && matches[1] && matches[1].length) || 0
}

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('multiple', function (...args) {
    const options = args[args.length - 1].hash

    return args.slice(0, -1).reduce(function (result, value) {
      if (isNaN(parseFloat(value))) {
        return result
      }
      const precision = Math.max(decimalLength(result), decimalLength(value))
      return +(result * value).toFixed(options.precision || precision)
    }, 1)
  })
}
