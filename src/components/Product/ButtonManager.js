import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// components
import CustomButton from '../Button/CustomButton'
// constants
import ProductAction from '../ProductAction'
// libs
import classNames from 'classnames'
import { isServer } from 'utils/client-api'

const ButtonManager = ({ productId, ownerProduct, className }) => {
  const [btnIsFixed, setBtnIsFixed] = useState(true)

  const btnMobileClass = 'btn-manager-mobile'

  if (!isServer) {
    if (className === btnMobileClass) {
      if (ownerProduct) {
        window.onscroll = () => {
          if (className === btnMobileClass) {
            const bodyPos = document.querySelector('.card')
            const btnPos = document.querySelector(`.${btnMobileClass}`)
            if (bodyPos && btnPos) {
              setBtnIsFixed(
                !(
                  window.pageYOffset >=
                  bodyPos.offsetTop +
                  bodyPos.offsetHeight +
                  btnPos.offsetHeight -
                  screen.height
                )
              )
            }
          }
        }
      }
    }
  }

  return ownerProduct ? (
    <div
      className={classNames(
        {
          'position-fixed': btnIsFixed && className === btnMobileClass,
          'position-unset': !btnIsFixed
        },
        `d-flex flex-md-row flex-column justify-content-between ${className}`
      )}
    >
      <div
        className={classNames(
          {
            'pr-0': className === btnMobileClass
          },
          `col-12 col-lg-11 col-md-10 my-0 pl-0`
        )}
      >
        <CustomButton
          type="link"
          buttonType="btn-color-main"
          buttonClass="btn-large text-uppercase infoCard__title text-color-o06 btn-manager__edit-listing"
        >
          <Link to={`/product/edit/${productId}`}>Edit Listing</Link>
        </CustomButton>
        <CustomButton
          buttonType="btn-color-main-outline"
          buttonClass="btn-large text-uppercase infoCard__title text-color-o06 ml-4 btn-manager__calendar"
        >
          <Link to={`/product/manage-calendar/${productId}`}>
            Manage Calendar
          </Link>
        </CustomButton>
      </div>
      <div
        className="col-1 col-lg-1 col-md-2 pr-0 text-right product-action product-action-desktop">
        <ProductAction productId={productId}/>
      </div>
    </div>
  ) : null
}

export default ButtonManager
