import { TERM_STATUS } from 'constants/enum'
import { transform } from 'reducers/payment/query'

const userQuery = `
      _id
      mailEncrypt
      verification
      skipRegisterPhone
      phoneEncrypt
      phoneVerified
      skipLocation
      name
      slug
      sellStatus
      description
      isOldUser
      icon
      iconThumbnail
      banner
      isFirstLoggedIn
      isTermsOfUse
      isLoanPolicy
      isPrivacyPolicy
      isProhibitedItems
      paymentCity
      paymentAddress
      paymentZipCode
      paymentCardHoldName
      isSavePaymentInfo
      isSaveDeliveryInfo
      playIds
      buyerRating
      date
      userAddress {
        address
        city
        zipCode
      }
      location {
        _id
        coordinate {
          longitude
          latitude
        }
        placeId
        text
      }
      skipSingPass
      isSingPassVerified
      singPassInfo
      spRegisteredAddress {
        value
        verified
      }
      noaInfo
      membershipPlan {
        name
        isProtected
      }
`
export const login = (username, password) => {
  try {
    const usernameParams = transform(username)
    const passwordParams = transform(password)
    return `
    mutation {
      login(email: "${usernameParams}", password: "${passwordParams}") {
        token
        user { ${userQuery} }
      }
    }
    `
  } catch (error) {
    return ''
  }
}

export const skipSingPass = () => {
  return `
  mutation {
    skipSingpass
  }
  `
}

export const updateProfile = ({
  name,
  description,
  icon,
  banner,
  location
}) => {
  try {
    let queryUser = ''
    const nameParams = name ? transform(name) : null

    queryUser += `name: "${nameParams ?? ''}", `

    const descriptionParams = name ? transform(description) : null

    queryUser += `description: "${descriptionParams ?? ''}", `

    if (icon) {
      if (icon.filename) {
        queryUser += `icon: "${icon.filename}", `
        if (icon.uid) {
          queryUser += `iconFile: "${icon.uid}", `
        }
      }
    } else {
      queryUser += `icon: null, `
      queryUser += `iconFile: null, `
    }

    if (banner) {
      if (banner.filename) {
        queryUser += `banner: "${banner.filename}", `
      }
      if (banner.uid) {
        queryUser += `bannerFile: "${banner.uid}", `
      }
    } else {
      queryUser += `banner: null, `
      queryUser += `bannerFile: null, `
    }

    let queryLocation = ''
    if (location) {
      if (location.placeId) {
        queryLocation += `placeId: "${location.placeId}"`
      }

      if (location.latitude && location.longitude) {
        queryLocation += `, latitude: ${location.latitude}`
        queryLocation += `, longitude: ${location.longitude}`
      }

      if (location.location) {
        const text = transform(location.location)
        queryLocation += `, text: "${text}"`
      }
    }

    return `
    mutation {
      updateUserProfile(
        user: { ${queryUser} }
        location: { ${queryLocation} }
      ) { ${userQuery} }
    }
    `
  } catch (error) {
    return ''
  }
}

export const sendMail = ({ email, isVerification }) => {
  const emailParams = transform(email)

  const whCls = `email: "${emailParams}", isVerification: ${!!isVerification}`

  return `
  mutation {
    sendCode( ${whCls} )
  }
  `
}

export const resetPassword = ({ email, code, password }) => {
  const emailParams = transform(email)

  const codeParams = transform(code)

  const passParams = transform(password)

  return `
  mutation {
    restorePassword(
      email: "${emailParams}"
      verifyCode: "${codeParams}"
      newPassword: "${passParams}"
    ) {
      _id
    }
  }
  `
}

export const register = (username, password) => {
  try {
    const usernameParams = transform(username)
    const passwordParams = transform(password)
    return `
    mutation {
      register(email: "${usernameParams}", password: "${passwordParams}") {
        token
        user { ${userQuery} }
      }
    }
    `
  } catch (error) {
    return ''
  }
}

export const verifyEmail = (code) => {
  const codeParams = transform(code)
  return `
  mutation {
    verification(verifyCode: "${codeParams}") {
      _id
    }
  }
  `
}

export const registerPhone = (phone) => {
  const phoneParams = transform(phone)
  return `
  mutation {
    registerPhoneNumber(phoneNumber: "${phoneParams}")
  }
  `
}

export const skipPhone = () => {
  return `
  mutation {
    skipRegisterPhone
  }
  `
}

export const sendCodeSms = (phoneNumber, checkPhone = false) => {
  const phoneParams = transform(phoneNumber)
  return `
  mutation {
    sendCodeSms(phoneNumber: "${phoneParams}", checkPhone: ${!!checkPhone})
  }
  `
}

export const verifyCodeSms = (phoneNumber, code) => {
  const phoneParams = transform(phoneNumber)
  const codeParams = transform(code)

  return `
  mutation {
    verifyCodeSms(phoneNumber: "${phoneParams}", code: "${codeParams}")
  }
  `
}

export const verifySingPass = (code, forceUpdate) => {
  const codeParams = transform(code)
  return `
  query {
    getPersonInfo(code: "${codeParams}", forceUpdate: ${!!forceUpdate})
  }
  `
}

export const verifyNOA = (code, forceUpdate) => {
  const codeParams = transform(code)
  return `
  query {
    getPersonNOA(code: "${codeParams}", forceUpdate: ${!!forceUpdate})
  }
  `
}

