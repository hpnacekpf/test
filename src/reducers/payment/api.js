import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  chargeOrder,
  createPayment,
  deleteAllPayment,
  getPayment,
  getProductSameStore
} from './query'
import { graphqlBaseQuery } from 'api/base'

export const fetchCreatePayment = createAsyncThunk(
  'payment/fetchCreatePayment',
  async ({ data, orderId }) => {
    const response = await graphqlBaseQuery('', {
      body: createPayment(data, orderId)
    })

    return response.createPayment
  }
)

export const fetchPayment = createAsyncThunk(
  'payment/fetchPayment',
  async (id) => {
    const response = await graphqlBaseQuery('', {
      body: getPayment(id)
    })

    return response.paymentDetail
  }
)

export const fetchDeletePayment = createAsyncThunk(
  'payment/fetchDeletePayment',
  async (id) => {
    const response = await graphqlBaseQuery('', {
      body: deleteAllPayment(id)
    })

    return response.deleteManyPayments
  }
)

export const fetchChargeOrder = createAsyncThunk(
  'payment/fetchChargeOrder',
  async ({ id, isSave }) => {
    const response = await graphqlBaseQuery('', {
      body: chargeOrder(id, isSave)
    })

    return response.productCharge
  }
)

export const fetchProductSameStore = createAsyncThunk(
  'payment/fetchProductSameStore',
  async ({ userId, pageSize, pageIndex }) => {
    const response = await graphqlBaseQuery('', {
      body: getProductSameStore({
        pageIndex,
        pageSize,
        userId
      })
    })

    return response.productsFE
  }
)

const initialState = {
  id: null,
  paymentDetail: null,
  isPayment: false,
  deliveryInfo: null,
  loading: false,
  storeProducts: [],
  loadingProduct: false
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPayment: () => ({
      ...initialState
    })
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreatePayment.fulfilled, (state, action) => {
      state.id = action.payload.recordId
      state.loading = false
    }),
      builder.addCase(fetchPayment.fulfilled, (state, action) => {
        state.paymentDetail = action.payload
        state.id = action.payload?._id
        state.loading = false
      }),
      builder.addCase(fetchPayment.rejected, (state) => {
        state.paymentDetail = null
        state.id = null
      }),
      builder.addCase(fetchDeletePayment.fulfilled, (state) => {
        state.paymentDetail = null
        state.id = null
        state.loading = false
      }),
      builder.addCase(fetchChargeOrder.fulfilled, (state) => {
        state.loading = false
      }),
      builder.addCase(fetchProductSameStore.pending, (state) => {
        state.loadingProduct = true
      }),
      builder.addCase(fetchProductSameStore.fulfilled, (state, action) => {
        state.loadingProduct = false
        state.storeProducts = action.payload ?? []
      }),
      builder.addMatcher(
        (action) =>
          action.type.startsWith('payment') && action.type.endsWith('pending'),
        (state) => {
          state.loading = true
        }
      ),
      builder.addMatcher(
        (action) =>
          action.type.startsWith('payment') && action.type.endsWith('rejected'),
        (state, action) => {
          state.loading = false
          state.loadingProduct = false
          state.error = action.payload
            ? action.payload.errorMessage
            : action.error
        }
      )
  }
})

export const { resetPayment } = paymentSlice.actions

export default paymentSlice.reducer
