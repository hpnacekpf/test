import Modal from 'antd/lib/modal'
import React from 'react'
import { connectModal } from 'redux-modal'
import { REDUX_MODAL } from 'constants/enum'

const ModalSingPassLoading = (props) => {
  const { show, handleHide } = props

  return (
    <Modal
      width={250}
      closable={false}
      maskClosable={true}
      visible={show}
      footer={null}
      centered={true}
      onCancel={() => handleHide(false)}
      onOk={() => handleHide(false)}
    >
      <div className="d-flex align-items-center justify-content-center">
        <div className="font-size-16 font-weight-bold mr-3">Verifying</div>
        <div className="text-center px-4">
          <div className="dot-pulse"/>
        </div>
      </div>
    </Modal>
  )
}

export default connectModal({
  name: REDUX_MODAL.SINGPASS_LOADING
})(ModalSingPassLoading)
