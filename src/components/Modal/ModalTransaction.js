import React from 'react'

import classNames from 'classnames'

import { connectModal } from 'redux-modal'

import Modal from 'antd/lib/modal'

import { CONFIRM_ORDER, DISPUTE_ORDER } from 'constants/index'
import enumType from 'constants/enumType'

import TitleModalOrder from '../Order/TitleModalOrder'
import { REDUX_MODAL } from 'constants/enum'
import { isOrderCancel } from 'extensions/orders'

const ModalTransaction = (props) => {
  const {
    show,
    handleHide,
    title,
    typeModal,
    cancelText,
    okText,
    method,
    content,
    handleCancelClick,
    handleOkClick,
    isLendeeOrderCancel
  } = props

  const isShowButtonCancel = method === enumType.paymentMethod.Cash

  return (
    <Modal
      visible={show}
      mask={false}
      closable={false}
      cancelText={cancelText ? cancelText : 'CANCEL'}
      okText={typeModal || okText ? typeModal || okText : 'Confirm'}
      className={classNames(
        `custom-modal  custom-modal-sign-out modal-loan-request `,
        {
          'custom-modal-cancel-order ': isLendeeOrderCancel
        }
      )}
      autoFocusButton="cancel"
      maskClosable={true}
      cancelButtonProps={{
        style: { order: 1, display: isShowButtonCancel ? 'none' : null },
        className: `btn-color-grey`
      }}
      okButtonProps={{
        style: {
          order: 2,
          width: isShowButtonCancel ? '100%' : null,
          margin: isShowButtonCancel ? '0 70px' : null
        },
        className: classNames({
          'font-weight-bold': true,
          'btn-color-main': !typeModal,
          'btn-color-Dispute': typeModal
        })
      }}
      title={
        <h4 className="text-center title-modal font-roboto text-uppercase font-weight-bold">
          <TitleModalOrder
            titleName={title ? title : 'Confirm'}
            icon={
              typeModal && typeModal === enumType.typeModalOrder.DISPUTE
                ? DISPUTE_ORDER
                : CONFIRM_ORDER
            }
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
      <div className={'text__message font-size-14 font-cabin text-center mb-0'}>
        {content}
      </div>
    </Modal>
  )
}

export default connectModal({ name: REDUX_MODAL.TRANSACTION })(ModalTransaction)
