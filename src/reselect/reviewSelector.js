import { createSelector } from 'reselect'

const getUserReviews = state => state.review?.reviews

const getTotalReview = state => state.review?.totalReview

const getTotalReviewByType = state => state.review?.reviewByType

const initListUserReviews = (listUserReviews = []) => {
  if (!listUserReviews || listUserReviews.length === 0) {
    return 0
  }

  return listUserReviews.map(review => {
    // lendor = seller
    let text
    let rate
    if (review.isLendorSubmitted) {
      text = review.lendorText
      rate = review.lendorRating
    } else {
      text = review.buyerText
      rate = review.buyerRating
    }

    return {
      text,
      rate,
      user: review.reviewBy,
      date: review.createdAt
    }
  })
}

export const selectListUserReviews = () =>
  createSelector(
    [getUserReviews],
    userReviews => initListUserReviews(userReviews)
  )

export const selectTotalUserReviews = () =>
  createSelector(
    [getTotalReview],
    totalReview => totalReview
  )

export const selectTotalReviewByType = () =>
  createSelector(
    [getTotalReviewByType],
    count => count
  )