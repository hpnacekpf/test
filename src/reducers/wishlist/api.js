import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import {
  createWishlistQuery,
  deleteWishlistQuery,
  getWishListQuery
} from './query'

const initialState = {
  wishlist: [],
  isLoading: false,
  total: 0,
  error: null
}

// fetch wishlist
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: getWishListQuery()
    })
    return response
  }
)

export const fetchAddToWishlist = createAsyncThunk(
  'wishlist/fetchAddToWishlist',
  async (id) => {
    const { createUserWishlist } = await graphqlBaseQuery('', {
      body: createWishlistQuery(id)
    })
    return createUserWishlist
  }
)

export const fetchDeleteWishlist = createAsyncThunk(
  'wishlist/fetchDeleteWishlist',
  async (id) => {
    const { deleteUserWishlist } = await graphqlBaseQuery('', {
      body: deleteWishlistQuery(id)
    })
    return deleteUserWishlist
  }
)

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    resetWishlist: () => ({
      ...initialState
    })
  },
  extraReducers: (builder) => {
    // get wishlist
    builder.addCase(fetchWishlist.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.isLoading = false
      state.wishlist = action.payload.userWishLists
      state.total = action.payload.userWishListsConnection
    })
    builder.addCase(fetchWishlist.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })

    // add wishlist
    builder.addCase(fetchAddToWishlist.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchAddToWishlist.fulfilled, (state, action) => {
      state.isLoading = false
      let userWishlist = state.wishlist
      userWishlist.push(action.payload)
      state.wishlist = userWishlist
    })
    builder.addCase(fetchAddToWishlist.rejected, (state, action) => {
      state.isLoading = false
    })

    // delete wishlist
    builder.addCase(fetchDeleteWishlist.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchDeleteWishlist.fulfilled, (state, action) => {
      state.isLoading = false
      state.wishlist = state.wishlist.filter(
        (wishlist) => wishlist._id !== action.payload._id
      )
    })
    builder.addCase(fetchDeleteWishlist.rejected, (state, action) => {
      state.isLoading = false
    })

    builder.addMatcher(
      (action) =>
        action.type.endsWith('/pending') && action.type.startsWith('wishlist/'),
      (state) => {
        state.isLoading = true
      }
    )
    builder.addMatcher(
      (action) =>
        action.type.endsWith('/fulfilled') &&
        action.type.startsWith('wishlist/'),
      (state) => {
        state.isLoading = false
      }
    )
    builder.addMatcher(
      (action) =>
        action.type.endsWith('/rejected') &&
        action.type.startsWith('wishlist/'),
      (state, action) => {
        state.isLoading = false
        state.error = action.payload
          ? action.payload.errorMessage
          : action.error.message
      }
    )
  }
})

export const { resetWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
