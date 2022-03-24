// import React from 'react'
import classNames from 'classnames'
import { icon_success } from 'constants/index';

const AffiliateCode = ({
  handleOnClick,
  affiliateCode,
  className,
  isActive
}) => {
  return (
    <div className={classNames(`font-size-14 ${className ? className : ''}`)}>
      <span className="text__card-header text-color-primary-v1">
        Affiliate Code:{` `}
      </span>
      {affiliateCode ? (
        <span>
          {affiliateCode}
          {isActive ? (
            <img
              alt="success"
              className="ml-2 max-min-w_15px"
              src={icon_success}
            />
          ) : null}
        </span>
      ) : (
        <span className="cursor-pointer text-underline" onClick={handleOnClick}>
          Generate Code
        </span>
      )}
      {/* <span className="cursor-pointer text-underline" onClick={handleOnClick}>
        Generate Code
      </span> */}
    </div>
  )
}

export default AffiliateCode
