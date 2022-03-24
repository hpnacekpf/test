import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'components/Avatar'
import { htmlParse } from 'extensions/html'
import { getUrlByUser } from 'extensions/url'

const UserItem = (props) => {
  const { data } = props || null
  return data ? (
    <div className="col-md-3 mb-10">
      <div className="productCard px-3">
        <Avatar
          src={data.icon}
          size="90"
          borderColor="none"
          border={false}
          avatarLink={getUrlByUser(data)}
        />
        <div className="my-3 text-center">
          <div className="style_userName__3dmRv font-size-18">
            <Link to={getUrlByUser(data)}>{data.name}</Link>
          </div>
          <div className="style_post__1CEHk">{htmlParse(data.description)}</div>
        </div>
      </div>
    </div>
  ) : null
}

const SearchUser = (props) => {
  return (
    <div className="row">
      {props.data.map((item, key) => {
        return <UserItem key={key} data={item} />
      })}
    </div>
  )
}

export default SearchUser
