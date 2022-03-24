import React from 'react'
import SkeletonItemCard from './SkeletonItemCard'
import InfoCard from 'components/InfoCard'
import ShowItems from 'extensions/showItems'

const SkeletonHomeFeatured = () => {

  const items = (
    <div className="pt30 pb30 col-md-3 col-sm-3 col-lg-3 col-12">
      <SkeletonItemCard/>
    </div>
  )

  return (
    <div className="utils__content pb-5 home-trending">
      <InfoCard>
        <div className="col-12 col-md-12 col-lg-12 col-sm-12">
          <div className="bgcdc shine h-2 col-12 col-md-1 col-sm-2 col-lg-"/>
        </div>
        <div className="d-flex mt-20">
          <div className="col-12 col-md-7 col-lg-7 col-sm-7">
            <div className="img-fluid w-100 bgcdc shine h-17e"
                 style={{ 'height': '30em' }}/>
          </div>
          <div className="col-12 col-md-5 col-lg-5 col-sm-5 text-center">
            <div className="d-flex justify-content-center">
              <div
                className="ml-auto mr-auto avatar avatar--100 mt-15 bgcdc shine"/>
            </div>
            <div className={`d-flex justify-content-center flex-wrap`}>
              <div
                className="col-10 col-md-8 col-sm-8 col-lg-8 mt-15 h-15 bgcdc shine"/>
              <div
                className="col-10 col-md-6 col-sm-6 col-lg-6 mt-15 h-15 bgcdc shine"/>
              <div
                className="col-10 col-md-7 col-sm-7 col-lg-7 mt-15 h-15 bgcdc shine"/>
              <div
                className="col-10 col-md-6 col-sm-6 col-lg-6 mt-15 h-15 bgcdc shine"/>
              <div
                className="col-10 col-md-5 col-sm-5 col-lg-5 mt-15 h-15 bgcdc shine"/>
              <div
                className="h-4 col-4 col-md-3 col-lg-3 col-sm-3 mt-20 bgcdc shine"/>
            </div>
          </div>
        </div>
        <div
          className="bgcdc shine col-6 h-15 col-md-2 col-lg-2 col-ms-3 mt-30 mx-auto"/>
        <div className="d-flex flex-wrap">
          {
            ShowItems(items, 4)
          }
        </div>
      </InfoCard>
    </div>
  )
}

export default SkeletonHomeFeatured
