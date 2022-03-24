import { REDUX_MODAL, USER_STATUS } from 'constants/enum'

import {
  DEFAULT_LIMIT_ITEMS,
  DEFAULT_SIZE_AVATAR,
  DEFAULT_USER_NAME,
  enableSingPassFeature
} from 'constants/index'
import { decryptFieldValue } from './crypto'

export const isUser = (user) => {
  return !!user
}

export const isUserByAuth = (auth) => {
  return auth && auth.user
}

export const getAffiliateCodeByUser = (user) => {
  return isUser(user) && user.affiliateCode
}

export const isCompleteProfile = ({ user, checkLocation, checkSingPass }) => {
  let isVerified = true
  if (checkLocation) {
    isVerified = isUserSkipLocation(user) || isHasLocation(user)
  }

  if (checkSingPass) {
    isVerified = isUserSkipSingPass(user) || isHasSingPass(user)
  }
  return (
    isUser(user) &&
    isCompleteVerification({ user, checkLocation, checkSingPass }) &&
    isHasUserName(user) &&
    isVerified
  )
}

export const isHasLocation = (user) => {
  return isUser(user) && isLocation(user.location)
}

export const isLocation = (location) => {
  if (!location || !location.text) return false
  const lat = location.coordinate?.latitude
  const lng = location.coordinate?.longitude
  return !!(lat && lng && location.text.length > 0)
}

export const isHasUserName = (user) => {
  return !!(isUser(user) && user.name)
}

export const isHasAvatar = (user) => {
  return !!(isUser(user) && user.icon)
}

export const isHasBanner = (user) => {
  return !!(isUser(user) && user.banner)
}

export const isHasSlug = (user) => {
  return !!(isUser(user) && user.slug)
}

export const isHasMail = (user) => {
  return !!(isUser(user) && user.mailEncrypt)
}

export const isOwner = (userId, user) => {
  if (!userId || !user) return false
  return userId === user._id
}

export const isOwnerWithUser = (user, currentUser, field) => {
  if (!user || !currentUser) return false
  if (!field) return false
  return isOwner(user[field], currentUser)
}

export const isUserVerification = (user) => {
  return isUser(user) && user.verification
}

export const isUserSkipRegisterPhone = (user) => {
  return isUser(user) && user.skipRegisterPhone
}

export const isUserSkipLocation = (user) => {
  return isUser(user) && user.skipLocation
}

export const isUserSkipSingPass = (user) => {
  return isUser(user) && user.skipSingPass
}

export const isUserPhoneVerified = (user) => {
  return isUser(user) && user.phoneVerified
}

export const isUserGoogleVerified = (user) => {
  return isUser(user) && user.googleAuth
}

export const isUserFacebookVerified = (user) => {
  return isUser(user) && user.facebookAuth
}

export const isCompleteVerification = ({
  user,
  checkLocation,
  checkSingPass
}) => {
  // 1. check complete verified mail
  let isVerified = isUser(user) && isUserVerification(user)

  if (!isVerified) return false

  // 2. check complete phone
  const isSkipPhone = isUserSkipRegisterPhone(user)

  isVerified = isSkipPhone ? true : isUserPhoneVerified(user)

  if (!isVerified) return false

  // 3. check location and singpass
  // case 3.1: not skip location + check location => check register location
  const isSkipLocation = isUserSkipLocation(user)

  if (checkLocation && !isSkipLocation) {
    isVerified = isHasLocation(user)
  }

  // case 3.2: not skip singpass and check singpass => check register singpass
  const isSkipSingPass = isUserSkipSingPass(user)

  if (isVerified && checkSingPass && !isSkipSingPass) {
    isVerified = isHasSingPass(user)
  }

  return isVerified
}

export const isVerifiedAccount = ({ user, checkSingPass }) => {
  // 1. check complete verified mail
  let isVerified = isUser(user) && isUserVerification(user)

  if (!isVerified) return false

  // 2. check complete phone

  isVerified = isUserPhoneVerified(user)

  if (!isVerified) return false

  // 3. check  singpass

  // case 3.2: not skip singpass and check singpass => check register singpass

  if (isVerified && checkSingPass) {
    isVerified = isHasSingPass(user)
  }

  return isVerified
}

