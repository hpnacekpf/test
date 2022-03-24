import classNames from 'classnames'
import React from 'react'
import { inputPhone } from 'constants/index'
import InputPhone from './InputPhone'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { isUserPhoneVerified } from 'extensions/user'
import {
  useSendSms,
  useAppPropsToUser,
  useRegisterPhone
} from 'reducers/user/hook'
import { useModal } from 'hooks/useModal'
import { REDUX_MODAL } from 'constants/enum'
import { encryptFieldValue } from 'extensions/crypto'

const InputVerificationPhone = (props) => {
  const {
    name = 'phone',
    value,
    placeholder = inputPhone.placeholder,
    isError,
    onChange,
    onError
  } = props

  const user = useGetUser()

  const isVerified = isUserPhoneVerified(user)

  const [onOpenModal] = useModal()

  const [onRegisterPhone] = useRegisterPhone()

  const [onSendSms] = useSendSms()

  const [onAddProps] = useAppPropsToUser()

  const onRegisterPhoneSuccess = () => {
    onAddProps({
      phoneEncrypt: encryptFieldValue(value)
    })
    onOpenModal(REDUX_MODAL.VERIFICATION_PHONE)
  }

  const handleVerification = () => {
    if (isVerified) {
      return
    }
    if (isError) {
      if (onError) {
        onError()
      }
      return
    }

    if (!isVerified) {
      onRegisterPhone(value, () => {
        onSendSms({
          checkPhone: false,
          phoneNumber: value,
          onSuccess: onRegisterPhoneSuccess
        })
      })
    }
  }

  return (
    <div className={classNames('d-flex phone-profile w-100')}>
      <InputPhone
        value={value}
        name={name}
        disabled={isVerified}
        placeholder={placeholder}
        handleChange={onChange}
      />
      <div className="line-height__2 d-flex verify_phone">
        <span className="pt-4 notify_phone">
          {<i className={isVerified ? 'icon-success' : 'icon-error'}/>}
        </span>
        <span
          className="px-10 lendor-color-gray btn-verify line-height__33px d-flex align-items-center cursor-pointer text-color-primary-v1"
          onClick={handleVerification}
        >
          {isVerified ? 'VERIFIED' : 'VERIFICATION'}
        </span>
      </div>
    </div>
  )
}

export default InputVerificationPhone
