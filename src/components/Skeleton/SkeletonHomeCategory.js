import React from "react"
import ShowItems from "extensions/showItems"
import Card from "components/Card"
import SkeletonItemCard from "./SkeletonItemCard"

const SkeletonHomeCategory = ({ isMobile }) => {

  const items = (
    <div className="col-md-4 col-sm-12 col-lg-2 mt-3">
      <SkeletonItemCard isHomePageCategories={true} isMobile={isMobile} />
    </div>
  )

  return (
    <div className="utils__content b-0 home-trending">
      <Card>
        <div className="h-2 bgcdc col-6 col-md-3 col-sm-5 col-lg-2 mx-auto" />
        <div className="col-12 col-md-5 col-sm-5 col-lg-4 h-15 bgcdc mt-20 mx-auto" />
        <div className="col-12 col-md-5 col-sm-5 col-lg-4 h-15 bgcdc mt-15 mx-auto" />
        <div className="d-flex align-items-center justify-content-center mt-2">
          {
            ShowItems(items, isMobile ? 2 : 5)
          }
        </div>
      </Card>
    </div>
  )
}

export default SkeletonHomeCategory