export const checkUserVerification = ({
  auth,
  checkLocation,
  checkSingPass
}) => {
  return (
    isUserByAuth(auth) &&
    isCompleteVerification({
      user: auth.user,
      checkLocation,
      checkSingPass
    })
  )
}

export const isUserProtected = (user) => {
  if (!isUser(user)) return false
  if (!user.membershipPlan) return false
  return user.membershipPlan.isProtected || false
}

export const isChangeQuantity = (user) => {
  if (!isUser(user)) return false
  if (!user.membershipPlan) return false
  return user.membershipPlan.isChangeQuantity || false
}

export const isLimitProducts = (user) => {
  if (!isUser(user)) return true
  const limit = getLimitProducts(user)
  if (!limit || limit === 0) return false
  return user.products >= limit
}

export const getLimitProducts = (user) => {
  if (!isUser(user)) return DEFAULT_LIMIT_ITEMS
  if (isUserProtected(user)) return null
  if (!user.membershipPlan) return DEFAULT_LIMIT_ITEMS
  return user.membershipPlan.limitProducts
}

export const getUserName = (user) => {
  if (!isUser(user)) return DEFAULT_USER_NAME
  if (user.name) {
    return user.name
  }
  if (user.mailEncrypt) {
    return decryptFieldValue(user.mailEncrypt)
  }
  return DEFAULT_USER_NAME
}

export const getUserDescription = (user) => {
  if (!isUser(user)) return null
  return user.description
}

export const getUserLocation = (user) => {
  if (!isUser(user)) return null
  return user.location
}

export const getUserThumbnail = (user) => {
  if (!isUser(user)) return null
  return user.icon
}

export const getUserBalance = (user) => {
  if (!isUser(user)) return 0
  return user.balance
}

export const checkUpdatePlayId = (user, playId) => {
  if (!playId || !user) return false
  if (!user.playIds) {
    //update playIds
    return true
  }
  if (user.playIds && user.playIds.length === 0) {
    return true
  }
  //find play id
  const existPlayId = user.playIds.findIndex((item) => item === playId)

  return existPlayId < 0
}

export const isOldUser = (user) => {
  return !!(isUser(user) && user.isOldUser)
}

export const isFirstLoggedIn = (user) => {
  return !!(isUser(user) && user.isFirstLoggedIn)
}

export const userAcceptTermsOfUse = (user) => {
  return user.isTermsOfUse
}

export const userAcceptPrivacyPolicy = (user) => {
  return user.isPrivacyPolicy
}

export const userAcceptLoanProlicy = (user) => {
  return user.isLoanPolicy
}

export const userAcceptProhibitedItems = (user) => {
  return user.isProhibitedItems
}

export const isAcceptAllPolicies = (user) => {
  if (!user) return false
  const {
    isTermsOfUse,
    isPrivacyPolicy,
    isLoanPolicy,
    isProhibitedItems
  } = user

  return !!(
    isTermsOfUse &&
    isPrivacyPolicy &&
    isLoanPolicy &&
    isProhibitedItems
  )
}

export const openModelTerms = (checkUserSession) => {
  return !!(
    userAcceptTermsOfUse(checkUserSession) &&
    userAcceptPrivacyPolicy(checkUserSession) &&
    userAcceptLoanProlicy(checkUserSession) &&
    userAcceptProhibitedItems(checkUserSession) &&
    isCompleteVerification({
      user: checkUserSession,
      checkLocation: true,
      checkSingPass: enableSingPassFeature
    })
  )
}

export const getEmailByUser = (user) => {
  if (!isUser(user)) return null
  return decryptFieldValue(user.mailEncrypt)
}

export const getPhoneByUser = (user) => {
  if (!isUser(user)) return null
  return user.phoneEncrypt ? decryptFieldValue(user.phoneEncrypt) : null
}

export const getUserSingPass = (user) => {
  if (!isUser(user)) return null
  return user.singPassInfo ? decryptFieldValue(user.singPassInfo) : null
}

