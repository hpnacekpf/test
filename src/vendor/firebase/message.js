import { db } from './connection'
// constants
import { MESSAGES } from 'constants/chat'
import sortBy from 'lodash/sortBy'

// create message
export const createMessage = (groupChatKey, data) => {
  db.ref(`${MESSAGES}/${groupChatKey}`).push(data)
}

// get messages by group chat
export const getMessagesByConversation = async (
  groupChatKey,
  pageSize,
  getMessages
) => {
  await db
    .ref(`${MESSAGES}/${groupChatKey}`)
    .limitToLast(pageSize || 10)
    .on('value', (snapshot) => {
      let messages = []
      snapshot.forEach((message) => {
        const msg = message.val()
        if (msg.createdAt || msg.createAt) {
          messages.push({
            _id: message.key,
            text: msg.text,
            user: msg.user,
            createdAt: msg.createdAt ? msg.createdAt : msg.createAt,
            orderStatus: msg.orderStatus,
            type: msg.type
          })
        }
      })
      // messages.sort((a, b) => {
      //   return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      // })
      if (messages.length > 0) sortBy(messages, (x) => x.createdAt)
      getMessages(messages)
    })
}
