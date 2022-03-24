import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
//component
import ChangeImage from './Upload/UploadImageUser'
//constant
import { updateProfile, imageType } from 'constants/index'
import { getAvatarUrl } from 'extensions/image'
import { getAvatarBackground, getFontSizeAvatar } from 'extensions/avatar'
import { UPLOAD_TYPE } from 'constants/enum'

const Avatar = ({
  changeAvatar,
  avatarLink,
  size,
  src,
  customClass,
  chooseChangeImage,
  square,
  username,
  isHide,
  isDisableLink,
  isMapView,
  history
}) => {
  //get url avatar
  const avatarUrl = getAvatarUrl(src)
  //init class name
  const className = classNames({
    'position-relative': changeAvatar,
    'd-flex align-items-center justify-content-center avatar mx-auto': true,
    [`avatar--${size}`]: size > 0,
    // 'avatar--border avatar-user-in-product': border,
    'avatar--square': square,
    customClass
  })
  // get info avatar
  const avatar = getAvatarBackground(username)
  // init style avatar
  const styleAvatar = avatarUrl
    ? {}
    : {
        fontSize: getFontSizeAvatar(size),
        borderColor: avatar.background,
        backgroundColor: avatar.background
      }

  return (
    <Fragment>
      <div
        className={classNames({
          'd-none': isHide
        })}
      >
        {changeAvatar ? (
          <div className={className} style={styleAvatar}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="User" />
            ) : (
              <div className={`text-uppercase`}>{avatar.username}</div>
            )}
            {chooseChangeImage ? (
              <ChangeImage
                styleCss="btn-change-avatar"
                typeUploadUser={updateProfile.updateAvatar}
                type={UPLOAD_TYPE.AVATAR}
                typeAccept={imageType}
              >
                Change Profile Picture
              </ChangeImage>
            ) : null}
          </div>
        ) : isDisableLink ? (
          <div className={className} style={styleAvatar}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="User" />
            ) : (
              <div className={`text-uppercase`}>{avatar.username}</div>
            )}
          </div>
        ) : isMapView ? (
          <a
            className={`${className} text-white text-decoration-none`}
            onClick={() => history.push(avatarLink ?? '/')}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="User" />
            ) : (
              <div className={`text-uppercase`}>{avatar.username}</div>
            )}
          </a>
        ) : (
          <Link
            className={`${className} text-white text-decoration-none`}
            style={styleAvatar}
            to={avatarLink ? avatarLink : '/'}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="User" />
            ) : (
              <div className={`text-uppercase`}>{avatar.username}</div>
            )}
          </Link>
        )}
      </div>
    </Fragment>
  )
}

export default Avatar
