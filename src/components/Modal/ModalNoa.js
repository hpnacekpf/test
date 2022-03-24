import Modal from 'antd/lib/modal'
import React, { useState } from 'react'
import { connectModal } from 'redux-modal'
import { REDUX_MODAL } from 'constants/enum'
import Assessment from 'features/authentication/singPass/assessment'
import Verification from 'features/authentication/singPass/verification'
import { useResetSingPass } from 'reducers/user/hook'

import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { useModal } from 'hooks/useModal'
import { routes } from 'routes/mainNav'

const IdentityVerification = ({
  onCancel,
  onVerify,
  hideDescription,
  description
}) => {
  const history = useHistory()
  const [, onCloseModal] = useModal()

  return (
    <div className="assessment">
      <div className="assessment__title text-center font-size-26 mb-3">
        <h3>IDENTITY VERIFICATION</h3>
        <hr />
      </div>
      <div className="assessment__content text-center mb-3">
        {hideDescription ? null : (
          <p className="font-size-16">
            {description ?? (
              <h5>
                For this item, we would require the<br />
                verification of your Notice of Assessment (NOA) <br />
                and Proof of Residency in Singapore to proceed.
              </h5>
            )}
          </p>
        )}
      </div>
      <div className="d-flex benefits__content mb-3 justify-content-center">
        <Icon type="lock" className="benefits__iconlock font-size-16" />
        <p className="font-size-16 singpass-color-description text-left ml-2">
          Your particulars will not be made public. The use, collection and
          disclosure of the information will be in accordance with our {''}
          <a
            className="privacy"
            onClick={() => {
              onCloseModal(REDUX_MODAL.NOA)
              history.push(routes.PRIVACY_POLICY)
            }}
          >
            privacy policy{' '}
          </a>
        </p>
      </div>

      <div className="btn-footer-singpass d-flex justify-content-between">
        <Button
          size="large"
          className={classNames(
            'text-uppercase font-weight-bold ant-btn-block mb-3 benefits__skip-popup mr-3'
          )}
          onClick={() => {
            onCancel()
          }}
        >
          CANCEL
        </Button>

        <Button
          size="large"
          className={classNames(
            'text-uppercase font-weight-bold ant-btn-block mb-3 btn-color-main ml-3'
          )}
          onClick={() => {
            onVerify()
          }}
        >
          VERIFY NOW
        </Button>
      </div>
    </div>
  )
}

const ModalNoa = (props) => {
  const {
    show,
    handleHide,
    description,
    hideDescription,
    redirectUrl,
    forceUpdate,
    isIdentity = false
  } = props

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
        isIdentity ? (
          <IdentityVerification
            isPopup={true}
            showTitle
            onVerify={() => setIsFirstStep(false)}
            onCancel={onHideModal}
            description={description}
            hideDescription={hideDescription}
          />
        ) : (
          <Assessment
            isPopup={true}
            showTitle
            onVerify={() => setIsFirstStep(false)}
            onCancel={onHideModal}
            description={description}
            hideDescription={hideDescription}
          />
        )
      ) : (
        <Verification
          isNoa={true}
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
  name: REDUX_MODAL.NOA
})(ModalNoa)
