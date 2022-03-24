import React from 'react'
import classNames from 'classnames'
import { connectModal } from 'redux-modal'

import Modal from 'antd/lib/modal'
import TitleModalOrder from '../Order/TitleModalOrder'
import { CONFIRM_ORDER } from 'constants/index'
import enumType from 'constants/enumType'
import { REDUX_MODAL } from 'constants/enum'

const ModalAlert = (props) => {
  const {
    show,
    handleHide,
    title,
    content,
    handleOkClick,
    okText,
    className,
    typeModal
  } = props
  return (
    <Modal
      centered={true}
      visible={show}
      mask={false}
      closable={false}
      // cancelText={cancelText ? cancelText : 'No'}
      okText={okText ? okText : 'OK'}
      className={classNames(
        'custom-modal custom-modal-sign-out modal-loan-request',
        className
      )}
      autoFocusButton="cancel"
      maskClosable={true}
      cancelButtonProps={{
        style: { order: 1, display: 'none' },
        className: `btn-color-grey font-weight-bold`
      }}
      okButtonProps={{
        style: { order: 2, width: '100%' },
        className: `btn-color-main font-weight-bold`
      }}
      title={
        <h4 className="text-center title-modal font-roboto text-uppercase font-weight-bold">
          {/* className='text-center title-modal font-roboto text-uppercase font-weight-bold'>
          {title || `Confirm`} */}

          <TitleModalOrder
            titleName={title ? title : 'Notice'}
            icon={
              typeModal && typeModal === enumType.typeModalOrder.CONFIRM
                ? CONFIRM_ORDER
                : null
            }
          />
        </h4>
      }
      // onCancel={() => {
      //   if (handleCancelClick) {
      //     handleCancelClick()
      //   }
      //   handleHide()
      // }}
      onOk={() => {
        if (handleOkClick) {
          handleOkClick()
        }
        handleHide()
      }}
    >
      <div className={'text-center font-size-14 font-cabin text-center mb-0'}>
        {content}
      </div>
    </Modal>
  )
}

export default connectModal({ name: REDUX_MODAL.ALERT })(ModalAlert)
