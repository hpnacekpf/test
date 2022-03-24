// constanst
import { SEARCH_TYPE, CATEGORY_STATUS } from 'constants/enum'
import { FORMAT_EN_DATE } from 'constants/format'

// extensions
import dtExtensions from 'extensions/datetime'
import qsExtensions from 'extensions/queryString'
import extensions from 'extensions/string'
import xss from 'extensions/xss'
import { convertSortType } from 'reducers/search/query'

const transform = (str) => {
  if (str) {
    return extensions.removeEscapeCharacter(xss.removeXssContent(str))
  }

  return null
}

export const getProductByCategory = ({ id, search, defaultPageSize }) => {
  const paging = qsExtensions.getSizeAndIndexPage(search, defaultPageSize)
  const sortBy = convertSortType(search?.sort)

  let whCls = `searchBy: "${SEARCH_TYPE.PRODUCTS}", isProtected: true`
  if (id) {
    whCls += `, categorySlug: "${transform(id)}"`
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
    whCls += `, calendar: {
     fromDate: "${startDate}",
     toDate: "${endDate}"
    }`
  }

  const query = `where: { ${whCls} }, skip: ${paging.skip}, limit: ${
    paging.pageSize
  }, sort: "${sortBy}"`

  try {
    return `
    query {
      searchReferences( ${query} ) {
        __typename
          ... on SearchProduct {
            items {
              __typename
              ... on Partnership {
                _id
                name
                description
                banner
                link
              }
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
                sellStatus
                originPrice
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
            }
            total
          }
        }
      }
    `
  } catch (err) {
    return ''
  }
}

export const getCategoryDetail = (slug) => {
  try {
    const slugParams = extensions.removeEscapeCharacter(slug)
    return `
    query {
      categoryDetail(slug: "${slugParams}") {
        isTrending
        trendingPosition
        status
        _id
        index
        name
        icon
        slug
        image
        banner
        metaTitle
        metaDescription
        metaKeyword
        description
      }
    }
    
    `
  } catch (err) {
    return ''
  }
}

export const getCategorySidebarQuery = () => {
  try {
    const query = `filter: { parent: null, status : ${
      CATEGORY_STATUS.NORMAL
    }},sort: priority_ASC`
    return `
      query {
        categorySidebar(${query}) {
          _id
          name
          slug
          isTrending
          trendingPosition
          priority
          menuIcon
          children (filter: {status: ${
            CATEGORY_STATUS.NORMAL
          }}, sort: priority_ASC) {
            _id
            slug
            name
            menuIcon
            priority
            isTrending
            trendingPosition
          }
        }
      }
    `
  } catch (err) {
    return ''
  }
}
