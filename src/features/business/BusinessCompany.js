// components
import React from 'react'
import classNames from 'classnames'
import { businessCompany } from 'constants/businessPage'

const Company = ({ image, name, position, content, isMobile }) => {
  return (
    <div
      className={classNames(
        {
          'p-2': !isMobile,
          'p-3': isMobile
        },
        `mb-4 font-cabin`
      )}
    >
      <div className="mb-2 business-partner--logo d-flex align-items-center">
        <img src={image} alt="fluid" className="img-fluid" />
      </div>
      <div>
        <div
          className={'mb-4 font-size-18 font-italic business-partner--quote'}
        >
          <q>{content}</q>
        </div>
        <div className={'font-size-20 font-weight-bold'}>
          <strong>{name}</strong>
        </div>
        <span className={'font-size-18'}>{position}</span>
      </div>
    </div>
  )
}

const BusinessCompany = (props) => {
  const { isMobile } = props

  return (
    <div className="utils__content custom-category">
      <div className={'card card-shadow '}>
        <div className={'card-body'}>
          <div className="row">
            {businessCompany.map((item, index) => {
              return (
                <div className="col-md-6" key={index}>
                  <Company
                    image={item.src}
                    content={item.content}
                    name={item.name}
                    position={item.position}
                    isMobile={isMobile}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessCompany
