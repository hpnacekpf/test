import React from "react"
import InfoCard from "components/InfoCard"

const SkeletonTransactions = () => {
  let rows = []

  const renderRows = (numberRows) => {
    for (let i = 0; i < numberRows; i++) {
      rows.push(rowItems(i))
    }

    return rows
  }

  const rowItems = (index) => {
    return (
      <div className="pt-2">
        <hr style={{ 'color': '#dcdcdc' }} className="mt-10" />
        <div className="d-flex align-items-center">
          <div className="col-4 col-md-1 col-lg-1 col-sm-1">
            <div className="bgcdc shine h-15" />
          </div>
          <div className="col-4 col-md-1 col-lg-1 col-sm-1">
            <div className="bgcdc shine h-15" />
          </div>
          <div className="col-4 col-md-3 col-lg-3 col-sm-3 d-flex justify-content-center">
            {
              index !== 0
                ? <div className="d-flex align-items-center justify-content-center col-md-12 col-lg-12 col-sm-12">
                  <div className=" whmin-62 bgcdc shine" />
                  <div className="col-md-9 col-sm-9 col-lg-9 d-none d-md-inline d-sm-inline d-lg-inline">
                    <div className='bgcdc shine h-10 col-md-12 col-sm-12 col-lg-12 ' />
                    <div className='bgcdc shine h-10 col-md-6 col-sm-6 col-lg-6 mt-10' />
                  </div>
                </div>
                : <div className='bgcdc shine h-15 col-md-4 col-12 col-sm-4 col-lg-4' />
            }
          </div>
          <div className='d-none d-md-inline d-sm-inline d-lg-inline col-md-1 col-lg-1 col-sm-1'>
            <div className="bgcdc shine h-15" />
          </div>
          <div className='d-none d-md-inline d-sm-inline d-lg-inline col-md-2 col-lg-2 col-sm-2'>
            <div className="bgcdc shine h-15" />
          </div>
          <div className='d-none d-md-inline d-sm-inline d-lg-inline col-md-1 col-lg-1 col-sm-1'>
            <div className="bgcdc shine h-15" />
          </div>
          <div className='d-none d-md-inline d-sm-inline d-lg-inline col-md-1 col-lg-1 col-sm-1'>
            <div className="bgcdc shine h-15" />
          </div>
          <div className='d-none d-md-inline d-sm-inline d-lg-inline col-md-2 col-lg-2 col-sm-2'>
            <div className="h-2 bgcdc shine" />
            {
              index === 0
                ? null
                : <div className="h-2 bgcdc shine mt-10" />
            }
          </div>
        </div>
      </div>
    )
  }

  return (
    <InfoCard>
      <div className="col-12 col-md-12 col-lg-12 col-ms-12">
        <div className=" col-6 col-md-1 col-lg-1 col-ms-1 h-2 shine bgcdc"></div>
      </div>
      <div className="d-flex mt-20 col-11 col-md-10 col-lg-10 col-ms-10">
        <div className="col-6 col-md-2 col-lg-2 col-ms-2 ">
          <div className="bgcdc h-15 shine"></div>
        </div>
        <div className="col-6 col-md-2 col-lg-2 col-ms-2 ">
          <div className="bgcdc h-15 shine"></div>
        </div>
      </div>
      <div className="col-12 col-md-12 col-lg-12 col-ms-12">
        {
          renderRows(7)
        }
      </div>
    </InfoCard>
  )
}

export default SkeletonTransactions