import React from 'react'
import { Link } from 'react-router-dom'
// components
import InfoCard from 'components/InfoCard'
import GeneratorSeo from 'components/GeneratorSeo'
import BreadcrumbLPP from './BreadcrumbLPP'
// constants
import {
  LENDOR_BUTTON as imgAbove,
  IT_WORK as howDoeItWork,
  LENDOR_LEFT as lpgShield
} from 'constants/index'
import enumType from 'constants/enumType'
import { routes } from 'routes/mainNav'

const LPP = (props) => {
  function triggerBtnWhatsapp() {
    document.querySelector('.btn-whatsapp').click()
  }

  const leftContent = [
    ' Offer of LPG to your customers (Mandatory or Optional)',
    'No more collection of deposits that can mess up your accounts',
    'Accept only online payments! No more dealing with cash',
    'No deposits = more sales as consumers do not need to set aside large amount of cash'
  ]

  const rightContent = [
    'Set Mandatory or Optional LPG for your customers',
    'Create a product dispute through the transaction if there are any damages and losses',
    'Our team will evaluate and make a compensation in accordance to terms in the Lendor’s Protection Guarantee contract!'
  ]

  return (
    <div className={`utils__content`}>
      <GeneratorSeo
        title={`Lendor Protection Guarantee (LPG) -  Lendor Singapore`}
        description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
        keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
      />
      <BreadcrumbLPP
        text={enumType.menuLPP.Lendor.text}
        isMobile={props.isMobile}
      />
      <InfoCard
        hideBorder={false}
        title={
          <strong className={`customTitleLpp`}>
            Lendor Protection Guarantee - Lendors (Rent Providers)
          </strong>
        }
        lineBorder={true}
        customClassName={'card-lpp'}
      >
        <div className={'row mt-40 Lpp-lendor font-size-20 lpp-lendee'}>
          <div className={'col-md-6 col-12 order-2 order-md-1'}>
            <ul className="list-style-none Lpp-lendor__list">
              {leftContent.map((benefit, index) => (
                <li key={index}>
                  <i className="icon-success-v2" />
                  <span className="ml-40">{benefit}</span>
                </li>
              ))}
              <li>
                <i className="icon-success-v2" />
                <div className="ml-40">
                  {' '}
                  If your product gets damage, we got your back!<br />
                  <p className="font-size-14 mb-0 mt-1">
                    *LPG Terms and Condition applies
                  </p>
                </div>
              </li>
            </ul>
            <div>
              <img
                alt="lendor-work"
                className="max-height__70 w-100 mt-30 img-it-work-lendor"
                src={howDoeItWork}
              />
            </div>
          </div>

          <div
            className={
              'col-md-6 col-12 order-1 order-md-2 Lpp-lendor__note '
            }
          >
            <img
              alt="lendor-button"
              className="img_lendor__button"
              src={imgAbove}
            />
          </div>

          <div className="col-md-6 col-12 order-3 text-center Lpp-lendor__note align-items-center">
            <div>
              <img
                alt="lendor-note"
                className={`img-fluid img_lendor__button`}
                src={lpgShield}
              />
            </div>
          </div>

          <div className="col-md-6 col-12 order-4 d-flex justify-content-center align-items-center">
            <ul className="list-style-none Lpp-lendor__list Lpp-lendor__it_work font-size-20">
              <li>
                <span className="number">1</span>
                <span className="ml-25">
                  {' '}
                  Lendors / Rent Provider to sign up for a Premium Guarantee
                  with Lendor! Contact us{' '}
                  <a>
                    <strong
                      className={`text-underline`}
                      onClick={triggerBtnWhatsapp}
                    >
                      here
                    </strong>
                  </a>!
                </span>
              </li>
              {rightContent.map((content, index) => (
                <li>
                  <span className="number">{index + 2}</span>
                  <span className="ml-25">{content}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 order-5">
            <span className="text-underline Lpp-lendor__to-lendee">
              <Link to={routes.LENDEE}>
                Click here to see Lendee's Protection Guarantee
              </Link>
            </span>
          </div>
        </div>
      </InfoCard>
    </div>
  )
}

export default LPP
