import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import {
  changePassword,
  getListedItems,
  getListReview,
  updateProfile,
  getRentalSettings,
  getUpdateRentalSettings,
  getRemoveProductList,
  getProfile,
  deleteProduct,
  getTotalCategoryFilter,
  getUserWishlist
} from './query'

const initialState = {
  loading: false,
  error: null,
  userProducts: [],
  totalUserProducts: 0,
  loadingUserProduct: false,
  userRentalSetting: [],
  loadingProfile: false,
  loadingUserRentalSetting: false,
  updateRental: [],
  updateProfile: [],
  removeProduct: [],
  removeProductCount: 0,
  loadingRemoveProduct: false,
  userReviews: [],
  loadingUserReview: false,
  loadingUpdateProfile: false,
  loadingChangePassword: false,
  userReviewsConnection: [],
  categoryCountList: [],
  loadingCategoryCount: false,
  wishlist: null,
  isLoading: false
}

// Thunks

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (id) => {
    const response = await graphqlBaseQuery('', {
      body: getProfile(id)
    })
    return response.userProfile?.user ?? null
  }
)

export const fetchChangePassword = createAsyncThunk(
  'profile/change-password',
  async ({ oldPass, newPass }) => {
    const response = await graphqlBaseQuery('', {
      body: changePassword(oldPass, newPass)
    })
    return response.changePasswordUser
  }
)

// updateProfile
export const fetchUpdateProfile = createAsyncThunk(
  'profile/update-profile',
  async (data) => {
    const response = await graphqlBaseQuery('', {
      body: updateProfile(data)
    })
    return response.updateProfile
  }
)

// listItems

export const fetchUserProducts = createAsyncThunk(
  'profile/fetchUserProducts',
  async ({ search, defaultPageSize, id }) => {
    const response = await graphqlBaseQuery('', {
      body: getListedItems({
        search,
        defaultPageSize,
        id
      })
    })
    return response
  }
)

// review

export const fetchListReview = createAsyncThunk(
  'profile/fetchListReview',
  async ({ id, isLendor, reviewPageSize, pageIndex }) => {
    const response = await graphqlBaseQuery('', {
      body: getListReview({
        id,
        isLendor,
        reviewPageSize,
        pageIndex
      })
    })
    return response
  }
)
// load rental setting
export const fetchRentalSetting = createAsyncThunk(
  'profile/rental-setting',
  async (id) => {
    const response = await graphqlBaseQuery('', {
      body: getRentalSettings(id)
    })
    return response.userProfile
  }
)

// update rental setting
export const fetchUpdateRentalSetting = createAsyncThunk(
  'profile/update-rental-setting',
  async (data) => {
    const response = await graphqlBaseQuery('', {
      body: getUpdateRentalSettings(data)
    })
    return response.userProfile
  }
)

// load remove product list
export const fetchRemoveProductList = createAsyncThunk(
  'profile/remove-product-list',
  async ({ userId, skip, pageSize }) => {
    const response = await graphqlBaseQuery('', {
      body: getRemoveProductList({
        userId,
        skip,
        pageSize
      })
    })
    return response
  }
)

export const fetchDeleteProduct = createAsyncThunk(
  'profile/fetchDeleteProduct',
  async (id) => {
    const response = await graphqlBaseQuery('', {
      body: deleteProduct(id)
    })
    return response.deleteUserProduct
  }
)

export const fetchCategoryCountFilter = createAsyncThunk(
  'profile/fetchCategoryCountFilter',
  async (id) => {
    const response = await graphqlBaseQuery('', {
      body: getTotalCategoryFilter(id)
    })

    return response.userCategoryFilter
  }
)

