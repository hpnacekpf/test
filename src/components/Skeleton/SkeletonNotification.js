import React from 'react';
import InfoCard from "components/InfoCard"
import ShowItems from "extensions/showItems"

const SkeletonNotification = () => {

  const items = (
    <div className="mt-20">
      <div className=" col-6 col-md-3 col-sm-3 col-lg-3 shine bgcdc h-15 mt-20 mb-15" />
      <div className="px-35 py-15 shadow bg-white rounded">
        <div className="d-flex justify-content-between" >
          <div className="col-4 col-md-2 col-sm-2 col-lg-2 shine bgcdc h-15"></div>
          <div className="col-2 col-md-1 col-sm-1 col-lg-1 shine bgcdc h-15"></div>
        </div>
        <div className="d-flex justify-content-between mt-20" >
          <div className="col-4 col-md-2 col-sm-2 col-lg-2 shine bgcdc h-15"></div>
          <div className="col-2 col-md-1 col-sm-1 col-lg-1 shine bgcdc h-15"></div>
        </div>
        <div className="d-flex justify-content-between mt-20" >
          <div className="col-4 col-md-2 col-sm-2 col-lg-2 shine bgcdc h-15"></div>
          <div className="col-2 col-md-1 col-sm-1 col-lg-1 shine bgcdc h-15"></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="utils__content setting-notifications">
      <InfoCard>
        <div className="col-11 col-md-11 col-sm-11 col-lg-11">
          <div className="col-6 col-lg-4 col-md-4 col-sm-4 bgcdc shine h-2 " />
          <div className="mt-20">
            {
              ShowItems(items, 3)
            }
          </div>
        </div>
      </InfoCard>
    </div>
  );
};

export default SkeletonNotification;