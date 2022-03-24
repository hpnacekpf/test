import React from 'react'
import InfoCard from 'components/InfoCard'
import ShowItems from 'extensions/showItems'

const SkeletonHowItWork = () => {
  const items = (
    <div className="pt30 pb30 col-md-3 col-sm-3 col-lg-3 col-12">
      <div className="hmn-15 bgcdc shine" />
      <div className="">
        <div className="bgcdc col-md-11 col-sm-11 col-lg-11 col-11 mt-10 h-2 shine" />
        <div className="mt-15">
          <div className="mt-20 col-6 col-md-4 col-lg-4 col-sm-4 h-20 bgcdc shine" />
          <div className="mt-15 col-6 col-md-10 col-lg-10 col-sm-10 h-15 bgcdc shine" />
          <div className="mt-10 col-6 col-md-10 col-lg-10 col-sm-10 h-15 bgcdc shine" />
          <div className="mt-10 col-6 col-md-10 col-lg-10 col-sm-10 h-15 bgcdc shine" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="utils__content pb-5 home-how-it-work">
      <InfoCard>{ShowItems(items, 1)}</InfoCard>
    </div>
  )
}

export default SkeletonHowItWork
