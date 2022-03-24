import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import CollectionMethod from 'features/order/loanRequest/CollectionMethod'
import PaymentMethod from 'features/order/loanRequest/PaymentMethod'
import { COLLECTION_ICON } from 'constants/index'
import InformationOrder from 'features/paymentCreditCart/InformationOrder'
import { withFormik } from 'formik'
import CustomButton from 'components/Button/CustomButton'
import Title from 'components/Title'
import Request from 'models/orderRequest'
const OrderBuyRequest = Request.OrderBuyRequest

const formikMap = withFormik({
  // enableReinitialize: true,
  validationSchema: Yup.object().shape({}),
  mapPropsToValues: ({ order, user }) => {
    return new OrderBuyRequest(order, user)
  },
  handleSubmit: (data, { props }) => {
    props.handleSubmitForm(data)
  },
  displayName: 'Form'
})

const Form = (props) => {
  const { values, handleCancel, handleSubmit } = props

  const [isUpdate, setIsUpdate] = useState(false)

  const handleChangeDelivery = (delivery) => {
    values.setDeliveryType(delivery)
    setIsUpdate(!isUpdate)
  }

  const handleChangePaymentMethod = (method) => {
    values.setPaymentMethod(method)
    setIsUpdate(!isUpdate)
  }

  const handleApplyPromo = (promoCode) => {
    values.setPromoCode(promoCode)
    setIsUpdate(!isUpdate)
  }

  return (
    <div>
      <div className="row custom-cardinfo">
        <div className="col-12 p-0">
          <Title title="Shipping and Payment" isBorder="hide" />
          <hr className="py-3" />
        </div>
        <div className="col-xl-6 border py-35 card-box-shadow card-box-payment">
          <CollectionMethod
            icon={COLLECTION_ICON}
            values={values}
            handleChangeDelivery={handleChangeDelivery}
          />
        </div>
        <div className="col-xl-6 info-payment">
          <InformationOrder
            handleApplyPromo={handleApplyPromo}
            order={values}
          />
          <PaymentMethod
            values={values}
            handleChangePaymentMethod={handleChangePaymentMethod}
            isVertical={true}
          />
        </div>
      </div>

      <div className="w-100 text-center">
        <div className="submit-payment d-flex justify-content-between">
          <CustomButton
            handleClick={handleCancel}
            buttonType="btn-color-grey"
            buttonClass="btn-large btn-xlarge-100 btn-xlarge-mb-10 font-weight-bold text-uppercase"
          >
            Back
          </CustomButton>
          <CustomButton
            htmlType={'button'}
            buttonType={'btn-color-main'}
            buttonClass="btn-large btn-xlarge-100 font-weight-bold text-uppercase"
            handleClick={handleSubmit}
          >
            Next
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

Form.propTypes = {
  order: PropTypes.any
}

export default formikMap(Form)
