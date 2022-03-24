import { useAppDispatch } from 'configureStore'
import {
  ORDER_STATUS,
  PAYMENT_METHOD,
  PAYMENT_TYPE,
  REDUX_MODAL
} from 'constants/enum'
import { MIN_TOTAL_PRICE } from 'constants/number'
import {
  DATE_AMENDMENT_PAYMENT_PATH,
  ERROR_MESSAGE_REQUEST,
  ORDER_PAYMENT_PATH
} from 'constants/string'
import { generateOrderLoanRequest } from 'extensions/url'
import { useModal } from 'hooks/useModal'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { useResetPayment } from 'reducers/payment/hook'
import { routes } from 'routes/mainNav'
import { isServer } from 'utils/client-api'
import GoogleTags from '../../components/GA/GoogleTags'
import { CURRENCY, GoogleTrackEvent } from '../../constants'
import { ORDER_NOT_FOUND } from '../../constants/message'
import { useNotification } from '../../hooks/useNotification'
import { useTrackFbOrder, useTrackFbOrderDetail } from '../../hooks/useTrackFb'
import { useAppPropsToUser } from '../user/hook'
import {
  fetchBuyProduct,
  fetchCheckEnableCreateProof,
  fetchCheckLoanExtension,
  fetchCheckOrderExtendable,
  fetchCreateAmendmentRequest,
  fetchCreateOrder,
  fetchCreateOrderExtend,
  fetchCreateProofAddress,
  fetchDateAmendment,
  fetchDuplicateOrder,
  fetchExtendOrders,
  fetchLateReturnOrders,
  fetchOrderDetail,
  fetchPaymentReference,
  fetchReview,
  fetchUpdateDateAmendmentRequestStatus,
  fetchUpdateOrder,
  fetchVerifyPromo,
  resetOrder,
  resetState
} from './api'

export const useResetOrderState = () => {
  const dispatch = useAppDispatch()

  const onReset = () => void dispatch(resetState())

  return onReset
}

export const useResetOrder = () => {
  const dispatch = useAppDispatch()

  const onReset = (data) => void dispatch(resetOrder(data))

  return [onReset]
}

export const useLoanRequest = () => {
  const dispatch = useAppDispatch()

  const [onTrack] = useTrackFbOrder()

  const history = useHistory()

  const createLoanRequest = (data) => {
    onTrack(data, isServer)
    dispatch(resetOrder(data))
    const redirectUrl = generateOrderLoanRequest(data.product._id)
    history.push(redirectUrl)
  }

  return [createLoanRequest]
}

export const useVerifyPromo = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onVerify = async ({ code, productId, onSuccess }) => {
    const resultAction = await dispatch(fetchVerifyPromo({ code, productId }))
    if (fetchVerifyPromo.fulfilled.match(resultAction)) {
      onSuccessMsg('Promo code applied')
      if (onSuccess) {
        onSuccess(resultAction.payload)
      }
    } else {
      onErrorApi(resultAction)
    }
  }

  return [onVerify]
}

export const useCreateOrder = () => {
  const dispatch = useAppDispatch()

  const history = useHistory()

  const [onAddProps] = useAppPropsToUser()

  const [onResetPayment] = useResetPayment()

  const [openModal, onCloseModal] = useModal()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onCreate = async (data) => {
    const resultAction = await dispatch(fetchCreateOrder(data))

    if (fetchCreateOrder.fulfilled.match(resultAction)) {
      const { _id, paymentMethod, totalPrice, status } = resultAction.payload

      if (status === ORDER_STATUS.DECLINED) {
        openModal(REDUX_MODAL.PROOF_ADDRESS_REJECT, {
          title: 'Alert',
          content: 'Order has been declined because admin reject POR',
          okText: 'OK',
          handleOkClick: () => {
            onCloseModal(REDUX_MODAL.PROOF_ADDRESS_REJECT)
            history.push(`/order/detail/${_id}`)
          }
        })
      } else {
        onSuccessMsg('Loan request sent')

        onResetPayment()

        if (data.isDelivery) {
          const userProps = {
            userAddress: {
              address: data.addressDelivery,
              city: data.cityDelivery,
              zipCode: data.zipCodeDelivery
            },
            isSaveDeliveryInfo: !!data.isSaveDeliveryInfo
          }
          onAddProps(userProps)
        }

        // add google tags
        GoogleTags.trackEvent([
          {
            event: GoogleTrackEvent.LoanRequestComplete,
            transactionID: _id,
            conversionValue: totalPrice,
            currencyCode: CURRENCY
          }
        ])

        // redirect url
        let redirectUrl =
          paymentMethod === PAYMENT_METHOD.CREDIT_CARD
            ? `/${ORDER_PAYMENT_PATH}/payment-details/${_id}`
            : `/${ORDER_PAYMENT_PATH}/detail/${_id}`
        history.push(redirectUrl)
        // dispatch
        dispatch(resetOrder(null))
      }
    } else {
      onErrorApi(resultAction)
    }
  }

  const onUpdate = async (id, status) => {
    const resultAction = await dispatch(fetchUpdateOrder({ id, status }))

    if (fetchUpdateOrder.fulfilled.match(resultAction)) {
      onSuccessMsg('Order status updated')
    } else {
      onErrorApi(resultAction)
    }
  }

  return [onCreate, onUpdate]
}

