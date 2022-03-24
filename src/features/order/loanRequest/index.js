// libs
import { getUrlProduct } from 'extensions/url'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import React, { Fragment, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useCreateOrder, useGetOrder } from 'reducers/order/hook'
import { useGetProducts } from 'reducers/product/hook'
import { useProductDetail } from 'reducers/productDetail/hook'
// Constants
// Components
import Form from './Form'

const LoanRequest = () => {
  const history = useHistory()

  const [, onFetchById] = useProductDetail()

  const [onCreate, onUpdate] = useCreateOrder()

  const [product] = useGetProducts()

  const order = useGetOrder()

  const user = useGetUser()

  const { id } = useParams()

  useEffect(
    () => {
      if (order?.product?._id !== id || order.orderId) {
        const url = getUrlProduct(order?.product)
        history.replace(url)
      } else {
        onFetchById(id)
      }
    },
    [id]
  )

  // actions
  const handleSubmit = (data) => {
    if (data.orderId) {
      onUpdate(data.id, data.nextStatus)
    } else {
      onCreate(data)
    }
  }

  return product && order ? (
    <Fragment>
      <Form
        data={order}
        product={product}
        user={user}
        handleSubmitForm={handleSubmit}
        history={history}
      />
    </Fragment>
  ) : null
}

export default LoanRequest
