import React from 'react'

const MessageDisputeOrder = () => {
  return (
    <div className="d-block w-80 m-auto">
      <span className="d-block text-left">Please do so only if you have attempted to contact the other party and are experiencing the following issues:</span>
      <span className="d-block text-left"><strong>- Item not received in good working condition</strong></span>
      <span className="d-block text-left"><strong>- Item not received at all</strong></span>
      <span className="d-block text-left"><strong>- The other party is not responding to you</strong></span>
      <span className="d-block text-left mt-15">
        Upon confirmation, this order will be frozen together with any funds on hold with
        us until the end of dispute resolution. Our client success team will get in touch with you on the possible next course of action.
       </span>
    </div>
  )
}
export default MessageDisputeOrder