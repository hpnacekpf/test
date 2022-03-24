import Modal from 'antd/lib/modal'
import React, { useState } from 'react'
import { connectModal } from 'redux-modal'
import Benefits from 'features/authentication/singPass/benefits'
import Verification from 'features/authentication/singPass/verification'
import { REDUX_MODAL } from 'constants/enum'
import { useResetSingPass } from 'reducers/user/hook'

const ModalSingPass = (props) => {
  const { show, handleHide, description, hideDescription, redirectUrl, forceUpdate } = props

  const [isFirstStep, setIsFirstStep] = useState(true)

  const [onReset] = useResetSingPass()

  const onHideModal = () => {
    onReset()
    handleHide()
  }

  return (
    <Modal
      centered={true}
      visible={show}
      mask={false}
      closable={false}
      footer={null}
      onOk={onHideModal}
      onCancel={onHideModal}
    >
      {isFirstStep ? (
        <Benefits
          isPopup={true}
          showTitle
          onVerify={() => setIsFirstStep(false)}
          onCancel={onHideModal}
          description={description}
          hideDescription={hideDescription}
        />
      ) : (
        <Verification
          redirectUrl={redirectUrl}
          showTitle
          onCancel={onHideModal}
          forceUpdate={forceUpdate}
        />
      )}
    </Modal>
  )
}

export default connectModal({
  name: REDUX_MODAL.SINGPASS
})(ModalSingPass)
