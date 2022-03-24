import React from 'react'
// Constants
import enumType from 'constants/enumType'
// Component
import Feature from 'components/Feature'
import Control from 'components/Control'

const RefundableDeposit = ({ product }) => {
  return product.deposit > 0 ? (
    <React.Fragment>
      <hr />
      <Feature header="Refundable Deposit">
        <div className={`d-flex justify-content-between`}>
          <Control
            type={enumType.controlType.RefundableDeposit}
            applied={product.deposit > 0}
            deposit={product.deposit ? product.deposit : 0}
          />
        </div>
      </Feature>
    </React.Fragment>
  ) : null
}

export default RefundableDeposit
