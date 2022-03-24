import React from 'react'
import { connectModal } from 'redux-modal'
import Modal from 'antd/lib/modal'
import { getStyleButtonModal } from 'extensions/styleModal'
import { REDUX_MODAL } from 'constants/enum'

const ModalRegister = (props) => {
  const {
    show,
    handleHide,
    title,
    content,
    okText,
    cancelText,
    styleOkButton,
    handleOkClick,
    mask,
    closable,
    customContent
  } = props

  const initStyleOkButton = getStyleButtonModal(styleOkButton, false)

  return (
    <Modal
      centered={true}
      visible={show}
      mask={mask || false}
      closable={closable || false}
      okText={okText ? okText : 'Yes'}
      cancelText={cancelText}
      className="custom-modal modal-register"
      autoFocusButton="cancel"
      maskClosable={true}
      showCloseButton={false}
      okButtonProps={{
        style: {
          ...initStyleOkButton,
          width: '100%'
        },
        className: `btn-color-main font-weight-bold`
      }}
      cancelButtonProps={{
        style: {
          display: 'none'
        }
      }}
      title={
        <h4 className="text-center title-modal font-roboto text-uppercase font-weight-bold">
          {title || 'Confirm'}
        </h4>
      }
      onOk={() => {
        if (handleOkClick) {
          handleOkClick()
        }
        handleHide()
      }}
    >
      <div className={`text-center ${customContent}`}>{content}</div>
    </Modal>
  )
}

export default connectModal({ name: REDUX_MODAL.INFO })(ModalRegister)
