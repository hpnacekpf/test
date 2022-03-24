import React from 'react'
// constant
import { Default_Bg_About } from 'constants/image'
// component
import GeneratorSeo from 'components/GeneratorSeo'
import RedirectUrl from 'components/RedirectUrl'
import Team from './Team'

const AboutUsPage = () => {
  return (
    <div className="font-roboto">
      <RedirectUrl />
      <GeneratorSeo
        title={`About Us - Towards a Sharing Economy - Lendor - SG Rentals`}
        description={`We’re an e-commerce rental startup in Singapore, offering consumer goods from electronic appliances to travel essentials, games and other household products!`}
        metaKeyword={`rental marketplace, singapore online marketplace, rental startup, ecommerce rental, electronic appliances on rent`}
      />
      <div className="py-20 px-25">
        <div>
          <img src={Default_Bg_About} className="img-fluid" />
        </div>
        <div className="font-cabin">
          <div className="d-flex justify-content-center text-uppercase font-weight-bold font-size-28 mt-30">
            <span className="text-color-primary-v2 about-us_title">
              About us
            </span>
          </div>
          <div className="mt-30 font-size-16 font-weight-bold">
            <p>
              Lendor is a marketplace platform with an extensive library of
              things that consumers can rent from partner businesses and share
              with trusted peers for short term use.
            </p>
            <p>
              By enabling item owners to share their library of things with
              others, Lendor encourages collaborative consumption, less wastage,
              and allows purchases to go the extra mile.
            </p>
            <p>
              Lendor takes care of all inventory, order and communication
              management, while protecting all beloved items so all users can
              share with a peace of mind.
            </p>
          </div>
        </div>
      </div>

      <Team />
    </div>
  )
}

export default AboutUsPage
