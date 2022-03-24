import React from 'react'
import {
  MINIMUM_NOA_MESSAGE,
  MINIMUM_NOA_WITH_PROOF,
  MINIMUM_NOA_MESSAGE_DEPOSIT_MAX,
  rentImg
} from '../../constants'
import Button from 'antd/lib/button'
import classNames from 'classnames'
import { REDUX_MODAL } from 'constants/enum'
import { connectModal } from 'redux-modal'
import Modal from 'antd/lib/modal'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/mainNav'
import { useModal } from 'hooks/useModal'
import { useCreateRequestProofAddress } from 'reducers/order/hook'

const ModalMinimumAssessment = (props) => {
  const { handleHide, show, isNoaWithProof, isInvalidWithDepositMax } = props

  const history = useHistory()
  const [onOpenModal] = useModal()
  const [onCreateProof] = useCreateRequestProofAddress()

  const onCloseModal = () => {
    if (isNoaWithProof) {
      onOpenModal(REDUX_MODAL.PROOF_ADDRESS_REQUEST, {
        handleCreateProof: (value) => {
          onCreateProof(value)
        }
      })

      handleHide()
    } else {
      handleHide()
      history.push(routes.FAQ)
    }
  }

  return (
    <Modal
      centered={true}
      visible={show}
      mask={false}
      closable={false}
      footer={null}
      onOk={handleHide}
      onCancel={handleHide}
    >
      <div className="singpass-noa-invalid">
        <div className="singpass-noa-invalid-title text-center font-size-26 font-weight-bold ">
          <h3>HIGH VALUE ITEM</h3>
          <hr />
        </div>
        <div className="cannotrent__content text-center">
          <p className="font-size-18">
            {isNoaWithProof
              ? MINIMUM_NOA_WITH_PROOF
              : isInvalidWithDepositMax
                ? MINIMUM_NOA_MESSAGE_DEPOSIT_MAX
                : MINIMUM_NOA_MESSAGE}
          </p>
          <img src={rentImg} alt="" className="assessment__content-img mb-5" />
        </div>

        <div className="btn-footer-singpass d-flex justify-content-between mt-5">
          <Button
            size="large"
            className={classNames(
              'text-uppercase font-weight-bold ant-btn-block mb-3 benefits__skip-popup mr-3',
              {}
            )}
            onClick={handleHide}
          >
            CANCEL
          </Button>

          <Button
            size="large"
            className={classNames(
              'text-uppercase font-weight-bold ant-btn-block mb-3 btn-color-main ml-3',
              {}
            )}
            onClick={onCloseModal}
          >
            {isNoaWithProof ? 'UPLOAD' : 'LEARN MORE'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default connectModal({ name: REDUX_MODAL.MINIMUM_ASSESSMENT })(
  ModalMinimumAssessment
)
