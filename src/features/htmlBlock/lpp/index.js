import React from 'react'
import { Link } from 'react-router-dom'
import className from 'classnames'
// components
import BreadcrumbLPP from './BreadcrumbLPP'
import InfoCard from 'components/InfoCard'
import GeneratorSeo from 'components/GeneratorSeo'
import RedirectUrl from 'components/RedirectUrl'
// constants
import {
  LPP_BUTTON,
  LPP_MAIN,
  LENDEE_BUTTON,
  LENDOR_BUTTON,
  LENDEE_PHONE
} from 'constants/index'
import { routes } from 'routes/mainNav'
// routes

const Lendor = () => (
  <Link to={routes.LENDOR}>
    <div className={``}>
      <div className={`img-min-height`}>
        <img className={`img-fluid w-100`} src={LENDOR_BUTTON} alt={'lpp'} />
      </div>
      <div
        className={`text-uppercase font-weight-bold position-absolute lpp-btn-title`}
      >
        Lendors
      </div>
    </div>
  </Link>
)

const Lendee = () => (
  <Link to={routes.LENDEE}>
    <div className={``}>
      <div className={`img-min-height`}>
        <img className={`w-100 `} src={LENDEE_BUTTON} alt={'lpp'} />
      </div>
      <div
        className={`text-uppercase font-weight-bold position-absolute lpp-btn-title`}
      >
        Lendees
      </div>
    </div>
  </Link>
)

const UserType = () => (
  <div className={`d-flex flex-row justify-content-center`}>
    <div
      className={`text-center lpp-btn-custom col-xl-3 col-md-6 col-sm-4 col-6 p-4 pb-5 mr-5`}
    >
      <Lendee />
    </div>
    <div
      className={`text-center lpp-btn-custom col-xl-3 col-md-6 col-sm-4 col-6 p-4 pb-5`}
    >
      <Lendor />
    </div>
  </div>
)

const LPP = (props) => {
  return (
    <div className={`utils__content`}>
      <RedirectUrl />
      <GeneratorSeo
        title={`Lendor Protection Guarantee (LPG) - Lendor Singapore `}
        description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
        keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
      />
      <BreadcrumbLPP isMobile={props.isMobile} isHiddenChild={true} />
      <InfoCard
        hideBorder={false}
        title={
          <strong className={className({ 'font-size-18': props.isMobile })}>
            Lendor Protection Guarantee
          </strong>
        }
        customClassName={`card-responsive`}
      >
        <div className={'lpp-page'}>
          <div className={'row'}>
            <div className={'col-md-12 col-lg-6 col-xl-7 mt-5'}>
              <div className={`col-lg-4 col-4 p-0`}>
                <img
                  className={`img-fluid lpp-protected`}
                  src={LPP_BUTTON}
                  alt={'lpp'}
                />
              </div>
              <p className={'font-size-18 my-5 text-justify'}>
                Lendor Protection Guarantee gives both Lendees and Lendors a
                peace of mind when renting products so Lendees can focus on
                enjoying the product while Lendors don't need to worry about
                damages!
              </p>
              <div
                className={`  p-0 text-center w-100 d-flex justify-content-center  lpp-main-lendor mb-4`}
              >
                <img
                  className={`lpp-main-img lpp-main-lendor text-center d-flex justify-content-center flex-column align-items-center d-lg-none`}
                  src={LPP_MAIN}
                  alt={'lpp'}
                />
              </div>
              <div className={`lpp-btn-desktop `}>
                <UserType />
              </div>
            </div>
            <div className={'col-md-12 col-lg-6 col-xl-5 mt-5'}>
              <img
                className={`lpp-main-img lpp-main-lendor d-none d-lg-block`}
                src={LPP_MAIN}
                alt={'lpp'}
              />
              <div className={`lpp-btn-mobile`}>
                <UserType />
              </div>
            </div>
          </div>
        </div>
      </InfoCard>

      <InfoCard hideBorder={false} customClassName={`card-responsive`}>
        <div className={'lpp-page'}>
          <div className={'row'}>
            <div
              className={
                'col-md-12 col-lg-6 col-xl-5 text-center d-flex align-items-center justify-content-center'
              }
            >
              <img
                className={`lpp-main-img lpp-main-lendor`}
                src={LENDEE_PHONE}
                alt={'lpp'}
              />
            </div>
            <div
              className={
                'col-md-12 col-lg-6 col-xl-7 mt-5 d-flex flex-column justify-content-center align-items-center'
              }
            >
              <p
                className={
                  'font-size-18  text-justify  justify-content-center '
                }
              >
                Igloo is a regional insurtech firm that provides cutting-edge
                technology and design to eradicate inefficiencies - time
                consuming processes, unnecessary middlemen, fine-print - in the
                insurance value chain.
              </p>
              <p className={'font-size-18 my-5 text-justify lpp-text '}>
                This partnership with Igloo provides us with the opportunity to
                make rentals more affordable and accessible to all, while
                protecting different stakeholders in the rental process.
              </p>
            </div>
          </div>
        </div>
      </InfoCard>
    </div>
  )
}

export default LPP
