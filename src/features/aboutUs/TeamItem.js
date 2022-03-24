import React from 'react'

const TeamItem = ({ img, imgReal }) => {
  return (
    <div className="col-md-4 col-lg-3 col-6">
      <div className="about-us_item text-center">
        <div className="flip-box-inner">
          <div className="flip-box-front">
            <img
              alt="thumbnail"
              className="img-fluid about-us_item_img"
              src={img || ''}
            />
          </div>
          <div className="flip-box-back">
            <img
              alt="avatar"
              className="img-fluid about-us_item_img"
              src={imgReal || ''}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamItem
