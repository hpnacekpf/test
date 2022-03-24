import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import { addBlockUserQuery, getBlockUserQuery, unBlockUserQuery } from './query'

const initialState = {
  blockUsers: [],
  isLoading: false
}

export const fetchAllBlockUser = createAsyncThunk(
  'blockUser/fetchAllBlockUser',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: getBlockUserQuery()
    })

    return response.getAllBlockUsers
  }
)

export const fetchBlockUser = createAsyncThunk(
  'blockUser/fetchBlockUser',
  async (id) => {
    const response = await graphqlBaseQuery('', {
      body: addBlockUserQuery(id)
    })

    return response.blockUser
  }
)

export const fetchUnBlockUser = createAsyncThunk(
  'blockUser/fetchUnBlockUser',
  async (id) => {
    const response = await graphqlBaseQuery('', {
      body: unBlockUserQuery(id)
    })

    return response.unBlockUser
  }
)

export const blockUserSlice = createSlice({
  name: 'blockUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllBlockUser.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(fetchAllBlockUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.blockUsers = action.payload
    })

    builder.addCase(fetchAllBlockUser.rejected, (state, action) => {
      state.isLoading = false
    })

    builder.addCase(fetchBlockUser.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(fetchBlockUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.blockUsers = action.payload
    })

    builder.addCase(fetchBlockUser.rejected, (state, action) => {
      state.isLoading = false
      console.log('err...........', action.payload)
    })

    builder.addCase(fetchUnBlockUser.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(fetchUnBlockUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.blockUsers = action.payload
    })

    builder.addCase(fetchUnBlockUser.rejected, (state, action) => {
      state.isLoading = false
      console.log('err...........', action.payload)
    })
  }
})

export default blockUserSlice.reducer
