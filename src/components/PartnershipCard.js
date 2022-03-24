import { htmlParseContent, truncateHtmlContent } from 'extensions/html'
import React from 'react'
import { getAvatarUrl, getBannerUrl } from '../extensions/image'
import CustomButton from './Button/CustomButton'

const PartnershipCard = ({ partnership }) => {
  const partnershipImage = getAvatarUrl(partnership?.banner)
  return (
    <div className="productCard custom-product-card m-2 partnership-card">
      <div className="productCard__img">
        <a href={partnership.link} target="_blank" className={'product-image'}>
          <img
            src={partnershipImage}
            alt={partnership.name}
            className="img-fluid mx-auto w-100 img-productCard"
            width={250}
            height={250}
            style={{ objectFit: 'cover' }}
          />
        </a>
      </div>
      <div className="productCard__title mb-1">
        <a
          href={partnership.link}
          target="_blank"
          className={`lendor-color-primary-v1 font-size-16 line-height__15 pt-1 color_main__hover font-roboto w-75`}
        >
          {partnership.name}
        </a>
      </div>
      <p className="partnership-card__desc">
        {htmlParseContent(
          truncateHtmlContent(partnership.description, 140, false, '...')
        )}
      </p>
      <a
        href={partnership.link}
        target="_blank"
        className={`d-flex align-items-center text-truncate partnership-card__btn`}
      >
        <CustomButton
          buttonType="btn-color-grey"
          buttonClass="font-weight-bold w-100"
        >
          VISIT
        </CustomButton>
      </a>
    </div>
  )
}

export default PartnershipCard