export const getUserNOA = (user) => {
  if (!isUser(user)) return null
  return user.noaInfo ? decryptFieldValue(user.noaInfo) : null
}

export const isInvalidNOA = (user) => {
  const noa = getUserNOA(user)
  let isInvalid = true
  if (noa) {
    const { yearOfAssessment } = noa
    const yearNOA = yearOfAssessment ? Number(yearOfAssessment) : 0
    const currentYear = new Date().getFullYear()
    // if (yearNOA === 0 || yearNOA >= currentYear - 1) {
    //   isInvalid = false
    // }
    isInvalid = false
  }
  return isInvalid
}

export const isInvalidSingpassAddress = (singpass) => {
  return !singpass?.regadd || singpass.regadd.trim().length === 0
}

export const getAvatarSize = (size) => {
  if (!size) return DEFAULT_SIZE_AVATAR
  return size
}

export const getFieldByUser = (user, field) => {
  if (!isUser(user)) return null
  if (!field) return null
  return user[field]
}

export const getLocationInputByUser = (user) => {
  const location = getUserLocation(user)
  const coordinates = location ? location.coordinate : null

  return {
    locationId: location ? location._id : null,
    location: location ? location.text : null,
    placeId: location ? location.placeId : null,
    latitude: coordinates ? coordinates.latitude : null,
    longitude: coordinates ? coordinates.longitude : null
  }
}

export const getUserAddress = (user) => {
  if (!isUser(user)) return null
  if (!user.userAddress) return null
  return user.userAddress || null
}

export const getUserPromoCode = (user) => {
  if (!isUser(user)) return null
  if (!user.userPromoCode) return null
  return user.userPromoCode || null
}

export const getUserIdByParams = (req) => {
  const params = req?.params?.id ?? null
  return params ? params.split('-').reverse()[0] : null
}

export const isHasSingPass = (user) => {
  return !!user?.isSingPassVerified
}

export const getUserStatus = ({
  user,
  fbAccessToken,
  fbId,
  checkLocation,
  checkSingPass,
  allowSkip,
  allowSkipSingPass
}) => {
  if (!user || !user._id) {
    if (fbAccessToken && fbId) {
      return USER_STATUS.VERIFICATION_MAIL
    }
    return USER_STATUS.NOT_REGISTER
  }

  // 1. check mail register
  const isRegisterMail = isHasMail(user)

  if (!isRegisterMail) {
    return USER_STATUS.NOT_REGISTER_EMAIL
  }

  // 2. check mail verified
  const isMailVerified = isRegisterMail && isUserVerification(user)
  if (!isMailVerified) {
    return USER_STATUS.VERIFICATION_MAIL
  }

  // 3. check register phone
  const isSkipPhone = allowSkip ? isUserSkipRegisterPhone(user) : false

  const isRegisterPhone = isSkipPhone ? true : !!getPhoneByUser(user)

  if (!isRegisterPhone) {
    return USER_STATUS.NOT_REGISTER_PHONE
  }

  // 4. check phone verified
  const isPhoneVerified = isSkipPhone
    ? true
    : isRegisterPhone && isUserPhoneVerified(user)

  if (!isPhoneVerified) {
    return USER_STATUS.VERIFICATION_PHONE
  }

  // 5. check location
  let isSkipLocation = allowSkip
    ? checkLocation
      ? isUserSkipLocation(user)
      : true
    : false
  const isRegisterLocation = isSkipLocation ? true : isHasLocation(user)

  if (!isRegisterLocation) {
    return USER_STATUS.NOT_REGISTER_LOCATION
  }

  // 6. check singpass
  const isSkipSingPass = allowSkipSingPass
    ? checkSingPass
      ? isUserSkipSingPass(user)
      : true
    : false
  const isRegisterSingPass = isSkipSingPass ? true : isHasSingPass(user)

  if (!isRegisterSingPass) {
    return USER_STATUS.SINGPASS
  }

  // 7. check complete profile
  const isCompleted = isHasUserName(user) && isHasSlug(user)

  if (!isCompleted) {
    return USER_STATUS.PERSONAL_INFO
  }

  // 8. verified
  return USER_STATUS.VERIFIED
}
