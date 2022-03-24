import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames'
import dateTimeExtensions from 'extensions/datetime'
import CustomCalendar from './CustomCalendar'
import { calendarControl } from 'constants/index'
import { Link } from 'react-router-dom'

const LinkOrderId = ({ data }) => {
  return data?.length
    ? data.map(({ orderId, order }) => {
        return order && orderId ? (
          <div className={`font-size-14 text-truncate`}>
            Order
            <Link
              to={`/order/detail/${order}`}
              className={`calendar-link-order`}
            >
              {` ${orderId}`}
            </Link>
          </div>
        ) : null
      })
    : null
}

const CustomizeCalendar = (props) => {
  const {
    onChange,
    onSelect,
    setSelectedMonth,
    selectedMonth,
    mode,
    centered,
    isOwnerProduct,
    selectedRange,
    lendableDate,
    isMultiQuantity
  } = props
  // const date = new Date()
  const current = dateTimeExtensions.initNewDate()
  const currentMonth = current?.month()
  const currentYear = current?.year()
  const currentSelected = dateTimeExtensions.initNewDate(selectedMonth)
  const currentSelectedMonth = currentSelected?.month()
  const currentSelectedYear = currentSelected?.year()
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const [activeDate, setActiveDate] = useState([])

  useEffect(() => {
    // setActiveDate([])
  }, [])

  const monthDiff = (
    currentSelectedMonth,
    currentMonth,
    currentSelectedYear,
    currentYear
  ) => {
    let months
    months = (currentSelectedYear - currentYear) * 12
    months -= currentMonth
    months += currentSelectedMonth
    return months
  }

  const onChangeMonth = (value) => {
    const months = monthDiff(
      currentSelectedMonth,
      currentMonth,
      currentSelectedYear,
      currentYear
    )
    const monthChange = value === calendarControl.next ? months + 1 : months - 1
    const increase = dateTimeExtensions.increaseMonth(monthChange)
    const decrease = dateTimeExtensions.decreaseMonth(monthChange)
    if (value === calendarControl.next)
      setSelectedMonth(months >= 0 ? increase : decrease)
    else setSelectedMonth(months > 0 ? increase : decrease)
  }

  const disabledDate = (current) => {
    const blockedDate = lendableDate.reduce(
      (arr, { date, isBlocked, order }) => {
        if (!arr?.length) arr = []
        if (order && !isMultiQuantity) arr.push(date) // if date has order and quantity of product = 1 => block
        return arr
      },
      []
    )
    return dateTimeExtensions.disabledDate(current, blockedDate)
  }

  const handleOnClickDate = (dateData, isBlocked) => {
    const indexActiveDate = activeDate.find((date) =>
      dateTimeExtensions.isSameDateWithFormat(date, dateData)
    )
    const index = activeDate.indexOf(indexActiveDate)
    if (isBlocked) {
      if (index > -1) {
        activeDate.splice(index, 1)
        setActiveDate([...activeDate])
      } else setActiveDate([...activeDate, dateData])
    }
  }

  const checkDateCalendar = (value) => {
    const { selectedValue } = props
    let checkSelectedDate = false
    if (selectedValue && selectedValue.length > 0) {
      checkSelectedDate = selectedValue.some((item) =>
        dateTimeExtensions.isSameDateWithFormat(item, value)
      )
    }
    const initDate = lendableDate.find(({ date }) =>
      dateTimeExtensions.isSameDateWithFormat(date, value)
    )
    const dayHasOrder = lendableDate.filter(
      ({ date, order }) =>
        order ? dateTimeExtensions.isSameDateWithFormat(date, value) : null
    )
    const isActiveDate = activeDate.some((date) =>
      dateTimeExtensions.isSameDateWithFormat(date, value)
    )
    return {
      checkSelectedDate,
      initDate,
      dayHasOrder,
      isActiveDate
    }
  }

  const dateFullCellRender = (value) => {
    const {
      checkSelectedDate,
      initDate,
      dayHasOrder,
      isActiveDate
    } = checkDateCalendar(value)
    const isBlockedDate =
      (checkSelectedDate || (initDate?.isBlocked ?? false)) && !isActiveDate
    return (
      <div
        className={classNames('ant-fullcalendar-date', {
          'ant-fullcalendar-date-select': isBlockedDate
          // 'lendee-selected-date': selectedRange ? moment(value).isBetween(selectedRange[0], selectedRange[1]) : false,
        })}
        onClick={() => handleOnClickDate(value, initDate?.isBlocked)}
      >
        <div className={`ant-fullcalendar-value`}>{value.date()}</div>
        {dayHasOrder?.length ? <LinkOrderId data={dayHasOrder} /> : null}
        {/* <div
          className="calendar-quantity text-color-stock"
          onClick={(e) => {
            e.stopPropagation()
            if (isOwnerProduct) {
              setShowModal(true)
              setSelectedDate(value)
            }
          }}
        >
          <div>0</div>
          {
            isOwnerProduct ?
              <img src={GREEN_EDIT_ICON} className={`img-fluid`} />
            : null
          }
        </div> */}
      </div>
    )
  }

  return (
    <Fragment>
      <CustomCalendar
        onChange={onChange}
        onSelect={onSelect}
        selectedMonth={selectedMonth}
        disabledDate={disabledDate}
        dateFullCellRender={dateFullCellRender}
        mode={mode}
        onChangeMonth={onChangeMonth}
        centered={centered}
        isOwnerProduct={isOwnerProduct}
      />
      {/* <ModalSelectDate
        show={showModal}
        setShowModal={setShowModal}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      /> */}
    </Fragment>
  )
}

export default CustomizeCalendar
