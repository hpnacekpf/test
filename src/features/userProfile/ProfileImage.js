import React from 'react'
import classNames from 'classnames'
// Component
import Avatar from 'components/Avatar'
import InfoCard from 'components/InfoCard'
import Rating from 'components/Rating'
import ChangeImage from 'components/Upload/UploadImageUser'
import { updateProfile, imageType, DEFAULT_AVATAR } from 'constants/index'
import dateTimeExtensions from 'extensions/datetime'
import { getBannerUrl } from 'extensions/image'
import { getUserName } from 'extensions/user'
import { UPLOAD_TYPE } from 'constants/enum'
import { useGetUser } from 'hooks/globalStores/useAuthStore'

const ProfileImage = ({
  partners,
  chooseChangeImage,
  hideBorder,
  customClassNameCard,
  userProfile
}) => {
  const user = useGetUser()
  const isOwner = !!(user && user?._id === userProfile?._id)
  const profile = isOwner ? user : userProfile
  const name = getUserName(profile)
  return (
    <InfoCard
      bodyCss="p-0"
      hideBorder={hideBorder}
      customClassName={customClassNameCard}
    >
      <div
        className="profile__header border-radius-5 position-relative"
        style={{
          backgroundImage: `url( ${getBannerUrl(profile.banner)})`,
          backgroundPosition: 'center center'
        }}
      >
        <div className="banner-wrap">
          {chooseChangeImage ? (
            <ChangeImage
              styleCss="btn-change-banner"
              typeUploadUser={updateProfile.updateBanner}
              type={UPLOAD_TYPE.BANNER}
              width={418}
              height={310}
              typeAccept={imageType}
            >
              Change Banner
            </ChangeImage>
          ) : null}
        </div>

        <div className="profile__header-card">
          <div className="card-body text-center">
            <div
              className={classNames({
                'mt-5 mb-4 text-center': true,
                visibility__hidden: partners
              })}
            >
              <div>
                <Avatar
                  chooseChangeImage={chooseChangeImage}
                  changeAvatar={true}
                  src={profile.icon}
                  size="130"
                  borderColor="none"
                  border={false}
                  username={name ? name[0] : DEFAULT_AVATAR}
                />
              </div>

              <br />
              <h4 className="text-white mb-0 font-size-9">
                Join Date{' '}
                {dateTimeExtensions.formatTimeStampToString(profile.date)}
              </h4>
              <Rating
                value={profile.buyerRating}
                size={42}
                height={33}
                customClass="mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </InfoCard>
  )
}

export default ProfileImage
