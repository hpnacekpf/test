import React, { useState, useEffect, useRef } from 'react'
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import { useGetUser } from 'hooks/globalStores/useAuthStore'

// constants
import { ICON_MORE } from 'constants/index'
import {
  CHAT_MESSAGE_TYPE,
  NOTIFICATION_TYPE,
  REDUX_MODAL,
  UPLOAD_TYPE
} from 'constants/enum'
import { DEFAULT_MESSAGE_PAGING } from 'constants/paging'
import { IMAGE_MAX_MEGABYTE } from 'constants/number'

// extensions
import { getActiveKey } from 'extensions/chat'
import { getUserName } from 'extensions/user'
// reselect

//component
import Sidebar from './Sidebar'
import Message from './Message'
import CustomButton from 'components/Button/CustomButton'
import GeneratorSeo from 'components/GeneratorSeo'
import RedirectUrl from 'components/RedirectUrl'
import InfoCard from 'components/InfoCard'
import ModalBlockedChat from 'components/Modal/ModalBlockedChat'
import DropdownChat from 'components/DropdownChat'

// reducer
import { useMarkAsRead } from 'reducers/notification/hook'
import {
  useActiveGroup,
  useGetActiveConversation,
  useGetAllGroups,
  useGetConversations,
  useGetCurrentConversation,
  useGetReceiver,
  useMessageChat,
  useResetChat,
  useSendMessage
} from 'reducers/chat/hook'
import { useUpload } from 'reducers/upload/hook'
import { useGetBlockUser } from 'reducers/blockUser/hook'
import { Modal } from 'antd'
import { useModal } from 'hooks/useModal'

