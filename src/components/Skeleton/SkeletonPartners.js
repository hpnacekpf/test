import React from 'react'
import SkeletonItemCard from "./SkeletonItemCard"
import InfoCard from "components/InfoCard"
import ShowItems from 'extensions/showItems'

const SkeletonPartners = () => {

  const items = (
    <div className="pt30 pb30 col-md-3 col-sm-3 col-lg-3 col-12">
      <SkeletonItemCard />
    </div>
  )

  return <div className="utils__content">
    <InfoCard>
      <div className="d-flex flex-wrap">
        {
          ShowItems(items, 4)
        }
      </div>
    </InfoCard>
  </div>
}

export default SkeletonPartners