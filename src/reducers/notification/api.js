import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import { NOTIFICATION_TIME_QUERY } from 'constants/number'
import dateTimeExtensions from 'extensions/datetime'
import { getNotification, markAsRead } from './query'

const initialState = {
  chat: 0,
  product: 0,
  order: 0,
  loading: false,
  lastTime: null
}

export const fetchNotification = createAsyncThunk(
  'notification/fetchNotification',
  async (_, { getState }) => {
    const { user } = getState().user
    if (user) {
      const response = await graphqlBaseQuery('', {
        body: getNotification()
      })

      return response.userNotification
    }

    return null
  },
  {
    condition: (_, { getState }) => {
      const { loading, lastTime } = getState().notification
      const diff = lastTime
        ? dateTimeExtensions.calculateDateDiff(
            new Date(),
            lastTime,
            'milliseconds'
          )
        : NOTIFICATION_TIME_QUERY
      if (loading || Math.abs(diff) < NOTIFICATION_TIME_QUERY) {
        // Already fetched or in progress, don't need to re-fetch
        return false
      }
    }
  }
)

export const fetchMarkAsRead = createAsyncThunk(
  'notification/fetchMarkAsRead',
  async ({ type, ref }) => {
    const response = await graphqlBaseQuery('', {
      body: markAsRead(type, ref)
    })

    return response.removeCounterByUser
  }
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetState: () => ({
      ...initialState
    })
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotification.pending, (state) => {
      state.loading = true
    }),
      builder.addCase(fetchNotification.fulfilled, (state, action) => {
        state.lastTime = new Date()
        if (action.payload) {
          const { countOrder, countProduct, countChat } = action.payload

          state.chat = countChat ?? 0
          state.product = countProduct ?? 0
          state.order = countOrder ?? 0
        }
        state.loading = false
      })
    builder.addCase(fetchNotification.rejected, (state) => {
      state.loading = false
    })
  }
})

export const { resetState } = notificationSlice.actions

export default notificationSlice.reducer
