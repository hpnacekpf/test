import React from 'react'
import { rentImg } from '../../constants'
import Button from 'antd/lib/button'
import classNames from 'classnames'
import { REDUX_MODAL } from 'constants/enum'
import { connectModal } from 'redux-modal'
import Modal from 'antd/lib/modal'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/mainNav'

const ModalSingPassAddress = (props) => {
  const { handleHide, show } = props

  const history = useHistory()

  const onCloseModal = () => {
    handleHide()
    history.push(routes.FAQ)
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
          <h3>REGISTERED ADDRESS REQUIRED</h3>
          <hr />
        </div>
        <div className="cannotrent__content text-center">
          <p className="font-size-18">
            {' '}
            Your Singpass information does not contain a registered address and
            does not meet the requirement. You may opt out of Lendor Protection
            Guarantee (LPG) and rent with a deposit subject to merchant's
            approval.
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
            LEARN MORE
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default connectModal({ name: REDUX_MODAL.REGISTER_ADDRESS_SINGPASS })(
  ModalSingPassAddress
)
