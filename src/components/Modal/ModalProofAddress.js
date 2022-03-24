import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import Modal from 'antd/lib/modal'
import classNames from 'classnames'
import { REDUX_MODAL } from 'constants/enum'
import { checkEnablePayNOA } from 'extensions/orders/payment'
import { useModal } from 'hooks/useModal'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useCreateRequestProofAddress } from 'reducers/order/hook'
import { connectModal } from 'redux-modal'
import { routes } from 'routes/mainNav'
import Radio from 'antd/lib/radio'
import enumType from 'constants/enumType'

const ModalProofAddress = (props) => {
  const { handleHide, show, user, noa, singpass } = props

  const location = useLocation()
  const history = useHistory()
  const [onOpenModal] = useModal()
  const [value, setValue] = React.useState(1)
  const onChange = (value) => {
    setValue(value)
  }

  const [onCreateProof] = useCreateRequestProofAddress()

  const onSubmit = (value) => {
    handleHide()
    if (value === 1) {
      checkEnablePayNOA({
        user,
        noa,
        singpass,
        pathname: location.pathname,
        onOpenModal
      })
    } else {
      if (value === 2) {
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
      <div className="singpass-noa-invalid">
        <div className="singpass-noa-invalid-title text-center font-size-26 font-weight-bold ">
          <h3>IDENTITY VERIFICATION</h3>
          <hr />
        </div>
        <div className="cannotrent__content text-center mb-5">
          <p className="font-size-18">
            {' '}
            For this item, we would require the verification of either your
            Notice of Assessment (NOA) or a Proof of Residency in Singapore to
            proceed. Should your NOA not meet our requirements, you would have
            to upload your Proof of Residency in Singapore.
          </p>
        </div>

        <Radio.Group
          className=" mb-5 justify-content-center"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        >
          {enumType.VerifyNOAProof.map((method, index) => (
            <div>
              <Radio
                key={index}
                value={method.value}
                className={`custom-radio-payment-method__single font-size-18 d-block line-height__2 w-100 mb-5 ml-1 d-flex `}
              >
                <Radio.Button
                  options={method}
                  className={classNames(
                    'text-uppercase font-weight-bold ant-btn-block w-100 identity-button text-center ml-3 d-flex justify-content-center align-items-center',
                    {
                      'btn-color-main': value - 1 === index
                    }
                  )}
                  value={method.value}
                >
                  {method.label}
                </Radio.Button>
              </Radio>
            </div>
          ))}
        </Radio.Group>

        <div className="d-flex benefits__content mb-3 justify-content-center">
          <Icon type="lock" className="benefits__iconlock font-size-16" />
          <p className="font-size-16 singpass-color-description text-left ml-2">
            Your particulars will not be made public. The use, collection and
            disclosure of the information will be in accordance with our {''}
            <a
              className="privacy"
              onClick={() => {
                handleHide()
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
            onClick={handleHide}
          >
            CANCEL
          </Button>

          <Button
            size="large"
            className={classNames(
              'text-uppercase font-weight-bold ant-btn-block mb-3 btn-color-main ml-3'
            )}
            onClick={() => {
              onSubmit(value)
            }}
          >
            VERIFY NOW
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default connectModal({ name: REDUX_MODAL.PROOF_ADDRESS })(
  ModalProofAddress
)
