import React from 'react';
import InfoCard from "components/InfoCard"
import ShowItems from 'extensions/showItems'

const SkeletonProfileLeft = () => {

  const items = (
    <div className="d-flex mt-10">
      <div className="round-3 bgcdc shine "/>
      <div className="col-7 col-md-7 col-sm-7 col-lg-7">
        <div className=" h-10 col-4 col-md-3 col-sm-3 col-lg-3 bgcdc shine"/>
        <div className="  mt-10 h-10 col-12 col-md-12 col-sm-12 col-lg-12 bgcdc shine"/>
      </div>
      <div className="bgcdc shine h-10 col-3 col-md-2 col-sm-2 col-lg-2"/>
    </div>
  )

  return (
    <div className=" pr-xs-1d15r mt-40 mt-xs-10">
      <div className="bgcdc shine round-6 ml-auto mr-auto" />
      <div className="bgcdc shine h-10 mt-25 col-3 col-md-2 col-sm-2 col-lg-2 ml-auto mr-auto" />
      <div className="bgcdc shine h-2 mt-10 col-9 col-md-6 col-sm-6 col-lg-6 ml-auto mr-auto" />
      <div className="utils_content mt-30">
        <InfoCard>
          <div className=" bgcdc shine col-4 h-2 col-md-2 col-sm-2 col-lg-2"/>
          <div className="mt-10 bgcdc shine h-2 col-12 col-md-12 col-sm-12 col-lg-12"/>
          <div className="mt-10 bgcdc shine h-2 col-12 col-md-12 col-sm-12 col-lg-12"/>
          <div className="mt-10 bgcdc shine h-2 col-12 col-md-12 col-sm-12 col-lg-12"/>
        </InfoCard>
      </div>
      <div className="h-10e bgcdc shine mt-20" />
      <div className="utils_content mt-30">
        <InfoCard>
          <div>
            {
              ShowItems(items,3)
            }
          </div>
          <div className="mt-30 bgcdc shine h-2 col-8 mx-auto col-md-8 col-sm-8 col-lg-8"/>
        </InfoCard>
      </div>
    </div>
  );
};

export default SkeletonProfileLeft;