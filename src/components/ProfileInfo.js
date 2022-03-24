//constants
import {
  DEFAULT_USER_NAME,
  enableSingPassFeature,
  icon_success,
  isBlockUserEnabled
} from 'constants/index'
import { getUrlUserWithDomain } from 'extensions/url'
//extensions
import {
  getUserLocation,
  getUserName,
  isOwnerWithUser,
  isUserProtected,
  isVerifiedAccount
} from 'extensions/user'
import xss from 'extensions/xss'

// features
import Actions from 'features/userProfile/Actions'
import ProfileImage from 'features/userProfile/ProfileImage'
import UserReview from 'features/userProfile/userReview'
import { useGetUser } from 'hooks/globalStores/useAuthStore'

// libs
import React, { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'

// custom hook
import { useBlockUser, useUnBlockUser } from 'reducers/blockUser/hook'

// routes
import { routes } from 'routes/mainNav'
import { useGetBlockUser } from 'reducers/blockUser/hook'
// components
import CustomButton from './Button/CustomButton'
import InfoCard from './InfoCard'
import MapEmbeded from './MapEmbeded'
import ShareSocial from './ShareSocial'
import VerificationInformation from './VerificationInformation'
import CategoryFilter from 'features/userProfile/CategoryFilter'

const ProfileInfo = (props) => {
  // props
  const { userId, userProfile, hideReview, isSelected } = props

  // use hook
  const history = useHistory()

  // custom hook
  const currentUser = useGetUser()
  const [onBlockUser] = useBlockUser()
  const [onUnBlockUser] = useUnBlockUser()
  const { blockUsers, isLoading } = useGetBlockUser()

  // defined variables
  const isPremiumUser = isUserProtected(currentUser)
  const showAction = isOwnerWithUser(userProfile, currentUser, '_id')
  const userLocation = getUserLocation(userProfile)
  const isBlocked = blockUsers
    ? blockUsers.some((user) => user._id === userProfile?._id)
    : false

  // function handlers
  const handleOnClick = () => {
    if (isBlocked) {
      onUnBlockUser(userProfile?._id)
    } else {
      onBlockUser(userProfile?._id)
    }
  }

  return userProfile ? (
    <div>
      <ProfileImage chooseChangeImage={showAction} userProfile={userProfile} />

      {showAction && !isUserProtected(userProfile) ? (
        <Link to={routes.ENTERPRISE_SOLUTION_PRICING}>
          <CustomButton
            buttonType="btn-color-main"
            block={true}
            buttonClass="mb-4"
          >
            Upgrade Plan
          </CustomButton>
        </Link>
      ) : null}

      <InfoCard
        customClassName={`edit__profile-mobile`}
        hideBorder={false}
        bodyCss="py-3 card-name px-0"
        title={
          <div className="row">
            <div className="col-9">
              <strong className="d-flex align-items-center font-roboto text-initial">
                {userProfile.name || DEFAULT_USER_NAME}{' '}
                {isVerifiedAccount({
                  user: userProfile,
                  checkSingPass: enableSingPassFeature
                }) ? (
                  <img
                    alt="success"
                    className="ml-2 max-min-w_15px"
                    src={icon_success}
                  />
                ) : null}
              </strong>
              <VerificationInformation user={userProfile} />
            </div>
          </div>
        }
      >
        {userProfile.description ? (
          <Fragment>
            <ShareSocial
              url={getUrlUserWithDomain(userProfile)}
              quote={`Hey! Check out ${getUserName(
                userProfile
              )}’s profile on Lendor!`}
              className={`px-20`}
            />
            <p className="px-20 mt-3 font-size-16">
              {xss.htmlParseWithoutXss(userProfile.description)}
            </p>
          </Fragment>
        ) : null}
      </InfoCard>
      {// Edit Profile
      showAction ? (
        <Actions
          history={history}
          id={userProfile._id}
          slug={userProfile.slug}
          isSelected={isSelected}
          isPremiumUser={isPremiumUser}
        />
      ) : currentUser && isBlockUserEnabled ? (
        <div className="card border-card">
          <div className={`card-body pa__20`}>
            <CustomButton
              type={'link'}
              buttonType="btn-color-grey-outline"
              buttonClass={`d-block w-100 mt__10 btn-edit font-weight__400`}
              handleClick={handleOnClick}
              disabled={isLoading}
            >
              {`${isBlocked ? 'Unblock' : 'Block'}
                @${getUserName(userProfile)}`}
            </CustomButton>
          </div>
        </div>
      ) : null}
      {userLocation && userLocation.coordinate ? (
        <InfoCard hideBorder={false} bodyCss="p-0 border-radius-5">
          <MapEmbeded
            coordinate={userLocation.coordinate}
            text={userLocation.text}
            height={200}
          />
        </InfoCard>
      ) : null}
      {hideReview ? null : (
        <InfoCard hideBorder={false} bodyCss="p-0 border-radius-5">
          <div className="pa__20">
            <UserReview userId={userId} />
          </div>
        </InfoCard>
      )}
      <InfoCard hideBorder={false} bodyCss="p-0 border-radius-5">
        <CategoryFilter />
      </InfoCard>
    </div>
  ) : null
}

export default ProfileInfo
