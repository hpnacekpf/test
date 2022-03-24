import React from 'react'
import classNames from 'classnames'

const SkeletonItemCard = ({ isHomePageCategories, isMobile }) => {

  return (
    <div>
      <div className={classNames({
        'rounded-circle wmax-15 mx-auto': isHomePageCategories,
        'custom-item-category': isHomePageCategories && isMobile
      }, `hmn-15 bgcdc shine`)} />
      <div className="">
        <div className={classNames({
          'mx-auto': isHomePageCategories
        }, `bgcdc col-md-11 col-sm-11 col-lg-11 col-11 mt-10 h-2 shine`)} />
        <div className={classNames({
          'd-none': isHomePageCategories,
          'd-flex': !isHomePageCategories
        }, `align-items-center mt-15`)}>
          <div className="">
            <div className="round bgcdc shine" />
          </div>
          <div className="col-8 col-lg-8 col-sm-8 col-md-8">
            <div className="bgcdc h-15 shine" />
            <div className="bgcdc h-15 mt-5 col-md-10 col-lg-10 col-sm-10 col-10 pt10 shine" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonItemCard