import React, { Fragment } from 'react'
import { CONFIRM_MODAL_TEXT } from 'constants/index'

const MessageConfirmDeal = ({ isOptedIn, isLPP }) => {
  return (
    <Fragment>
      <span className={`d-block mb-4`}>
        {isOptedIn && isLPP
          ? // ? `By confirming, you agree to the terms and conditions under Lendor Protection Guarantee with a protection quantum capped at $${utils.showDecimalPlace(orderCalculate ? orderCalculate.priceLPPCost : 0)}`
            CONFIRM_MODAL_TEXT
          : `By confirming, you have agreed to be liable for the loss and damage of the item as described in the loan policy.`}
      </span>
      <span className={'d-block mb-0'}>Do you wish to proceed?</span>
    </Fragment>
  )
}

export default MessageConfirmDeal
