/* eslint no-console:0 */
'use strict'
/*
 * To handle date with moment helper, there are two options :
 * - When user does not set a date(nammed context) to convert. For example if user set {{moment tz=timezone locale=locale format="LLL"}}, the helper will return the date of today
 *    In the helper, block will be undefined and informations (ex: {format: "LLL", locale: "fr", tz: "Europe/Paris"}) will be saved in context
 * - When user set a date (nammed context), For example if user set {{moment 'December 17, 1995 03:24:00' tz=timezone locale=locale format="LLL"}}, the helper return the moment date for 'December 17, 1995 03:24:00'
 *    In the helper, block will contain informations (ex: {format: "LLL", locale: "fr", tz: "Europe/Paris"}) and the date to convert will be saved in context
 * https://raw.githubusercontent.com/helpers/handlebars-helper-moment/master/moment.js
 * Example of using helper with context and block : https://gist.github.com/elidupuis/1468937/ea0e2d10fd50c168bbcd0a01bced22554a4ce573
 * duplicate because: published package is outdated (no timezone) and master was broken
 */
const moment = require('moment-timezone')
const _ = require('lodash')

module.exports.register = function (Handlebars) {
  /**
   * helper moment
   * Convertion informations has to save in block (cf: .entries(block.hash)). So if there are in context, there will be saved in block
   * @param context {Object || String} Can contain the date to convert (ex: 'December 17, 1995 03:24:00') or convertion informations ex: {format: "LLL", locale: "fr", tz: "Europe/Paris"}
   * @param block {Object} Contains convertion informations ex: {format: "LLL", locale: "fr", tz: "Europe/Paris"} if context is set with a date
   * @return {string}
   */
  Handlebars.registerHelper('moment', function (context, block) {
    // for example : hash = {format: "LLL", locale: "fr", tz: "Europe/Paris"
    if (context && context.hash) {
      block = _.cloneDeep(context)
    }

    const hash = (block && block.hash) || {}

    const date = (context && context.hash) ? moment() : moment(...Array.isArray(context) ? context : [context])
    date.tz(hash.tz || 'Europe/Paris')
    date.locale(hash.locale || 'fr')
    /**
     * variable formatDate
     * @type {[string , moment]}
     */
    const formatDate = Object
      .entries(hash)
      .reduce((final, [key, value]) => {
        if (value != null && key !== 'format') {
          final = final[key](...Array.isArray(value) ? value : [value])
        }
        /**
         * match to legacy
         */
        if (key === 'from' && value == null) {
          final = final[key]()
        }
        return final
      }, date)

    /**
     *  to ckeck and call [format] method
     */
    return formatDate['format'] ? formatDate['format'](hash.format) : formatDate
  })

  Handlebars.registerHelper('isToday', function (rawDate, { hash }) {
    const timezone = hash.tz || 'Europe/Paris'
    const date = moment(rawDate)
    date.tz(timezone)
    return date.isSame(moment(), 'day')
  })

  Handlebars.registerHelper('isTomorrow', function (rawDate, { hash }) {
    const timezone = hash.tz || 'Europe/Paris'
    const date = moment(rawDate)
    date.tz(timezone)
    return date.isSame(moment().add(1, 'day'), 'day')
  })

  Handlebars.registerHelper('duration', function (context, block) {
    if (context && context.hash) {
      block = _.cloneDeep(context)
      context = 0
    }
    var duration = moment.duration(context)

    // Reset the language back to default before doing anything else
    duration.locale('fr')

    for (var i in block.hash) {
      if (duration[i]) {
        duration = duration[i](block.hash[i])
      } else {
        console.log('moment.js duration does not support "' + i + '"')
      }
    }

    return duration
  })
}
