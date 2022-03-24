import React, { Fragment, memo } from 'react'
import Tooltip from 'antd/lib/tooltip'
import PropTypes from 'prop-types'
// constants
import { LPPToolTip, PROMO_ICON } from 'constants/index'
import enumType from 'constants/enumType'
import { ORDER_TYPE, PAYMENT_TYPE } from 'constants/enum'
// services
import { getSingleUrlImageProduct } from 'extensions/image'
import { getProductName } from 'extensions/product'
import HorizontalTNBLTag from 'components/TNBL/HorizontalTNBLTag'
import OrderBuy from '../../models/orderBuy'
import numberExtensions from 'extensions/number'
import { checkBuyableProduct } from 'extensions/product'
import PromoCodeBuyProduct from 'features/order/loanRequest/PromoCode'
import OrderRent from 'models/orderRent'
import BaseOrderExtend from 'models/orderExtend'

const Quantity = ({ quantity }) => (
  <div className="d-flex justify-content-between font-size-18">
    <p>Quantity</p>
    <p className="font-weight-bold">{quantity}</p>
  </div>
)

const CountDay = ({ countDay, price }) => (
  <div className="d-flex justify-content-between font-size-18">
    <p>{countDay} Days Fee</p>
    <p className="font-weight-bold">
      {numberExtensions.showFormatPrice(price)}
    </p>
  </div>
)

const ProtectedGuarantee = ({ totalPriceLPP }) => (
  <div className="d-flex justify-content-between font-size-18">
    <p>
      Lendor Protection Guarantee (LPG)*
      <Tooltip title={LPPToolTip} overlayClassName={`remove-tool-tip`}>
        <span className="ml-1">
          <i className="fa fa-question-circle-o" aria-hidden="true" />
        </span>
      </Tooltip>
    </p>
    <p className="font-weight-bold">
      {numberExtensions.showFormatPrice(totalPriceLPP)}
    </p>
  </div>
)

const FlatRate = ({ flatRate }) => (
  <div className="d-flex justify-content-between font-size-18">
    <p>Flat Delivery Rate</p>
    <p className="font-weight-bold ml-2">
      {numberExtensions.showFormatPrice(flatRate)}
    </p>
  </div>
)

const Deposit = ({ deposit }) => (
  <div className="d-flex justify-content-between font-size-18 row">
    <p className="col-md-9 col-8">
      Lend Deposit
      <span className="lendor-color-gray-v1">
        (Refunded After Item Successfully Returned)
      </span>
    </p>
    <p className="col-md-3 col-4 text-right font-weight-bold ">
      {numberExtensions.showFormatPrice(deposit)}
    </p>
  </div>
)

const PromoCode = ({ discountPromo }) => (
  <div className="d-flex justify-content-between font-size-18">
    <p>Promo Code</p>
    <p className="font-weight-bold">
      -{numberExtensions.showFormatPrice(discountPromo)}
    </p>
  </div>
)

const Discount = ({ discount, discountType, discountPrice }) => (
  <div className="d-flex justify-content-between font-size-18">
    <p>
      {discount}%{' '}
      {discountType === enumType.discountType.Monthly
        ? 'Monthly Discount'
        : 'Weekly Discount'}
    </p>
    <p className="font-weight-bold">
      -{numberExtensions.showFormatPrice(discountPrice)}
    </p>
  </div>
)

const OrderRentInfo = ({ data }) => (
  <React.Fragment>
    <Quantity quantity={data?.quantity} />
    {data.countDayLoanDuration ? (
      <CountDay countDay={data.countDayLoanDuration} price={data.subTotal} />
    ) : null}
    {data.isLPP && data.isOptedIn ? (
      <ProtectedGuarantee totalPriceLPP={data.totalPriceLPP} />
    ) : null}
    {data.isDelivery ? <FlatRate flatRate={data.flatRate} /> : null}
    <Deposit deposit={data.totalDeposit} />
    {data.discountWithPromo || data.promo?.code ? (
      <PromoCode discountPromo={data.discountWithPromo} />
    ) : null}
    {data.discountOrder ? (
      <Discount
        discount={data.discountOrder}
        discountPrice={data.discountPrice}
        discountType={data.discountType}
      />
    ) : null}
  </React.Fragment>
)

