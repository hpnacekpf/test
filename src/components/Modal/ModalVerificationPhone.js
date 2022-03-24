import React, { useRef, createRef } from 'react'
import classNames from 'classnames'
import { connectModal } from 'redux-modal'
import Modal from 'antd/lib/modal'
// components
import TitleModalOrder from '../Order/TitleModalOrder'
import FormVerificationPhone from 'features/authentication/verificationPhone/Form'
// constants
import { DEFAULT_SLICE_PHONE_NUMBER } from 'constants/number'
import { CONFIRM_ORDER } from 'constants/icon'
import { REDUX_MODAL, MODAL_ORDER } from 'constants/enum'
// hook
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useSendSms, useVerifyPhone } from 'reducers/user/hook'
import { getPhoneByUser } from 'extensions/user'

const ModalVerificationPhone = (props) => {
  const {
    show,
    handleHide,
    title,
    handleCancelClick,
    okText,
    cancelText,
    className,
    typeModal,
    isShowButtonCancel,
    okStyle
  } = props

  const buttonRef = useRef(createRef())

  const user = useGetUser()

  const [onSendSms] = useSendSms()

  const [onVerify] = useVerifyPhone()

  const handleResendCode = () => {
    onSendSms({ checkPhone: false })
  }

  const handleSubmitForm = (data) => {
    onVerify(data.code, handleHide)
  }

  const phone = getPhoneByUser(user)

  const initPropsToComponent = React.cloneElement(
    <FormVerificationPhone
      user={user}
      handleSubmit={handleSubmitForm}
      handleResendCode={handleResendCode}
      isModal={true}
      title={`A verification code has been sent to your phone number ending *******${phone?.slice(
        DEFAULT_SLICE_PHONE_NUMBER
      )}`}
      isVerifyInProfile
    />,
    {
      buttonSubmit: <button ref={buttonRef} type="submit" className="d-none" />
    }
  )

  return (
    <Modal
      centered={true}
      visible={show}
      mask={false}
      closable={false}
      cancelText={cancelText ?? 'Cancel'}
      okText={okText ?? 'Verify my mobile'}
      className={classNames(
        'custom-modal modal-loan-request w-30 modal-verification-mobile',
        className
      )}
      autoFocusButton="cancel"
      maskClosable={true}
      cancelButtonProps={{
        style: { order: 1, display: isShowButtonCancel ? 'none' : null },
        className: `btn-color-grey font-weight-bold`
      }}
      okButtonProps={{
        style: { order: 2, width: okStyle ? '100%' : null },
        className: `btn-color-main font-weight-bold`
      }}
      title={
        <h4 className="text-center title-modal font-roboto text-uppercase font-weight-bold">
          <TitleModalOrder
            titleName={title ?? 'Mobile verification'}
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
        if (buttonRef.current) {
          buttonRef.current.click()
        }
      }}
    >
      {initPropsToComponent}
    </Modal>
  )
}

export default connectModal({ name: REDUX_MODAL.VERIFICATION_PHONE })(
  ModalVerificationPhone
)
