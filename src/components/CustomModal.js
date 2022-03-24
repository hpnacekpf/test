
import Modal from 'antd/lib/modal'
import React, { useEffect } from 'react'


const CustomModal = (props) => {
  const {
    children,
    visible,
    showCloseButton,
    showMask,
    acceptButton,
    cancelButton,
    handleAccept,
    handleCancel,
    titleModal,
    customClass,
    cancelButtonStyle,
    acceptButtonStyle,
    autoFocusButton,
    maskClosable,
    acceptButtonClass,
    cancelButtonClass
  } = props

  useEffect(() => {
    console.log('visible', visible)
  }, [visible])

  return (
    <Modal
      centered
      mask={!!showMask}
      closable={!!showCloseButton}
      maskClosable={maskClosable}
      autoFocusButton={autoFocusButton ? autoFocusButton : null}
      title={titleModal
        ?
        <h4 className='text-center title-modal font-roboto text-uppercase font-weight-bold'>
          {titleModal}
        </h4>
        : null}
      visible={visible}
      className={customClass ? customClass : null}
      okText={acceptButton ? acceptButton : 'Accept'}
      okButtonProps={{ style: acceptButtonStyle, className: acceptButtonClass }}
      onOk={() => {
        if (handleAccept) {
          handleAccept()
        }
      }}
      cancelText={cancelButton ? cancelButton : 'Cancel'}
      cancelButtonProps={{ style: cancelButtonStyle, className: cancelButtonClass }}
      onCancel={() => {
        if (handleCancel) {
          handleCancel()
        }
      }}
    >
      {children}
    </Modal>
  )
}

export default CustomModal