const OrderBuyInfo = ({ data }) => {
  const infoDisplay = [
    {
      label: 'Product Retail Price',
      value: data.productRetailPrice
    },
    {
      label: 'Rental Rebate',
      value: data.discount > 0 ? data.discount * -1 : 0
    }
  ]

  if (data.isDelivery) {
    infoDisplay.splice(1, 0, {
      label: 'Delivery Fee',
      value: data.flatRate
    })
  }

  if (data.discountWithPromo) {
    infoDisplay.push({
      label: 'Promo Code',
      value: data.discountWithPromo > 0 ? data.discountWithPromo * -1 : 0
    })
  }

  return infoDisplay.map(({ label, value }, index) => (
    <div className="d-flex justify-content-between font-size-18" key={index}>
      <p>{label}</p>
      <p className="font-weight-bold">
        {numberExtensions.showFormatPrice(value)}
      </p>
    </div>
  ))
}

const InformationOrder = (props) => {
  const { order, handleApplyPromo } = props

  if (!order) return null
  const data =
    order.type === ORDER_TYPE.BUY
      ? new OrderBuy(order)
      : order.type === ORDER_TYPE.EXTENSION
        ? new BaseOrderExtend(order)
        : new OrderRent(order)

  const productName = getProductName(data?.product)

  const isBuyableProduct = checkBuyableProduct(data.product, data.seller)

  const showAmendment =
    order.paymentType === PAYMENT_TYPE.MERGE ||
    order.paymentType === PAYMENT_TYPE.DATE_AMENDMENT
  const showOrder =
    order.paymentType === PAYMENT_TYPE.MERGE ||
    order.paymentType === PAYMENT_TYPE.ORDER

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12">
          <div className="d-flex font-size-20 info-product justify-content-center align-items-center">
            <img
              src={getSingleUrlImageProduct(data.product)}
              alt={productName || 'image-thumbnail'}
            />
            <p className="font-weight-bold font-size-20 d-flex">
              {productName || <i>NaN</i>}
              {isBuyableProduct ? (
                <HorizontalTNBLTag customClass="ml-10" />
              ) : null}
            </p>
          </div>
          {order.type === ORDER_TYPE.BUY && handleApplyPromo ? (
            <PromoCodeBuyProduct
              allowPromoCode={true}
              values={{
                product: data.product,
                promo: data.promo
              }}
              handleApplyPromo={handleApplyPromo}
              icon={PROMO_ICON}
            />
          ) : null}

          <hr className="mt-5 w-100" />
        </div>

        <div className="col-xl-12">
          {showOrder ? (
            <>
              {order.type === ORDER_TYPE.BUY ? (
                <OrderBuyInfo data={data} />
              ) : (
                <OrderRentInfo data={data} />
              )}
              <hr className="w-100 mb-5" />
            </>
          ) : null}

          {showAmendment ? (
            <div>
              <div className="d-flex justify-content-between font-size-18">
                <p>Additional Fee</p>
                <p>
                  {' '}
                  <span className="font-weight-bold font-size-20">
                    {numberExtensions.showFormatPrice(order?.additionFee)}
                  </span>
                </p>
              </div>

              {order?.penaltyFeeAmendment ? (
                <div className="d-flex justify-content-between font-size-18">
                  <p>Penalty Fee</p>
                  <p>
                    {' '}
                    <span className="font-weight-bold font-size-20">
                      {numberExtensions.showFormatPrice(
                        order?.penaltyFeeAmendment
                      )}
                    </span>
                  </p>
                </div>
              ) : null}
              <hr className="w-100" />
            </div>
          ) : null}

          <div className="d-flex justify-content-between font-size-18">
            <p>Total</p>
            <p>
              {' '}
              <span className="font-size-14 mr-4">SGD</span>{' '}
              <span className="font-weight-bold font-size-20">
                {numberExtensions.showFormatPrice(data.totalPrice)}
              </span>
            </p>
          </div>
          <hr className="w-100" />
        </div>
      </div>
    </Fragment>
  )
}

InformationOrder.propTypes = {
  order: PropTypes.any
}

export default memo(InformationOrder)
