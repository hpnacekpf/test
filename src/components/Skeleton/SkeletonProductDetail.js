import React from "react"
import InfoCard from "components/InfoCard"
import ShowItems from "extensions/showItems"

const SkeletonProductDetail = () => {

  const items = (
    <div className="col-md-3 col-lg-3 col-sm-3 col-3 h-20">
      <div className="bgcdc h-6 shine" />
    </div>
  )


  return (
    <div className="utils__content">
      <InfoCard>
        <div className="d-flex flex-wrap">
          <div className="col-lg-5 col-md-6 col-12 col-sm-5 p-0">
            <div className="col-lg-12 col-md-12 col-12 col-sm-12">
              <div className=" bgcdc hmn-25 shine" />
            </div>
            <div className="d-flex flex-wrap justify-content-between mt-20">
              {
                ShowItems(items, 4)
              }
            </div>
          </div>
          <div className="col-lg-7 col-md-6 col-12 col-sm-7 mt-xs-20">
            <hr className="col-12 py-3 d-md-none d-sm-none d-lg-none" style={{ 'color': '#dcdcdc' }} />
            <div className="d-flex ">
              <div className="bgcdc round shine" />
              <div className="col-md-3 col-sm-3 col-7 col-lg-3">
                <div className="bgcdc h-15 shine" />
                <div className="bgcdc h-15 mt-5 col-md-10 col-lg-9 col-sm-9 col-9 shine" />
              </div>
            </div>
            <div className="bgcdc mt-20 h-15 col-md-4 col-lg-4 col-9 col-sm-4 shine" />
            <div className="bgcdc mt-20 hmn-20 col-md-9 col-lg-9 col-12 col-sm-9 shine" />

            <div className="bgcdc mt-20 h-10 col-md-1 col-lg-1 col-4 col-sm-1 shine" />
            <div className="bgcdc mt-10 h-15 shine col-lg-11" />
            <div className="bgcdc mt-20 h-10 col-md-1 col-lg-1 col-4 col-sm-1 shine" />
            <div className="bgcdc mt-10 h-15 shine col-lg-11" />
          </div>
        </div>
      </InfoCard>
    </div>
  )
}

export default SkeletonProductDetail