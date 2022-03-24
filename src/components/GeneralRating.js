import React from 'react'
import Rate from 'antd/lib/rate'
import utils from 'utils'

const GeneralRating = ({listing, feedback, rate}) => (
  <div className="explore__overall-data rounded-0 py-0 mb__25">
    <ul className="explore__overall-data-list explore__custom">
      <li className="explore__overall-data-item py-15 text__profile font-size-18 font-weight-normal">
        Total Listing: {listing.toLocaleString()}
      </li>
      <li className="explore__overall-data-item py-15 text__profile font-size-18 font-weight-normal">
        Total Feedback: {feedback.toLocaleString()}
      </li>
      <li className="explore__overall-data-item py-15 text__profile font-size-18 font-weight-normal">
        Average Rating:
        <Rate value={rate} disabled={true} allowHalf={true}/>
        <span className={rate <= 0 ? 'text__note' : 'text__yellow-main'}>
          ({utils.showDecimalPlace(rate, 1)})
        </span>
      </li>
    </ul>
  </div>
)

export default GeneralRating
