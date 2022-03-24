import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import { createBusinessInfo } from './query'

const initialState = {
  loading: false,
  error: null,
  isCreatedBusinessInfo: null
}

//create business info
export const fetchCreateBusinessInfo = createAsyncThunk(
  'business/createInfo',
  async (data) => {
    const response = await graphqlBaseQuery('', {
      body: createBusinessInfo(data)
    })

    return response.submitBusinessInfo
  }
)

const productSlice = createSlice({
  name: 'business',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCreateBusinessInfo.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchCreateBusinessInfo.fulfilled, (state, action) => {
      state.loading = false
      state.isCreatedBusinessInfo = !!action.payload
    })
    builder.addCase(fetchCreateBusinessInfo.rejected, (state) => {
      state.loading = false
      state.isCreatedBusinessInfo = false
    })
  }
})

export default productSlice.reducer
