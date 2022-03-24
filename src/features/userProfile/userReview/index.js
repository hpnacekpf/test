import React from 'react'
import Tabs from 'antd/lib/tabs'
import PropTypes from 'prop-types'
import ReviewContent from 'components/ReviewContent'
import { useUserReview } from 'reducers/userProfile/hook'
import { LENDOR_TYPE } from 'constants/enum'

const TabPane = Tabs.TabPane

const UserReview = () => {
  const {
    activeTab,
    reviews,
    loading,
    totalReview,
    onLoadMore,
    handleChangeTab
  } = useUserReview()

  return (
    <div className="reviews">
      <h4 className=" font-size-16 font-weight-bold text-color-primary-v2">
        Reviews: ({totalReview.totalReview})
      </h4>
      <hr className="my-4" />
      <Tabs onChange={handleChangeTab} className="custom-tab__review">
        <TabPane
          tab={
            <div className="font-size-16 text-color-primary-v2">
              <i className="icmn-bubbles mr-2" />
              As a Lendor
            </div>
          }
          key={LENDOR_TYPE.LENDOR}
        />
        <TabPane
          tab={
            <div className="font-size-16 text-color-primary-v2">
              <i className="icmn-bubbles mr-2 " />
              As a Lendee
            </div>
          }
          key={LENDOR_TYPE.LENDEE}
        />
      </Tabs>
      <ReviewContent
        activeTab={activeTab}
        reviews={reviews}
        handleLoadMoreReview={onLoadMore}
        totalReviewByType={totalReview.review}
        loadingUserReview={loading}
      />
    </div>
  )
}

UserReview.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserReview
