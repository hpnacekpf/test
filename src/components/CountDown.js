import React from 'react'
import Countdown from 'react-countdown'
import dateTimeExtensions from 'extensions/datetime'

const renderer = ({ days, hours, minutes, seconds }, text) => {
  // return countdown
  return (
    <span>
      Your item will automatically be marked as {text} in{' '}
      <strong>
        {days}d {hours}h {minutes}min {seconds}s.
      </strong>{' '}
      You will not be able to dispute your item thereafter.
    </span>
  )
}

const CountDown = ({ date, text, handleComplete }) => {
  return (
    <Countdown
      date={dateTimeExtensions.initCountDownTime(date)}
      renderer={(data) => renderer(data, text)}
      onComplete={() => {
        if (handleComplete) {
          handleComplete()
        }
      }}
    />
  )
}

export default CountDown
