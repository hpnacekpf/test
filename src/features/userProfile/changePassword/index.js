import React from 'react'
// actions
// constants
import { CHANGE_PASSWORD, CHANGE_PASSWORD_ROW } from 'constants/index'
// // queryString
// components
import InfoCard from 'components/InfoCard'
import ProfileInfo from 'components/ProfileInfo'
import FormChangePassword from './Form'
import LoadingComponent from 'components/LoadingComponent'
import SkeletonProfileLeft from 'components/Skeleton/SkeletonProfileLeft'
import SkeletonForm from 'components/Skeleton/SkeletonForm'
import { useChangePassword } from 'reducers/userProfile/hook'
import { withAuthSSR } from 'hocs/withAuth'

const ChangePassword = ({
  history,
  idUser,
  user,
  handleEditProfile,
  handleOpenContent,
  isLoadingPage
}) => {
  const [changePassword] = useChangePassword()

  const onSubmitForm = (data) => {
    changePassword(data.currentPassword, data.newPassword)
  }

  return user ? (
    <div className={`py-0 profile-user-main utils__content`}>
      <div className={`profile`}>
        <div className={`row`}>
          <div className={`col-xl-4`}>
            <LoadingComponent
              isLoading={isLoadingPage}
              loadingComponent={<SkeletonProfileLeft />}
            >
              <ProfileInfo
                userProfile={user}
                userId={idUser}
                history={history}
                handleEditProfile={handleEditProfile}
                hideReview={false}
                handleOpenContent={handleOpenContent}
                isSelected={CHANGE_PASSWORD}
              />
            </LoadingComponent>
          </div>
          <div className="col-xl-8">
            <InfoCard
              widthTitle="col-lg-10 col-md-12"
              frameCss="mt-0 card-body-mobile"
              headerCss="d-flex justify-content-center"
              title={'change password'}
            >
              <LoadingComponent
                isLoading={isLoadingPage}
                loadingComponent={<SkeletonForm row={CHANGE_PASSWORD_ROW} />}
              >
                <FormChangePassword
                  onSubmit={onSubmitForm}
                  userProfile={user}
                  history={history}
                />
              </LoadingComponent>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default withAuthSSR({ checkId: true })(ChangePassword)
