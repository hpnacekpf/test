import React, { useState, useRef, createRef } from 'react'
// libs
import classNames from 'classnames'
import { connectModal } from 'redux-modal'
import Modal from 'antd/lib/modal'
// constants
import { MODAL_ORDER, REDUX_MODAL } from 'constants/enum'
import { CONFIRM_ORDER } from 'constants/icon'
// components
import TitleModalOrder from '../Order/TitleModalOrder'
import FormRegisterPhone from 'features/authentication/registerPhone/Form'
// hooks
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useRegisterPhone } from 'reducers/user/hook'
import { useModal } from 'hooks/useModal'

const ModalInputPhone = (props) => {
  const {
    show,
    handleHide,
    title,
    handleOkClick,
    handleCancelClick,
    okText,
    cancelText,
    className,
    typeModal,
    okStyle
  } = props

  const [loading, setLoading] = useState(false)

  const buttonRef = useRef(createRef())

  const user = useGetUser()

  const [openModalRedux] = useModal()

  const [onRegister] = useRegisterPhone()

  const onRegisterPhoneSuccess = () => {
    handleHide()
    openModalRedux(REDUX_MODAL.VERIFICATION_PHONE)
  }

  const handleSubmitForm = (values) => {
    onRegister(values.phone, onRegisterPhoneSuccess)
    setLoading(false)
  }

  const initPropsToComponent = React.cloneElement(
    <FormRegisterPhone
      user={user}
      handleSubmit={handleSubmitForm}
      labelSubmit={'Get verification code'}
      title={`In order to proceed, we require your mobile to be verified. Kindly verify your phone number`}
      description={
        'By providing your mobile number, you agree to receive text messages from Lendor.'
      }
      disableSkip
      disableGetCode
      loading={loading}
      setLoading={setLoading}
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
    <Modal
      centered={true}
      visible={show}
      mask={false}
      closable={false}
      cancelText={cancelText ? cancelText : 'Cancel'}
      okText={okText ? okText : 'Get verification code'}
      footer={false}
      className={classNames(
        'modal-input-phone custom-modal modal-loan-request',
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
        className: `btn-color-main font-weight-bold`
      }}
      title={
        <h4
          className={classNames(
            'text-center title-modal font-roboto text-uppercase font-weight-bold'
          )}
        >
          <TitleModalOrder
            titleName={title ? title : 'Mobile verification'}
            icon={typeModal === MODAL_ORDER.CONFIRM ? CONFIRM_ORDER : null}
          />
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
  )
}

export default connectModal({ name: REDUX_MODAL.REGISTER_PHONE })(
  ModalInputPhone
)
