import React from 'react'
import SkeletonItemCard from './SkeletonItemCard'
import ShowItems from 'extensions/showItems'
import InfoCard from  'components/InfoCard'

const SkeletonSearchResult = () => {

  const items = (
    <div className="pt30 pb30 col-md-3 col-sm-3 col-lg-3 col-12">
      <SkeletonItemCard />
    </div>
  )

  return (
    <InfoCard>
      <div className="d-flex flex-wrap">
        <div className="col-12 col-md-2 col-lg-2 col-sm-2 ">
          <div className="bgcdc shine h-2 col-6 col-md-10 col-lg-10 col-sm-10"/>
        </div>
        <div className="col-12 col-md-3 col-lg-3 col-sm-3 mt-xs-20">
          <div className="bgcdc shine h-2"/>
        </div>
        <div className="col-12 col-md-3 col-lg-3 col-sm-3 mt-xs-20">
          <div className="bgcdc shine h-2"/>
        </div>
        <div className="col-12 col-md-3 col-lg-3 col-sm-3 mtxs--20">
          <div className="bgcdc shine h-2"/>
        </div>
      </div>
      <div className="d-flex flex-wrap mt-15">
        {
          ShowItems(items, 8)
        }
      </div>
    </InfoCard>
  )
}

export default SkeletonSearchResult
