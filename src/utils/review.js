import uniqBy from 'lodash/unionBy'

export const pushCurrentReviews = ({ currentReviews = [], reviews = [] }) => {
  if (currentReviews.length === 0) {
    return reviews
  }
  return uniqBy(currentReviews.concat(reviews), '_id')
}
