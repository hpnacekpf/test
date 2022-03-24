import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import { getReceiver, sendMailChat } from './query'

const initialState = {
  loading: false,
  activeGroupChatKey: null,
  messages: [],
  groupChats: [],
  blockedGroupChat: [],
  userId: '',
  receivers: [],
  receiverIds: []
}

export const fetchSendMailChat = createAsyncThunk(
  'chat/fetchSendMailChat',
  async(data) => {
    const response = await graphqlBaseQuery('', {
      body: sendMailChat(data)
    })
    return response.sendMailNewChat
  }
)

export const fetchReceiver = createAsyncThunk(
  'chat/fetchReceiver',
  async(userIds) => {
    const response = await graphqlBaseQuery('', {
      body: getReceiver(userIds)
    })
    return response.getListUserInfo
  },
  {
    condition: (arg, { getState }) => {
      const { receiverIds } = getState().chat

      if (receiverIds?.length === 0) return true

      if (arg?.length === 0) return false

      const newReceivers = arg.filter((id) =>
        receiverIds.every((userId) => userId !== id)
      )

      return newReceivers.length > 0
    }
  }
)

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    resetChat: () => ({
      ...initialState
    }),
    setActiveGroupChat: (state, action) => {
      state.activeGroupChatKey = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    setGroupChat: (state, action) => {
      state.groupChats = action.payload
    },
    setActiveGroup: (state, action) => {
      state.activeGroupChatKey = action.payload
    },
    setBlockGroup: (state, action) => {
      state.blockedGroupChat = action.payload
    },
    setReceiverIds: (state, action) => {
      state.receiverIds = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReceiver.pending, (state) => {
      state.loading = true
    }),
      builder.addCase(fetchReceiver.fulfilled, (state, action) => {
        state.loading = false
        state.receivers = action.payload
        state.receiverIds = action.meta.arg ?? []
      })
    builder.addMatcher(
      (action) =>
        action.type.startsWith('chat') && action.type.endsWith('rejected'),
      (state, action) => {
        state.loading = false
        state.error = action.payload
          ? action.payload.errorMessage
          : action.error
      }
    )
  }
})

export const {
  resetChat,
  setActiveGroupChat,
  setMessages,
  setActiveGroup,
  setBlockGroup,
  setGroupChat,
  setReceiverIds
} = chatSlice.actions

export default chatSlice.reducer
