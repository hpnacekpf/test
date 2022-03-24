import React from 'react'
import { Link } from 'react-router-dom'
import className from 'classnames'
// components
import BreadcrumbTNBL from './BreadcrumbTryNowBuyLater'
import InfoCard from 'components/InfoCard'
import GeneratorSeo from 'components/GeneratorSeo'
import RedirectUrl from 'components/RedirectUrl'
// constants
import {
  LENDEE_TRY,
  LENDOR_TRY,
  TRY_NOW_BUY_LATER,
  TRY_NOW_BUY_LATER_HOME
} from 'constants/index'
import { routes } from 'routes/mainNav'
// routes

const Lendor = () => (
  <Link to={routes.TNBL_LENDOR}>
    <div className={``}>
      <div className={`img-min-height`}>
        <img className={`img-fluid w-100`} src={LENDOR_TRY} alt={'lpp'} />
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
  <Link to={routes.TNBL_LENDEE}>
    <div className={``}>
      <div className={`img-min-height`}>
        <img className={`w-100 `} src={LENDEE_TRY} alt={'lpp'} />
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

const TNBL = (props) => {
  return (
    <div className={`utils__content`}>
      <RedirectUrl />
      <GeneratorSeo
        title={`Try Now, Buy Later`}
        description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
        keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
      />
      <BreadcrumbTNBL isMobile={props.isMobile} isHiddenChild={true} />

      <InfoCard
        hideBorder={false}
        title={
          <strong className={className({ 'font-size-18': props.isMobile })}>
            TRY NOW, BUY LATER
          </strong>
        }
        customClassName={`card-responsive`}
      >
        <div className={'lpp-page'}>
          <div className={'row'}>
            <div className={'col-md-12 col-lg-6 col-xl-7 mt-5'}>
              <p className={'font-size-18 my-5 text-justify'}>
                <strong>
                  <i>Try Now, Buy Later</i>
                </strong>{' '}
                opens new doors to both Lendees and Lendors! Try multiple
                products before deciding which to buy, and have the opportunity
                to sell your products while renting! The first-of-its-kind model
                in Singapore, found only on Lendor!
              </p>
              <div
                className={`  p-0 text-center w-100 d-flex justify-content-center  lpp-main-lendor mb-4`}
              >
                <img
                  className={`lpp-main-img lpp-main-lendor text-center d-flex justify-content-center flex-column align-items-center d-lg-none`}
                  src={TRY_NOW_BUY_LATER_HOME}
                  alt={'try-now-pay-later'}
                />
              </div>
              <div className={`lpp-btn-desktop `}>
                <UserType />
              </div>
            </div>
            <div className={'col-md-12 col-lg-6 col-xl-5 mt-5'}>
              <img
                className={`lpp-main-img lpp-main-lendor d-none d-lg-block`}
                src={TRY_NOW_BUY_LATER_HOME}
                alt={'try-now-pay-later'}
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
                src={TRY_NOW_BUY_LATER}
                alt={'try-now-pay-later'}
              />
            </div>
            <div
              className={
                'col-md-12 col-lg-6 col-xl-7 mt-5 d-flex flex-column justify-content-center align-items-center'
              }
            >
              <strong className="text-justify font-size-20">
                EMBRACING THE CIRCULAR ECONOMY WITH <i>TRY NOW, BUY LATER</i>
              </strong>
              <br />
              <p className={'font-size-18 my-5 text-justify  '}>
                <strong>
                  <i>Try Now, Buy Later</i>
                </strong>{' '}
                is a new service on Lendor that allows the masses to try out
                various products before deciding on one to own. As part of the
                circular economy, we encourage customers to try products that
                they are interested in, before investing in one to own for a
                long time to come. With this initiative, our Lendees can do
                their part for the environment by purchasing items that they
                will truly utilize and reduce the amount of waste generated.
              </p>
            </div>
          </div>
        </div>
      </InfoCard>
    </div>
  )
}

export default TNBL
