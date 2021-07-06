module.exports.register = function (Handlebars) {
  Handlebars.registerHelper('split', function (...args) {
    return args.reduce((acc, arg) => {
      if (typeof arg === 'string') {
        return [...acc, ...arg.split(';')]
      }
      return acc
    }, [])
  })
  Handlebars.registerHelper('splitOn', function (char, ...args) {
    return args.reduce((acc, arg) => {
      if (typeof arg === 'string') {
        return [...acc, ...arg.split(char)]
      }
      return acc
    }, [])
  })
}
