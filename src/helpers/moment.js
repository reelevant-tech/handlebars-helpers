/* eslint no-console:0 */
'use strict'
/*
 * https://raw.githubusercontent.com/helpers/handlebars-helper-moment/master/moment.js
 * duplicate because: published package is outdated (no timezone) and master was broken
 */

module.exports.register = function (Handlebars) {
  var moment = require('moment-timezone')
  var _ = require('lodash')

  Handlebars.registerHelper('moment', function (context, block) {
    if (context && context.hash) {
      block = _.cloneDeep(context)
      context = undefined
    }

    var date = moment(context)

    date = date.tz(block.hash.tz || 'Europe/Paris')

    var hasFormat = false

    // Reset the language back to default before doing anything else
    date.locale('fr')

    for (var i in block.hash) {
      if (i === 'format') {
        hasFormat = true
      } else if (date[i] && i !== 'tz') {
        date = date[i](block.hash[i])
      } else if (i !== 'tz') {
        console.log('moment.js does not support "' + i + '"')
      }
    }

    if (hasFormat) {
      date = date.format(block.hash.format)
    }

    return date
  })

  Handlebars.registerHelper('duration', function (context, block) {
    if (context && context.hash) {
      block = _.cloneDeep(context)
      context = 0
    }
    var duration = moment.duration(context)
    var hasFormat = false

    // Reset the language back to default before doing anything else
    duration = duration.locale('fr')

    for (var i in block.hash) {
      if (i === 'format') {
        hasFormat = true
      } else if (duration[i]) {
        duration = duration[i](block.hash[i])
      } else {
        console.log('moment.js duration does not support "' + i + '"')
      }
    }

    if (hasFormat) {
      duration = duration.format(block.hash.format)
    }
    return duration
  })
}
