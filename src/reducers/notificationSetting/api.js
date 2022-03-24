import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import { createNotification, getNotification, updateNotification } from './query'

const initialState = {
  loading: false,
  notification: null,
  updateNotification: null,
  createNotification: null,
}

// Thunks
export const fetchNotification = createAsyncThunk(
  'notificationSetting/notification',
  async (limit) => {
    const response = await graphqlBaseQuery('', {
      body: getNotification(limit)
    })
    return response.notificationSettingsFE
  }
)
export const fetchUpdateNotification = createAsyncThunk(
  'notificationSetting/updateNotification',
  async (data) => {
    const response = await graphqlBaseQuery('', {
      body: updateNotification(data)
    })
    return response.updateNotificationSettingFE
  }
)
export const fetchCreateNotification = createAsyncThunk(
  'notificationSetting/createNotification',
  async (data) => {
    const response = await graphqlBaseQuery('', {
      body: createNotification(data)
    })
    return response.createNotificationSettingFE
  }
)

// Reducer
const notificationSettingSlice = createSlice({
  name: 'notificationSetting',
  initialState,
  reducers: {
    loadNotification: (state, action) => {
      state.notification = action.payload
    }
  },
  extraReducers: (builder) => {
    // notification
    builder.addCase(fetchNotification.pending, (state, action) => {
      state.loading = true
    }),
      builder.addCase(fetchNotification.fulfilled, (state, action) => {
        state.notification = action.payload
        state.updateNotification = action.payload
        state.createNotification = action.payload
        state.loading = false
      }),
      builder.addCase(fetchNotification.rejected, (state, action) => {
        state.loading = false
      })
  }
})

// Actions
export const {
  loadNotification
} = notificationSettingSlice.actions

export default notificationSettingSlice.reducer

