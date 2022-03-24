import React from 'react'
import PropTypes from 'prop-types'
import Spin from 'antd/lib/spin'
import Comment from './Comment'
import { LENDOR_TYPE } from 'constants/enum'

const ReviewContent = (props) => {
  const {
    reviews,
    totalReviewByType,
    handleLoadMoreReview,
    loadingUserReview,
    activeTab
  } = props
  return (
    <div>
      {reviews && reviews.length > 0 ? (
        <Spin spinning={loadingUserReview}>
          {reviews.map((review, index) => {
            const comment =
              activeTab === LENDOR_TYPE.LENDOR
                ? review.lendorText
                : review.buyerText
            return (
              <Comment
                key={index}
                user={review.reviewBy}
                comment={comment}
                rate={review.lendorRating || review.buyerRating}
                time={review.createdAt}
              />
            )
          })}
          {totalReviewByType > reviews.length ? (
            <div className="text-center">
              <a
                className="btn bg__load-more border-0 text__button text-uppercase px-50 py-3 font-size-12"
                onClick={handleLoadMoreReview}
              >
                Load More
              </a>
            </div>
          ) : null}
        </Spin>
      ) : (
        <p className="text-center text__button font-size-18">
          No Review Available Yet
        </p>
      )}
    </div>
  )
}

ReviewContent.propTypes = {
  reviews: PropTypes.any,
  totalReviewByType: PropTypes.number,
  handleLoadMoreReview: PropTypes.func
}
export default ReviewContent
