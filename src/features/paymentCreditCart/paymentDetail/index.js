import Spin from 'antd/lib/spin'
import React, { useEffect } from 'react'
// libs
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { Elements } from 'react-stripe-elements'
// components
import FormPayment from './FormPayment'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import {
  useGetLoadingOrder,
  useGetAmendmentPaymentReferenceDate as useGetPaymentReference,
  usePaymentReference
} from 'reducers/order/hook'
import { getPaymentStep } from 'extensions/orders/payment'
import {
  useGetLoadingPayment,
  useGetPayment,
  usePayment
} from 'reducers/payment/hook'
import { PAYMENT_TYPE } from 'constants/enum'
import { getOrderPaymentUrl } from '../../../extensions/url'
import { DATE_AMENDMENT_PAYMENT_PATH } from 'constants/string'

const PaymentDetail = () => {
  const history = useHistory()

  const user = useGetUser()

  const [getPaymentReference] = usePaymentReference()

  const { path } = useRouteMatch()

  const { id, type } = useParams()

  const [onPayment] = usePayment()

  const loading = useGetLoadingOrder()

  const loadingPayment = useGetLoadingPayment()

  const paymentRef = useGetPaymentReference()

  const paymentDetail = useGetPayment()

  useEffect(() => {
    getPaymentReference()
  }, [])

  const handleSubmit = (data) => {
    const types =
      paymentRef.paymentType === PAYMENT_TYPE.DATE_AMENDMENT ||
      type === DATE_AMENDMENT_PAYMENT_PATH
        ? PAYMENT_TYPE.DATE_AMENDMENT
        : PAYMENT_TYPE.ORDER
    onPayment({ ...data, type: types }, id)
  }

  const handleCancelForm = () => {
    history.push(getOrderPaymentUrl(paymentRef))
  }

  useEffect(
    () => {
      // if (
      //   paymentDetail &&
      //   paymentDetail.payment &&
      //   paymentDetail.payment._id === id
      // ) {
      //   history.push(
      //     `/${type}/payment-confirmation/${paymentDetail?.payment?._id}`
      //   )
      // }
    },
    [paymentDetail?.payment]
  )

  const step = getPaymentStep(path)

  const isCurrentRef = paymentRef
    ? type === DATE_AMENDMENT_PAYMENT_PATH
      ? paymentRef.dateAmendmentId === id
      : paymentRef._id === id
    : false

  return (
    <Spin spinning={loading || loadingPayment}>
      {isCurrentRef ? (
        <Elements>
          <FormPayment
            step={step}
            paymentRef={paymentRef}
            handleSubmitForm={handleSubmit}
            user={user}
            history={history}
            handleCancel={handleCancelForm}
          />
        </Elements>
      ) : null}
    </Spin>
  )
}

export default PaymentDetail
