'use strict'

const { inRange } = require('../services/time')
const moment = require('moment-timezone')

module.exports.register = function (Handlebars) {
  const buildTimeObject = ([ h, m ]) => {
    return {
      h: parseInt(h, 10) || 0,
      m: parseInt(m, 10) || 0
    }
  }

  Handlebars.registerHelper('timeRange', (context) => {
    let date = moment()

    date.locale('en')
    date = date.tz(context.hash.tz || 'Europe/Paris')
    date.local()
    const currentDay = context.hash[date.format('dddd').toLowerCase()]

    if (!currentDay) {
      return context.inverse(this)
    }

    const currentTime = { h: date.hours(), m: date.minutes() }
    const splitHours = currentDay.split(' ')
    const lenSplit = splitHours.length

    if (lenSplit === 4) {
      const start = buildTimeObject(splitHours[1].split('h'))
      const end = buildTimeObject(splitHours[3].split('h'))

      if (inRange(currentTime, start, end)) {
        return context.fn(this)
      }
    } else if (lenSplit === 9) {
      const morningStart = buildTimeObject(splitHours[1].split('h'))
      const morningEnd = buildTimeObject(splitHours[3].split('h'))
      const noonStart = buildTimeObject(splitHours[6].split('h'))
      const noonEnd = buildTimeObject(splitHours[8].split('h'))

      if (inRange(currentTime, morningStart, morningEnd) || inRange(currentTime, noonStart, noonEnd)) {
        return context.fn(this)
      }
    }

    return context.inverse(this)
  })
}
