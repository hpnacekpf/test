import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export const SamplePrevArrow = (props) => {
  const { className, onClick, isCategory } = props
  return (
    <div className={className} onClick={onClick}>
      <span className="text-slide text-slide--hover">
        <i
          className={classNames(
            {
              'transform-translateY': isCategory
            },
            `fa fa-angle-left `
          )}
          aria-hidden="true"
        />
      </span>
    </div>
  )
}

SamplePrevArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  isCategory: PropTypes.bool
}

export const SampleNexArrow = (props) => {
  const { className, onClick, isCategory } = props
  return (
    <div className={className} onClick={onClick}>
      <span className="text-slide text-slide--hover">
        <i
          className={classNames(
            {
              'transform-translateY': isCategory
            },
            `fa fa-angle-right`
          )}
          aria-hidden="true"
        />
      </span>
    </div>
  )
}

SampleNexArrow.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  isCategory: PropTypes.bool
}