export const useOrderDetail = (checkDuplicate, tracking) => {
  const dispatch = useAppDispatch()

  const history = useHistory()

  const { id } = useParams()

  const [onTrack] = useTrackFbOrderDetail()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onFetch = async () => {
    const resultAction = await dispatch(fetchOrderDetail(id))
    if (fetchOrderDetail.fulfilled.match(resultAction)) {
      if (checkDuplicate) {
        await dispatch(fetchDuplicateOrder(id))
      }
      if (tracking) {
        onTrack(resultAction.payload, isServer)
      }
    } else {
      onErrorMsg(ORDER_NOT_FOUND)
      history.replace(routes.PAGE_NOT_FOUND_404)
    }
  }

  return [onFetch]
}

export const useReviewOrder = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onReview = async (data) => {
    const resultAction = await dispatch(fetchReview(data))
    if (fetchReview.fulfilled.match(resultAction)) {
      onSuccessMsg('Review submitted!')
    } else {
      onErrorMsg(ERROR_MESSAGE_REQUEST)
    }
  }

  return [onReview]
}
//extendOrders

export const useOrderExtend = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const onFetch = async () => {
    await dispatch(fetchExtendOrders(id))
  }
  return [onFetch]
}

//OrderLateReturn

export const useOrderExceed = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const onFetch = async () => {
    await dispatch(fetchLateReturnOrders(id))
  }
  return [onFetch]
}

export const useIsOrderExtendable = () => {
  const dispatch = useAppDispatch()
  const onFetch = async (orderId) => {
    await dispatch(fetchCheckOrderExtendable({ orderId }))
  }
  return [onFetch]
}

export const useAmendmentDate = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const onFetch = async () => {
    await dispatch(fetchDateAmendment(id))
  }
  return [onFetch]
}

export const usePaymentReference = () => {
  const dispatch = useAppDispatch()
  const { id, type } = useParams()

  let types
  switch (type) {
    case DATE_AMENDMENT_PAYMENT_PATH:
      types = PAYMENT_TYPE.DATE_AMENDMENT
      break
    case ORDER_PAYMENT_PATH:
      types = PAYMENT_TYPE.ORDER
      break
    default:
      break
  }

  const onFetch = async () => {
    await dispatch(fetchPaymentReference({ id, types }))
  }

  return [onFetch]
}

export const useCreateOrderExtend = () => {
  const dispatch = useAppDispatch()

  const history = useHistory()
  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onCreate = async ({ orderId, extendDate }) => {
    const resultAction = await dispatch(
      fetchCreateOrderExtend({
        orderId,
        extendDate
      })
    )
    if (fetchCreateOrderExtend.fulfilled.match(resultAction)) {
      onSuccessMsg('Extend order successfully')

      const { _id, paymentMethod } = resultAction.payload
      // redirect url
      const redirectUrl =
        paymentMethod === PAYMENT_METHOD.CREDIT_CARD
          ? `/${ORDER_PAYMENT_PATH}/payment-details/${_id}`
          : null

      if (redirectUrl) {
        history.push(redirectUrl)
      }
    } else {
      onErrorApi(resultAction)
    }
  }
  return [onCreate]
}

