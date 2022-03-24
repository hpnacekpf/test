import React, { Fragment, useState } from 'react'
import Modal from 'antd/lib/modal'
import InputNumber from 'antd/lib/input-number'
import SelectDate from '../DatePicker/SelectDate'

const ModalCalendar = ({
  show,
  setShowModal,
  selectedDate,
  setSelectedDate
}) => {
  const [showCalendar, setShowCalendar] = useState(false)
  return (
    <Modal
      visible={show}
      mask={false}
      closable={false}
      title={
        <SelectDate
          isVisibleModal={show}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      }
      okText={`save changes`}
      okButtonProps={{ className: `btn-color-main width-150` }}
      cancelButtonProps={{ className: `btn-color-grey width-150` }}
      className={`modal-calendar`}
      onOk={() => {
        if (setShowModal) {
          setShowModal(false)
          setShowCalendar(false)
        }
      }}
      onCancel={() => {
        if (setShowModal) {
          setShowModal(false)
          setShowCalendar(false)
        }
      }}
    >
      <div
        className={`d-flex justify-content-center align-items-center col-lg-10 mx-auto`}
      >
        <div className={`col-lg-5`}>Edit inventory</div>
        <div className={`col-lg-7`}>
          <InputNumber min={0} defaultValue={0} className={`w-100`} />
        </div>
      </div>
    </Modal>
  )
}

export default ModalCalendar
