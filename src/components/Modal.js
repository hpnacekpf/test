import React from 'react'
import Modal from 'antd/lib/modal'

class CustomModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible || false
    }
  }

  openModal = () => {
    this.setState({
      visible: true
    })
  }

  closeModal = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const {
      image,
      subTitle,
      boldTitle,
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
    } = this.props
    const { visible } = this.state
    return (
      <Modal
        centered
        mask={!!showMask}
        closable={!!showCloseButton}
        maskClosable={maskClosable}
        autoFocusButton={autoFocusButton ? autoFocusButton : null}
        title={
          titleModal ? (
            <>
              {image ? (
                <div className="d-flex justify-content-center align-items-center">
                  <img alt="modal-img" className="mb-15" src={image} />
                </div>
              ) : null}
              <h4 className="text-center title-modal font-roboto text-uppercase font-weight-bold">
                {titleModal}
              </h4>
              <p className="fs-3">
                {subTitle}
                <b>{boldTitle}</b>
              </p>
            </>
          ) : null
        }
        visible={visible}
        className={customClass ? customClass : null}
        okText={acceptButton ? acceptButton : 'Accept'}
        okButtonProps={{
          style: acceptButtonStyle,
          className: acceptButtonClass
        }}
        onOk={() => {
          if (handleAccept) {
            handleAccept()
          }
          this.closeModal()
        }}
        cancelText={cancelButton ? cancelButton : 'Cancel'}
        cancelButtonProps={{
          style: cancelButtonStyle,
          className: cancelButtonClass
        }}
        onCancel={() => {
          if (handleCancel) {
            handleCancel()
          }
          this.closeModal()
        }}
      >
        {this.props.children}
      </Modal>
    )
  }
}

export default CustomModal
