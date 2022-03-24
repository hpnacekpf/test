import GeneratorSeo from 'components/GeneratorSeo'
import MembershipPlans from './MembershipPlans'
import RedirectUrl from 'components/RedirectUrl'
import React from 'react'

const EnterpriseSolutionPricing = () => {
  return (
    <div className={`utils__content`}>
      <RedirectUrl />
      <GeneratorSeo
        title={`Enterprise Solution & Pricing - Lendor - Singapore Rentals`}
        description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
        keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
      />
      <div className={`custom-enterprise`}>
        <div className={`col-lg-8 col-12 mx-auto mb-5`}>
          <div
            className={`text-center font-size-18 font-roboto text-uppercase`}
          >
            <h2>
              <strong>Enterprise Solution & Pricing</strong>
            </h2>
          </div>
          <p className={`text-center font-size-16 pb-2 lh-14`}>
            Are you a rental business looking for more leads and online
            presence? Or perhaps you just need a rental management solution for
            your extensive library of products? Sit back and let us take care of
            everything so you can just focus on what matters in your business,
            your customers.
          </p>
        </div>

        <div
          className={`col-lg-10 font-size-16 mx-auto row d-flex justify-content-between text-left enterprise-container my-5`}
        >
          <MembershipPlans />
        </div>
      </div>
    </div>
  )
}

export default EnterpriseSolutionPricing
