import React from 'react'
import { connectModal } from 'redux-modal'
import Form from 'antd/lib/form'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import FormItem from 'antd/lib/form/FormItem'
import Checkbox from 'antd/lib/checkbox'
import * as Yup from 'yup'
import { withFormik } from 'formik'
// components
import ErrorField from '../ErrorField'
// constants
import validate from 'constants/validate'
import xss from 'extensions/xss'
import { REDUX_MODAL } from 'constants/enum'

const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    deliveryAddress: Yup.string()
      .label('Address')
      // .matches(/^((?:[A-Za-z0-9]+ ?){1,9})$/, 'Invalid address.')
      .max(255)
      .required(validate.required)
      .typeError(validate.required),
    deliveryCity: Yup.string()
      .label('City')
      .matches(/^((?:[A-Za-z]+ ?){1,4})$/, 'Invalid city.')
      .max(20)
      .required(validate.required)
      .typeError(validate.required),
    deliveryZipCode: Yup.string()
      .label('Zip code')
      .matches(/^[0-9]{6}$/, 'Zip code must be exactly 6 digits.')
      .max(6)
      .required(validate.required)
      .typeError(validate.zipCode)
  }),
  mapPropsToValues: (props) => {
    const { user, isSaveDeliveryInfo } = props
    return {
      deliveryAddress: isSaveDeliveryInfo
        ? user?.userAddress?.address ?? null
        : null,
      deliveryCity: isSaveDeliveryInfo ? user?.userAddress?.city ?? null : null,
      deliveryZipCode: isSaveDeliveryInfo
        ? user?.userAddress?.zipCode ?? null
        : null,
      isSaveDeliveryInfo: isSaveDeliveryInfo || false
    }
  },
  handleSubmit: (data, { props }) => {
    const { handleSubmitOrder, handleHide } = props
    handleSubmitOrder({
      addressDelivery: xss.removeXssContent(data.deliveryAddress),
      cityDelivery: xss.removeXssContent(data.deliveryCity),
      zipCodeDelivery: xss.removeXssContent(data.deliveryZipCode),
      isSaveDeliveryInfo: data.isSaveDeliveryInfo
    })
    handleHide()
  },
  displayName: 'Form'
})

const ModalDelivery = (props) => {
  const {
    show,
    handleHide,
    title,
    content,
    handleCancelClick,
    handleSubmit,
    okText,
    cancelText,
    className,
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values
  } = props
  return (
    <Modal
      visible={show}
      mask={true}
      closable={false}
      cancelText={cancelText ? cancelText : 'Cancel'}
      okText={okText ? okText : 'Confirm'}
      className={`custom-modal custom-modal-sign-out modal-delivery ${
        className ? className : ''
      }`}
      autoFocusButton="cancel"
      maskClosable={true}
      cancelButtonProps={{
        style: { order: 1 },
        className: `btn-color-grey`
      }}
      okButtonProps={{ style: { order: 2 }, className: `btn-color-main` }}
      title={
        <h4 className="text-center title-modal font-roboto text-uppercase font-weight-bold">
          {title}
        </h4>
      }
      onCancel={() => {
        if (handleCancelClick) {
          handleCancelClick()
        }
        handleHide()
      }}
      onOk={() => {
        if (handleSubmit) {
          handleSubmit()
        }
      }}
    >
      <div className={'text-center'}>
        <p className="ant-modal-description">{content}</p>
        <Form>
          <FormItem label="Address" className="custom-asterisk">
            <Input
              className={``}
              placeholder="Address"
              value={values.deliveryAddress}
              onChange={(address) =>
                setFieldValue('deliveryAddress', address.target.value)
              }
              onBlur={() => setFieldTouched('deliveryAddress ', true)}
              // allowClear={true}
            />
            <ErrorField
              errors={errors}
              touched={touched}
              fieldName={'deliveryAddress'}
            />
          </FormItem>
          <div className="row">
            <div className="col-md-5">
              <FormItem label="City" className="custom-asterisk">
                <Input
                  className={``}
                  placeholder="City"
                  value={values.deliveryCity}
                  onChange={(city) =>
                    setFieldValue('deliveryCity', city.target.value)
                  }
                  onBlur={() => setFieldTouched('deliveryCity ', true)}
                  // allowClear={true}
                />
                <ErrorField
                  errors={errors}
                  touched={touched}
                  fieldName={'deliveryCity'}
                />
              </FormItem>
            </div>
            <div className="col-md-7">
              <FormItem label="Zip Code" className="custom-asterisk">
                <Input
                  className={``}
                  placeholder="Zip Code"
                  value={values.deliveryZipCode}
                  onChange={(zipCode) =>
                    setFieldValue('deliveryZipCode', zipCode.target.value)
                  }
                  onBlur={() => setFieldTouched('deliveryZipCode ', true)}
                  maxLength={6}
                  // allowClear={true}
                />
                <ErrorField
                  errors={errors}
                  touched={touched}
                  fieldName={'deliveryZipCode'}
                />
              </FormItem>
            </div>
            <div className="col-12 text-left">
              <h3 className="font-size-18 font-weight-bold text__main mb-3">
                Remember Me
              </h3>
              <div className="remember-delivery">
                <Checkbox
                  className="custom-checkbox"
                  checked={values.isSaveDeliveryInfo}
                  onChange={(e) =>
                    setFieldValue('isSaveDeliveryInfo', e.target.checked)
                  }
                >
                  Save my information for a faster checkout
                </Checkbox>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default connectModal({ name: REDUX_MODAL.DELIVERY })(
  formikMap(ModalDelivery)
)
