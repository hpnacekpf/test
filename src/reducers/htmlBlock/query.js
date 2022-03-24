import { MEMBERSHIP_STATUS } from 'constants/enum'
import extensions from 'extensions/string'

/**
 * get MediaFE by type
 * @param {*} type
 * @returns
 */
export const getMediaFE = (type) => {
  try {
    const typeParams = extensions.removeEscapeCharacter(type)
    const whCls = typeParams ? `where: {type: "${typeParams}"}` : `where: {}`
    return `
    query {
      mediasFE(${whCls}) {
        _id
        title
        url
        content
        icon
        background
        publishedAt
        createdAt
      }
    }
    `
  } catch (error) {
    return ''
  }
}

/**
 * get faq by status and sort
 * @param {*} status
 * @param {*} sort
 * @returns
 */
export const getFAQ = (status, sort) => {
  try {
    const statusParams = extensions.removeEscapeCharacter(status)
    const sortParams = extensions.removeEscapeCharacter(sort)
    const whCls = `filter: { status: ${statusParams}}, sort: ${sortParams}`
    return `
    query {
      surveyDetails (${whCls}) {
        _id
        title
        answer
        description
        type
        status
        priority
        createdAt
      }
    }
    `
  } catch (error) {
    return ''
  }
}

export const getFAQBusiness = (status) => {
  try {
    const statusParams = extensions.removeEscapeCharacter(status)
    const whCls = ` status: ${statusParams}`
    return `
    query {
      getFAQsBusiness (${whCls}) {
        title
        answer
        description
        buttonType
      }
    }
    `
  } catch (error) {
    return ''
  }
}

/**
 * get htmlBlock by code
 * @param {*} code
 * @returns
 */
export const getHtmlBlock = (code) => {
  try {
    const codeParams = extensions.removeEscapeCharacter(code)
    const whCls = `filter: {code: "${codeParams}"}`
    return `
    query {
      htmlBlockFindOne(${whCls}) {
        _id
        code
        content
      }
    }
    `
  } catch (error) {
    return ''
  }
}

/**
 * get htmlBlock by code
 * @param {*} code
 * @returns
 */
export const getMembershipPlans = () => {
  try {
    return `
    query {
      getMembershipPlans {
        _id
        name
        isProtected
        lendorProtectionPlan
        status
        isUnlimitProduct
        limitProducts
        isRentalDeposit
        isCalendarManagement
        isProductSearchPriority
        isProductMigration
        isMassProductUpload
        isChangeQuantity
        isFeature
        allowCredit
        isMinimumRentalDuration
        isMinimumRentalNotice
        isApplyPromoCodes
        isOfflineToOnlineRentalKit
        pricePerMonth
        commissions
        mediaValue
        priority
        isAnnualPlan
      }
    }
    `
  } catch (error) {
    return ''
  }
}
