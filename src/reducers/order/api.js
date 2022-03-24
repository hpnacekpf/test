import { graphqlBaseQuery } from 'api/base'
import { ORDER_STATUS } from 'constants/enum'
import { initOrderPromo } from 'extensions/orders'
import { startsWith } from 'lodash'
import {
  buyProduct,
  checkOrderExtendable,
  checkPromoCode,
  createAmendmentRequest,
  createExtendOrder,
  createOrder,
  createReview,
  getDateAmendment,
  getDuplicateOrder,
  getExtendOrder,
  getLateReturnOrder,
  getOrder,
  getPaymentReference,
  updateAmendmentRequestStatus,
  updateOrder,
  checkEnableLoanExtension,
  createProofAddress,
  checkEnableCreateProof
} from './query'

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')

const initialState = {
  order: null,
  duplicateOrder: null,
  isVerifyingPromo: false,
  isLoading: false,
  isLoadingExtendOrders: false,
  isLoadingLateReturnOrders: false,
  isLoadingExtendable: false,
  isOrderExtendable: false,
  isEnableLoanExtension: false,
  extendOrders: null,
  lateReturnOrders: null,
  amendmentRequest: null,
  isEnableVerifyProof: false,
  paymentReference: null,
  isEnableCreateProof: false
}

export const fetchVerifyPromo = createAsyncThunk(
  'order/fetchVerifyPromo',
  async ({ code, productId }) => {
    const response = await graphqlBaseQuery('', {
      body: checkPromoCode(code, productId)
    })

    return response.checkPromoCode
  }
)

export const fetchCreateOrder = createAsyncThunk(
  'order/fetchCreateOrder',
  async (data) => {
    const response = await graphqlBaseQuery('', {
      body: createOrder(data)
    })

    return response.createOrderWeb
  }
)

export const fetchUpdateOrder = createAsyncThunk(
  'order/fetchUpdateOrder',
  async ({ id, status }) => {
    const response = await graphqlBaseQuery('', {
      body: updateOrder(id, status)
    })

    return response.updateOrderFE
  }
)

export const fetchOrderDetail = createAsyncThunk(
  'order/fetchOrderDetail',
  async (id) => {
    const response = await graphqlBaseQuery('', {
      body: getOrder(id)
    })

    return response.orderDetail
  }
)

export const fetchDuplicateOrder = createAsyncThunk(
  'order/fetchDuplicateOrder',
  async (id) => {
    const response = await graphqlBaseQuery('', {
      body: getDuplicateOrder(id)
    })

    return response.checkDuplicateOrder
  }
)

export const fetchReview = createAsyncThunk(
  'order/fetchReview',
  async (data) => {
    const response = await graphqlBaseQuery('', {
      body: createReview(data)
    })

    return response.createReviewUser
  }
)

export const fetchExtendOrders = createAsyncThunk(
  'order/fetchExtendOrders',
  async (id) => {
    const response = await graphqlBaseQuery('', {
      body: getExtendOrder(id)
    })
    return response.orderExtend
  }
)

export const fetchLateReturnOrders = createAsyncThunk(
  'order/fetchLateReturnOrders',
  async (id) => {
    const response = await graphqlBaseQuery('', {
      body: getLateReturnOrder(id)
    })

    return response.orderLateReturn
  }
)

export const fetchCreateOrderExtend = createAsyncThunk(
  'order/fetchCreateOrderExtend',
  async ({ orderId, extendDate }) => {
    const response = await graphqlBaseQuery('', {
      body: createExtendOrder({ orderId, extendDate })
    })

    return response.extendOrderWeb
  }
)

export const fetchCheckOrderExtendable = createAsyncThunk(
  'order/fetchCheckOrderExtendable',
  async ({ orderId, extendDate }) => {
    const response = await graphqlBaseQuery('', {
      body: checkOrderExtendable(orderId, extendDate)
    })

    return response.isOrderExtendable
  }
)

export const fetchCreateAmendmentRequest = createAsyncThunk(
  'order/fetchCreateAmendmentRequest',
  async (data) => {
    const response = await graphqlBaseQuery('', {
      body: createAmendmentRequest(data)
    })

    return response.createDateAmendmentRequest
  }
)

