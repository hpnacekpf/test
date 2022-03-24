import React from 'react'
import ShowItems from 'extensions/showItems'
import classNames from 'classnames'

const SkeletonForm = ({ isEditProfileForm, row }) => {

  const items = (
    <div
      className="mb-4 col-md-12 col-lg-10 mx-auto d-flex align-items-center justify-content-between">
      <div
        className={`bgcdc col-md-3 col-sm-3 col-lg-3 col-3 mt-10 h-2 shine`}></div>
      <div
        className={`bgcdc col-md-8 col-sm-8 col-lg-8 col-8 mt-10 h-2 shine`}></div>
    </div>
  )

  return <div>
    <div className={classNames({
      'bgcdc col-md-3 col-sm-3 col-lg-3 col-3 mt-10 h-2 shine mx-auto mb-4': isEditProfileForm
    })}/>
    {
      ShowItems(items, row)
    }
    {
      isEditProfileForm ?
        <div
          className="mb-4 col-md-12 col-lg-10 mx-auto d-flex align-items-start justify-content-between">
          <div
            className={`bgcdc col-md-3 col-sm-3 col-lg-3 col-3 mt-10 h-2 shine`}/>
          <div
            className={`bgcdc col-md-8 col-sm-8 col-lg-8 col-8 mt-10 h-6 shine`}/>
        </div>
        : null
    }
  </div>
}

export default SkeletonForm
