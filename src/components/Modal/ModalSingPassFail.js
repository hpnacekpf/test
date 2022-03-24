import React from 'react'
import Modal from 'antd/lib/modal'
import Button from 'antd/lib/button'
import { connectModal } from 'redux-modal'
import { singPassImg } from 'constants/index'
import ErrorMessageSingPass from 'features/authentication/singPass/errorMessageSingPass'
import ErrorUsingSameSingPass from 'features/authentication/singPass/errorUsingSameSingPass'
import ButtonSingPass from 'features/authentication/singPass/buttonSingPass'
import { useResetSingPass } from 'reducers/user/hook'
import { REDUX_MODAL } from 'constants/enum'
import ButtonNOA from '../../features/authentication/singPass/buttonNOA'
import classNames from 'classnames'

const ModalSingPassFail = (props) => {
  const {
    handleHide,
    show,
    pathname,
    isNOA,
    forceUpdate,
    isSameSingpass
  } = props

  const [onReset] = useResetSingPass()

  const handleClose = () => {
    handleHide()
    onReset()
  }

  return (
    <Modal
      width={730}
      maskClosable={true}
      closable={false}
      visible={show}
      footer={null}
      onCancel={handleClose}
      onOk={handleClose}
      className={isSameSingpass ? `singpass-fail-modal` : ``}
    >
      <div className="handling handling--error text-center">
        <div className="handling__title text-center lendor-title__border d-inline-block mb-5">
          <p className="text-uppercase font-size-20 font-weight-bold mb-0">
            verification unsuccessful
          </p>
        </div>
        <div
          className=" "
          className={classNames(`text-center`, {
            'my-5 ': isSameSingpass,
            'my-4 ': !isSameSingpass
          })}
        >
          <img src={singPassImg} alt="singpass" className="img-fluid h-30" />
        </div>
        <div className="handling__content">
          {isSameSingpass ? (
            <ErrorUsingSameSingPass isPopUp={true} />
          ) : (
            <ErrorMessageSingPass isPopUp={true} />
          )}
        </div>
        <div
          className={classNames({
            'height-200 ': isSameSingpass,
            'h48 ': !isSameSingpass
          })}
        />
        <div className="text-center">
          <div className="d-inline-block">
            <div className="mb-2">
              {isSameSingpass ? null : isNOA ? (
                <ButtonNOA pathname={pathname} forceUpdate={forceUpdate} />
              ) : (
                <ButtonSingPass pathname={pathname} forceUpdate={forceUpdate} />
              )}
            </div>
            <Button
              size="large"
              onClick={handleClose}
              className={classNames(
                `text-uppercase font-weight-bold ant-btn-block benefits__skip-popup h-48`,
                {
                  'width-300 ': isSameSingpass,
                  'mb-3 ': !isSameSingpass
                }
              )}
            >
              CANCEL
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default connectModal({ name: REDUX_MODAL.SINGPASS_FAIL })(
  ModalSingPassFail
)
