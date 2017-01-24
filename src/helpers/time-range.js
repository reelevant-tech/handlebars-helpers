'use strict'

var inRange = require('../services/time').inRange
var moment = require('moment-timezone')

module.exports.register = function (Handlebars) {
  var buildTimeObject = function ([ h, m ]) {
    return {
      h: parseInt(h, 10) || 0,
      m: parseInt(m, 10) || 0
    }
  }

  Handlebars.registerHelper('timeRange', function (context) {
    var date = moment()

    date.locale('en')
    date = date.clone().tz(context.hash.tz || 'Europe/Paris')
    // date = date.clone().tz('Europe/Paris')
    // date.local()
    var currentDay = context.hash[date.format('dddd').toLowerCase()]

    if (!currentDay) {
      return context.inverse(this)
    }

    var currentTime = { h: date.hours(), m: date.minutes() }
    var splitHours = currentDay.split(' ')
    var lenSplit = splitHours.length

    if (lenSplit === 4) {
      var start = buildTimeObject(splitHours[1].split('h'))
      var end = buildTimeObject(splitHours[3].split('h'))

      if (inRange(currentTime, start, end)) {
        return context.fn(this)
      }
    } else if (lenSplit === 9) {
      var morningStart = buildTimeObject(splitHours[1].split('h'))
      var morningEnd = buildTimeObject(splitHours[3].split('h'))
      var noonStart = buildTimeObject(splitHours[6].split('h'))
      var noonEnd = buildTimeObject(splitHours[8].split('h'))

      if (inRange(currentTime, morningStart, morningEnd) || inRange(currentTime, noonStart, noonEnd)) {
        return context.fn(this)
      }
    }

    return context.inverse(this)
  })
}
