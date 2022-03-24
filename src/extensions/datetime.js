import moment from 'moment'
import {
  formatOutputDate,
  FORMAT_EN_DATE,
  formatDateTimeStamp,
  MONTH
} from 'constants/index'
import uniqWith from 'lodash/uniqWith'
import { INFINITY_DATE } from '../constants/format'

export default {
  initNewDate(currentDate) {
    return moment(currentDate ? currentDate : new Date())
  },
  initDateWithFormat(currentDate, format) {
    const date = currentDate ? moment(currentDate, format) : null

    if (date && date.isValid()) {
      return date
    }
    return null
  },
  formatTimeStampToMoment(dateTime) {
    return dateTime ? moment(dateTime) : null
  },
  formatTimeStampToUtcTime(dateTime, format) {
    const dateWithFormat = dateTime ? moment.utc(dateTime) : null
    if (dateWithFormat?.isValid()) {
      return dateWithFormat.local().format(format ? format : 'LL')
    }
    return null
  },
  formatTimeToUTC(dateTime, utc, format) {
    return dateTime
      ? moment(dateTime)
          .utc(utc)
          .format(format ? format : 'LL')
      : null
  },
  formatDateTimeToString(format = formatDateTimeStamp) {
    return moment().format(format)
  },
  formatRelativeTime(currentDate) {
    return currentDate ? moment(currentDate).from(moment()) : null
  },
  initStartOfDay(currentDate) {
    return currentDate
      ? moment(currentDate).startOf('days')
      : moment(new Date()).startOf('days')
  },
  initEndOfDay(currentDate, type) {
    return currentDate
      ? moment(currentDate).endOf(type ? type : 'days')
      : moment(new Date()).endOf(type ? type : 'days')
  },
  formatTimeStampToString(dateTime, format, formatTodayDate = true) {
    const now = new Date()
    if (formatTodayDate && moment(dateTime).isSame(now, 'days')) {
      return moment(dateTime).format('HH:mm A')
    } else {
      return moment(dateTime).format(format ? format : 'DD/MM/YYYY')
    }
  },
  enumerateDaysBetweenDates(startDate, endDate) {
    let dates = []
    const currDate = moment(startDate).startOf('day')
    const lastDate = moment(endDate).startOf('day')
    dates.push(currDate.toDate())
    while (currDate.add(1, 'days').diff(lastDate) < 0) {
      dates.push(currDate.clone().toDate())
    }
    return dates
  },
  formatDate(from, to) {
    return moment(from, to).format()
  },
  formatDateTimeNow() {
    return moment().format()
  },
  formatDateOutput(dateTime, stringFormatInput, stringFormatOutput) {
    if (!dateTime) return null
    return moment(dateTime, stringFormatInput).format(stringFormatOutput)
  },
  formatFromString(stringDateTime) {
    return stringDateTime ? moment(stringDateTime).fromNow() : null
  },
  subtractDuration(currentDate, subtract, type) {
    return currentDate ? moment(currentDate).subtract(subtract, type) : null
  },
  calculateDateDiff(currentDate, dateDiff, type) {
    if (currentDate && dateDiff) {
      return moment(currentDate).diff(moment(dateDiff), type)
    }
    return null
  },
  calculateDateDiffWithMoment(currentDate, dateDiff, type) {
    if (currentDate && dateDiff) {
      return currentDate.diff(dateDiff, type)
    }
    return null
  },
  initCountDownTime(currentDate, number) {
    return currentDate
      ? moment(currentDate)
          .subtract(number ? number : -1, 'day')
          .endOf('day')
          .set({ hour: 12, minute: 0, second: 0 })
      : moment(new Date())
          .subtract(number ? number : -1, 'day')
          .endOf('day')
          .set({ hour: 12, minute: 0, second: 0 })
  },
  initCheckInDate(date) {
    return moment(date).set({ hour: 0, minute: 0, second: 0 })
  },
  checkIsFutureMoment(currentDate, dateCheck) {
    if (currentDate && dateCheck) {
      return !!(
        currentDate &&
        dateCheck &&
        moment(currentDate).isAfter(moment(dateCheck))
      )
    }
    return false
  },
  checkIsPastMoment({ currentDate, dateCheck, setHour }) {
    if (currentDate && dateCheck) {
      return setHour
        ? moment(currentDate).isBefore(moment(dateCheck, setHour))
        : moment(currentDate).isBefore(moment(dateCheck))
    }
    return false
  },
  isDayBlocked(day, disabledDate) {
    for (let index = 0; index < disabledDate.length; index++) {
      const currentDate = this.formatTimeStampToString(
        day,
        FORMAT_EN_DATE,
        false
      )
      const referenceDate = !!disabledDate[index]
        ? this.formatTimeStampToString(
            disabledDate[index],
            FORMAT_EN_DATE,
            false
          )
        : null
      if (!!referenceDate) {
        if (moment(currentDate).isSame(moment(referenceDate))) {
          return true
        }
      }
    }
  },
  disabledDate(current, disableDateTime, preventBooking) {
    if (!current) {
      return true
    }

    const compareDate = moment()
      .add(preventBooking ?? 0, 'day')
      .startOf('day')

    if (disableDateTime && disableDateTime.length > 0) {
      if (current && current < compareDate) {
        return true
      }
      return this.isDayBlocked(current, disableDateTime)
    }

    return current < compareDate
  },
  isSameDate(currentDate, date) {
    if (!currentDate || !date) return false
    return moment(currentDate).isSame(moment(date))
  },

  checkValidDateTime({ fromDate, toDate, disableDates }) {
    const startDate = moment(fromDate, formatOutputDate)
    const endDate = moment(toDate, formatOutputDate)
    let betweenDate = []
    if (disableDates?.length > 0) {
      const dates = uniqWith(disableDates, (cur, next) =>
        moment(cur).isSame(moment(next), 'day')
      )

      dates.sort((cur, next) => (moment(cur).isAfter(moment(next)) ? 1 : -1))

      betweenDate = dates.filter((disableDateTime) => {
        const currentDate = moment(disableDateTime)
        const isValidDate = currentDate.isBetween(startDate, endDate)
        return isValidDate
      })
    }
    return betweenDate
  },

  isSameDateWithFormat(currentDate, date) {
    if (!currentDate || !date) return false
    const currDate = moment(currentDate).format(FORMAT_EN_DATE)
    const newDate = moment(date).format(FORMAT_EN_DATE)
    return moment(currDate).isSame(moment(newDate))
  },

  increaseMonth(months) {
    return moment().add(months, MONTH)
  },

  decreaseMonth(months) {
    return moment().subtract(Math.abs(months), MONTH)
  },

  rangeCalendar() {
    return {
      Today: [moment(), moment()],
      'This Month': [moment(), moment().endOf('month')]
    }
  },
  addInitTime({ currentDate, add, unit, setHour }) {
    if (currentDate) {
      const dateWithDuration = moment(currentDate).add(add, unit)
      if (checkIsFutureMoment(dateWithDuration, INFINITY_DATE)) {
        return moment(INFINITY_DATE)
      } else {
        return setHour ? dateWithDuration.set({ hour: 12 }) : dateWithDuration
      }
    }
  },
  addTime({ currentDate, add, unit }) {
    if (currentDate && add && unit) {
      return moment(currentDate).add(add, unit)
    }
    return null
  }
}
