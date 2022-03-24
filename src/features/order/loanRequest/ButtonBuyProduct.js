import CustomButton from 'components/Button/CustomButton'
import numberExtensions from 'extensions/number'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'

const ButtonBuyProduct = (props) => {
  const { values } = props
  const history = useHistory()

  const handleBuyProduct = () => {
    history.push(`/buy-product/${values.id}`)
  }
  return (
    <div>
      <CustomButton
        handleClick={handleBuyProduct}
        buttonClass={`text-uppercase infoCard__title mt-4 w-100 btn-deal sell-status-btn`}
      >
        <div className="infoCard__desc">
          <span className={`infoCard__title font-weight-bold text-uppercase `}>
            BUY NOW AT{' '}
            <span className="font-italic tnbl-price__button">
              {numberExtensions.showFormatPrice(values.priceBuyProduct)}
            </span>
          </span>
        </div>
      </CustomButton>
    </div>
  )
}

ButtonBuyProduct.propTypes = {
  values: PropTypes.any
}
export default ButtonBuyProduct
