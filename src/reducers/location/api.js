import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import { searchGGLocation } from './query'

const initialState = {
  ggLocation: [],
  error: null
}

export const fetchSearchGGLocation = createAsyncThunk(
  'location/searchGGLocation',
  async (keyword) => {
    const response = await graphqlBaseQuery('', {
      body: searchGGLocation(keyword)
    })

    return response.searchLocationGoogleMap
  }
)

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchGGLocation.fulfilled, (state, action) => {
      state.ggLocation = action.payload
      state.error = null
    })
    builder.addCase(fetchSearchGGLocation.rejected, (state, action) => {
      state.error = action.payload
        ? action.payload.errorMessage
        : action.error.message
    })
  }
})

export const {} = locationSlice.actions

export default locationSlice.reducer
