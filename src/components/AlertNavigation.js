import { Alert } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const AlertNavigation = (props) => {
  const { isMobile, pathname } = props

  const isBusiness = pathname === '/business'

  const MessageNavigation = () => {
    return (
      <span className="d-flex justify-content-center">
        {/* <Link to={'/'}>
          <strong className="text-color-primary-v1 mx-4 text-underline-hover">
            RENTALS
          </strong>
        </Link>
        <Link to={'/'}>
          <strong className="text-color-primary-v1 mx-4 text-underline-hover">
            TRY NOW BUY LATER
          </strong>
        </Link>
        {`|`} */}
        <Link to={'/business'}>
          <strong className="text-color-primary-v1 mx-4 text-underline-hover">
            LENDOR FOR BUSINESS
          </strong>
        </Link>
      </span>
    )
  }

  return isMobile || isBusiness ? null : (
    <Alert
      message={<MessageNavigation />}
      className="font-size-20 bg-color-primary border-0"
    />
  )
}
export default AlertNavigation
