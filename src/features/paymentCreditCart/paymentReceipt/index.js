import React, { useEffect } from 'react'
import Card from 'antd/lib/card'
// components
import CustomButton from 'components/Button/CustomButton'
import Title from 'components/Title'
import InvoiceUser from './InvoiceUser'
import InvoiceInfo from './InvoiceInfo'
import InvoiceTotal from './InvoiceTotal'
import { getUrlByUser } from 'extensions/url'
import { isServer } from 'utils/client-api'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useGetPayment, usePaymentDetail } from 'reducers/payment/hook'
import SameStore from './SameStore'
import { getOrderPaymentUrl } from '../../../extensions/url'
import { ORDER_TYPE } from 'constants/enum'
import OrderBuy from 'models/orderBuy'
import OrderBuyInfo from './OrderBuyInfo'
import { checkBuyableProduct } from 'extensions/product'
import OrderRent from 'models/orderRent'
import BaseOrderExtend from 'models/orderExtend'
import InvoiceAmendmentInfo from './InvoiceAmendmentInfo'

const PaymentReceipt = (props) => {
  const { history } = props

  usePaymentDetail()

  const user = useGetUser()

  const paymentDetail = useGetPayment()

  useEffect(() => {
    if (!isServer) {
      const topbar = document.querySelector('.topbar')
      if (topbar) {
        window.scrollTo({
          top: topbar.offsetHeight
        })
      }
    }
  }, [])

  const order = paymentDetail?.order
    ? paymentDetail.order.type === ORDER_TYPE.BUY
      ? new OrderBuy(paymentDetail.order)
      : paymentDetail.order.type === ORDER_TYPE.EXTENSION
        ? new BaseOrderExtend(paymentDetail.order)
        : new OrderRent(paymentDetail.order)
    : null

  const isBuyableProduct = checkBuyableProduct(order?.product, order?.seller)

  const address = paymentDetail?.payment?.addressBilling ?? null

  return order ? (
    <div className="custom-payment-complete">
      <div className="payment-receipe-title">
        <Title
          title="PAYMENT — receipt"
          isBorder="hide"
          isBuyableProduct={isBuyableProduct}
        />
      </div>
      <Card className="cart-complete position-relative">
        <div className="row mb-2">
          <div className="col-md-6 text-md-left">
            <div className="mt-5 custom-text-right">
              <Title title="Receipt" isHeader />
              <p>Your request for the items below has been placed</p>
            </div>
          </div>
          <div className="col-md-6 text-md-right">
            <InvoiceUser
              user={user}
              order={order}
              address={address}
              payment={paymentDetail.payment}
            />
          </div>
        </div>
        <div className="row">
          {order.type === ORDER_TYPE.BUY ? (
            <OrderBuyInfo order={order} />
          ) : (
            <InvoiceInfo
              order={{
                ...(order?.toJson() ?? {}),
                paymentType: paymentDetail?.payment?.type
              }}
            />
          )}
        </div>
        <div className="row">
          <div className="col-md-6" />
          <div className="col-md-6 text-md-right mt-5">
            <InvoiceTotal
              paymentType={paymentDetail?.payment.type}
              type={order.type}
              deposit={order.totalDeposit}
              totalPrice={order.totalPrice}
              order={order}
            />
          </div>
        </div>

        <div className="position-absolute btn-seetransaction">
          {order?.seller ? (
            <CustomButton
              buttonType={'btn-color-main-outline'}
              buttonClass="btn-large font-weight-bold text-uppercase mb-4 mr-4"
              handleClick={() => {
                const sellerUrl = getUrlByUser(order.seller)
                history.push(sellerUrl)
              }}
            >
              VIEW SHOP
            </CustomButton>
          ) : null}
          <CustomButton
            buttonType={'btn-color-main'}
            buttonClass="btn-large font-weight-bold text-uppercase mb-4"
            handleClick={() => {
              history.push(getOrderPaymentUrl(order))
            }}
          >
            VIEW TRANSACTION
          </CustomButton>
        </div>
      </Card>
      <hr className="hr-payment" />
      <SameStore userId={order?.seller?._id} />
    </div>
  ) : null
}
export default PaymentReceipt
