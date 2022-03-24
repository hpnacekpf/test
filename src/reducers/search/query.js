// constants
import { SORT_TYPE, SORT_PRODUCT } from 'constants/enum'
import { FORMAT_EN_DATE } from 'constants/format'
import { DEFAULT_PAGE_SIZE } from 'constants/index'
// extensions
import dtExtensions from 'extensions/datetime'
import qsExtensions from 'extensions/queryString'
import { transform } from 'reducers/payment/query'

export const convertSortType = (type) => {
  switch (type) {
    case SORT_TYPE.HIGHEST:
      return SORT_PRODUCT.PRICE_DESC
    case SORT_TYPE.LOWEST:
      return SORT_PRODUCT.PRICE_ASC
    case SORT_TYPE.NEAREST:
      return SORT_PRODUCT.DISTANCE_DESC
    case SORT_TYPE.POPULAR:
      return SORT_PRODUCT.VIEW_COUNT_DESC
    default:
      return SORT_PRODUCT.DATE_DESC
  }
}

export const getSearchQuery = (search) => {
  const paging = qsExtensions.getSizeAndIndexPage(search, DEFAULT_PAGE_SIZE)
  const sortBy = convertSortType(search?.sort)

  let whCls = ` 
    isProtected: true,
  `

  if (search.searchby) {
    const type = transform(search.searchby)
    whCls += `searchBy: "${type}",`
  }

  if (search) {
    if (search.keyword) {
      whCls += ` keyword: "${search?.keyword}",`
    }

    if (search.fromDate && search.toDate) {
      const startDate = dtExtensions.formatTimeStampToUtcTime(
        search.fromDate,
        FORMAT_EN_DATE
      )
      const endDate = dtExtensions.formatTimeStampToUtcTime(
        search.toDate,
        FORMAT_EN_DATE
      )
      whCls += ` calendar: {
     fromDate: "${startDate}",
     toDate: "${endDate}"
    }`
    }
  }

  const query = `where: { ${whCls} }, skip: ${paging.skip}, limit: ${
    paging.pageSize
  }, sort: "${sortBy}"`

  try {
    return `
      query {
        searchReferences(${query}) {
          __typename
          ... on SearchUser {
            items {
              _id
              slug
              icon
              name
              description
              mailEncrypt
              iconThumbnail
              banner
              bannerThumbnail
            }
            total
          }
      
          ... on SearchProduct {
            items {
              __typename
              ... on Product {
                _id
                name
                slug
                price
                pictures
                picturesThumbnails
                date
                placeText
                isProtected
                originPrice
                sellStatus
                maxRentalDay
                coordinate {
                  longitude
                  latitude
                }
                user {
                  _id
                  slug
                  name
                  sellStatus
                  membershipPlan{
                    isProtected
                  }
                  location {
                    text
                  }
                  icon
                  iconThumbnail
                  buyerRating
                  buyerRatingSum
                  buyerReviewsNumber
                  lendorRating
                  lendorRatingSum
                  lendorReviewsNumber
                  location {
                    text
                    coordinate {
                      latitude
                      longitude
                    }
                  }
                }
                deliveryType
                discount{
                  weekly
                  monthly
                }
                
              }
              ... on Partnership {
                _id
                name
                description
                banner
                placement
                isDeleted
                position
                priority
                link
                startDate
                endDate
              }
            }
            total
          }
        }
      }
     `
  } catch (error) {
    return ''
  }
}

export const searchLocationGoogleMap = (keyword) => {
  try {
    return `
      query {
        searchLocationGoogleMap(${keyword}){
          id
          place_id
          description
          latitude
          longitude
        }
      `
  } catch (error) {}
}
