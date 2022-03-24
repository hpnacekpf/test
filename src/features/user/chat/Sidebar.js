import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Tabs from 'antd/lib/tabs'
import Input from 'antd/lib/input'
//reselect
import { selectActiveGroupChatKey } from 'reselect/chatSelector'
//component
import Conversation from './Conversation'

// extensions
import { getUrlProfile } from 'extensions/url'
import stringHelper from 'extensions/string'
import { isServer } from 'utils/client-api'
import { getActiveKey, getUserInfo } from 'extensions/chat'
import { getEmailByUser } from 'extensions/user'

const { Search } = Input
const { TabPane } = Tabs

const Sidebar = ({ conversation, changeChat, searchGroupChat, fromUserProfile, listUserInfo }) => {
  const activeGroupChatKey = useSelector(selectActiveGroupChatKey())

  const activeKey = getActiveKey(conversation, activeGroupChatKey)

  useEffect(() => {
    const scrollToPos = !isServer ? document.querySelector('.ant-tabs-tab-active') : null
    if (scrollToPos) {
      scrollToPos.scrollIntoView({ block: "nearest"})
    }
  }, [activeKey])

  return (
    <div className="messaging__sidebar border-chat-sidebar ml-lg-4">
      <div className="messaging__sidebar-header border-0">
        <Search
          placeholder="Search"
          style={{ width: '100%' }}
          onChange={searchGroupChat}
        />
      </div>
      <div className="messaging__tabs">
        {
          conversation && conversation.length > 0 ? (
            <Tabs
              defaultActiveKey="0"
              activeKey={`${activeKey}`}
              tabPosition={'left'}
              className='custom-chat'
              onChange={changeChat}
            >
              {
                conversation.map(
                  (chat, index) => {
                    const info = chat.data
                    const userId = info && info.owner ? info.owner  : null
                    const userName = getUserInfo(listUserInfo, userId, "name") ?? (info && info.name ? info.name  : null)
                    const mail = getUserInfo(listUserInfo, userId, "mailEncrypt")
                    const slug = getUserInfo(listUserInfo, userId, "slug")  ?? stringHelper.generateSlug(userName)
                    const urlProfile = getUrlProfile(userId,slug)
                    const avatar = getUserInfo(listUserInfo, userId, "icon") ?? info.avatar
                    const block = chat.data.block
                    return (
                      <TabPane
                        tab={
                          <Conversation
                            companionName={userName ?? getEmailByUser(mail)}
                            companionAvatar={avatar}
                            lastTime={info ? info.lastTime : null}
                            lastMessage={info && info.lastMessage ? info.lastMessage : null}
                            urlProfile={urlProfile}
                            toUserId={userId}
                            fromUserId={fromUserProfile?._id}
                            groupChatKey={chat.key}
                            block={block ?? false}
                          />
                        }
                        key={index}/>
                    )
                  }
                )
              }
            </Tabs>
          ) : null
        }
      </div>
    </div>
  )
}

export default Sidebar
