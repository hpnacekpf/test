import moment from 'moment'

export default {
  formatTimeStampToMoment(dateTime) {
    return dateTime ? moment(dateTime) : null
  },
  formatTimeStampToUtcTime(dateTime, format) {
    return dateTime ? moment.utc(dateTime).local().format(format ? format : 'LL') : null
  },
  formatRelativeTime(currentDate) {
    return currentDate
      ? moment(currentDate).from(moment())
      : null
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
  formatTimeStampToString(dateTime, format) {
    if (moment(dateTime).isSame(new Date(), 'days')) {
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
    // dates.push(lastDate.toDate())
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
  subtractDuration (currentDate, subtract, type) {
    return currentDate
      ? moment(currentDate).subtract(subtract, type)
      : null
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
    /// return currentDate ? moment(currentDate).set({hour:14, minute: 31, second: 0}) : moment(new Date()).set({hour:0, minute: 2, second: 0})
    return currentDate
      ? moment(currentDate).subtract(number ? number : -1, 'day').endOf('day').set({ hour: 12, minute: 0, second: 0 })
      : moment(new Date()).subtract(number ? number : -1, 'day').endOf('day').set({ hour: 12, minute: 0, second: 0 })
  },
  isDayBlocked(day, disabledDate) {
    for (let i = 0; i < disabledDate.length; i++) {
      if (day && day.format('YYYY MM DD') === disabledDate[i].format('YYYY MM DD')) {
        return true
      }
    }
  },
  disabledDate(current, disableDateTime) {
    if (disableDateTime && disableDateTime.length > 0) {
      if (current && current < moment().endOf('day')) {
        return true
      }
      return this.isDayBlocked(current, disableDateTime)
    } else {
      return current && current < moment().endOf('day')
    }
  },
  isSameDate(currentDate, date) {
    if (!currentDate || !date) return false
    return moment(currentDate).isSame(moment(date))
  },

  checkDateTime(fromDate, toDate, disableDateTimes) {
    const startDate = moment(fromDate, 'MM/DD/YYYY').format('YYYY-MM-DD')
    const endDate = moment(toDate, 'MM/DD/YYYY').format('YYYY-MM-DD')
    let betweenDate = []
    if (disableDateTimes && disableDateTimes.length > 0) {
      betweenDate = disableDateTimes.filter(disableDateTime => {
        const currentDate = moment(disableDateTime).format('YYYY-MM-DD')
        return currentDate > startDate && currentDate < endDate
      })
    }
    return betweenDate
  }
}