//libs
import React, { useEffect, useState } from 'react'
import Menu from 'antd/lib/menu'
import Dropdown from 'antd/lib/dropdown'
import { Link } from 'react-router-dom'
//components
import Avatar from '../../Avatar'
//constants
import { routes } from 'routes/mainNav'
//utils
import utils from 'utils'
import { getUrlEditProfileByUser } from 'extensions/url'
import { getAvatarByUser } from 'extensions/image'
import { getUrlByUser } from 'extensions/url'
import { getEmailByUser, getPhoneByUser, getUserBalance } from 'extensions/user'
import { useSelector } from 'react-redux'

const ProfileMenu = (props) => {
  const { user, handleEditProfile, handleLogout, displayBalanceUser } = props
  const isOpenProfileDropdown = useSelector(
    (state) => state?.reactTour?.profileDropdown ?? false
  )
  const [isVisible, setIsVisible] = useState(false)

  let username
  if (user.name) {
    username = user.name
  } else {
    const email = getEmailByUser(user)
    username = utils.getNameFromEmail(email)
  }

  const isMediumScreen =
    typeof window !== 'undefined' && window.innerWidth < 992
  const lend = (
    <Menu.Item>
      <Link
        to={routes.PRODUCT_CREATE}
        className="btn-lend-mobile"
        onClick={() => setIsVisible(!isVisible)}
      >
        <strong>Lend An Item</strong>
      </Link>
    </Menu.Item>
  )

  const userBalance = (
    <Menu.Item>
      <span className="font-weight-bold mr-2">Balance: </span>
      <span className="text-color-black-v1">
        ${utils.showDecimalPlace(getUserBalance(user))}
      </span>
    </Menu.Item>
  )
  const menu = (
    <Menu selectable={false} className="menu_profile">
      <Menu.Item
      //onClick={ handleEditProfile ? () => handleEditProfile (false) : null }
      >
        <Link to={getUrlByUser(user)} onClick={() => setIsVisible(!isVisible)}>
          <strong>Hello, {username}</strong>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      {isMediumScreen && displayBalanceUser ? userBalance : null}
      {isMediumScreen && displayBalanceUser ? <Menu.Divider /> : null}
      <Menu.Item className="menu-not-hover">
        <div onClick={() => setIsVisible(!isVisible)}>
          <strong>Email: </strong>
          {getEmailByUser(user)}
          <br />
          <strong>Phone: </strong>
          {getPhoneByUser(user)}
        </div>
      </Menu.Item>
      <Menu.Divider />
      {isMediumScreen ? lend : null}
      {isMediumScreen ? <Menu.Divider /> : null}
      <Menu.Item
        onClick={
          handleEditProfile
            ? () => {
                handleEditProfile(true)
                setIsVisible(!isVisible)
              }
            : null
        }
        className="menu-edit-profile"
      >
        <Link
          to={getUrlEditProfileByUser(user)}
          onClick={() => setIsVisible(!isVisible)}
        >
          <i className={`menu-icon icmn-user`} />
          Edit Profile
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a
          onClick={
            handleLogout
              ? () => {
                  handleLogout()
                  setIsVisible(!isVisible)
                }
              : null
          }
        >
          <i className={`menu-icon icmn-exit`} />
          Logout
        </a>
      </Menu.Item>
    </Menu>
  )

  const avatarUrl = getAvatarByUser(user)
  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      visible={isVisible}
      onVisibleChange={(visible) =>
        setIsVisible(visible || isOpenProfileDropdown)
      }
    >
      <div className={`dropdown-menu-profile`}>
        <Avatar
          isDisableLink
          src={avatarUrl}
          username={user.name}
          size="40"
          borderColor="none"
          border={false}
          square
        />
      </div>
    </Dropdown>
  )
}

export default ProfileMenu
