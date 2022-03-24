import classNames from 'classnames'
import TrendingCard from 'components/Business/TrendingCard'
import { trendingCard, trendingCardLoadMore } from 'constants/businessPage'
import React, { useState } from 'react'

const TrendDevices = ({ isMobile }) => {
  const [isLoadMore, setLoadMore] = useState(true)
  const handleToggle = () => {
    setLoadMore((preState) => !preState)
  }

  const trendingList =
    isMobile && isLoadMore ? trendingCardLoadMore : trendingCard

  return (
    <div className="utils__content custom-category ">
      <div className="card card-shadow mb-40">
        <div className="card-header card-header-custom position-relative">
          <h2 className="lendor-color-primary-v1 font-cabin font-weight-bold font-size-24 text-center text-md-left">
            Trending Devices for Rental
          </h2>
        </div>
        <div className="card-body">
          <div className="row">
            {trendingList.map((trend) => (
              <TrendingCard
                key={trend.trendingName}
                trendingName={trend.trendingName}
                src={trend.src}
                isMobile={isMobile}
              />
            ))}
          </div>
          {isMobile ? (
            <div className="text-center business-trend__more font-weight-bold">
              <a onClick={handleToggle}>See {isLoadMore ? 'More' : 'Less'}</a>
              <i
                className={classNames(
                  {
                    'fa-caret-down': isLoadMore,
                    'fa-caret-up': !isLoadMore
                  },
                  `fa ml-2 `
                )}
                aria-hidden="true"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default TrendDevices
