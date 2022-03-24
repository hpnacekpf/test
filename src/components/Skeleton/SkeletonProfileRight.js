import React from 'react';
import ShowItems from 'extensions/showItems'

const SkeletonProfileRight = () => {

  const items = (
		<div className="col-12 col-md-4 col-ms-6 col-lg-4 mt-40">
			<div className="bgcdc mt-15 h-17e shine" />
			<div className="bgcdc mt-15 h-2 col-4 col-md-4 col-lg-4 col-sm-4 shine" />
			<div className="bgcdc mt-15 h-15 shine" />
			<div className="bgcdc mt-10 h-15 shine" />
		</div>
	)

  return ( 
    //mt-xs-50style={{ 'border': '1px solid #dcdcdc', 'background': '#fff' }}
    <div className="col-12 col-md-12 col-sm-12 col-lg-12 bra7 pb30 " >
      <div className="d-flex flex-wrap">
        {
          ShowItems(items, 6)
        }
      </div>
    </div>
  );
};

export default SkeletonProfileRight;