export const skipLocation = () => {
  return `
  mutation {
    skipLocation
  }
  `
}

export const registerLocation = (location = {}) => {
  let query = ``
  if (location) {
    const {
      placeId,
      latitude,
      longitude,
      location: text,
      locationId
    } = location

    if (placeId) {
      query += `placeId: "${placeId}"`
    }

    if (latitude && longitude) {
      query += `, latitude: ${latitude}`
      query += `, longitude: ${longitude}`
    }

    if (text) {
      const textLocation = transform(text)
      query += `, text: "${textLocation}"`
    }

    let whCls = `data: {${query}}`
    if (locationId) {
      whCls += `, where: { _id: "${locationId}" }`
    }

    return `
    mutation {
      updateUserLocation( ${whCls} ) {
        recordId
      }
    }
    `
  }

  return ''
}

export const loginWithApple = (token) => {
  const tokenParams = transform(token)
  return `
  mutation {
    loginWithAppleFE(token: "${tokenParams}") {
      token
      user { ${userQuery} }
    }
  }
  `
}

export const loginWithFacebook = (token, fbId) => {
  const tokenParams = transform(token)
  const fbIdParams = transform(fbId)
  return `
  mutation {
    loginWithFacebook(token: "${tokenParams}", userFacebookId: "${fbIdParams}") {
      token
      user { ${userQuery} }
    }
  }
  `
}

export const loginWithGoogle = (token, ggId) => {
  const tokenParams = transform(token)
  const ggIdParams = transform(ggId)
  return `
  mutation {
    loginWithGoogle(token: "${tokenParams}", userGoogleId:"${ggIdParams}") {
      token
      user { ${userQuery} }
    }
  }
  `
}

export const registerWithApple = (token) => {
  const tokenParams = transform(token)
  return `
  mutation {
    registerWithAppleFE(token: "${tokenParams}") {
      token
      user { ${userQuery} }
    }
  }
  `
}

export const registerWithFacebook = ({ token, fbId, email }) => {
  const tokenParams = transform(token)
  const fbIdParams = transform(fbId)
  const emailParams = transform(email)
  let whCls = `token: "${tokenParams}", userFacebookId: "${fbIdParams}"`
  if (emailParams) {
    whCls += `, email: "${emailParams}"`
  }
  return `
  mutation {
    registerWithFacebook( ${whCls} ) {
      token
      user { ${userQuery} }
    }
  }
  `
}

export const registerWithGoogle = ({ token, ggId, email }) => {
  const tokenParams = transform(token)
  const ggIdParams = transform(ggId)
  const emailParams = transform(email)
  let whCls = `token: "${tokenParams}", userGoogleId: "${ggIdParams}"`
  if (emailParams) {
    whCls += `, email: "${emailParams}"`
  }

  return `
  mutation {
    registerWithGoogle( ${whCls} ) {
      token
      user { ${userQuery} }
    }
  }
  `
}

export const registerEmail = (email) => {
  const emailParams = transform(email)
  return `
  mutation {
    registerEmailWithSocial(email: "${emailParams}") {
      token
      user { ${userQuery} }
    }
  }
  `
}

export const updateUserTerm = (step) => {
  let whCls = ''
  switch (step) {
    case TERM_STATUS.TERM_OF_USE:
      whCls = `isTermsOfUse:  true`
      break
    case TERM_STATUS.PRIVACY_POLICY:
      whCls = `isPrivacyPolicy: true`
      break
    case TERM_STATUS.LOAN_POLICY:
      whCls = `isLoanPolicy: true`
      break
    case TERM_STATUS.PROHIBITED_ITEM:
      whCls = `isProhibitedItems: true`
      break
    default:
      break
  }

  return `
  mutation {
    updateUserTerm(data: { ${whCls} }) {
      record {
        isTermsOfUse
        isLoanPolicy
        isPrivacyPolicy
        isProhibitedItems
      }
    }
  }
  `
}

export const updateFirstLoggedIn = () => {
  return `
  mutation {
    updateUserFirstLoggedIn(data: false) {
      recordId
      record {
        isFirstLoggedIn
      }
    }
  }
  `
}

export const updateAvatar = (image) => {
  let whCls = ''
  if (image) {
    const name = transform(image.filename)
    if (name) {
      whCls += `, icon: "${name}"`
    }
    const id = transform(image._id)
    if (id) {
      whCls += `, iconFile: "${id}"`
    }
  }
  return `
  mutation {
    updateUserAvatar(data: { ${whCls} }) {
      record {
        icon
      }
    }
  }
  `
}

export const updateBanner = (image) => {
  let whCls = ''
  if (image) {
    const name = transform(image.filename)
    if (name) {
      whCls += `, banner: "${name}"`
    }
    const id = transform(image._id)
    if (id) {
      whCls += `, bannerFile: "${id}"`
    }
  }
  return `
  mutation {
    updateUserBanner(data: { ${whCls} }) {
      record {
        banner
      }
    }
  }
  `
}

export const updatePlayId = (playId) => {
  return `
  mutation {
    updateUserPlayId(playId: "${playId}")
  }
  `
}

export const removePlayId = (playId) => {
  return `
  mutation {
    removeUserPlayId(playId: "${playId}")
  }  
  `
}
