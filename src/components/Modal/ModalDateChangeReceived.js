import { Button } from 'antd'
import Modal from 'antd/lib/modal'
import classNames from 'classnames'
import { AMENDMENT_STATUS, REDUX_MODAL } from 'constants/enum'
import { CONFIRM_ORDER, formatOutputDate } from 'constants/index'
import dateTimeExtensions from 'extensions/datetime'
import React from 'react'
import { useParams } from 'react-router'
import { useUpdateDateAmendmentRequestStatus } from 'reducers/order/hook'
import { connectModal } from 'redux-modal'

const TitleModalOrder = ({ titleName, icon }) => {
  return (
    <span>
      <img className="max-height_50px mb-15" src={icon} />
      <br />
      <span className="font-roboto"> {titleName}</span>
    </span>
  )
}

const AmendmentDateInfo = ({ label, fromDate, toDate }) => {
  const momentFromDate = dateTimeExtensions.initStartOfDay(fromDate)
  const momentToDate = dateTimeExtensions.initStartOfDay(toDate)

  return (
    <div>
      <span>
        {label} {momentFromDate.format(formatOutputDate)} -{' '}
        {momentToDate.format(formatOutputDate)}
      </span>
    </div>
  )
}

const ModalDateChangeReceived = (props) => {
  const { show, handleHide, ...orderAmendmentDate } = props

  const { id } = useParams()

  const {
    _id,
    previousFromDate,
    previousToDate,
    currentFromDate,
    currentToDate
  } = orderAmendmentDate

  const [onUpdate] = useUpdateDateAmendmentRequestStatus()

  const handleConfirm = (value) => {
    handleHide()
    onUpdate({
      id: _id,
      status: value,
      orderId: id
    })
  }

  return (
    <Modal
      centered={true}
      visible={show}
      mask={true}
      maskClosable={false}
      closable={false}
      footer={null}
      className="date-change__modal "
      title={
        <h4 className="text-center title-modal font-roboto text-uppercase font-weight-bold">
          <TitleModalOrder
            titleName={'DATE CHANGE REQUEST RECEIVED'}
            icon={CONFIRM_ORDER}
          />
        </h4>
      }
    >
      <div className="text-center">
        <div>
          <div className="mb-3 font-size-16">
            <span>
              Please proceed to accept or reject the date charge request
            </span>
          </div>
          <div className="mb-4 font-size-16">
            <AmendmentDateInfo
              label="Original Rental Period:"
              fromDate={previousFromDate}
              toDate={previousToDate}
            />
            <AmendmentDateInfo
              label="New Rental Period:"
              fromDate={currentFromDate}
              toDate={currentToDate}
            />
          </div>
        </div>

        <div className="d-flex">
          <Button
            size="large"
            className={classNames(
              'text-uppercase font-weight-bold ant-btn-block mb-3 benefits__skip-popup mr-3 bg-color-secondary-v4'
            )}
            onClick={() => handleConfirm(AMENDMENT_STATUS.REJECT)}
          >
            REJECT
          </Button>
          <Button
            size="large"
            className={classNames(
              'text-uppercase font-weight-bold ant-btn-block mb-3 ml-3 btn-color-main'
            )}
            onClick={() => handleConfirm(AMENDMENT_STATUS.ACCEPT)}
          >
            ACCEPT
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default connectModal({
  name: REDUX_MODAL.DATE_CHANGE_RECEIVED
})(ModalDateChangeReceived)
