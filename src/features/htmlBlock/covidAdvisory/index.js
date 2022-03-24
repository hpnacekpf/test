import React from 'react'
// components
import InfoCard from 'components/InfoCard'
import GeneratorSeo from 'components/GeneratorSeo'
import RedirectUrl from 'components/RedirectUrl'
import StepNumber from './stepNumber'
import {
  PICTURE_1,
  PICTURE_2,
  PICTURE_3,
  TABLE,
  PICTURE_4,
  PICTURE_5,
  PICTURE_6
} from 'constants/index';

const CovidAdvisory = () => {
  return (
    <div className="utils__content font-size-16">
      <RedirectUrl />
      <GeneratorSeo
        title={`Covid-19 Advisory - Lendor - Singapore Rental Marketplace`}
        description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
        keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
      />
      <InfoCard
        lineBorder
        isBorder={'hide'}
        customClassName="covid-advisory font-size-20"
        title={<strong>COVID-19 ADVISORY FROM LENDOR</strong>}
      >
        <div className="mt-4">
          <p>
            At Lendor, we place great importance on our Lendors and Lendees’
            safety. Hence, we have come up with ways that we hope everyone
            adhere to and play your part in this{' '}
            <strong>circular economy</strong>.
          </p>
        </div>
        <div className="mt-2 mb-5">
          There are a few steps listed below for our Lendors and Lendees to
          practise so that we can all share safely.
        </div>
        <div className="step-1">
          <StepNumber number={1} description="Sanitize before lending" />
        </div>
        <div className="row mb-5">
          <div className="col-md-7 info-step">
            <p className="mt-3">
              As a responsible Lendor, we advise you to sanitize your products
              or items before sharing it with others. This is to ensure the
              safety of your Lendee and gain yourself some brownie points for
              being responsible in this community!
            </p>
          </div>
          <div className="col-md-5 img-step">
            <img className={`img-fluid`} src={PICTURE_1} alt={'picture-1'} />
          </div>
        </div>
        <div className="">
          <StepNumber number={2} description="Inform lendee it is sanitized" />
        </div>
        <div className="row mb-5">
          <div className="col-md-7 info-step">
            <p className="mt-3">
              Lendors to inform Lendees that the item to be shared is sanitized
              and safe to use. This is to ensure trust and assurance between you
              and your Lendees!
            </p>
          </div>
          <div className="col-md-5 img-step">
            <img className={`img-fluid`} src={PICTURE_2} alt={'picture-2'} />
          </div>
        </div>
        <div className="">
          <StepNumber number={3} description="Delivery" />
        </div>
        <div className="row mb-5">
          <div className="col-md-7 info-step">
            <p className="mt-3 mb-5">
              As we’re practising social distancing and minimizing face-to-face
              interactions, we’ve compiled a few delivery options for the
              Lendors and Lendees.
            </p>
            <h4 className="title-footer">SAME-DAY DELIVERY COURIERS</h4>
            <p>
              As there’s an absence of a universal pricing structure for the
              couriers services, we’ve used an imaginary scenario to generate
              consistent price quotes: Bishan Community Centre (pick up) to
              Bedok Mall (drop off).
            </p>
            <p className="my-4">We also compared between 2 different sizes:</p>
            <ul>
              <li>Small parcel: 20x20x10cm, 2kg (Drone)</li>
              <li>Bulky item: 110x70x50cm, 20kg (Table)</li>
            </ul>
            <img className={`img-fluid`} src={TABLE} alt={'table'} />
          </div>
          <div className="col-md-5 img-step">
            <img className={`img-fluid`} src={PICTURE_3} alt={'picture-3'} />
          </div>
        </div>
        <div className="">
          <StepNumber number={4} description="Sanitise before returning" />
        </div>
        <div className="row mb-5">
          <div className="col-md-7 info-step">
            <p className="mt-3">
              As a reponsible Lendee, we advise you to sanitize the product or
              item that you’ve used before returning. By doing so, you can
              ensure the safety of your Lendor and continue the assurance.
            </p>
          </div>
          <div className="col-md-5 img-step">
            <img className={`img-fluid`} src={PICTURE_4} alt={'picture-4'} />
          </div>
        </div>
        <div className="">
          <StepNumber number={5} description="Inform Lendor it is sanitised" />
        </div>
        <div className="row mb-5">
          <div className="col-md-7 info-step">
            <p className="mt-3">
              Lendees to inform Lendors that the item to be returned is
              sanitized and safe to be collected. This is to maintain the mutual
              trust in this circular economy!
            </p>
          </div>
          <div className="col-md-5 img-step">
            <img className={`img-fluid`} src={PICTURE_5} alt={'picture-5'} />
          </div>
        </div>
        <div className="">
          <StepNumber number={6} description="Sanitize again" />
        </div>
        <div className="row mb-5">
          <div className="col-md-7 info-step">
            <p className="mt-3">
              This is an optional step but Lendors may choose to sanitize their
              product or item upon receiving it back. Better to be safe than
              sorry!
            </p>
          </div>
          <div className="col-md-5 img-step">
            <img className={`img-fluid`} src={PICTURE_6} alt={'picture-6'} />
          </div>
        </div>
        <h2 className="title-footer">
          <strong>ALL IN ALL,</strong>
        </h2>
        <div className="row">
          <div className="col-xl-6">
            <p className="my-3">
              The above mentioned are the 6 steps that we advise and encourage
              you to do during this period. We’re protecting your safety and we
              hope that you can protect your own safety as well as others by
              practising these few steps.
            </p>
            <p>
              <strong>Share safely!</strong>
            </p>
          </div>
        </div>
      </InfoCard>
    </div>
  )
}

export default CovidAdvisory
