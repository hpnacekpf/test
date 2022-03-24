import React from 'react'
import { Link } from 'react-router-dom'
// components
import CustomButton from '../Button/CustomButton'
// constants
import ProductAction from '../ProductAction'

const ButtonManager = ({ productId, ownerProduct, handleDelete }) => {
  return ownerProduct ? (
    <div className="d-flex flex-md-row flex-column justify-content-between custom-buttonFooter">
      <div className="col-12 col-lg-11 col-md-10 my-0 pl-0">
        <CustomButton
          type="link"
          buttonType="btn-color-main"
          buttonClass="btn-large text-uppercase infoCard__title text-color-o06 btn-manager__edit-listing"
        >
          <Link to={`/product/edit/${productId}`}>Edit Listing</Link>
        </CustomButton>
        <CustomButton
          // handleClick={handleManageCalendar}
          buttonType="btn-color-main-outline"
          buttonClass="btn-large text-uppercase infoCard__title text-color-o06 ml-4 btn-manager__calendar"
        >
          <Link to={`/product/manage-calendar/${productId}`}>
            Manage Calendar
          </Link>
        </CustomButton>
      </div>
      <div className="col-1 col-lg-1 col-md-2 pr-0 text-right product-action product-action-desktop">
        <ProductAction handleDelete={handleDelete} />
      </div>
    </div>
  ) : null
}

export default ButtonManager
