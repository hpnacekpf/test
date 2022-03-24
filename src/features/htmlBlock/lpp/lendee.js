import React from 'react'
import { Link } from 'react-router-dom'
// components
import InfoCard from 'components/InfoCard'
import GeneratorSeo from 'components/GeneratorSeo'
// constants
import {
  LPP_BUTTON,
  LENDEE_BUTTON,
  LENDOR_BUTTON_CONTENT,
  IT_WORK,
  LENDEE_NOTE
} from 'constants/index'
import enumType from 'constants/enumType'
import { routes } from 'routes/mainNav'
import BreadcrumbLPP from './BreadcrumbLPP'

const LPP = (props) => {
  return (
    <div className={`utils__content`}>
      <GeneratorSeo
        title={`Lendor Protection Guarantee (LPG) -  Lendor Singapore`}
        description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
        keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
      />
      <BreadcrumbLPP
        text={enumType.menuLPP.Lendee.text}
        isMobile={props.isMobile}
      />
      <InfoCard
        hideBorder={false}
        title={
          <strong className={`customTitleLpp`}>
            Lendor Protection Guarantee - lendee
          </strong>
        }
        lineBorder={true}
        customClassName={'card-lpp'}
      >
        <div className={'row mt-40 Lpp-lendor font-size-20 lpp-lendee'}>
          <div className={'lpp-btn-mobile  text-center pb-3 order-xs-1 '}>
            <div>
              <img
                alt="lendee-button"
                className={`p-0 mt-0 w-100`}
                src={LENDOR_BUTTON_CONTENT}
              />
            </div>
          </div>

          <div className={'col-md-6 col-12 order-xs-2 order-sm-2 order-md-1'}>
            <strong className={`text-justify`}>
              Opt in for LPG during your transactions and enjoy the following
              benefits :
            </strong>
            <ul className="list-style-none Lpp-lendor__list mt-20">
              <li>
                <i className="icon-success-v2" />
                <span className="ml-40">
                  No more large amounts of rental deposits required because we
                  have already looked after your back
                </span>
              </li>
              <li>
                <i className="icon-success-v2" />
                <span className="ml-40">
                  No more worrying about faulty products and unreasonable
                  compensation when the damage is not your fault!*<br />
                  <p className="font-size-14 mb-0 mt-1">
                    *LPG Terms and Condition applies
                  </p>
                </span>
              </li>
            </ul>
            <div>
              <img
                alt="lendee-work"
                className="max-height__70 w-100 mt-30 img-it-work-lendee"
                src={IT_WORK}
              />
            </div>
          </div>

          <div
            className={
              'col-md-6 col-12 order-xs-1 order-sm-1 order-md-2 Lpp-lendor__note lpp-btn-desktop'
            }
          >
            <div>
              <img alt="lendee-button" src={LENDOR_BUTTON_CONTENT} />
            </div>
          </div>

          <div className="col-md-6 col-12 order-xs-4 order-sm-4 order-md-3 mt-60 Lpp-lendor__note">
            <div>
              <img alt="lendee-note" src={LENDEE_BUTTON} />
            </div>
          </div>

          <div className="col-md-6 col-12 order-xs-3 order-sm-3 order-md-4 mt-70  Lpp-lendor__it_work d-flex justify-content-center align-items-center ">
            <ul className="list-style-none  Lpp-lendor__list">
              <li>
                <span className="number">1</span>
                <span className="ml-25">
                  Look for products with a 'Protected'{' '}
                  <img
                    alt="lpp-button"
                    className="max-height_25px"
                    src={LPP_BUTTON}
                  />{' '}
                  icon
                </span>
              </li>
              <li>
                <span className="number">2</span>
                <span className="ml-25">
                  Opt in for Lendor Protection Guarantee when booking the
                  product
                </span>
              </li>
              <li>
                <span className="number">3</span>
                <span className="ml-25">Pay with Credit Card</span>
              </li>
              <li>
                <span className="number">4</span>
                <span className="ml-25">
                  Arrange with the rent provider for collection or have it
                  posted to you
                </span>
              </li>
            </ul>
          </div>

          <div className="col-12 order-sm-5 order-md-5 order-lg-5 ">
            <span className="text-underline Lpp-lendor__to-lendee">
              <Link to={routes.LPG_FAQ}>
                Click here to see Frequently Asked Questions on LPG
              </Link>
            </span>
          </div>
        </div>
      </InfoCard>
    </div>
  )
}

export default LPP
