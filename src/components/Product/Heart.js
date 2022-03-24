import Tooltip from 'antd/lib/tooltip'
// constants
import { ICON_FAVOURITED, ICON_NOT_FAVOURITED } from 'constants/index'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { useToggleWishlist } from '../../reducers/wishlist/hook'
import ButtonPermission from '../Button/ButtonPermission'

const Heart = (props) => {
  const { productId } = props
  const wishListUser = useSelector((state) => state.wishlist.wishlist)
  const [toggleWishlist, isLikedProduct] = useToggleWishlist()
  const isLiked = isLikedProduct(productId, wishListUser)

  return (
    <ButtonPermission
      className="productCard__like pt-1"
      allowSkip={false}
      checkSingpass={false}
      handleClick={() => {
        toggleWishlist(productId, isLiked)
      }}
      isIcon
    >
      <Tooltip
        title={
          isLiked
            ? 'This product is in your wishlist'
            : 'Click to add product into wishlist'
        }
      >
        <img
          src={isLiked ? ICON_FAVOURITED : ICON_NOT_FAVOURITED}
          className={`float-right favourite-icon`}
          alt=""
        />
      </Tooltip>
    </ButtonPermission>
  )
}

Heart.propTypes = {
  productId: PropTypes.string.isRequired
}

export default Heart
