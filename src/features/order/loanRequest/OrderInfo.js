import React from 'react'
import OrderStatusLabel from 'components/Order/OrderStatusLabel'
import GeneralInfo from './GeneralInfo'
import { useGetOrder } from 'reducers/order/hook'
import { ORDER_TYPE } from 'constants/enum'
import { checkBuyableProduct } from 'extensions/product'

const OrderInfo = ({ data }) => {
  const order = useGetOrder()

  const isBuyableProduct = checkBuyableProduct(order.product)

  return (
    <React.Fragment>
      {data.orderId ? <OrderStatusLabel data={data} /> : null}
      <div className="text-uppercase text__profile mt-0 mb-10">
        {data.orderId ? `ORDER ID: ${data.orderId}` : null}
      </div>
      {data.product ? (
        <GeneralInfo
          isBuyableProduct={isBuyableProduct}
          productName={data.product.name}
          dailyRate={data.productPrice}
          hidePrice={data.type === ORDER_TYPE.BUY}
        />
      ) : null}
    </React.Fragment>
  )
}

export default OrderInfo
