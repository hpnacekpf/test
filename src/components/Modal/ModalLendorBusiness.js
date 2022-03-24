import React, { useState, useRef, createRef } from 'react'
// libs
import classNames from 'classnames'
import { connectModal } from 'redux-modal'
import Modal from 'antd/lib/modal'
// constants
import { REDUX_MODAL } from 'constants/enum'
import { useCreateBusinessInfo } from 'reducers/business/hook'

import BusinessForm from '../Business/BusinessForm'

const ModalLendorBusiness = (props) => {
  const {
    show,
    handleHide,
    handleOkClick,
    handleCancelClick,
    okText,
    cancelText,
    className,
    okStyle
  } = props

  const [onCreate] = useCreateBusinessInfo()

  const [loading, setLoading] = useState(false)
  const [isMessage, setMessage] = useState(false)

  const buttonRef = useRef(createRef())
  const handleSubmitForm = (values) => {
    if (!loading) {
      setMessage(true)
    } else {
      handleHide()
      onCreate(values)
    }
  }

  const initPropsToComponent = React.cloneElement(
    <BusinessForm
      title={`Please fill out the required information below and
    we will get back to you within 1-2 business days!`}
      handleSubmit={handleSubmitForm}
      loading={loading}
      setLoading={setLoading}
      isMessage={isMessage}
      setMessage={setMessage}
    />,
    {
      buttonSubmit: (
        <button
          ref={buttonRef}
          type="submit"
          className={classNames('d-none')}
        />
      )
    }
  )

  return (
    <>
      <Modal
        getContainer={'#businessModal'}
        centered={true}
        visible={show}
        closable={false}
        cancelText={cancelText ? cancelText : 'Cancel'}
        okText={okText ? okText : 'Get verification code'}
        footer={null}
        className={classNames(
          'custom-modal modal-loan-request custom-modal-business',
          className
        )}
        autoFocusButton="cancel"
        maskClosable={true}
        cancelButtonProps={{
          style: { order: 1, display: 'none' },
          className: `btn-color-grey font-weight-bold`
        }}
        okButtonProps={{
          style: { order: 2, width: okStyle ? '100%' : null },
          className: `btn-color-main font-weight-bold text-white`
        }}
        title={
          <h4
            className={classNames('text-center font-weight-bold font-size-30 ')}
          >
            Lendor for Business
          </h4>
        }
        onCancel={() => {
          if (handleCancelClick) {
            handleCancelClick()
          }
          handleHide()
        }}
        onOk={() => {
          if (handleOkClick) {
            handleOkClick()
          }
          handleHide()
        }}
      >
        {initPropsToComponent}
      </Modal>
    </>
  )
}

export default connectModal({ name: REDUX_MODAL.LENDOR_FOR_BUSINESS })(
  ModalLendorBusiness
)
