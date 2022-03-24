import { useAppDispatch } from 'configureStore'
import {
  blockConversation,
  createConversation,
  deleteConversation,
  findConversationByGroupChatKey,
  getConversationByUser,
  getGroupChatByKey,
  isBlockedConversation,
  unblockConversation,
  updateGroupChat
} from 'vendor/firebase/groupChat'
import {
  fetchReceiver,
  fetchSendMailChat,
  resetChat,
  setActiveGroupChat,
  setGroupChat,
  setMessages
} from './api'

import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useModal } from 'hooks/useModal'
import { REDUX_MODAL } from 'constants/enum'
import {
  createMessage,
  getMessagesByConversation
} from 'vendor/firebase/message'
import { getEmailByUser, getUserName } from 'extensions/user'
import { now } from 'vendor/firebase/connection'
import { DEFAULT_MESSAGE_PAGING } from 'constants/paging'
import { useSelector } from 'react-redux'
import { useNotification } from 'hooks/useNotification'

const initMessageContent = ({ content, sender = {}, type }) => {
  if (!sender || Object.keys(sender) === 0) return null
  return {
    text: content,
    user: {
      id: sender._id,
      name: getUserName(sender),
      mail: getEmailByUser(sender) || '',
      avatar: sender.icon || null
    },
    createdAt: now,
    type: type ?? 'text'
  }
}

export const useActiveGroup = () => {
  const dispatch = useAppDispatch()

  const [onFetch] = useMessageChat()

  const onSetActive = (key) => {
    if (key) {
      dispatch(setActiveGroupChat(key))

      //findMessagesByGroupChat
      onFetch(key, DEFAULT_MESSAGE_PAGING)
    }
  }

  return [onSetActive]
}

export const useResetChat = () => {
  const dispatch = useAppDispatch()

  const onReset = () => void dispatch(resetChat())

  return [onReset]
}

export const useGetAllGroups = () => {
  const dispatch = useAppDispatch()

  const [onReset] = useResetChat()

  const [onFetchReceiver] = useFetchReceiver()

  const [onToastSuccess, onToastError] = useNotification()

  const user = useGetUser()

  const onFetch = async (groupChatKey) => {
    onReset()

    await getConversationByUser(
      user?._id,
      (groupChatSort) => dispatch(setGroupChat(groupChatSort)),
      () => onReset(),
      (error) => onToastError(error),
      groupChatKey,
      (userIds) => (groupChatKey ? null : onFetchReceiver(userIds))
    )
  }

  return [onFetch]
}

export const useCreateGroup = () => {
  const [onCreateMessage] = useCreateMessage()

  const user = useGetUser()

  const onCreate = async ({ receiver, product, text }) => {
    const key = await createConversation()

    // create message
    onCreateMessage({
      receiverId: receiver?._id,
      text,
      groupChatKey: key,
      product
    })

    // update group chat

    await updateGroupChat(user, receiver, text, key, product)
  }

  return [onCreate]
}

export const useRegisterGroup = () => {
  const [onSetActive] = useActiveGroup()

  const [onCreateGroup] = useCreateGroup()

  const user = useGetUser()

  const onRegister = async ({ receiver, product, pathname }) => {
    if (!product || !pathname) return

    const {
      findGroupChat,
      findGroupChatKey
    } = await findConversationByGroupChatKey(user, receiver)

    if (findGroupChat) {
      if (findGroupChatKey) {
        await getGroupChatByKey(findGroupChatKey, user, (active) =>
          onSetActive(active)
        )
      }
    } else {
      const text = `Hi, I would like to enquire on the product <a href='${pathname}'>${
        product.name
      }</a>?`

      onCreateGroup({
        receiver,
        product,
        text
      })
    }
  }

  return [onRegister]
}

export const useDeleteGroup = () => {
  const user = useGetUser()
  const onDelete = async (groupChatKey) => {
    if (user) {
      await deleteConversation(groupChatKey, user?._id)
    }
  }

  return [onDelete]
}

export const useBlockChat = () => {
  const user = useGetUser()

  const onBlock = async (groupChatKey, receiverId) => {
    await blockConversation(groupChatKey, user?._id, receiverId)
  }

  const onUnblock = async (groupChatKey, receiverId) => {
    await unblockConversation(groupChatKey, user?._id, receiverId)
  }

  return [onBlock, onUnblock]
}

export const useMessageChat = () => {
  const dispatch = useAppDispatch()

  const onMessage = async (groupChatKey, pageSize) => {
    await getMessagesByConversation(groupChatKey, pageSize, (messages) =>
      dispatch(setMessages(messages))
    )
  }

  return [onMessage]
}

export const useCreateMessage = () => {
  const dispatch = useAppDispatch()

  const user = useGetUser()

  const onCreate = ({ receiverId, text, groupChatKey, product, type }) => {
    const chatMessage = initMessageContent({
      sender: user,
      content: text,
      type
    })
    createMessage(groupChatKey, chatMessage)

    const username = getUserName(user)

    const mailChatData = {
      userId: receiverId,
      title: 'New message',
      message: text,
      fromUserName: username ?? '',
      productName: product?.name ?? null,
      product: product?._id ?? null
    }

    dispatch(fetchSendMailChat(mailChatData))
  }

  return [onCreate]
}

export const useUpdateGroup = () => {
  const user = useGetUser()

  const onUpdate = async ({ receiver, text, groupChatKey, type }) => {
    await updateGroupChat(user, receiver, text, groupChatKey, null, type)
  }

  return [onUpdate]
}

export const useSendMessage = () => {
  const user = useGetUser()

  const [onOpenModal, onCloseModal] = useModal()

  const [onCreateMessage] = useCreateMessage()

  const [onUpdateGroup] = useUpdateGroup()

  const [onSetActive] = useActiveGroup()

  const onSend = async ({
    receiver,
    text,
    key,
    product,
    type,
    isBlockedUser
  }) => {
    const isBlocked = await isBlockedConversation(key, user, receiver)

    if (isBlocked || !receiver || isBlockedUser) {
      onOpenModal(REDUX_MODAL.CHAT_BLOCKED, {
        title: 'Message not sent',
        content: `This person can not receive messages at this time.`,
        handleCancelClick: () => onCloseModal(REDUX_MODAL.CHAT_BLOCKED)
      })
    } else {
      // create message
      onCreateMessage({
        receiverId: receiver?._id,
        text,
        groupChatKey: key,
        product,
        type
      })
      // update message group
      onUpdateGroup({
        receiver,
        text,
        groupChatKey: key,
        type
      })
      // set active

      onSetActive(key)
    }
  }

  return [onSend]
}

export const useFetchReceiver = () => {
  const dispatch = useAppDispatch()

  const onFetch = async (userIds) => {
    await dispatch(fetchReceiver(userIds))
  }

  return [onFetch]
}

/**
HOOK STATE
 */
export const useGetReceiver = () => {
  return useSelector((state) => state.chat.receivers)
}

export const useGetConversations = () => {
  return useSelector((state) => state.chat.groupChats)
}

export const useGetActiveConversation = () => {
  return useSelector((state) => state.chat.activeGroupChatKey)
}

export const useGetCurrentConversation = () => {
  return useSelector((state) => state.chat.messages)
}

export const useGetBlockReceiver = () => {
  return useSelector((state) => state.chat.blockedGroupChat)
}
