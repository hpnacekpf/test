import React from 'react'
import { formatOutputDate } from 'constants/index'
import dateTimeExtensions from 'extensions/datetime'
import classNames from 'classnames'

class LenderDate extends React.Component {
  render() {
    const { fromDate, toDate, textEmpty, marginLeft } = this.props || null
    const momentFromDate = dateTimeExtensions.initStartOfDay(fromDate)
    const momentToDate = dateTimeExtensions.initStartOfDay(toDate)
    const difference = dateTimeExtensions.calculateDateDiffWithMoment(
      momentToDate,
      momentFromDate,
      'days'
    )
    return momentFromDate && momentToDate ? (
      <span
        className={classNames({
          'ml-3': marginLeft
        })}
      >
        {momentFromDate.format(formatOutputDate)} -{' '}
        {momentToDate.format(formatOutputDate)} ({difference > 0
          ? difference
          : 1}{' '}
        days)
      </span>
    ) : (
      <span
        className={classNames({
          'ml-3': marginLeft
        })}
      >
        {textEmpty || ''}
      </span>
    )
  }
}

export default LenderDate
