// constant
import {
  DefaultIconLPP,
  icon_email,
  icon_facebook,
  icon_google_plus,
  icon_phone,
  singPassBlackImg
} from 'constants/index'
// extensions
import {
  isHasSingPass,
  isUserFacebookVerified,
  isUserGoogleVerified,
  isUserPhoneVerified
} from 'extensions/user'
import React from 'react'

const VerificationInformation = ({ customClass, user = {} }) => {
  const { membershipPlan } = user
  return (
    <div className={`font-size-12 mt-2 ${customClass ? customClass : ''}`}>
      <span>Verified</span>
      <span className={'px-10'}>
        <img
          alt="email-icon"
          className="max-height__12 max-min-w_13 "
          src={icon_email}
        />
      </span>
      {isUserPhoneVerified(user) ? (
        <span className="pr-3 py-2">
          <img
            className="max-height__12 min-width_13"
            src={icon_phone}
            alt="icon-phone"
          />
        </span>
      ) : null}
      {isUserGoogleVerified(user) ? (
        <span className="pr-3 py-2">
          <img
            className="max-height__12 min-width_13"
            src={icon_google_plus}
            alt="icon-google-plus"
          />
        </span>
      ) : null}
      {isUserFacebookVerified(user) ? (
        <span className="pr-3 py-2">
          <img
            className="max-height__12 min-width_13"
            src={icon_facebook}
            alt="icon-facebook"
          />
        </span>
      ) : null}
      {isHasSingPass(user) ? (
        <span className="pr-3 py-2">
          <img
            src={singPassBlackImg}
            alt="singpass-verified"
            className="singpass-verified__icon"
          />
        </span>
      ) : null}
      {membershipPlan ? (
        <div className="d-flex">
          <span className="font-size-14 mb-0 custom-membership checkIsMobile ">
            MEMBERSHIP TYPE:{' '}
            {membershipPlan && membershipPlan.isProtected ? (
              <span>
                {membershipPlan.name} <img src={DefaultIconLPP} alt="LPP" />
              </span>
            ) : (
              'FREE'
            )}
          </span>
        </div>
      ) : null}
    </div>
  )
}

export default VerificationInformation
