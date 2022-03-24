import React from 'react'
import className from 'classnames'
import { Link } from 'react-router-dom'
import CustomButton from 'components/Button/CustomButton'
import { getUrlProfile } from 'extensions/url'
import {
  CHANGE_PASSWORD,
  EDIT_PROFILE,
  RENTAL_SETTINGS,
  VIEW_PRODUCTS
} from 'constants/index'
import { getUrlEditProfile } from 'extensions/url'

const Actions = ({ id, slug, isSelected, isPremiumUser }) => {
  return (
    <div className="card border-card">
      <div className="card-body pa__20">
        <h5 className="mb-3 text__card-header font-size-16">View</h5>
        <div className="profile__actions mb-10">
          <CustomButton
            type={'link'}
            buttonType="btn-color-grey-outline"
            disabled={isSelected === VIEW_PRODUCTS}
            buttonClass={className(
              {
                'btn-disable': isSelected === 'View Products'
              },
              `d-block w-100 mt__10 btn-edit font-weight__400`
            )}
          >
            <Link to={getUrlProfile(id, slug)}>View Products</Link>
          </CustomButton>

          {/* <CustomButton
            type={'link'}
            buttonClass={className({
            }, `d-block w-100 mt__10 btn-edit font-weight__400`)}
          >
            <Link to={getUrlOrderApplyAffiliate(id, slug)}>
              Order Apply Affiliate
            </Link>
          </CustomButton> */}

          <CustomButton
            type={'link'}
            buttonType="btn-color-grey-outline"
            disabled={isSelected === EDIT_PROFILE}
            buttonClass={className(
              {
                'btn-disable': isSelected === 'Edit Profile'
              },
              `d-block w-100 mt__10 btn-edit font-weight__400`
            )}
          >
            <Link to={getUrlEditProfile(id, slug)}>Edit Profile</Link>
          </CustomButton>

          <CustomButton
            type={'link'}
            buttonType="btn-color-grey-outline"
            disabled={isSelected === CHANGE_PASSWORD}
            buttonClass={className(
              {
                'btn-disable': isSelected === 'Change Password'
              },
              `d-block w-100 mt__10 btn-edit font-weight__400`
            )}
          >
            <Link to={`/change-password/${id}`}>Change Password</Link>
          </CustomButton>
          {isPremiumUser ? (
            <CustomButton
              type={'link'}
              buttonType="btn-color-grey-outline"
              disabled={isSelected === RENTAL_SETTINGS}
              buttonClass={className(
                {
                  'btn-disable': isSelected === RENTAL_SETTINGS
                },
                `d-block w-100 mt__10 btn-edit font-weight__400`
              )}
            >
              <Link to={`/rental-settings/${id}`}>Rental Settings</Link>
            </CustomButton>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Actions
