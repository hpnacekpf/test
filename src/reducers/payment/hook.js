import { useAppDispatch } from 'configureStore'
import { PAYMENT_TYPE } from 'constants/enum'
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PRODUCT_SAME_STORE
} from 'constants/paging'
import {
  DATE_AMENDMENT_PAYMENT_PATH,
  ERROR_MESSAGE_REQUEST,
  ORDER_PAYMENT_PATH
} from 'constants/string'
import { isUserPayment } from 'extensions/orders/payment'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useNotification } from 'hooks/useNotification'
import { useTrackFbChargeOrder } from 'hooks/useTrackFb'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { routes } from 'routes/mainNav'
import { isServer } from 'utils/client-api'
import {
  fetchChargeOrder,
  fetchCreatePayment,
  fetchDeletePayment,
  fetchPayment,
  fetchProductSameStore,
  resetPayment
} from './api'

export const usePayment = () => {
  const dispatch = useAppDispatch()

  const history = useHistory()

  const { type } = useParams()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onPayment = async (data, orderId) => {
    const response = await dispatch(fetchCreatePayment({ data, orderId }))

    if (fetchCreatePayment.fulfilled.match(response)) {
      const { recordId } = response.payload

      history.push(`/${type}/payment-confirmation/${recordId}`)
    } else {
      onErrorApi(response)
      history.push(`/${type}/detail/${orderId}`)
    }
  }

  return [onPayment]
}

export const usePaymentDetail = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()

  const history = useHistory()

  const user = useGetUser()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onFetch = async () => {
    const response = await dispatch(fetchPayment(id))

    if (fetchPayment.fulfilled.match(response)) {
      const isValidUser = isUserPayment(response.payload, user)
      if (!isValidUser) {
        history.replace(routes.ACCESS_DENIED_403)
      }
    } else {
      onErrorMsg(ERROR_MESSAGE_REQUEST)
      history.replace(routes.PAGE_NOT_FOUND_404)
    }
  }

  useEffect(() => {
    onFetch()
  }, [])
}

export const useDeletePayment = () => {
  const dispatch = useAppDispatch()

  const history = useHistory()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onDelete = async (id, type) => {
    console.log(type)
    if (id) {
      const response = await dispatch(fetchDeletePayment(id))
      if (fetchDeletePayment.fulfilled.match(response)) {
        history.push(`/${type}/payment-details/${id}`)
      } else {
        onErrorApi(response)
      }
    } else {
      history.push(routes.TRANSACTIONS)
    }
  }

  return [onDelete]
}

export const useChargePayment = () => {
  const dispatch = useAppDispatch()

  const history = useHistory()

  const [onTrack] = useTrackFbChargeOrder()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onCharge = async ({ paymentId, isSave, order }) => {
    const response = await dispatch(fetchChargeOrder({ id: paymentId, isSave }))
    if (fetchChargeOrder.fulfilled.match(response)) {
      onTrack(order, isServer)
      onSuccessMsg('Payment successful')
      history.push(`/order/payment-complete/${paymentId}`)
    } else {
      onErrorApi(response)
    }
  }

  return [onCharge]
}

export const useProductSameStore = (userId) => {
  const dispatch = useAppDispatch()

  const products = useGetStoreProduct()

  const loading = useGetLoadingProduct()

  const [storeProducts, setStoreProducts] = useState([])

  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX)

  const onFetch = async (pageIndex) => {
    if (userId) {
      await dispatch(
        fetchProductSameStore({
          userId,
          pageSize: DEFAULT_PRODUCT_SAME_STORE,
          pageIndex
        })
      )
    }
  }

  const addProductToState = (products) => {
    let currentProducts = []
    if (storeProducts?.length > 0) {
      currentProducts = [...storeProducts]
    }

    if (products?.length > 0) {
      products.forEach((product) => {
        if (currentProducts.every(({ _id }) => _id !== product._id)) {
          currentProducts.push(product)
        }
      })
    }
    setStoreProducts(currentProducts)
  }

  const onLoadMore = () => {
    const index = pageIndex + 1
    onFetch(index)
    setPageIndex(index)
  }

  const onRefresh = () => {
    setPageIndex(DEFAULT_PAGE_INDEX)
    setStoreProducts([])
    onFetch(DEFAULT_PAGE_INDEX)
  }

  useEffect(
    () => {
      onRefresh()
    },
    [userId]
  )

  useEffect(
    () => {
      addProductToState(products)
    },
    [products]
  )

  return [storeProducts, loading, pageIndex, onRefresh, onLoadMore]
}

export const useResetPayment = () => {
  const dispatch = useAppDispatch()

  const onReset = () => void dispatch(resetPayment())

  return [onReset]
}

/**
 * HOOK STATE
 */
export const useGetLoadingPayment = () => {
  return useSelector((state) => state.payment.loading)
}

export const useGetPayment = () => {
  return useSelector((state) => state.payment.paymentDetail)
}

export const useGetStoreProduct = () => {
  return useSelector((state) => state.payment.storeProducts)
}

export const useGetLoadingProduct = () => {
  return useSelector((state) => state.payment.loadingProduct)
}
