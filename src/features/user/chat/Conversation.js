import React from 'react'
// components
import Avatar from 'components/Avatar'
// extensions
import dateTimeExtensions from 'extensions/datetime'
// libs
import xss from 'extensions/xss'
import classNames from 'classnames'

const Conversation = ({
  companionAvatar,
  companionName,
  lastTime,
  lastMessage,
  urlProfile,
  block
}) => {
  const formatLastTime = dateTimeExtensions.formatTimeStampToMoment(lastTime)
  return (
    <div
      className={classNames(
        {
          'conversation-blocked': block
        },
        `messaging__tab border-0 tab-divider messaging__tab-custom`
      )}
    >
      <div className="messaging__tab-avatar text-center">
        <Avatar
          src={companionAvatar}
          size="50"
          border="true"
          borderColor="#fff"
          username={companionName}
          avatarLink={urlProfile}
        />
      </div>
      <div className="messaging__tab-content">
        {lastTime ? (
          <small className="messaging__tab-time">
            {dateTimeExtensions.formatRelativeTime(formatLastTime)}
          </small>
        ) : null}
        <div className="messaging__tab-name">{companionName}</div>
        <div className={`d-flex align-items-center justify-content-between`}>
          <div className="messaging__tab-text">
            {lastMessage
              ? xss.htmlParseWithoutXss(lastMessage)
              : 'Say hi to your friend'}
          </div>
          {/* <div onClick={ e => e.stopPropagation() }>
            <DropdownChat
              open={open}
              setOpen={setOpen}
              fromUserId={fromUserId}
              toUserId={toUserId}
              toUserName={companionName}
              block={block}
              groupChatKey={groupChatKey}
            >
              <i className={`fa fa-ellipsis-h text-color-primary-v1`} />
            </DropdownChat>
          </div> */}
        </div>
      </div>
      <div className={'clearfix'} />
    </div>
  )
}

export default Conversation
