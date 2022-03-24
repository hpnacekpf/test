import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import { getSearchQuery } from './query'

const initialState = {
  items: [],
  total: null,
  isLoading: false
}

export const fetchSearch = createAsyncThunk(
  'search/fetchSearch',
  async (search) => {
    const response = await graphqlBaseQuery('', {
      body: getSearchQuery(search)
    })
    return response.searchReferences
  }
)

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      console.log('action....', action)
      state.isLoading = false
      state.items = action.payload?.items ?? []
      state.total = action.payload?.total ?? 0
    })
    builder.addCase(fetchSearch.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export default searchSlice.reducer
