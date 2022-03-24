import React from 'react'
import UploadInfo from '../Upload/UploadInfo'
import Modal from 'antd/lib/modal'

const ModalUploadInfo = ({ show, setShowModal }) => {
  return (
    <Modal
      visible={show}
      okText={'OK'}
      mask={false}
      closable={false}
      okButtonProps={{ className: `btn-color-main d-block mx-auto width-200` }}
      cancelButtonProps={{ className: `d-none` }}
      onOk={() => {
        if (setShowModal) setShowModal(false)
      }}
    >
      <UploadInfo />
    </Modal>
  )
}

export default ModalUploadInfo
