import React from 'react'
import FormEdit from './Form'
//actions
import { EDIT_PROFILE_ROW, RENTAL_SETTINGS } from 'constants/index'
import utils from 'utils'
// reselect
import ProfileInfo from 'components/ProfileInfo'
import LoadingComponent from 'components/LoadingComponent'
import SkeletonProfileLeft from 'components/Skeleton/SkeletonProfileLeft'
import InfoCard from 'components/InfoCard'
import SkeletonForm from 'components/Skeleton/SkeletonForm'
import { isUserProtected } from 'extensions/user'
import { useRentalSetting, useUpdateRental } from 'reducers/userProfile/hook'

import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { getIdFromSlug } from 'extensions/url'

const RentalSettings = (props) => {
  const { match, history, handleEditProfile, handleOpenContent } = props

  const idUser = getIdFromSlug(match.params.id)

  const user = useGetUser()
  const [setting, loading] = useRentalSetting()
  const isPremiumUser = isUserProtected(user)

  const [onUpdateRentalSetting] = useUpdateRental()
  const onSubmit = (data) => {
    onUpdateRentalSetting(data)
  }

  return setting ? (
    <div className="py-0 profile-user-main utils__content">
      <div className={`profile`}>
        <div className={`row`}>
          <div className={`col-xl-4`}>
            <LoadingComponent
              isLoading={loading}
              loadingComponent={<SkeletonProfileLeft />}
            >
              <ProfileInfo
                userProfile={user}
                userId={user?._id}
                history={history}
                handleEditProfile={handleEditProfile}
                hideReview={false}
                handleOpenContent={handleOpenContent}
                isSelected={RENTAL_SETTINGS}
              />
            </LoadingComponent>
          </div>
          <div className={`col-xl-8`}>
            <InfoCard
              widthTitle="col-lg-10 col-md-12"
              frameCss="mt-0 card-body-mobile"
              headerCss="d-flex justify-content-center"
              title={RENTAL_SETTINGS}
            >
              <LoadingComponent
                isLoading={loading}
                loadingComponent={
                  <SkeletonForm
                    isEditProfileForm={true}
                    row={EDIT_PROFILE_ROW}
                  />
                }
              >
                <FormEdit
                  onSubmit={onSubmit}
                  idUser={idUser}
                  user={setting.user}
                  history={history}
                  isPremiumUser={isPremiumUser}
                />
              </LoadingComponent>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default RentalSettings
