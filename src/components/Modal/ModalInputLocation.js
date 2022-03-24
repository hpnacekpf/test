import React, { useRef, createRef } from 'react'
// libs
import classNames from 'classnames'
import { connectModal } from 'redux-modal'
import Modal from 'antd/lib/modal'
// components
import TitleModalOrder from '../Order/TitleModalOrder'
// constants
import { MODAL_ORDER, REDUX_MODAL } from 'constants/enum'
import { CONFIRM_ORDER } from 'constants/icon'
// components
import FormLocation from 'features/authentication/location/Form'
// hook
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useGetLoading, useRegisterLocation } from 'reducers/user/hook'

const ModalInputLocation = (props) => {
  const {
    show,
    handleHide,
    handleOkClick,
    handleCancelClick,
    okText,
    cancelText,
    className,
    typeModal,
    okStyle
  } = props

  const user = useGetUser()

  const [onChangeLocation] = useRegisterLocation()

  const loading = useGetLoading()

  const buttonRef = useRef(createRef())

  const handleInputLocation = (data) => {
    onChangeLocation(data.location, handleHide)
  }

  const initPropsToComponent = React.cloneElement(
    <FormLocation
      user={user}
      handleSubmit={handleInputLocation}
      disableSkip
      loading={loading}
      description="Please enter your location for meetups, pickup point etc."
    />,
    {
      buttonSubmit: (
        <button
          ref={buttonRef}
          // type="submit"
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
            titleName={'Input Location'}
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

export default connectModal({ name: REDUX_MODAL.LOCATION })(ModalInputLocation)