export const fetchBuyProduct = createAsyncThunk(
  'order/fetchBuyProduct',
  async (data) => {
    const response = await graphqlBaseQuery('', {
      body: buyProduct(data)
    })

    return response.buyProduct
  }
)

export const fetchDateAmendment = createAsyncThunk(
  'order/fetchDateAmendment',
  async (id) => {
    const response = await graphqlBaseQuery('', {
      body: getDateAmendment(id)
    })

    return response.getDateAmendmentRequest
  }
)

export const fetchPaymentReference = createAsyncThunk(
  'order/fetchPaymentReference',
  async ({ id, types }) => {
    const response = await graphqlBaseQuery('', {
      body: getPaymentReference({ id, types })
    })

    return response.paymentReference
  }
)

export const fetchUpdateDateAmendmentRequestStatus = createAsyncThunk(
  'order/fetchUpdateDateAmendmentRequestStatus',
  async (data) => {
    const response = await graphqlBaseQuery('', {
      body: updateAmendmentRequestStatus(data)
    })

    return response.updateDateAmendmentRequestStatus
  }
)

export const fetchCheckLoanExtension = createAsyncThunk(
  'order/fetchCheckEnableLoanExtension',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: checkEnableLoanExtension()
    })

    return response.isEnableLoanExtension
  }
)

export const fetchCreateProofAddress = createAsyncThunk(
  'order/fetchCreateProofAddress',
  async ({ fileUrl, address }) => {
    const response = await graphqlBaseQuery('', {
      body: createProofAddress({ fileUrl, address })
    })

    return response.createProofAddress
  }
)

