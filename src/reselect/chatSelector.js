import { createSelector } from 'reselect'

const getChat = (state) => (state.chat ? state.chat : [])

const getActiveGroupChatKey = (data) => {
  if (!data) return null
  return data.activeGroupChatKey ? data.activeGroupChatKey : null
}

const getGroupChats = (data) => {
  if (!data) return []
  return data.groupChats ? data.groupChats : []
}

const getMessages = (data) => {
  if (!data) return []
  return data.messages ? data.messages : []
}

const getBlockedGroupChat = data => {
  if (!data) return []
  return data.blockedGroupChat ? data.blockedGroupChat : []
}

export const selectGroupChats = () =>
  createSelector(getChat, (data) => {
    return getGroupChats(data)
  })

export const selectMessages = () =>
  createSelector(getChat, (data) => {
    return getMessages(data)
  })

export const selectActiveGroupChatKey = () =>
  createSelector(getChat, (data) => {
    return getActiveGroupChatKey(data)
  })

export const selectBlockedChat = () => 
  createSelector(getChat, data => {
    return getBlockedGroupChat(data)
  })
