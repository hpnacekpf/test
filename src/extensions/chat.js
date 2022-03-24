import anchorme from 'anchorme'
import { isUser } from './user'
import xss from './xss'

export const sortChat = (arrChat) => {
  return arrChat.sort((a, b) => {
    return b.data.lastTime - a.data.lastTime
  })
}

export const getChatOwnerName = (user) => {
  if(!isUser(user)) return null
  return user.name ? user.name : user.mail ? user.mail : null
}

export const checkMessage = (chatOwner, user) => {
  if(!isUser(chatOwner) || !isUser(user)) return false
  return chatOwner ? (chatOwner._id === user.id) : false
}

export const getActiveKey = (data, key) => {
  const index = data.findIndex((item) => item.key === key)
  return key ? (index === -1 ? 0 : index) : 0
}

export const getUserInfo = (listUserInfo, userId, field) => {
  if (!userId) return null
  if (!listUserInfo) return null
  const userInfo = listUserInfo.find( value => userId === value?._id)
  return userInfo && userInfo[field] ? userInfo[field] : null
}

export const renderMessageText = (content) => {
  if (!content) return ''
  const messageWithLink = anchorme(content)
  return xss.htmlParseWithoutXss(messageWithLink)
}