export const fetchUserWishlist = createAsyncThunk(
  'profile/wishlist',
  async (products) => {
    const response = await graphqlBaseQuery('', {
      body: getUserWishlist(products)
    })

    return response.getUserWishList
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearUserReview: (state) => {
      state.userReviews = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload
      state.loadingProfile = false
    }),
      builder.addCase(fetchProfile.pending, (state) => {
        state.loadingProfile = true
      }),
      builder.addCase(fetchProfile.rejected, (state) => {
        state.profile = null
        state.loadingProfile = false
      }),
      builder.addCase(fetchChangePassword.fulfilled, (state, action) => {
        state.loadingChangePassword = false
      })

    builder.addCase(fetchUpdateProfile.fulfilled, (state, action) => {
      state.loadingUpdateProfile = false
      state.updateProfile = action.payload
    })
    // likeItems

    // listItems
    builder.addCase(fetchUserProducts.pending, (state, action) => {
      state.loadingUserProduct = true
    })
    builder.addCase(fetchUserProducts.fulfilled, (state, action) => {
      const { productsFE, productsCount } = action.payload
      state.userProducts = productsFE
      state.totalUserProducts = productsCount ?? 0
      state.loadingUserProduct = false
    })
    builder.addCase(fetchUserProducts.rejected, (state, action) => {
      state.loadingUserProduct = false
      state.error = action.payload ? action.payload.errorMessage : action.error
    })

    // listReview

    builder.addCase(fetchListReview.pending, (state, action) => {
      state.loadingUserReview = true
    })
    builder.addCase(fetchListReview.fulfilled, (state, action) => {
      const { userReviews, userReviewsConnection } = action.payload
      let currentUserReviews = state.userReviews
      currentUserReviews.push(...userReviews)
      let cleanArr = []

      // clean array
      currentUserReviews.map((value) => {
        const review = cleanArr.find((vl) => vl._id === value._id)

        if (!review) {
          cleanArr.push(value)
        }
      })
      state.userReviews = cleanArr
      state.userReviewsConnection = userReviewsConnection
      state.loadingUserReview = false
    })
    builder.addCase(fetchListReview.rejected, (state, action) => {
      state.loadingUserReview = false
    })
    // rental setting
    builder.addCase(fetchRentalSetting.pending, (state, action) => {
      state.loadingUserRentalSetting = true
    })
    builder.addCase(fetchRentalSetting.fulfilled, (state, action) => {
      state.updateRental = action.payload
      state.userRentalSetting = action.payload
      state.loadingUserRentalSetting = false
    })
    builder.addCase(fetchRentalSetting.rejected, (state, action) => {
      state.loadingUserRentalSetting = false
      state.error = action.payload ? action.payload.errorMessage : action.error
    })

    // remove product list
    builder.addCase(fetchRemoveProductList.pending, (state, action) => {
      state.loadingRemoveProduct = true
    })
    builder.addCase(fetchRemoveProductList.fulfilled, (state, action) => {
      state.removeProduct = action.payload.productsFE
      state.removeProductCount = action.payload.productsCount
      state.loadingRemoveProduct = false
    })
    builder.addCase(fetchRemoveProductList.rejected, (state, action) => {
      state.loadingRemoveProduct = false
      state.error = action.payload ? action.payload.errorMessage : action.error
    })
    //category list count
    builder.addCase(fetchCategoryCountFilter.pending, (state) => {
      state.loadingCategoryCount = true
    })
    builder.addCase(fetchCategoryCountFilter.fulfilled, (state, action) => {
      state.categoryCountList = action.payload
      state.loadingCategoryCount = false
    })
    builder.addCase(fetchCategoryCountFilter.rejected, (state, action) => {
      state.loadingCategoryCount = false
      state.error = action.payload ? action.payload.errorMessage : action.error
    })
    builder.addCase(fetchUserWishlist.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUserWishlist.fulfilled, (state, action) => {
      state.isLoading = false
      state.wishlist = action.payload
    })
    builder.addCase(fetchUserWishlist.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export const { clearUserReview } = profileSlice.actions

export default profileSlice.reducer
