import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import { loadTransactionQuery } from './query'
import { fetchUpdateOrder } from 'reducers/order/api'

const initialState = {
  isLoadingTransaction: false,
  data: {},
  isReload: false,
  dataAffiliate: {},
  isLoadingAffiliate: false
}

export const fetchDataTransaction = createAsyncThunk(
  'transaction/fetchData',
  async ({ values, affiliateCode }) => {
    const response = await graphqlBaseQuery('', {
      body: loadTransactionQuery({ values, affiliateCode })
    })

    return response
  }
)

//transaction affiliateCode
export const fetchDataAffiliateCode = createAsyncThunk(
  'transaction/fetchAffiliateCode',
  async ({ values, affiliateCode }) => {
    const response = await graphqlBaseQuery('', {
      body: loadAffiliateCodeQuery({ values, affiliateCode })
    })

    return response
  }
)

const transactionSlide = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataTransaction.pending, (state) => {
      state.isLoadingTransaction = true
    }),
      builder.addCase(fetchDataTransaction.fulfilled, (state, action) => {
        state.isLoadingTransaction = false
        state.data = action.payload
        state.isReload = false
      }),
      builder.addCase(fetchDataTransaction.rejected, (state) => {
        state.isLoadingTransaction = false
        state.data = {}
      }),
      builder.addCase(fetchUpdateOrder.fulfilled, (state) => {
        state.isReload = true
      }),
      //transaction affiliateCode
      builder.addCase(fetchDataAffiliateCode.pending, (state) => {
        state.isLoadingAffiliate = true
      }),
      builder.addCase(fetchDataAffiliateCode.fulfilled, (state, action) => {
        state.isLoadingAffiliate = false
        state.dataAffiliate = action.payload
      }),
      builder.addCase(fetchDataAffiliateCode.rejected, (state) => {
        state.isLoadingAffiliate = false
        state.dataAffiliate = {}
      })
  }
})

export default transactionSlide.reducer
