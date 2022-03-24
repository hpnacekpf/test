import React from 'react'
//actions
// HOCS
import {
  EDIT_PROFILE,
  EDIT_PROFILE_ROW,
  enableSingPassFeature
} from 'constants/index'
// reselect
import ProfileInfo from 'components/ProfileInfo'
import FormEdit from './Form'
import LoadingComponent from 'components/LoadingComponent'
import SkeletonProfileLeft from 'components/Skeleton/SkeletonProfileLeft'
import InfoCard from 'components/InfoCard'
import SkeletonForm from 'components/Skeleton/SkeletonForm'
import ProfileSingPass from '../../authentication/singPass/profileSingPass'
import { useUpdateProfile } from 'reducers/userProfile/hook'
import { withAuthSSR } from 'hocs/withAuth'
import { getUrlProfile } from 'extensions/url'

const EditProfile = (props) => {
  const { history, idUser, handleEditProfile, handleOpenContent, user } = props

  const [updateProfile] = useUpdateProfile()

  const onSubmit = (data) => {
    updateProfile(data, (user) => {
      history.push(getUrlProfile(user._id, user.slug))
    })
  }

  return user ? (
    <div className="py-0 profile-user-main utils__content">
      <div className={`profile`}>
        <div className={`row`}>
          <div className={`col-xl-4`}>
            <LoadingComponent
              isLoading={props.isLoadingPage}
              loadingComponent={<SkeletonProfileLeft />}
            >
              <ProfileInfo
                userProfile={user}
                userId={idUser}
                history={history}
                handleEditProfile={handleEditProfile}
                hideReview={false}
                handleOpenContent={handleOpenContent}
                isSelected={EDIT_PROFILE}
              />
            </LoadingComponent>
          </div>
          <div className={`col-xl-8`}>
            <InfoCard
              widthTitle="col-lg-10 col-md-12"
              frameCss="mt-0 card-body-mobile"
              headerCss="d-flex justify-content-center"
              title={'EDIT PROFILE DETAILS'}
            >
              <LoadingComponent
                isLoading={props.isLoadingPage}
                loadingComponent={
                  <SkeletonForm
                    isEditProfileForm={true}
                    row={EDIT_PROFILE_ROW}
                  />
                }
              >
                <FormEdit onSubmit={onSubmit} idUser={idUser} user={user} />
              </LoadingComponent>
            </InfoCard>
            {enableSingPassFeature ? <ProfileSingPass id={idUser} /> : null}
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default withAuthSSR({ checkId: true })(EditProfile)
