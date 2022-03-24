import React from 'react'
// components
import Title from 'components/Title'
// constants
import { howItWorks } from 'constants/homePage'

const HowItWorkItem = ({ image, title, content }) => {
  return (
    <div className="col-md-6 col-xl-3">
      <div className="px-25 step-how-it-work text-center">
        <div className="head d-flex justify-content-center">
          <img src={image} alt="fluid" className="img-fluid" />
        </div>
        <div className="">
          {/*<p className="step-number mb-0 font-roboto">{step}</p>*/}
          <p className="step-title mb-0 font-roboto">{title}</p>
          <p className="step-content">{content}</p>
        </div>
      </div>
    </div>
  )
}

const SessionHowItWorks = () => {
  return (
    <div className="utils__content pb-0 home-how-it-work">
      <div className="row">
        <div className="col-lg-12">
          <div className="card card-shadow mb-40">
            <div className="card-header card-header-custom position-relative">
              <Title title={'How it works'} isBorder={true} isHeader={true} />
            </div>
            <div className="card-body">
              <div className="row px-25">
                {howItWorks.map((item, index) => {
                  return (
                    <HowItWorkItem
                      key={index}
                      image={item.image}
                      step={item.step}
                      title={item.title}
                      content={item.content}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionHowItWorks
