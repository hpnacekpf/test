import React from 'react'

import { connectModal } from 'redux-modal'

import Modal from 'antd/lib/modal'

import enumType from 'constants/enumType'

const ModalPaymentConfirm = (props) => {
  const { show, handleHide, title, method, content, handleOkClick } = props

  const isShowButtonCancel = method === enumType.paymentMethod.Cash

  return (
    <Modal
      visible={show}
      mask={false}
      closable={false}
      cancelText={'OK'}
      okText={isShowButtonCancel ? 'Ok' : 'Payment'}
      className="custom-modal custom-modal-sign-out modal-loan-request"
      autoFocusButton="cancel"
      maskClosable={true}
      cancelButtonProps={{
        style: { order: 1, display: isShowButtonCancel ? 'none' : null },
        className: `btn-color-grey`
      }}
      okButtonProps={{
        style: {
          order: 2,
          width: isShowButtonCancel ? '100%' : null,
          margin: isShowButtonCancel ? '0 70px' : null
        },
        className: `btn-color-main`
      }}
      title={
        <h4 className="text-center title-modal font-roboto text-uppercase font-weight-bold">
          {title}
        </h4>
      }
      onCancel={handleHide}
      onOk={() => {
        if (handleOkClick) {
          handleOkClick()
        }
        handleHide()
      }}
    >
      <div className={'text-center'}>{content}</div>
    </Modal>
  )
}

export default connectModal({ name: 'paymentConfirm' })(ModalPaymentConfirm)
