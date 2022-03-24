//libs
import React from 'react'
import Modal from 'antd/lib/modal'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'

const openModal = (
  titleModal,
  showMask,
  customClass,
  customIcon,
  acceptButton,
  handleAccept,
  children
) => {
  Modal.info({
    title: titleModal ? <h4 className="title-modal">{titleModal}</h4> : null,
    mask: !!showMask,
    content: children,
    okText: acceptButton ? acceptButton : 'Ok',
    wrapClassName: customClass ? customClass : null,
    className: customClass ? customClass : null,
    onOk: () => {
      if (handleAccept) {
        handleAccept()
      }
    },
    centered: true,
    icon: customIcon ? customIcon : <Icon type="question-circle" />
  })
}

class ConfirmModal extends React.Component {
  render() {
    const {
      titleModal,
      showMask,
      customClass,
      customIcon,
      acceptButton,
      handleAccept,
      children
    } = this.props
    return (
      <Button
        ref={(button) => (this.customButton = button)}
        onClick={() =>
          openModal(
            titleModal,
            showMask,
            customClass,
            customIcon,
            acceptButton,
            handleAccept,
            children
          )
        }
      >
        Info
      </Button>
    )
  }
}

export default ConfirmModal
