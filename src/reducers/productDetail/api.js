import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import isEqual from 'lodash/isEqual'
import {
  checkSingpassAddress,
  getProductDetail,
  getProductDisabledDateQuery,
  getProductSameCategory,
  getProductSameStore
} from './query'

const initialState = {
  product: null,
  productSameStore: [],
  productSameCategory: [],
  loading: false,
  loadingSameCategory: false,
  loadingSameStore: false,
  isRegisterSingpassAddress: false,
  isLoadingSingpassAddress: false,
  productDisabledDate: [],
  loadingProductDisabledDate: false
}

export const fetchProduct = createAsyncThunk(
  'productDetail/loadDetail',
  async ({ id, updateView, isServer }) => {
    const response = await graphqlBaseQuery('', {
      body: getProductDetail({
        id,
        updateViewCount: updateView,
        isServer
      })
    })

    return response.product
  }
  // {
  //   condition: (_, { getState }) => {
  //     const { loading } = getState().productDetail
  //     if (loading) {
  //       // Already fetched or in progress, don't need to re-fetch
  //       return false
  //     }
  //   }
  // }
)

export const fetchSameStore = createAsyncThunk(
  'productDetail/getSameStore',
  async ({ id, pageSize, sort, excludeId }) => {
    const response = await graphqlBaseQuery('', {
      body: getProductSameStore({
        id,
        pageSize,
        sort,
        excludeId
      })
    })

    return response.productsFE
  }
)

export const fetchSameCategory = createAsyncThunk(
  'productDetail/getSameCategory',
  async ({ categorySlug, pageSize, sort, excludeId }) => {
    const response = await graphqlBaseQuery('', {
      body: getProductSameCategory({
        categorySlug,
        excludeId,
        pageSize,
        sort
      })
    })

    return response.searchReferences?.items ?? []
  }
)

export const fetchCheckSingpassAddress = createAsyncThunk(
  'productDetail/fetchCheckSingpassAddress',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: checkSingpassAddress()
    })

    return response.isRegisterSingpassAddress
  }
)

export const fetchProductDisabledDate = createAsyncThunk(
  'productDetail/fetchProductDisabledDate',
  async ({ productId, orderId }) => {
    const response = await graphqlBaseQuery('', {
      body: getProductDisabledDateQuery(productId, orderId)
    })

    return response.productDisabledDate
  }
)

const productSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    resetLoading: (state, action) => {
      state.loading = !!action.payload
    }
  },
  extraReducers: (builder) => {
    // product detail
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true
      state.product = null
    }),
      builder.addCase(fetchProduct.fulfilled, (state, action) => {
        const { product } = current(state)
        if (!isEqual(action.payload, product)) {
          state.product = action.payload
        }
        state.loading = false
      }),
      builder.addCase(fetchProduct.rejected, (state, action) => {
        state.product = null
        state.loading = false
        state.error = action.payload
          ? action.payload.errorMessage
          : action.error.message
      }),
      // product disabled date
      builder.addCase(fetchProductDisabledDate.pending, (state) => {
        state.loadingProductDisabledDate = true
        state.productDisabledDate = []
      }),
      builder.addCase(fetchProductDisabledDate.fulfilled, (state, action) => {
        state.productDisabledDate = action.payload
        state.loadingProductDisabledDate = false
      }),
      builder.addCase(fetchProductDisabledDate.rejected, (state, action) => {
        state.productDisabledDate = []
        state.loadingProductDisabledDate = false
        state.error = action.payload
          ? action.payload.errorMessage
          : action.error.message
      }),
      // same store
      builder.addCase(fetchSameStore.pending, (state, action) => {
        state.productSameStore = []
      }),
      builder.addCase(fetchSameStore.fulfilled, (state, action) => {
        state.productSameStore = action.payload
      }),
      builder.addCase(fetchSameStore.rejected, (state, action) => {
        state.productSameStore = []
        state.error = action.payload
          ? action.payload.errorMessage
          : action.error.message
      })
    // same category
    builder.addCase(fetchSameCategory.pending, (state) => {
      state.loadingSameCategory = true
      state.productSameCategory = []
    }),
      builder.addCase(fetchSameCategory.fulfilled, (state, action) => {
        state.productSameCategory = action.payload
        state.loadingSameCategory = false
      }),
      builder.addCase(fetchSameCategory.rejected, (state) => {
        state.loadingSameCategory = false
        state.productSameCategory = []
      })

    builder.addCase(fetchCheckSingpassAddress.pending, (state) => {
      state.isLoadingSingpassAddress = true
    })
    builder.addCase(fetchCheckSingpassAddress.fulfilled, (state, action) => {
      state.isLoadingSingpassAddress = false
      state.isRegisterSingpassAddress = !!action.payload
    })
    builder.addCase(fetchCheckSingpassAddress.rejected, (state) => {
      state.isLoadingSingpassAddress = false
      state.isRegisterSingpassAddress = false
    })
  }
})

export const { resetLoading } = productSlice.actions

export default productSlice.reducer
