import React from 'react'
import ShowItems from 'extensions/showItems'

const SkeletonItems = () => {
  const items = (
    <div className="pt30 pb30 col-md-3 col-sm-3 col-lg-3 col-12">
      <div className="hmn-15 bgcdc shine"/>
      <div className="">
        <div
          className="bgcdc col-md-11 col-sm-11 col-lg-11 col-11 mt-10 h-2 shine"/>
        <div className="d-flex align-items-center mt-15">
          <div className="">
            <div className="round bgcdc shine"/>
          </div>
          <div className="col-8 col-lg-8 col-sm-8 col-md-8">
            <div className="bgcdc h-15 shine"/>
            <div
              className="bgcdc h-15 mt-5 col-md-10 col-lg-10 col-sm-10 col-10 pt10 shine"/>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="d-flex flex-wrap">
      {
        ShowItems(items, 4)
      }
    </div>
  )
}

export default SkeletonItems
