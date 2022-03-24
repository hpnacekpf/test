import React from 'react'

const defaultHeight = 48

const ratingRender = (value, height, width, handleClick) => {
  let space = (3 / defaultHeight) * (height ? height : 0) + 2
  if (height < 12) {
    space = space - 1.5
  }
  let pieces = []
  const imageWidth = width ? width : (height ? height : defaultHeight) * 82 / 64
  let style = { width: imageWidth, marginLeft: space }
  for (let index = 0; index < 5; index++) {
    let srcRateImage = require('../img/None-rating-Icon.png')
    if (value - index > 0) {
      if ((value - index) < 1 && value % 1 > 0) {
        srcRateImage = require('../img/Half-rating-Icon.png')
      } else {
        srcRateImage = require('../img/RatingIcon.png')
      }
    } else {
      srcRateImage = require('../img/None-rating-Icon.png')
    }
    pieces.push(
      handleClick ? (
        <a
          key={index}
          onClick={() => {
            handleClick(index)
          }}>
          <img
            alt='rate'
            key={index}
            src={srcRateImage}
            className="rating"
            style={style}
          />
        </a>
      ) : (
        <img
          alt='rate'
          key={index}
          src={srcRateImage}
          className="rating"
          style={style}
        />
      )
    )
  }
  return pieces
}

const Rating = ({ value, height, width, customClass, handleClick }) => (
  <div className={customClass ? customClass : ''}>
    {ratingRender(value, height, width, handleClick)}
  </div>
)

export default Rating
