import React from 'react'
// component
import ProductPost from './ProductPost'
import ProfileInfo from 'components/ProfileInfo'
import GeneratorSeo from 'components/GeneratorSeo'
import SkeletonProfileLeft from 'components/Skeleton/SkeletonProfileLeft'
import LoadingComponent from 'components/LoadingComponent'
import RedirectUrl from 'components/RedirectUrl'
import ModalAffiliateCode from 'components/Modal/ModalAffiliateCode'
// Utils
// constant
import { VIEW_PRODUCTS } from 'constants/index'
// extension, services
import { truncateHtmlContent } from 'extensions/html'
import { getUserName } from 'extensions/user'
import { getBannerUrl } from 'extensions/image'
// reselect
import { withAuthSSR } from '../../hocs/withAuth'
import CategoryCarousel from 'components/CategoryCarousel'

const UserProfile = (props) => {
  const { user, isMyProfile, profile } = props

  const currentUser = isMyProfile ? user : profile

  return currentUser ? (
    <div className="py-0 profile-user-main utils__content">
      <RedirectUrl />
      <GeneratorSeo
        title={getUserName(currentUser)}
        description={truncateHtmlContent(currentUser.description)}
        image={getBannerUrl(currentUser.banner)}
      />
      <div className="profile">
        <div className="row">
          <div className="col-xl-4">
            <LoadingComponent
              isLoading={props.isLoadingPage}
              loadingComponent={<SkeletonProfileLeft />}
            >
              <ProfileInfo
                userProfile={currentUser}
                userId={currentUser._id}
                hideReview={false}
                isSelected={VIEW_PRODUCTS}
              />
            </LoadingComponent>
          </div>
          <div className="col-xl-8">
            <ProductPost
              isMyProfile={isMyProfile}
              isLoading={props.isLoadingPage}
              userProfile={currentUser}
            />
            <CategoryCarousel />
          </div>
        </div>
      </div>
      <ModalAffiliateCode classInput="custom-modal-affiliate" />
    </div>
  ) : null
}

export default withAuthSSR({ checkId: false })(UserProfile)