const Chat = () => {
  const [groupChatKey, setGroupChatKey] = useState(null)
  const [groupChat, setGroupChat] = useState(null)
  const [message, setMessage] = useState('')
  const [searchGroup, setSearchGroup] = useState(false)
  const [groupChatsSearch, setGroupChatsSearch] = useState([])
  const [pageSizeMessages, setPageSizeMessages] = useState(2)
  const [prevTotalMessages, setPrevTotalMessages] = useState(0)
  const [open, setOpen] = useState(false)
  const [toUserProfile, setToUserProfile] = useState(null)

  const messagesEnd = useRef(null)

  const user = useGetUser()
  const groupChats = useGetConversations()
  const messages = useGetCurrentConversation()
  const receivers = useGetReceiver()
  const activeGroupChatKey = useGetActiveConversation()

  const [onFetchAllGroups] = useGetAllGroups()

  const [onFetchMessages] = useMessageChat()

  const [onReset] = useResetChat()

  const [onSendMessage] = useSendMessage()

  const [onMarkAsRead] = useMarkAsRead()

  const [onSetActive] = useActiveGroup()

  const [onOpenModal, onCloseModal] = useModal()

  const [isBlocked, setIsBlocked] = useState(false)

  const { files, loading, onUpload, onBeforeUpload } = useUpload({
    multiple: false,
    type: UPLOAD_TYPE.CHAT,
    maxSize: IMAGE_MAX_MEGABYTE
  })

  const { blockUsers } = useGetBlockUser()

  // get user chat
  const toUserInfo = (userId) => {
    if (!receivers) return null
    return receivers.find((value) => userId === value?._id)
  }

  const handleCustomRequest = async (options) => {
    if (isBlocked) {
      onOpenModal(REDUX_MODAL.CHAT_BLOCKED, {
        title: 'Message not sent',
        content: `This person can not receive messages at this time.`,
        handleCancelClick: () => onCloseModal(REDUX_MODAL.CHAT_BLOCKED)
      })
      return
    }

    const resultData = await onUpload([options.file])

    if (resultData) {
      if (toUserProfile && groupChat?.owner === toUserProfile?._id) {
        onSendMessage({
          receiver: toUserProfile,
          text: resultData.url.replace(/"/g, "'"),
          key: groupChatKey,
          type: CHAT_MESSAGE_TYPE.IMAGE,
          isBlockedUser: isBlocked
        })
      }
    }
  }

  // handle chat message

  const handleChangeMessage = (event) => {
    setMessage(event.target.value)
  }

  const handleSendMessage = () => {
    setMessage('')
    if (groupChatKey) {
      if (
        user &&
        message.length > 0 &&
        groupChat?.owner === toUserProfile?._id &&
        toUserProfile
      ) {
        onSendMessage({
          receiver: toUserProfile,
          text: message,
          key: groupChatKey,
          type: CHAT_MESSAGE_TYPE.TEXT,
          isBlockedUser: isBlocked
        })
      }
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const changeChatGroupChat = (chatNumber) => {
    const currentGroup = groupChats[chatNumber]
    if (currentGroup) {
      setGroupChat(currentGroup.data)
      setGroupChatKey(currentGroup.key)
      onSetActive(currentGroup.key)

      const userInfo = toUserInfo(currentGroup.data?.owner ?? null)
      setToUserProfile(userInfo)
      setPageSizeMessages(2)
      setPrevTotalMessages(0)
    }
  }

  const searchGroupChat = (event) => {
    let updatedList
    updatedList = groupChats.filter((item) => {
      if (item.data.name) {
        return (
          item.data.name
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
        )
      }
    })
    if (updatedList && updatedList.length > 0) {
      // updatedList = sortChat(updatedList)
      setGroupChatsSearch(updatedList)
      setSearchGroup(true)
      setGroupChat(updatedList[0].data)
      onSetActive(updatedList[0].key)
    }
  }

  const loadOlderMessages = () => {
    const element = document.querySelector('.messaging__chat')
    const elementHeight = element ? element.offsetHeight : 0
    const elementScrollHeight = element.scrollHeight
    if (elementHeight < elementScrollHeight) {
      const currentPos = element.scrollTop
      if (currentPos === 0) {
        setPageSizeMessages(pageSizeMessages + 1)
        onFetchMessages(groupChat, pageSizeMessages * DEFAULT_MESSAGE_PAGING)
      }
    }
  }

  // useEffect
  useEffect(() => {
    onFetchAllGroups(activeGroupChatKey)
    onMarkAsRead(NOTIFICATION_TYPE.CHAT)
  }, [])

  useEffect(() => {
    return () => onReset()
  }, [])

  useEffect(
    () => {
      // const groupChatSorted = sortChat(groupChats)
      if (groupChats.length) {
        const activeNumber = getActiveKey(groupChats, activeGroupChatKey)
        const currentGroup = groupChats[activeNumber]
        if (currentGroup) {
          setGroupChat(currentGroup.data)
          setGroupChatKey(currentGroup.key)
          onSetActive(currentGroup.key)
          if (currentGroup.data?.owner !== toUserProfile?._id) {
            const userInfo = toUserInfo(currentGroup.data?.owner)
            setToUserProfile(userInfo)
          }
        }
      }
    },
    [groupChats, activeGroupChatKey, receivers]
  )

  useEffect(
    () => {
      if (!messages.length) {
        setGroupChatKey(null)
      }
    },
    [messages]
  )

  useEffect(
    () => {
      let blocked = !!groupChat?.block
      if (!blocked) {
        blocked = blockUsers.some((user) => user._id === groupChat?.owner)
      }

      setIsBlocked(blocked)
    },
    [groupChat, blockUsers]
  )

  return (
    <div className="utils__content">
      <RedirectUrl isRemovePath={true} />
      <GeneratorSeo
        title={`Chats - Leading the Movement Towards a Sharing Economy`}
        description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
        keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
      />
      <InfoCard hideBorder={false} title={<strong>Chats</strong>}>
        <div className="card messaging custom-message mb-0">
          <Sidebar
            conversation={searchGroup ? groupChatsSearch : groupChats}
            changeChat={changeChatGroupChat}
            searchGroupChat={searchGroupChat}
            // toUserProfile={toUserProfile}
            fromUserProfile={user}
            listUserInfo={receivers}
          />
          <div className="messaging__content border__bottom-message">
            {groupChat && messages.length ? (
              <div className="card-header clearfix">
                <h4 className="mt-1 mb-1 ml-2 text-black d-inline-block font-size-24 d-flex justify-content-between align-items-center">
                  <strong>
                    {getUserName(toUserProfile) ??
                      groupChat?.name ??
                      groupChat.mail}
                  </strong>
                  <div className={`cursor-pointer d-flex align-items-center`}>
                    <DropdownChat
                      open={open}
                      setOpen={setOpen}
                      toUserName={getUserName(toUserProfile)}
                      toUserId={groupChat.owner}
                      fromUserId={user?._id}
                      block={isBlocked}
                      groupChatKey={groupChatKey}
                    >
                      <img
                        alt="load-more"
                        src={ICON_MORE}
                        className={`img-fluid`}
                        style={{ height: '20px' }}
                      />
                    </DropdownChat>
                  </div>
                </h4>
              </div>
            ) : null}
            <div className="messaging__content-wrapper py-3 mx-4">
              <div
                className="messaging__chat max-height-700 chatbox"
                onScroll={loadOlderMessages}
              >
                {messages.length
                  ? messages.map((message, index) => (
                      <div key={index}>
                        <Message
                          key={index}
                          index={index + 1}
                          message={message}
                          numberOfMessages={messages.length}
                          setPrevTotalMessages={setPrevTotalMessages}
                          prevTotalMessages={prevTotalMessages}
                          toUserProfile={toUserProfile}
                          fromUserProfile={user ? user || null : null}
                          messagesEnd={messagesEnd}
                        />
                      </div>
                    ))
                  : null}
                <div ref={messagesEnd} />
              </div>
            </div>
            <hr className="my-3" />
            <div className="messaging__content-wrapper py-3 mx-4">
              <div className="form-group mb-2">
                <textarea
                  value={message}
                  className="form-control adjustable-textarea font-size-16 message-input"
                  onChange={handleChangeMessage}
                  onKeyPress={handleKeyPress}
                  placeholder="Type message..."
                  disabled={!toUserProfile}
                />
                <div className="mt-3">
                  <CustomButton
                    size={'large'}
                    buttonType="btn-color-main"
                    buttonClass={'width-200 font-size-16'}
                    handleClick={handleSendMessage}
                    disabled={!groupChatKey || !toUserProfile}
                    htmlType={'button'}
                  >
                    <i className="fa fa-send mr-2" />
                    Send
                  </CustomButton>
                  <Upload
                    accept="image/*"
                    multiple={false}
                    listType="picture"
                    beforeUpload={onBeforeUpload}
                    showUploadList={false}
                    customRequest={handleCustomRequest}
                    fileList={files}
                  >
                    <CustomButton
                      size={'large'}
                      buttonClass={'font-size-16 ml-2'}
                      handleClick={handleSendMessage}
                      disabled={
                        !toUserProfile ? true : groupChatKey ? loading : true
                      }
                      htmlType={'button'}
                      buttonType="btn-color-main"
                    >
                      {loading ? (
                        <Icon type={`loading`} />
                      ) : (
                        <i className="fa fa fa-picture-o" />
                      )}
                    </CustomButton>
                  </Upload>
                  {/*<button className="btn btn-link" type="button">Attach File</button>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </InfoCard>
      <ModalBlockedChat />
    </div>
  )
}
export default Chat
