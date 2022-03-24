import React from "react"
import SkeletonItemCard from "./SkeletonItemCard"
import InfoCard from "components/InfoCard"
import ShowItems from "extensions/showItems"

const SkeletonHomeTrending = () => {

  const items = (
    <div className="pt30 pb30 col-md-3 col-sm-3 col-lg-3 col-12">
      <SkeletonItemCard />
    </div>
  )

  return (
    <div className="utils__content pb-0 home-trending">
      <InfoCard>
        <div className="bgcdc shine h-2 col-12 col-md-2 col-sm-2 col-lg-2" />
        <div className="d-flex flex-wrap mt-20">
          {
            ShowItems(items, 4)
          }
        </div>
      </InfoCard>
    </div>
  )
}

export default SkeletonHomeTrending