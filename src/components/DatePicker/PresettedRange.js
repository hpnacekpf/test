import React, { useState } from 'react'
import DatePicker from 'antd/lib/date-picker'
import { formatOutputDate } from 'constants/index'
import dateTimeExtensions from 'extensions/datetime'
import { useSelector } from 'react-redux'

const RangePicker = DatePicker.RangePicker

const PresettedRanges = (props) => {
  const { valueRange, format, disableDateTime, handleChange, preventBooking } =
    props || []

  const [isVisible, setIsVisible] = useState(false)
  const isOpenCalendarDropdown = useSelector(
    (state) => state?.reactTour?.calendarDropdown ?? false
  )

  const onChange = (dates, dateStrings) => {
    if (handleChange && dateStrings?.length > 0) {
      handleChange({
        fromDate: dateStrings[0],
        toDate: dateStrings[1],
        selectedRange: dates
      })
    }
  }

  return (
    <div>
      <RangePicker
        defaultValue={valueRange}
        open={isVisible}
        onOpenChange={(isOpen) =>
          setIsVisible(isOpen || isOpenCalendarDropdown)
        }
        value={valueRange}
        disabledDate={(current) => {
          return dateTimeExtensions.disabledDate(
            current,
            disableDateTime,
            preventBooking
          )
        }}
        ranges={dateTimeExtensions.rangeCalendar()}
        format={format || formatOutputDate}
        onChange={onChange}
        placeholder={['Loan', 'Return']}
        className="rounded-5 custom-box-datetime"
        getCalendarContainer={(trigger) => {
          return trigger.parentNode
        }}
        popupClassName="customize-datetime"
      />
    </div>
  )
}
export default PresettedRanges
