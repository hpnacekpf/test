import React, { Fragment } from 'react'
import { calendarControl } from 'constants/index'
import Calendar from 'antd/lib/calendar'
import { Button } from 'antd/lib/radio'

const CustomCalendar = (props) => {
  const {
    onChange,
    onSelect,
    selectedMonth,
    disabledDate,
    dateFullCellRender,
    mode,
    onChangeMonth,
    centered,
    isOwnerProduct
  } = props

  return (
    <Fragment>
      <Calendar
        onPanelChange={onChange}
        onSelect={onSelect}
        className="customize-calendar"
        value={selectedMonth}
        disabledDate={isOwnerProduct ? disabledDate : null}
        dateFullCellRender={dateFullCellRender}
        centered={centered ?? false}
      />
      <div className={`mx-3 mt-3 mb-4`}>
        <div className={`calendar-control`}>
          <div className={`d-inline-block font-weight-bold`}>Key:</div>
          {isOwnerProduct ? (
            <div className={`d-inline-block`}>
              <div className={`d-inline-block`}>
                <div className={`square square-available`} />
                <div className={`d-inline-block`}>Available</div>
              </div>
              <div className={`d-inline-block`}>
                <div className={`square square-not-available`} />
                <div className={`d-inline-block`}>Not available</div>
              </div>
              {/* <div className={`d-inline-block`}>
                    <div className={`square square-block`}/>
                    <div className={`d-inline-block`}>Blocked out</div>
                  </div> */}
            </div>
          ) : (
            <div className={`d-inline-block`}>
              <div className={`d-inline-block`}>
                <div className={`square square-stock`} />
                <div className={`d-inline-block`}>Lendable quantities</div>
              </div>
              <div className={`d-inline-block`}>
                <div className={`square square-no-stock`} />
                <div className={`d-inline-block`}>Product out of stocks</div>
              </div>
            </div>
          )}
        </div>
      </div>
      {mode === 'month' ? (
        <div className={`d-flex justify-content-between mx-3`}>
          <Button
            onClick={() => onChangeMonth(calendarControl.prev)}
            className={`calendar-control text-color-primary--hover`}
          >
            <i className={`fa-chevron-left fa`} />
          </Button>
          <Button
            onClick={() => onChangeMonth(calendarControl.next)}
            className={`calendar-control text-color-primary--hover`}
          >
            <i className={`fa-chevron-right fa`} />
          </Button>
        </div>
      ) : null}
    </Fragment>
  )
}

export default CustomCalendar