export const useCreateAmendmentRequest = () => {
  const dispatch = useAppDispatch()

  const history = useHistory()
  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onCreate = async (data, isPaidOrigin) => {
    const resultAction = await dispatch(fetchCreateAmendmentRequest(data))

    if (fetchCreateAmendmentRequest.fulfilled.match(resultAction)) {
      onSuccessMsg('Date Change Request Submitted')

      const { _id, additionFee, penaltyFeeAmendment } = resultAction.payload
      //redirect url
      // history.push(`/order/detail/${orderId}`)
      if (
        additionFee + penaltyFeeAmendment >= MIN_TOTAL_PRICE ||
        !isPaidOrigin
      ) {
        history.push(`/${DATE_AMENDMENT_PAYMENT_PATH}/payment-details/${_id}`)
      }
    } else {
      onErrorApi(resultAction)
    }
  }

  return [onCreate]
}

export const useUpdateDateAmendmentRequestStatus = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onUpdate = async ({ id, status, orderId }) => {
    const resultAction = await dispatch(
      fetchUpdateDateAmendmentRequestStatus({ id, status })
    )

    if (fetchUpdateDateAmendmentRequestStatus.fulfilled.match(resultAction)) {
      onSuccessMsg('Order status updated')

      //get order detail again
      dispatch(fetchOrderDetail(orderId))
    } else {
      onErrorApi(resultAction)
    }
  }

  return [onUpdate]
}

export const useIsEnableLoanExtension = () => {
  const dispatch = useAppDispatch()

  const onFetch = async () => {
    await dispatch(fetchCheckLoanExtension())
  }

  return [onFetch]
}

export const useBuyProduct = () => {
  const dispatch = useAppDispatch()

  const history = useHistory()

  const [onAddProps] = useAppPropsToUser()

  const [onResetPayment] = useResetPayment()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onBuy = async (data) => {
    const resultAction = await dispatch(fetchBuyProduct(data))

    if (fetchBuyProduct.fulfilled.match(resultAction)) {
      onResetPayment()

      const { _id, paymentMethod } = resultAction.payload

      if (data.isDelivery) {
        const userProps = {
          userAddress: {
            address: data.addressDelivery,
            city: data.cityDelivery,
            zipCode: data.zipCodeDelivery
          },
          isSaveDeliveryInfo: !!data.isSaveDeliveryInfo
        }
        onAddProps(userProps)
      }

      // redirect url
      let redirectUrl =
        paymentMethod === PAYMENT_METHOD.CREDIT_CARD
          ? `/${ORDER_PAYMENT_PATH}/payment-details/${_id}`
          : `/${ORDER_PAYMENT_PATH}/detail/${_id}`
      history.push(redirectUrl)
      // dispatch
      dispatch(resetOrder(null))
    } else {
      onErrorApi(resultAction)
    }
  }

  return [onBuy]
}

export const useCreateRequestProofAddress = () => {
  const dispatch = useAppDispatch()

  const history = useHistory()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onCreate = async (data) => {
    const resultAction = await dispatch(fetchCreateProofAddress(data))

    if (fetchCreateProofAddress.fulfilled.match(resultAction)) {
      onSuccessMsg('Create Proof Address Successfully')
    } else {
      onErrorApi(resultAction)
    }
  }

  return [onCreate]
}

export const useCheckEnableCreateProof = () => {
  const dispatch = useAppDispatch()

  const onCheck = async () => {
    await dispatch(fetchCheckEnableCreateProof())
  }

  return [onCheck]
}

/**
 * HOOK STATE
 */
export const useGetOrderExtend = () => {
  return useSelector((state) => state.order.extendOrders)
}

export const useGetOrderExceed = () => {
  return useSelector((state) => state.order.lateReturnOrders)
}

export const useGetOrder = () => {
  return useSelector((state) => state.order.order)
}

export const useGetLoadingOrder = () => {
  return useSelector((state) => state.order.isLoading)
}

export const useGetDuplicateOrder = () => {
  return useSelector((state) => state.order.duplicateOrder)
}

export const useGetIsOrderExtendable = () => {
  return useSelector((state) => state.order.isOrderExtendable)
}

export const useGetLoadingCheckOrderExtendable = () => {
  return useSelector((state) => state.order.isLoadingExtendable)
}

export const useGetAmendmentDate = () => {
  return useSelector((state) => state.order.amendmentRequest)
}

export const useGetAmendmentPaymentReferenceDate = () => {
  return useSelector((state) => state.order.paymentReference)
}

export const useGetEnableLoanExtension = () => {
  return useSelector((state) => state.order.isEnableLoanExtension)
}

export const useGetCreateProof = () => {
  return useSelector((state) => state.order.isEnableCreateProof)
}
