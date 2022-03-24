//libs
import React, { useRef, useEffect, Fragment } from 'react'
import classNames from 'classnames'
//component
import Avatar from 'components/Avatar'
//constants
import {
  formatDateTime,
  DEFAULT_MESSAGE_PAGE_SIZE,
  ICON_ACCEPTED,
  ICON_CREATED,
  ICON_CANCELED,
  ICON_DISPUTED,
  ICON_RETURNED,
  ICON_DELIVERED,
  ICON_RECEIVED
} from 'constants/index'
import enumType from 'constants/enumType'
//extensions
import { getAvatarUrl, getAvatarByUser } from 'extensions/image'
import {
  getChatOwnerName,
  checkMessage,
  renderMessageText
} from 'extensions/chat'
import { isUser, getUserName } from 'extensions/user'
import dateTimeExtensions from 'extensions/datetime'
import { getUrlProfile, getUrlByUser } from 'extensions/url'
import stringExtensions from 'extensions/string'
import xss from 'extensions/xss'

const Message = ({
  toUserProfile,
  message,
  index,
  numberOfMessages,
  setPrevTotalMessages,
  prevTotalMessages,
  fromUserProfile,
  messagesEnd
}) => {
  const { text, user, createdAt } = message || null
  const checkPosMessage = checkMessage(fromUserProfile, user)
  const messagesEndNew = useRef(null)
  const isLoadMore = numberOfMessages > DEFAULT_MESSAGE_PAGE_SIZE
  const indexOfLastNewMessage =
    numberOfMessages % DEFAULT_MESSAGE_PAGE_SIZE === 0
      ? DEFAULT_MESSAGE_PAGE_SIZE
      : numberOfMessages % DEFAULT_MESSAGE_PAGE_SIZE
  const lastNewMessage = isLoadMore ? indexOfLastNewMessage : null

  const checkUser = (userProfile) => {
    if (!userProfile) return null
    else if (userProfile.id === toUserProfile?._id) return toUserProfile
    else if (userProfile.id === fromUserProfile?._id) return fromUserProfile
    else return null
  }

  const initUser = (user) => {
    return checkUser(user)
  }

  const userProfile = initUser(user)

  const scrollToMessage = () => {
    if (isLoadMore && lastNewMessage === index) {
      messagesEndNew.current.scrollIntoView({ block: 'nearest' })
    } else if (!isLoadMore) {
      messagesEnd.current.scrollIntoView({ block: 'end' })
    }
  }

  const getIconTransactionStatus = (status) => {
    switch (status) {
      case enumType.orderStatus.Accepted:
        return ICON_ACCEPTED
      case enumType.orderStatus.Created:
        return ICON_CREATED
      case enumType.orderStatus.Canceled:
        return ICON_CANCELED
      case enumType.orderStatus.Declined:
        return ICON_CANCELED
      case enumType.orderStatus.Disputed:
        return ICON_DISPUTED
      case enumType.orderStatus.Returned:
        return ICON_RETURNED
      case enumType.orderStatus.Delivered:
        return ICON_DELIVERED
      case enumType.orderStatus.Received:
        return ICON_RECEIVED
      default:
        return null
    }
  }

  useEffect(
    () => {
      if (prevTotalMessages < numberOfMessages) {
        scrollToMessage()
        setPrevTotalMessages(numberOfMessages)
      }
    },
    [message]
  )

  return message && isUser(fromUserProfile) ? (
    <Fragment>
      <div
        className={classNames(
          {
            'justify-content-end': checkPosMessage,
            'justify-content-start': !checkPosMessage
          },
          `d-md-flex`
        )}
      >
        {
          <div
            ref={lastNewMessage === index ? messagesEndNew : null}
            className={classNames({
              'clearfix messaging__item': true,
              'messaging__item--right': checkPosMessage,
              'messaging__item--left': !checkPosMessage,
              'messaging__item--image':
                message.type === enumType.messageType.image
            })}
          >
            <div className="messaging__item-avatar text-center">
              <Avatar
                src={
                  userProfile
                    ? getAvatarByUser(userProfile)
                    : getAvatarUrl(user.avatar)
                }
                size="50"
                border="false"
                username={userProfile ? getUserName(userProfile) : user.name}
                avatarLink={
                  userProfile
                    ? getUrlByUser(userProfile)
                    : getUrlProfile(
                        user.id,
                        stringExtensions.generateSlug(user.name)
                      )
                }
              />
            </div>
            {message.orderStatus ? (
              <div
                className={classNames(
                  {
                    'justify-content-end': checkPosMessage,
                    'justify-content-start': !checkPosMessage
                  },
                  `d-flex align-items-center messaging__item-status`
                )}
              >
                {message.orderStatus &&
                getIconTransactionStatus(message.orderStatus) ? (
                  <img
                    src={getIconTransactionStatus(message.orderStatus)}
                    className={`chat-icon-order`}
                    alt={message.orderStatus}
                  />
                ) : null}
                <span>{xss.htmlParseWithoutXss(text)}</span>
              </div>
            ) : (
              <div
                className={`messaging__item-content bg__message border__message text__message flex-wrap`}
              >
                <div
                  className={classNames(
                    {
                      'justify-content-between': createdAt,
                      'justify-content-end': !createdAt && checkPosMessage,
                      'justify-content-start': !createdAt && !checkPosMessage
                    },
                    `d-flex align-items-center`
                  )}
                >
                  {createdAt ? (
                    <small
                      className={classNames({
                        'messaging__tab-time-left': checkPosMessage,
                        'messaging__tab-time-right': !checkPosMessage
                      })}
                    >
                      {dateTimeExtensions.formatTimeStampToString(
                        createdAt,
                        formatDateTime
                      )}
                    </small>
                  ) : null}
                  <strong
                    className={classNames(
                      {
                        'messaging__tab-username-right ml-3': checkPosMessage,
                        'messaging__tab-username-left mr-3': !checkPosMessage
                      },
                      `font-size-16`
                    )}
                  >
                    <span>
                      {userProfile
                        ? getUserName(userProfile)
                        : getChatOwnerName(message.user)}
                    </span>
                  </strong>
                </div>
                <div
                  className={classNames(
                    {
                      'text-right': checkPosMessage,
                      'text-left': !checkPosMessage
                    },
                    `mt-2`
                  )}
                >
                  {message.type === enumType.messageType.image ? (
                    <a href={text} target={`_blank`}>
                      <img
                        alt="image-message"
                        src={text}
                        className={`img-fluid`}
                      />
                    </a>
                  ) : (
                    <span>{renderMessageText(text)}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        }
      </div>
    </Fragment>
  ) : null
}

export default Message
