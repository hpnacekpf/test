import React, { Fragment } from 'react'
import Tabs from 'antd/lib/tabs'
import Divider from 'antd/lib/divider'
import InfoCard from 'components/InfoCard'
import VerificationInformation from 'components/VerificationInformation'
//component

import LikedItems from './contentProduct/LikedItems'
import ShareSocial from 'components/ShareSocial'
import RemoveProductList from './RemoveProductList'
import LoadingComponent from 'components/LoadingComponent'
import SkeletonProductPost from 'components/Skeleton/SkeletonProductPost'
//constant
import {
  icon_success,
  DefaultIconLPP,
  FREE,
  enableSingPassFeature
} from 'constants/index'
import {
  getUserName,
  getUserDescription,
  isVerifiedAccount
} from 'extensions/user'
import { getUrlUserWithDomain } from 'extensions/url'
import xss from 'extensions/xss'
import ListedItems from './contentProduct/ListedItems'

const { TabPane } = Tabs

const UserProduct = ({ userProfile, isLoading, isMyProfile }) => {
  const description = getUserDescription(userProfile)

  const { membershipPlan } = userProfile ?? {}

  const isVerified = isVerifiedAccount({
    user: userProfile,
    checkSingPass: enableSingPassFeature
  })

  return (
    <InfoCard
      hideBorder={true}
      bodyCss="listed-item pt-0"
      title={
        <LoadingComponent
          isLoading={isLoading}
          loadingComponent={<SkeletonProductPost/>}
        >
          <div>
            <strong
              className="d-flex align-items-center font-roboto pt-3 text-initial">
              {getUserName(userProfile)}
              {isVerified ? (
                <img
                  className="ml-2 max-min-w_15px"
                  src={icon_success}
                  alt={'profile'}
                />
              ) : null}
            </strong>
            <VerificationInformation user={userProfile}/>
            <span className="font-size-14 mb-0 custom-membership">
              MEMBERSHIP TYPE:{' '}
              {membershipPlan && membershipPlan.isProtected ? (
                <span>
                  {membershipPlan.name} <img src={DefaultIconLPP} alt="LPP"/>
                </span>
              ) : (
                FREE
              )}
            </span>
            {/* {checkShowEdit
              ? <AffiliateCode
                  handleOnClick={handleOnClick}
                  affiliateCode={affiliateCode}
                  className='mb-3 mt-1'
                  isActive={isActive}
                />
              : null
            } */}
            <ShareSocial
              url={getUrlUserWithDomain(userProfile)}
              quote={`Hey! Check out ${getUserName(
                userProfile
              )}’s profile on Lendor!`}
            />
          </div>
        </LoadingComponent>
      }
      hidePadding={true}
      isBorder={`hide`}
      headerCss={`edit__profile-desktop`}
    >
      {description ? (
        <p className="mt-3 edit__profile-desktop">
          {xss.htmlParseWithoutXss(description)}
        </p>
      ) : (
        ''
      )}
      <Divider className={`my-3 edit__profile-desktop`}/>
      <Tabs defaultActiveKey="1" className="ant-tabs-tab-active ant-tabs-tab ">
        <TabPane tab="Listed Items" key="1">
          <Fragment>
            <ListedItems userProfile={userProfile} showEdit={isMyProfile}/>
            {isMyProfile ? <RemoveProductList hideDelete={false}/> : null}
          </Fragment>
        </TabPane>
        {isMyProfile ? (
          <TabPane tab="Liked Items" key="2">
            <LikedItems/>
          </TabPane>
        ) : null}
      </Tabs>
    </InfoCard>
  )
}

export default UserProduct
