import React from 'react'
import { Link } from 'react-router-dom'
// components
import InfoCard from 'components/InfoCard'
import GeneratorSeo from 'components/GeneratorSeo'
// constants
import {
  LENDEE_TRY,
  LENDEE_BUY,
  LENDEE_COLLECT,
  LENDEE_RENT,
  LENDEE_RETURN
} from 'constants/index'
import enumType from 'constants/enumType'
import { routes } from 'routes/mainNav'
import BreadcrumbTNBL from './BreadcrumbTryNowBuyLater'
import { menuTNBL } from 'constants/menu/menuFooter'

const TNBL = (props) => {
  const lendeeTryNowBuyLater = [
    {
      image: LENDEE_RENT,
      title: 'Rent',
      content:
        'Find items with the "Try Now Buy Later" tag, and rent for as long as you like.'
    },
    {
      image: LENDEE_COLLECT,
      title: 'Collect',
      content:
        'Get item delivered to your doorstep or self-collect at the store.'
    },
    {
      image: LENDEE_BUY,
      title: 'Buy',
      content:
        'Like what you used?  Buy it new on Lendor and get your rental money back!'
    },
    {
      image: LENDEE_RETURN,
      title: 'Return',
      content:
        "Don't like what you used? Return the item at the end of the rental and try something new!"
    }
  ]
  return (
    <div className={`utils__content`}>
      <GeneratorSeo
        title={`Try Now, Buy Later -  Lendee`}
        description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
        keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
      />
      <BreadcrumbTNBL text={menuTNBL.Lendee.text} isMobile={props.isMobile} />
      <InfoCard
        hideBorder={false}
        title={
          <strong className={`customTitleLpp`}>
            TRY NOW, BUY LATER - LENDEE
          </strong>
        }
        lineBorder={true}
        customClassName={'card-lpp'}
      >
        <div className={'row Lpp-lendor font-size-16 lpp-lendee'}>
          <div className="col-12  d-flex justify-content-center">
            <img
              alt="lendee-button"
              className={`p-0 mt-0 w-35 img-fluid img-tnbl `}
              src={LENDEE_TRY}
            />
          </div>
          <div className="mt-10">
            <strong className={`text-justify`}>LENDEE</strong>
            <p className="my-3">
              Unsure of whether to buy that top-end hand-held vacuum cleaner or
              a robot vacuum that does all the work for you? Want to have both
              vacuums in your hands to try out before deciding?
            </p>
          </div>
          <div className="row mt-10">
            {lendeeTryNowBuyLater.map((element, index) => (
              <div className="col-md-6 col-xl-3 mb-10" key={index}>
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
