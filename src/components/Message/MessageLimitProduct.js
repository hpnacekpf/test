import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// constant
import { routes } from 'routes/mainNav'

const MessageLimitProduct = (props) => {
  const { limit } = props

  return (
    <React.Fragment>
      You have reached your limit of {limit} listed items.
      <Link
        className="text-underline text-color-primary-v1 mx-2"
        to={routes.ENTERPRISE_SOLUTION_PRICING}
      >
        <u>Click here to upgrade your existing plan</u>
      </Link>
    </React.Fragment>
  )
}

MessageLimitProduct.propTypes = {
  limit: PropTypes.number.isRequired
}
export default MessageLimitProduct
