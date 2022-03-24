import React, { Fragment } from 'react'
// libs
import Modal from 'antd/lib/modal'
import { connectModal } from 'redux-modal'

const ModalBlockedChat = ({ show, title, content, handleCancelClick }) => {
  return (
    <Modal
      visible={show}
      cancelText={'Close'}
      closable={false}
      okButtonProps={{ className: `d-none` }}
      cancelButtonProps={{ className: `btn-color-grey` }}
      className={`custom-modal-block-chat`}
      onCancel={() => {
        if (handleCancelClick) handleCancelClick()
      }}
      title={
        <h4
          className={`text-center title-modal font-roboto text-uppercase font-weight-bold`}
        >
          <div
            className={`title-modal font-roboto font-weight-bold text-center`}
          >
            {title}
          </div>
        </h4>
      }
    >
      <div className={`title-modal font-roboto text-center`}>{content}</div>
    </Modal>
  )
}

export default connectModal({ name: 'modalBlockedChat' })(ModalBlockedChat)
