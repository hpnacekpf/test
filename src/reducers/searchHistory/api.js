import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from '../../api/base'
import {
  createSearchHistoryQuery,
  deleteSearchHistoryQuery,
  getSearchHistoryQuery
} from './query'

const initialState = {
  userSearchHistory: [],
  loading: false
}

export const getSearchHistory = createAsyncThunk(
  'searchHistory/loadSearchHistory',
  async() => {
    const { searchHistories } = await graphqlBaseQuery('', {
      body: getSearchHistoryQuery()
    })

    return searchHistories
  },
  {
    condition: (_, { getState }) => {
      const { loading } = getState().searchHistory
      if (loading) {
        // Already fetched or in progress, don't need to re-fetch
        return false
      }
    }
  }
)

export const createSearchHistory = createAsyncThunk(
  'searchHistory/createSearchHistory',
  async(keyword) => {
    const { createSearchHistory } = await graphqlBaseQuery('', {
      body: createSearchHistoryQuery(keyword)
    })
    return createSearchHistory
  }
)

export const deleteSearchHistory = createAsyncThunk(
  'searchHistory/deleteSearchHistory',
  async(id) => {
    const { deleteSearchHistory } = await graphqlBaseQuery('', {
      body: deleteSearchHistoryQuery(id)
    })
    return deleteSearchHistory
  }
)

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearchHistory.fulfilled, (state, action) => {
      state.userSearchHistory = action.payload
      state.loading = false
    }),
      builder.addCase(createSearchHistory.fulfilled, (state, action) => {
        let searchHistory = state.userSearchHistory
        if (searchHistory?.length === 0) {
          searchHistory = []
        }
        if (
          !searchHistory.find((item) => item.keyword === action.payload.keyword)
        ) {
          searchHistory.unshift(action.payload)
        }
        state.userSearchHistory = searchHistory
        state.loading = false
      }),
      builder.addCase(deleteSearchHistory.fulfilled, (state, action) => {
        let searchHistory = state.userSearchHistory
        if (searchHistory?.length === 0) {
          searchHistory = []
        }

        const index = searchHistory.findIndex(
          (item) => item.keyword === action.payload.record?.keyword
        )

        if (index >= 0) {
          searchHistory.splice(index, 1)
        }

        state.userSearchHistory = searchHistory
        state.loading = false
      }),
      builder.addMatcher(
        (action) =>
          action.type.startsWith('searchHistory') &&
          action.type.endsWith('pending'),
        (state) => {
          state.loading = true
        }
      )
    builder.addMatcher(
      (action) =>
        action.type.startsWith('searchHistory') &&
        action.type.endsWith('rejected'),
      (state) => {
        state.loading = true
      }
    )
  }
})

export default searchHistorySlice.reducer
