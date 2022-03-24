import React, { Fragment, useState } from 'react'
// libs
import Modal from 'antd/lib/modal'
// extensions
import dateTimeExtensions from 'extensions/datetime'
// components
import CustomizeCalendar from '../DatePicker/Calendar'

const ModalQuantityCalendar = ({
  show,
  setShowModal,
  product,
  calendarProduct,
  isOwnerProduct,
  selectedRange
}) => {
  const current = dateTimeExtensions.initNewDate()
  const [onMode, setOnMode] = useState('month')
  const [selectedMonth, setSelectedMonth] = useState(current)
  const [selectedValue, setSelectedValue] = useState([])

  const onPanelChange = (value, mode) => {
    setSelectedMonth(value)
    setOnMode(mode)
  }

  const onSelect = (value) => {
    if (isOwnerProduct) {
      let listDateSelect = selectedValue || []
      if (listDateSelect && listDateSelect.length > 0) {
        const exitItems = listDateSelect.findIndex((item) =>
          dateTimeExtensions.isSameDate(item, value)
        )
        if (exitItems >= 0) {
          listDateSelect.splice(exitItems, 1)
        } else {
          listDateSelect.push(value)
        }
      } else {
        listDateSelect.push(value)
      }
      setSelectedValue(listDateSelect)
    }
  }

  return (
    <Modal
      visible={show}
      cancelText={'Close window'}
      closable={false}
      okButtonProps={{ className: `d-none` }}
      cancelButtonProps={{ className: `btn-color-grey width-200` }}
      onCancel={() => {
        if (setShowModal) setShowModal(false)
      }}
      className={`modal-quantity-calendar`}
      title={
        <Fragment>
          <div className={`text-center lendor-color-gray-v1 mb-2`}>
            You are viewing Lendable quantities for:
          </div>
          <div className={`font-size-20 text-uppercase text-center`}>
            {product?.name ?? ''}
          </div>
        </Fragment>
      }
    >
      <CustomizeCalendar
        onChange={onPanelChange}
        onSelect={onSelect}
        disableDateTime={calendarProduct ?? null}
        selectedValue={selectedValue}
        setSelectedMonth={setSelectedMonth}
        selectedMonth={selectedMonth}
        mode={onMode}
        centered={true}
        isOwnerProduct={isOwnerProduct}
        selectedRange={selectedRange}
      />
    </Modal>
  )
}

export default ModalQuantityCalendar
