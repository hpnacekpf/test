// init firebase
import { db, now } from './connection'
// constants
import {
  GROUP_CHAT,
  USER_CHAT,
  BLOCK_CHAT,
  BLOCK,
  LAST_TIME,
  OWNER} from 'constants/chat'
import { sortChat } from 'extensions/chat'
import utils from 'utils'

// ------------------conversation-------------------

// create group chat
export const createConversation = () => {
  return db.ref(GROUP_CHAT).push().key
}

// get group chat
export const getConversation = async () => {
  return await db.ref().child(GROUP_CHAT)
}

// get group chat by key
export const getGroupChatByKey = async (key, fromUser, active) => {
  await db
    .ref(`${GROUP_CHAT}/${key}/${fromUser._id}`)
    .once('value')
    .then((snapshot) => {
      const groupChat = snapshot.val()
      const update = {}
      update[`${USER_CHAT}/${fromUser._id}/${GROUP_CHAT}/${key}`] = groupChat
      updateConversation(update)
      active(key)
    })
}

// find conversation
export const findConversation = async (getGroupChat) => {
  const conversation = await getConversation()
  await conversation.once('value', (snapshot) => getGroupChat(snapshot))
}

// find groupChatKey
export const findConversationByGroupChatKey = async (fromUser, toUser) => {
  let findGroupChat = null
  let findGroupChatKey = null

  await findConversation((snapshot) => {
    snapshot.forEach(function(child) {
      let groupChat = child.val()
      if (groupChat != null) {
        const groupChatKey = Object.keys(groupChat)
        if (
          ((groupChatKey[0] === fromUser?._id &&
            groupChatKey[1] === toUser?._id) ||
            (groupChatKey[1] === fromUser?._id &&
              groupChatKey[0] === toUser?._id)) &&
          groupChatKey.length === 2
        ) {
          findGroupChat = groupChat
          findGroupChatKey = child.key
        }
      }
    })
  })

  return {
    findGroupChat,
    findGroupChatKey
  }
}

// get group chat by user
export const getConversationByUser = async (
  user,
  groupSort,
  setActiveGroupChatKey,
  groupChatError,
  groupChatKey,
  getInfoUserChat
) => {
  await db
    .ref(`${USER_CHAT}/${user}/${GROUP_CHAT}`)
    .orderByChild(LAST_TIME)
    .on(
      'value',
      (snapshot) => {
        let groupChats = []
        let groupChatActive = null
        let receiverIds = []
        if (snapshot.val() !== null) {
          snapshot.forEach((groupChat) => {
            const conversation = groupChat.val()
            if (conversation !== null && conversation[LAST_TIME]) {
              groupChats.push({
                key: groupChat.key,
                data: conversation
              })
              if (conversation[OWNER]) {
                receiverIds.push(conversation[OWNER])
              }
            }
          })
        } else {
          if (setActiveGroupChatKey) {
            setActiveGroupChatKey()
          }
        }
        if (groupChats && groupChats.length > 0) {
          const groupChatSort = sortChat(groupChats)
          groupSort(groupChatSort)
          getInfoUserChat(receiverIds)
          groupChatActive = groupChatKey
            ? groupChatSort.find((value) => value.key === groupChatKey)
            : groupChatSort[0]
        }
      },
      (error) => groupChatError(error)
    )
}

// update conversation
export const updateConversation = async (data) => {
  await db
    .ref()
    .update(data)
    .catch((error) => console.log('registerGroupChatError', error))
}

// update group chat
export const updateGroupChat = async (
  fromUser,
  toUser,
  text,
  groupChatKey,
  product,
  type
) => {
  const update = {}
  const isBlockedFromUser = await isBlockedConversation(groupChatKey, toUser)
  const isBlockedToUser = await isBlockedConversation(groupChatKey, fromUser)

  const objectToUser = utils.convertUserToObjectFireBase(
    toUser,
    text,
    now,
    product,
    type,
    true,
    isBlockedFromUser
  )
  const objectFromUser = utils.convertUserToObjectFireBase(
    fromUser,
    text,
    now,
    product,
    type,
    false,
    isBlockedToUser
  )

  update[`${GROUP_CHAT}/${groupChatKey}/${fromUser._id}`] = objectToUser
  update[`${GROUP_CHAT}/${groupChatKey}/${toUser._id}`] = objectFromUser

  update[
    `${USER_CHAT}/${fromUser._id}/${GROUP_CHAT}/${groupChatKey}`
  ] = objectToUser
  update[
    `${USER_CHAT}/${toUser._id}/${GROUP_CHAT}/${groupChatKey}`
  ] = objectFromUser

  await updateConversation(update)
}

// get blocked conversation
export const isBlockedConversation = async (groupChatKey, fromUser, toUser) => {
  let isBlocked = null
  await db
    .ref(`${BLOCK_CHAT}/${groupChatKey}`)
    .once('value')
    .then((snapshot) => {
      const block = snapshot.val() ?? null
      isBlocked = block
        ? block[fromUser._id] ?? block[toUser._id] ?? null
        : null
    })
  return isBlocked
}

// delete conversation
export const deleteConversation = async (groupChatKey, userId) => {
  await db
    .ref()
    .child(`${USER_CHAT}/${userId}/${GROUP_CHAT}/${groupChatKey}`)
    .remove()
}

// block conversation
export const blockConversation = async (groupChatKey, fromUserId, toUserId) => {
  await db
    .ref()
    .child(`${BLOCK_CHAT}/${groupChatKey}/${toUserId}`)
    .update({ block: true })
  await db
    .ref()
    .child(`${USER_CHAT}/${fromUserId}/${GROUP_CHAT}/${groupChatKey}`)
    .update({ block: true })
}

// unblock conversation
export const unblockConversation = async (
  groupChatKey,
  fromUserId,
  toUserId
) => {
  await db
    .ref()
    .child(`${BLOCK_CHAT}/${groupChatKey}/${toUserId}`)
    .remove()
  await db
    .ref()
    .child(`${USER_CHAT}/${fromUserId}/${GROUP_CHAT}/${groupChatKey}/${BLOCK}`)
    .remove()
}
