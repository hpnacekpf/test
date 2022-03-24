import React from 'react'
import Empty from 'antd/lib/empty'
import { Link } from 'react-router-dom'
// components
import Avatar from 'components/Avatar'
// constants
import { NO_USERS_FOUND, LIMIT_CHARACTER_PARTNER } from 'constants/index'
// extensions
import { stripHtmlContentWithBBCode } from 'extensions/html'
import { getUserName } from 'extensions/user'
import { getUrlByUser } from 'extensions/url'

class UserItem extends React.Component {
  render() {
    const { data } = this.props || null
    return data ? (
      <div className="col-md-3 mb-10">
        <div className="productCard px-3">
          <Avatar
            src={data.icon}
            size="90"
            borderColor="none"
            border={false}
            avatarLink={getUrlByUser(data)}
            username={data.name}
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
    ) : null
  }
}

class SearchUser extends React.Component {
  render() {
    const { data } = this.props
    const searchUser =
      data && data.searchUsers ? data.searchUsers.items || [] : []
    return searchUser && searchUser.length > 0 ? (
      <div className="row">
        {searchUser.map((item, key) => {
          return <UserItem key={key} data={item} />
        })}
      </div>
    ) : (
      <Empty description={NO_USERS_FOUND} />
    )
  }
}

export default SearchUser
