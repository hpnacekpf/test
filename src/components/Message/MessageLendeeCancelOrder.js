import React from 'react'

const MessageLendeeCancelOrder = () => {
  return (
    <div className="d-block w-80 m-auto">
      <span className="d-block text-left mb-3">
        <strong>
          By proceeding, you are agreeing to our General Cancellation Policy and
          will not be allowed to dispute the transaction at any point.
        </strong>
      </span>
      <span className="d-block text-left">
        <strong>
          [Free Cancellation] {'>'} 72 hours before midnight of rental start
          date.
        </strong>
      </span>
      <span className="d-block text-left">
        <strong>
          [Free Cancellation] Before merchant accepts the order – Before order
          status |Order Accepted|.
        </strong>
      </span>
      <span className="d-block text-left">
        <strong>
          [50% of order fee] 24 to 72 hours before midnight of rental start
          date.
        </strong>
      </span>
      <span className="d-block text-left">
        <strong>
          [100% of order fee] {'<'} 24 hours before midnight of rental start
          date.
        </strong>
      </span>
      <span className="d-block text-left mb-3">
        <strong>
          If Lendee chooses self-collection and does not collect on rental start
          date, the order is considered cancelled.
        </strong>
      </span>
      <span className="d-block text-left">
        <strong>Do you wish to proceed?</strong>
      </span>
    </div>
  )
}
export default MessageLendeeCancelOrder
