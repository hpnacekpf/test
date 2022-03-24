import React from 'react'
import className from 'classnames'
import Title from './Title'

const Card = ({ header, children, wrapperClassName, isHeader = true }) => (
  <div className="row">
    <div className="col-lg-12">
      <div
        className={className({
          'card card-shadow': true,
          [`${wrapperClassName}`]: !!wrapperClassName,
          'mb-40': !wrapperClassName
        })}
      >
        <div className="card-header card-header-custom position-relative">
          <div className="card-title-carousel font-weight-bold text__search">
            <Title title={header} isBorder={true} isHeader={isHeader} />
          </div>
        </div>
        <div className="card-body">{children}</div>
      </div>
    </div>
  </div>
)

export default Card