export const fetchCheckEnableCreateProof = createAsyncThunk(
  'order/fetchCheckEnableCreateProof',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: checkEnableCreateProof()
    })

    return response.isEnableCreateProofAddress
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetState: () => ({
      ...initialState
    }),
    resetOrder: (state, action) => {
      state.order = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVerifyPromo.pending, (state) => {
      state.isVerifyingPromo = true
    }),
      builder.addCase(fetchVerifyPromo.fulfilled, (state, action) => {
        let order = state.order
        if (!order) {
          order = {}
        }
        order.promo = initOrderPromo(action.payload)

        state.order = order
        state.isVerifyingPromo = false
      }),
      builder.addCase(fetchVerifyPromo.rejected, (state, action) => {
        let order = state.order
        if (!order) {
          order = {}
        }
        order.promo = null
        state.order = order
        state.isVerifyingPromo = false
        state.error = action.payload
          ? action.payload.errorMessage
          : action.error
      }),
      builder.addCase(fetchOrderDetail.pending, (state) => {
        state.isLoading = true
      }),
      builder.addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.order = action.payload
        state.isLoading = false
      }),
      builder.addCase(fetchOrderDetail.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
          ? action.payload.errorMessage
          : action.error
      }),
      builder.addCase(fetchDuplicateOrder.fulfilled, (state, action) => {
        state.duplicateOrder = action.payload
      }),
      builder.addCase(fetchUpdateOrder.fulfilled, (state, action) => {
        state.order = action.payload
        if (action.payload) {
          const { status } = action.payload
          if (status === ORDER_STATUS.RECEIVED) {
            state.amendmentRequest = null
          }
        }
      }),
      builder.addCase(fetchReview.fulfilled, (state, action) => {
        let order = state.order
        if (!order) {
          order = {}
        }
        order = {
          ...order,
          ...action.payload
        }
        state.order = order
      }),
      builder.addCase(fetchReview.rejected, (state, action) => {
        state.error = action.payload
          ? action.payload.errorMessage
          : action.error
      }),
      builder.addCase(fetchExtendOrders.pending, (state) => {
        state.isLoadingExtendOrders = true
      }),
      builder.addCase(fetchExtendOrders.fulfilled, (state, action) => {
        state.isLoadingExtendOrders = false
        state.extendOrders = action.payload
      }),
      builder.addCase(fetchExtendOrders.rejected, (state) => {
        state.isLoadingExtendOrders = false
        state.extendOrders = null
      }),
      builder.addCase(fetchLateReturnOrders.pending, (state) => {
        state.isLoadingLateReturnOrders = true
      }),
      builder.addCase(fetchLateReturnOrders.fulfilled, (state, action) => {
        state.isLoadingLateReturnOrders = false
        state.lateReturnOrders = action.payload
      }),
      builder.addCase(fetchLateReturnOrders.rejected, (state) => {
        state.isLoadingLateReturnOrders = false
        state.lateReturnOrders = null
      }),
      builder.addCase(fetchCheckOrderExtendable.pending, (state) => {
        state.isLoadingExtendable = true
      }),
      builder.addCase(fetchCheckOrderExtendable.fulfilled, (state, action) => {
        state.isLoadingExtendable = false
        state.isOrderExtendable = !!action.payload
      }),
      builder.addCase(fetchCheckOrderExtendable.rejected, (state) => {
        state.isLoadingExtendable = false
        state.isOrderExtendable = false
      }),
      builder.addCase(fetchCheckLoanExtension.fulfilled, (state, action) => {
        state.isEnableLoanExtension = !!action.payload
      })
    builder.addCase(fetchCheckLoanExtension.rejected, (state) => {
      state.isEnableLoanExtension = false
    })
    builder.addCase(fetchCreateAmendmentRequest.fulfilled, (state, action) => {
      state.amendmentRequest = action.payload
      state.isLoading = false
    }),
      builder.addCase(fetchCreateProofAddress.pending, (state, action) => {
        state.isLoading = true
      }),
      builder.addCase(fetchCreateProofAddress.fulfilled, (state, action) => {
        state.isEnableVerifyProof = !!action.payload
        state.isEnableCreateProof = false
        state.isLoading = false
      }),
      builder.addCase(fetchCreateProofAddress.rejected, (state, action) => {
        state.isEnableVerifyProof = false
        state.isLoading = false

        state.error = action.payload
          ? action.payload.errorMessage
          : action.error
      }),
      builder.addCase(
        fetchUpdateDateAmendmentRequestStatus.fulfilled,
        (state, action) => {
          state.amendmentRequest = null
          state.isLoading = false
        }
      ),
      builder.addCase(fetchDateAmendment.fulfilled, (state, action) => {
        state.amendmentRequest = action.payload
        state.isLoading = false
      }),
      builder.addCase(fetchPaymentReference.fulfilled, (state, action) => {
        state.paymentReference = action.payload
        state.isLoading = false
      }),
      builder.addCase(
        fetchCheckEnableCreateProof.fulfilled,
        (state, action) => {
          state.isEnableCreateProof = !!action.payload
        }
      ),
      builder.addMatcher(
        (action) =>
          [
            fetchCreateOrder.fulfilled.type,
            fetchUpdateOrder.fulfilled.type,
            fetchCreateOrderExtend.fulfilled.type,
            fetchBuyProduct.fulfilled.type
          ].indexOf(action.type) >= 0,
        (state) => {
          state.isLoading = false
        }
      ),
      builder.addMatcher(
        (action) =>
          [
            fetchCreateOrder.pending.type,
            fetchUpdateOrder.pending.type,
            fetchCreateOrderExtend.pending.type,
            fetchBuyProduct.pending.type,
            fetchCreateAmendmentRequest.pending.type,
            fetchUpdateDateAmendmentRequestStatus.pending.type,
            fetchDateAmendment.pending.type,
            fetchPaymentReference.pending.type
          ].indexOf(action.type) >= 0,
        (state) => {
          state.isLoading = true
        }
      ),
      builder.addMatcher(
        (action) =>
          [
            fetchCreateOrder.rejected.type,
            fetchUpdateOrder.rejected.type,
            fetchCreateOrderExtend.rejected.type,
            fetchBuyProduct.rejected.type,
            fetchCreateAmendmentRequest.rejected.type,
            fetchUpdateDateAmendmentRequestStatus.rejected.type,
            fetchDateAmendment.rejected.type,
            fetchPaymentReference.rejected.type,
            fetchCheckEnableCreateProof.rejected.type
          ].indexOf(action.type) >= 0,
        (state, action) => {
          state.isLoading = false
          state.error = action.payload
            ? action.payload.errorMessage
            : action.error
        }
      )
  }
})

export const { resetOrder, resetState, resetDateAmendment } = orderSlice.actions

export default orderSlice.reducer
