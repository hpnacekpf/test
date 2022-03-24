import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import {
  createProductQuery,
  getCalendarQuery,
  getMembershipQuery,
  getProductQuery,
  getUserCategory,
  updateCalendarQuery,
  updateProductQuery
} from './query'

const initialState = {
  membershipPlan: null,
  sellStatus: null,
  productCount: 0,
  calendar: null,
  product: null,
  productCategory: [],
  isLoadingMembership: false,
  isLoadingCalendar: false,
  isCreatedProduct: false,
  isUpdatedProduct: false,
  isLoadingUserCategory: false,
  loading: false,
  error: null
}

// get user membership
export const fetchMembershipUser = createAsyncThunk(
  'product/membership',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: getMembershipQuery()
    })

    return response.getMembershipUser
  }
)

//create product
export const fetchCreateProduct = createAsyncThunk(
  'product/create',
  async (data) => {
    const response = await graphqlBaseQuery('', {
      body: createProductQuery(data)
    })

    return response.createUserProductWeb
  }
)

//update product
export const fetchUpdateProduct = createAsyncThunk(
  'product/update',
  async ({ data, productId }) => {
    const response = await graphqlBaseQuery('', {
      body: updateProductQuery({ data, productId })
    })

    return response.updateUserProductWeb
  }
)

//get product
export const fetchProduct = createAsyncThunk(
  'product/get',
  async (productId) => {
    const response = await graphqlBaseQuery('', {
      body: getProductQuery(productId)
    })

    return response.product
  }
)

//get calendar product
export const fetchCalendar = createAsyncThunk(
  'product/calendar',
  async (productId) => {
    const response = await graphqlBaseQuery('', {
      body: getCalendarQuery(productId)
    })

    return response.productCalendar
  }
)

//update calendar product
export const fetchUpdateCalendar = createAsyncThunk(
  'product/updateCalendar',
  async ({ data, productId }) => {
    const response = await graphqlBaseQuery('', {
      body: updateCalendarQuery({ data, productId })
    })

    return response.updateProductCalendar
  }
)

// get user product category
export const fetchUserCategory = createAsyncThunk(
  'product/getUserCategory',
  async (userId) => {
    const response = await graphqlBaseQuery('', {
      body: getUserCategory(userId)
    })

    return response.productUserCategory
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    //membership plan
    builder.addCase(fetchMembershipUser.pending, (state) => {
      state.isLoadingMembership = true
    }),
      builder.addCase(fetchMembershipUser.fulfilled, (state, action) => {
        const membershipPlan = action.payload.membershipPlan ?? null
        state.membershipPlan = membershipPlan
        state.sellStatus = action.payload.sellStatus
        state.productCount = action.payload.productCount
        state.isLoadingMembership = false
        state.error = null
      }),
      builder.addCase(fetchMembershipUser.rejected, (state, action) => {
        state.isLoadingMembership = false
        state.error = action.payload
          ? action.payload.errorMessage
          : action.error.message
      }),
      // get product
      builder.addCase(fetchProduct.pending, (state) => {
        state.loading = true
      }),
      builder.addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload
        state.loading = false
      }),
      builder.addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false
      }),
      //  create product
      builder.addCase(fetchCreateProduct.fulfilled, (state, action) => {
        state.loading = false
        state.isCreatedProduct = true
      }),
      //update product
      builder.addCase(fetchUpdateProduct.pending, (state) => {
        state.loading = true
      }),
      builder.addCase(fetchUpdateProduct.fulfilled, (state, action) => {
        state.loading = false
        state.isUpdatedProduct = true
      }),
      builder.addCase(fetchUpdateProduct.rejected, (state, action) => {
        state.loading = false
        state.isUpdatedProduct = false
      }),
      //get product user category
      builder.addCase(fetchUserCategory.pending, (state) => {
        state.isLoadingUserCategory = true
      }),
      builder.addCase(fetchUserCategory.fulfilled, (state, action) => {
        state.isLoadingUserCategory = false
        state.productCategory = action.payload
      }),
      builder.addCase(fetchUserCategory.rejected, (state) => {
        state.isLoadingUserCategory = false
        state.productCategory = []
      })
    //calendar
    builder.addCase(fetchCalendar.pending, (state) => {
      state.isLoadingCalendar = true
    }),
      builder.addCase(fetchCalendar.fulfilled, (state, action) => {
        state.isLoadingCalendar = false
        state.calendar = action.payload
        state.error = null
      }),
      builder.addCase(fetchCalendar.rejected, (state, action) => {
        state.isLoadingCalendar = false
        state.error = action.payload
          ? action.payload.errorMessage
          : action.error.message
      })
  }
})

export default productSlice.reducer
