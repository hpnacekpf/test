import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import className from 'classnames'
// components
import Avatar from '../Avatar'
import Rating from '../Rating'
import VerificationInformation from '../VerificationInformation'
// constants
import { enableSingPassFeature, icon_success } from 'constants/index'
// services
import utils from 'utils'
import {
  getUserName,
  getUserAddress,
  getPhoneByUser,
  getEmailByUser,
  isVerifiedAccount
} from 'extensions/user'
import { getUrlByUser } from 'extensions/url'

const DeliveryAddress = ({
  isDelivery,
  user,
  addressBuyer,
  cityBuyer,
  zipCodeBuyer,
  lineBoder,
  ownerProduct
}) => {
  const userAddress = getUserAddress(user)
  const phoneNumber = getPhoneByUser(user)

  const email = getEmailByUser(user)

  return (
    <div className="pl-xl-5 pl-md-5 pl-3 ml-1 info-transaction__delivery text__main">
      {isDelivery ? (
        <Fragment>
          <strong>
            {ownerProduct ? 'Delivery Address:' : 'Your delivery address:'}
          </strong>
          <p className="mb-0">{addressBuyer || userAddress.address}</p>
          <span>
            {cityBuyer || userAddress.city}{' '}
            {zipCodeBuyer || userAddress.zipCode}
          </span>
        </Fragment>
      ) : (
        <strong>
          {ownerProduct ? 'Contact Details:' : 'Your Contact Details:'}
        </strong>
      )}
      <div>
        Phone number:{' '}
        {`(${process.env.RAZZLE_APP_PHONE_PREFIX}) ${phoneNumber}`}
      </div>
      <div>Email: {email}</div>
      {lineBoder ? <hr className="my-4" /> : null}
    </div>
  )
}

const UserProfileTransaction = ({ values, ownerProduct }) => {
  if (!values) return null
  if (!values.buyer) return null
  const {
    buyerRating,
    buyerReviewsNumber,
    lendorReviewsNumber,
    icon
  } = values.buyer
  const totalReviews = buyerReviewsNumber + lendorReviewsNumber
  return ownerProduct ? (
    <Fragment>
      <div className="d-md-flex info-transaction">
        <div
          className={className(
            `text-center pr-md-5 info-transaction__profile d-flex align-items-center`,
            {
              'border-right': values.isDelivery
            }
          )}
        >
          <div className="d-flex">
            <div className={'mr-4'}>
              <Avatar
                size="60"
                src={icon}
                border={false}
                avatarLink={getUrlByUser(values.buyer)}
                username={getUserName(values.buyer)}
              />
            </div>
            <div className="profile-content text__main text-left">
              <h3 className="font-weight-bold mb-0 product-name-user profile-content__title">
                <Link
                  className={'text-color-primary-v1 transaction-name'}
                  to={getUrlByUser(values.buyer)}
                >
                  {getUserName(values.buyer)}
                </Link>
                {isVerifiedAccount({
                  user: values.buyer,
                  checkSingPass: enableSingPassFeature
                }) ? (
                  <img
                    className="align-item-center ml-2 max-min-w_15px"
                    src={icon_success}
                    alt={'lendor'}
                  />
                ) : null}
              </h3>
              <VerificationInformation
                customClass="mb-2 custom-handShake"
                user={values.buyer}
              />

              <p className="float-left">
                {utils.showDecimalPlace(buyerRating, 1)}
              </p>
              <Rating
                height={13}
                width={16}
                value={buyerRating ? buyerRating : 0}
                customClass="float-left"
              />
              <p className="buyer-rating-sum float-left">{`(${totalReviews})`}</p>
            </div>
          </div>
        </div>
        <DeliveryAddress
          isDelivery={values.isDelivery}
          addressBuyer={values.addressBuyer}
          cityBuyer={values.cityBuyer}
          zipCodeBuyer={values.zipCodeBuyer}
          user={values.buyer}
          ownerProduct
          isSelfCollection={values?.isSelfCollection}
        />
      </div>
      <hr className="my-4" />
    </Fragment>
  ) : (
    <div>
      <DeliveryAddress
        isDelivery={values.isDelivery}
        addressBuyer={values.addressBuyer}
        cityBuyer={values.cityBuyer}
        zipCodeBuyer={values.zipCodeBuyer}
        user={values.buyer}
        lineBoder
        isSelfCollection={values?.isSelfCollection}
      />
    </div>
  )
}

export default UserProfileTransaction
