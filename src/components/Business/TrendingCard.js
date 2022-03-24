import classNames from 'classnames'
import React from 'react'

const TrendingCard = ({ src, trendingName, isMobile }) => {
  return (
    <div
      className={classNames(
        {
          'px-2': isMobile
        },
        `col-6 col-lg-3 mb-3 `
      )}
    >
      <div
        className={classNames(
          {
            'p-2': isMobile
          },
          `businessCard mb-0 d-flex flex-column `
        )}
      >
        <img
          src={src}
          alt={trendingName}
          className="img-fluid mx-auto w-100 img-productCard"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="my-3 text-center">
        <h3 className='font-weight-bold font-size-20'>{trendingName}</h3>
      </div>
    </div>
  )
}

export default TrendingCard
