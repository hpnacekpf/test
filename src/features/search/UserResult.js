import React from 'react'
// lib
import PropTypes from 'prop-types'
import Empty from 'antd/lib/empty'
import { Link } from 'react-router-dom'
// components
import Avatar from 'components/Avatar'
// constants
import { NO_USERS_FOUND, LIMIT_CHARACTER_PARTNER } from 'constants/index'
// extensions
import { stripHtmlContentWithBBCode } from 'extensions/html'
import { getUserName } from 'extensions/user'
import { getAvatarByUser } from 'extensions/image'
import { getUrlByUser } from 'extensions/url'

const UserItem = (props) => {
  const { data } = props
  return (
    <div className="col-md-3 mb-10">
      <div className="productCard px-3">
        <Avatar
          src={getAvatarByUser(data)}
          size="90"
          borderColor="none"
          border={false}
          avatarLink={getUrlByUser(data)}
          username={getUserName(data)}
        />
        <div className="my-3 text-center">
          <div className="style_userName__3dmRv font-size-18">
            <Link to={getUrlByUser(data)}>{getUserName(data)}</Link>
          </div>
          <div className="style_post__1CEHk">
            {stripHtmlContentWithBBCode(
              data.description,
              LIMIT_CHARACTER_PARTNER
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const UserResult = (props) => {
  const { dataGrid } = props

  return dataGrid && dataGrid.length > 0 ? (
    <div className="row">
      {dataGrid.map((user, index) => <UserItem data={user} key={index} />)}
    </div>
  ) : (
    <div className="text-center">
      <Empty description={NO_USERS_FOUND} />
    </div>
  )
}

UserResult.propTypes = {
  dataGrid: PropTypes.any
}

export default UserResult
