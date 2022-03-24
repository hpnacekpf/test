import React from 'react'
//component
import Avatar from './Avatar'
import Rating from './Rating'
//extensions
import dateTimeExtensions from 'extensions/datetime'
import { getAvatarByUser } from 'extensions/image'
import { getUserName } from 'extensions/user'
import { getUrlByUser } from 'extensions/url'
import xss from 'extensions/xss'

const Comment = ({ user, rate, time, comment }) => (
  <div className="blog-feed__comments-wrap mt-3 custom-blog-feed__comments">
    <div className="blog-feed__comments">
      <div className="blog-feed__comment-item clearfix my__25">
        <div className="blog-feed__comment-avatar text-center">
          <Avatar
            avatarLink={getUrlByUser(user)}
            src={getAvatarByUser(user)}
            border={false}
            size={40}
            username={getUserName(user)}
          />
        </div>
        <div className="blog-feed__comment-content">
          <div className="mb-1 clearfix">
            <div className="pull-left">
              <strong className="font-size-14 text__user-comment">
                {getUserName(user)}
              </strong>
              <Rating
                height={13}
                width={16}
                value={rate}
                customClass="pull-right ml-3"
              />
              <br />
              <small className="font-size-12 text__small">
                {dateTimeExtensions.formatFromString(time)}
              </small>
            </div>
          </div>
          <div>
            <p
              className="text__message"
              style={{ whiteSpace: 'pre-line' }}
              dangerouslySetInnerHTML={{
                __html: xss.removeXssContent(comment)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Comment
