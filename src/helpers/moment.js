/* eslint no-console:0 */
'use strict'
/*
 * https://raw.githubusercontent.com/helpers/handlebars-helper-moment/master/moment.js
 * duplicate because: published package is outdated (no timezone) and master was broken
 */
const moment = require('moment-timezone')
const _ = require('lodash')

module.exports.register = function (Handlebars) {
  /**
   * helper moment
   * @todo : (RE-2916) check condition context and context.hash
   * @param context {*}
   * @param block {*}
   * @return {string}
   */
  Handlebars.registerHelper('moment', function (context, block) {
    if (context && context.hash) {
      block = _.cloneDeep(context)
      context = undefined
    }

    const date = moment(context)
    date.tz(block.hash.tz || 'Europe/Paris')
    date.locale(block.hash.locale || 'fr')
    /**
     * variable formatDate
     * @type {[string , moment]}
     */
    const formatDate = Object
      .entries(block.hash)
      .reduce((final, current) => {
        if (current[1] != null && current[0] !== 'format') {
          final = final[current[0]](current[1])
        }
        /**
         * match to legacy
         */
        if (current[0] === 'from' && current[1] == null) {
          final = final[current[0]]()
        }
        return final
      }, date)

    /**
     *  to ckeck and call [format] method
     */
    return formatDate['format'] ? formatDate['format'](block.hash.format || 'LLLL') : formatDate
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
