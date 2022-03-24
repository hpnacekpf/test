import React from 'react'

const BusinessRoleItem = ({ image, title, content }) => {
  return (
    <div className="col-md-6 col-xl-3">
      <div className="px-md-25 py-4 py-md-25 d-flex flex-md-column flex-row align-items-center">
        <div className="business-feature--icon">
          <img src={image} alt="fluid" className="img-fluid" />
        </div>
        <div className="text-md-center">
          <h3 className="font-weight-bold font-size-22 mb-2">{title}</h3>
          <p className="font-size-18 mb-0">{content}</p>
        </div>
      </div>
    </div>
  )
}

export default BusinessRoleItem
