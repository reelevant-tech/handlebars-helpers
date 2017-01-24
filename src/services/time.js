'use strict'

var _ = require('lodash')

/*
 * @method getMinutes - get minutes from time object
 *
 * @param {object} time - Time object from datasource string
 * @param {number} time.h - Hours of time object
 * @param {number} time.m - Minutes of time object
 */
var getMinutes = function (time) {
  if (!time || !_.isPlainObject(time)) {
    return
  }

  if (!_.isNumber(time.h) || !_.isNumber(time.m)) {
    return
  }

  return (60 * time.h + time.m)
}

/*
 * @method inRange - get minutes from time object
 *
 * @param {object} time - Current time object
 * @param {number} time.h - Hours of current time object
 * @param {number} time.m - Minutes of current time object
 * @param {object} start - Start time object
 * @param {number} start.h - Hours of time object
 * @param {number} start.m - Minutes of time object
 * @param {object} end - End time object from datasource string
 * @param {number} end.h - Hours of endtime object
 * @param {number} end.m - Minutes of endtime object
 */
var inRange = function (time, start, end) {
  var inputMin = getMinutes(time)
  return (inputMin >= getMinutes(start) && inputMin < getMinutes(end))
}

module.exports = {
  getMinutes: getMinutes,
  inRange: inRange
}
