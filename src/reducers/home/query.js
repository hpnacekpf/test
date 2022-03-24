import { PRODUCT_STATUS } from 'constants/enum'
import { DEFAULT_LIMIT_PARTNER, LIMIT_PRODUCT_FEATURE } from 'constants/index'
import enumType from 'constants/enumType'
import { MAX_TRENDING_CATEGORY_PRODUCT } from 'constants/paging'

//trending category
export const getTrendingCategory = () => {
  try {
    return `
    query {
      homeTrendingProducts (limit: ${MAX_TRENDING_CATEGORY_PRODUCT}){
        category {
          id
          index
          image
          slug
          name
        }
        products {
          _id
          name
          slug
          price
          pictures
          picturesThumbnails
          date
          isProtected
          originPrice
          sellStatus
          maxRentalDay
          discount {
            weekly
            monthly
          }
          coordinate {
            longitude
            latitude
          }
          user {
            _id
            slug
            name
            icon
            sellStatus
            membershipPlan {
              isProtected
            }
            location {
              text
            }
            iconThumbnail
          }
        }
      }
    }
    `
  } catch (error) {
    return ''
  }
}

export const getBanner = () => {
  try {
    return `
    query {
      getBannerHomePage(where: { isHomePage: true }) {
        _id
        name
        description
        banner(filter: { published: true }) {
          _id
          image
          images
          published
          url
          type
          codeEmbed
        }
      }
    }      
    `
  } catch (error) {
    return ''
  }
}

//partnership
export const getPartnership = () => {
  try {
    return `
      query {
        getPartnershipHomePage {
          _id
          name
          description
          banner
          link
        }
      }
    `
  } catch (error) {
    return ''
  }
}

//articles
export const getArticles = () => {
  const whCls = `where: {type: "${enumType.mediaType.ARTICLE}"}, limit: 3`

  try {
    return `
    query {
      articleHome(${whCls}) {
        _id
        title
        author
        publishedAt
        slug
        url
        content
        icon
        background
        createdAt
      }
    }
    `
  } catch (error) {
    return ''
  }
}

// partners
export const getPartners = () => {
  const whCls = `limit: ${DEFAULT_LIMIT_PARTNER} `

  try {
    return `
    query {
      partners(${whCls}) {
        _id
        slug
        banned
        banner
        name
        mailEncrypt
        description
        date
        icon
        buyerRating
      }
    }
    `
  } catch (error) {
    return ''
  }
}

// category features
export const getCategoryFeatures = () => {
  try {
    return `
    query {
      homeFeatureProducts(limit: ${MAX_TRENDING_CATEGORY_PRODUCT}) {
        category {
          id
        index
        image
        name
        slug
        }
        products {
          _id
          name
          slug
          price
          pictures
          status
          isProtected
          originPrice
          sellStatus
          maxRentalDay
          discount {
            weekly
            monthly
          }
          user{
            _id
            name
            slug
            icon
            sellStatus
            iconThumbnail
            location{
              text
            }
            membershipPlan{
              isProtected
            }
          }
        }
      }
    }
    `
  } catch (error) {
    return ''
  }
}

// features/ popular items

export const getPopularItems = () => {
  try {
    return `
    query {
      homeFeatureUser(limitProduct : ${LIMIT_PRODUCT_FEATURE} ) {
        groupBanner {
          _id
          name
          description
          banner {
            _id
            name
            description
             image
             imageMobile
             images
            files {
              _id
              filename
            }
          }
        }
        user {
          _id
          slug
          name
          icon
          description
          iconThumbnail
        }
          products {
            _id
            name
            slug
            price
            pictures
            picturesThumbnails
            date
            isProtected
            sellStatus
            maxRentalDay
            originPrice
            discount {
              weekly
              monthly
            }
            user {
              _id
              slug
              name
              icon
              sellStatus
              location {
                text
              }
              membershipPlan{
                isProtected
              }
            }
            coordinate{
              longitude
              latitude
            }
        }
      }
    }
    `
  } catch (error) {
    return ''
  }
}

//categories
export const getCategories = () => {
  try {
    return `
    query {
      leafCategories {
        _id
        name
        slug
        image
      }
    }
    `
  } catch (error) {
    return ''
  }
}
