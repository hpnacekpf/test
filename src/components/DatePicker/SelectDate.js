import React from 'react'
// lib
import DatePicker from 'antd/lib/date-picker'
import dateTimeExtensions from 'extensions/datetime'
// constants
import { CALENDAR_ICON, calendarControl, DAY } from 'constants/index'

const SelectDate = ({
  setShowCalendar,
  showCalendar,
  selectedDate,
  setSelectedDate
}) => {
  const changeDate = (value) => {
    const currentSelectedDate = dateTimeExtensions.initNewDate(selectedDate)
    if (calendarControl.prev === value)
      setSelectedDate(currentSelectedDate.subtract(1, DAY))
    else setSelectedDate(currentSelectedDate.add(1, DAY))
  }

  return (
    <div className={`d-flex justify-content-end align-items-center`}>
      <div
        className={`position-absolute d-flex align-items-center quantity-calendar-control`}
      >
        <div
          className={`btn-quantity-calendar btn-quantity-calendar-prev`}
          onClick={() => changeDate(calendarControl.prev)}
        >
          <i className={`fa-chevron-left fa`} />
        </div>
        <div>{dateTimeExtensions.formatDateTimeToString('l')}</div>
        <div
          className={`btn-quantity-calendar btn-quantity-calendar-next`}
          onClick={() => changeDate(calendarControl.next)}
        >
          <i className={`fa-chevron-right fa`} />
        </div>
      </div>
      <div className={`calendar-display d-flex align-items-center`}>
        <DatePicker
          style={{
            visibility: 'hidden'
          }}
          open={showCalendar}
          allowClear
          showToday={false}
          onChange={(value) => {
            setShowCalendar(false)
            setSelectedDate(value)
          }}
          dropdownClassName={`quantity-calendar`}
          defaultPickerValue={selectedDate}
        />
        <img
          src={CALENDAR_ICON}
          alt="calendar-icon"
          onClick={() => {
            setShowCalendar(!showCalendar)
          }}
        />
      </div>
    </div>
  )
}

export default SelectDate
