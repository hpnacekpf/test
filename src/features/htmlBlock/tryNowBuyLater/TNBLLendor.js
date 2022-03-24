import React from 'react'
import { Link } from 'react-router-dom'
// components
import InfoCard from 'components/InfoCard'
import GeneratorSeo from 'components/GeneratorSeo'
import BreadcrumbTNBL from './BreadcrumbTryNowBuyLater'
// constants
import {
  LENDOR_TRY,
  LENDOR_RENT,
  LENDOR_BUY,
  LENDOR_SEND
} from 'constants/index'
import enumType from 'constants/enumType'
import { routes } from 'routes/mainNav'
import { menuTNBL } from 'constants/menu/menuFooter'

const TNBL = (props) => {
  const lendorTryNowBuyLater = [
    {
      image: LENDOR_RENT,
      title: 'Rent',
      content:
        'Accept pending request for rental of a TNBL item from your very excited Lendee!'
    },
    {
      image: LENDOR_BUY,
      title: 'Buy',
      content:
        'Seems like Lendee loves the item and has requested to buy a new one!'
    },
    {
      image: LENDOR_SEND,
      title: 'Send',
      content:
        'Send a new item over, collect the rental item back, and let the cycle repeat!'
    }
  ]
  return (
    <div className={`utils__content`}>
      <GeneratorSeo
        title={`Try Now, Buy Later - Lendor`}
        description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
        keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
      />
      <BreadcrumbTNBL text={menuTNBL.Lendor.text} isMobile={props.isMobile} />
      <InfoCard
        hideBorder={false}
        title={
          <strong className={`customTitleLpp`}>
            TRY NOW, BUY LATER - LENDOR
          </strong>
        }
        lineBorder={true}
        customClassName={'card-lpp'}
      >
        <div className={'row Lpp-lendor font-size-16 lpp-lendee'}>
          <div className="col-12  d-flex justify-content-center">
            <img
              alt="lendee-button"
              className={`p-0 mt-0 w-35 img-fluid img-tnbl`}
              src={LENDOR_TRY}
            />
          </div>
          <div className="mt-10">
            <strong className={`text-justify`}>LENDOR</strong>
            <p className="my-3">
              Sick of managing rentals and sales of your products on multiple
              platforms? Now, you can do it all on Lendor!
            </p>
          </div>
          <div className="row mt-10 justify-content-center">
            {lendorTryNowBuyLater.map((element, index) => (
              <div className="col-md-6 col-xl-4 mb-10" key={index}>
                <div className="d-flex justify-content-center">
                  <img src={element.image} className="img-fluid img-tnbl" />
                </div>
                <div className="text-center">
                  <h3 className="font-weight-bold mt-20">{element.title}</h3>
                  <span>{element.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </InfoCard>
    </div>
  )
}

export default TNBL
