//libs
import React from 'react'
import { useModal } from 'hooks/useModal'
import { REDUX_MODAL } from 'constants/enum'

const BannerBusiness = () => {
  const [openModalRedux] = useModal()

  const handleClick = () => {
    openModalRedux(REDUX_MODAL.LENDOR_FOR_BUSINESS)
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <picture>
        <source
          media="(min-width:768px)"
          srcSet={require('img/business/banner-desktop.png')}
        />
        {/* <source media="(min-width:465px)" srcset="img_white_flower.jpg" /> */}
        <img
          src={require('img/business/banner-desktop.png')}
          alt="lendor business page"
          className="img-fluid"
        />
      </picture>
    </div>
  )
}
export default BannerBusiness
