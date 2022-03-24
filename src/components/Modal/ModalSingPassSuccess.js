import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import React from 'react'
import classNames from 'classnames'
import { connectModal } from 'redux-modal'
import VerificationSuccess from 'features/authentication/singPass/verified'
import { REDUX_MODAL } from 'constants/enum'
import { useModal } from 'hooks/useModal'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { isInvalidNOA, isInvalidSingpassAddress } from 'extensions/user'
import {
  DEPOSIT_REQUIRED_NOA_MAX,
  DEPOSIT_REQUIRED_NOA_MIN
} from 'constants/number'
import { useGetProduct } from 'reducers/productDetail/hook'
import { getUserSingPass } from '../../extensions/user'
import { checkEnablePayWithCard } from '../../extensions/orders/payment'
import {
  useCreateRequestProofAddress,
  useGetCreateProof
} from 'reducers/order/hook'

export const SingPassSuccess = ({ singpass, handleClose, noa }) => (
  <div className="handling handling--error text-center">
    <div className="handling__title text-center lendor-title__border d-inline-block mb-5">
      <p className="text-uppercase font-size-20 mb-0 font-weight-bold">
        VERIFICATION SUCCESS
      </p>
    </div>
    <div className="handling__content">
      <VerificationSuccess singpass={singpass} noa={noa} isPopup={true} />
    </div>
    <div className="h-48" />
    <div className="text-center">
      <div className="d-flex">
        <Button
          size="large"
          className={classNames(
            'text-uppercase font-weight-bold ant-btn-block mb-3 benefits__skip-popup mr-3'
          )}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          size="large"
          className={classNames(
            'text-uppercase font-weight-bold ant-btn-block mb-3 btn-color-main ml-3'
          )}
          onClick={handleClose}
        >
          Confirm
        </Button>
      </div>
    </div>
  </div>
)

const ModalSingPassSuccess = (props) => {
  const { handleHide, info, show } = props

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
      <SingPassSuccess singpass={info} handleClose={handleHide} />
    </Modal>
  )
}

export default connectModal({ name: REDUX_MODAL.SINGPASS_SUCCESS })(
  ModalSingPassSuccess
)

const SingPassNOA = (props) => {
  const {
    handleHide,
    info,
    show,
    redirectUrl,
    forceVerifyNOA,
    forceUpdate,
    checkAddress
  } = props

  const [onOpenModal] = useModal()

  const user = useGetUser()

  const product = useGetProduct()

  const handleClose = () => {
    handleHide()

    if (checkAddress) {
      const isInvalidAddress = isInvalidSingpassAddress(info)
      if (isInvalidAddress) {
        onOpenModal(REDUX_MODAL.REGISTER_ADDRESS_SINGPASS)
        return
      }
    }

    if (forceVerifyNOA) {
      onOpenModal(REDUX_MODAL.NOA, {
        redirectUrl,
        hideDescription: forceVerifyNOA,
        forceUpdate
      })
    } else {
      if (product?.deposit >= DEPOSIT_REQUIRED_NOA_MAX) {
        const isInvalid = isInvalidNOA(user)
        if (isInvalid) {
          onOpenModal(REDUX_MODAL.NOA, {
            redirectUrl,
            isIdentity: true
          })
        }
      }
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
      <SingPassSuccess singpass={info} handleClose={handleClose} />
    </Modal>
  )
}

export const ModalSingPassNOA = connectModal({
  name: REDUX_MODAL.SINGPASS_WITH_NOA
})(SingPassNOA)

const NOASuccess = (props) => {
  const { info, handleHide, show, checkNOAMinimum, verifyProofAddress } = props

  const [onOpenModal] = useModal()

  const [onCreateProof] = useCreateRequestProofAddress()

  const user = useGetUser()

  const product = useGetProduct()

  const isEnableCreateProof = useGetCreateProof()

  const handleClose = () => {
    handleHide()
    if (info && checkNOAMinimum) {
      const singpass = getUserSingPass(user)
      const isValid = checkEnablePayWithCard(info, singpass)

      let isOpenProofAddress = !!verifyProofAddress
      // case minimum assessment
      if (!isValid) {
        if (
          product?.deposit < DEPOSIT_REQUIRED_NOA_MAX &&
          product?.deposit >= DEPOSIT_REQUIRED_NOA_MIN
        ) {
          onOpenModal(REDUX_MODAL.MINIMUM_ASSESSMENT, { isNoaWithProof: true })
          return
        }

        if (product?.deposit >= DEPOSIT_REQUIRED_NOA_MAX) {
          onOpenModal(REDUX_MODAL.MINIMUM_ASSESSMENT, {
            isInvalidWithDepositMax: true
          })
          return
        }

        isOpenProofAddress = false
        onOpenModal(REDUX_MODAL.MINIMUM_ASSESSMENT)
      } else {
        // noa valid
        //case deposit >= 800
        if (product?.deposit >= DEPOSIT_REQUIRED_NOA_MAX) {
          isOpenProofAddress = true
        }

        // case 200 < deposit <= 800
        if (
          product?.deposit < DEPOSIT_REQUIRED_NOA_MAX &&
          product?.deposit >= DEPOSIT_REQUIRED_NOA_MIN
        ) {
          isOpenProofAddress = false
        }
      }

      //open modal proof address
      if (isOpenProofAddress && isEnableCreateProof) {
        onOpenModal(REDUX_MODAL.PROOF_ADDRESS_REQUEST, {
          handleCreateProof: (value) => {
            onCreateProof(value)
          }
        })
      }
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
      <SingPassSuccess noa={info} handleClose={handleClose} />
    </Modal>
  )
}

export const ModalNOASuccess = connectModal({ name: REDUX_MODAL.NOA_SUCCESS })(
  NOASuccess
)
