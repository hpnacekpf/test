import React from 'react';
import ShowItems from 'extensions/showItems'

const SkeletonProductPost = () => {

  const items = (
    <div>
      <div className="round-3 bgcdc shine mr__10" />
    </div>
  )

  return (
    <div>
      <div className="col-5 col-md-3 col-sm-3 col-lg-3 mt-30">
        <div className="col-12 col-md-12 col-sm-12 col-lg-12 h-2 bgcdc shine" />
        <div className="col-9 col-md-9 col-sm-9 col-lg-9 h-10 mt-10 bgcdc shine" />
        <div className="col-10 col-md-10 col-sm-10 col-lg-10 h-15 mt-10 bgcdc shine" />
        <div className="d-flex mt-10 col-12 col-md-12 col-lg-12 col-sm-12 pl-0">
          {
            ShowItems(items, 6)
          }
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductPost;