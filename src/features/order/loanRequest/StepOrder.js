import CustomButton from 'components/Button/CustomButton'
// constants
import { ICON_BACK } from 'constants/index'
import React from 'react'
import { useHistory } from 'react-router'
// utils, extensions
// components
import AlertOrder from './AlertOrder'
import StepRequest from './StepRequest'

const StepOrder = ({ data }) => {
  const history = useHistory()

  return (
    <React.Fragment>
      {data.orderId ? (
        <div>
          <div className="mb-4">
            <CustomButton
              buttonClass={
                'text__footer font-size-18 lendor-color-gray-v1 px-0 py-0 mb-0'
              }
              type={'link'}
              btnDefault
              handleClick={() => {
                history.goBack()
              }}
            >
              <div className={`d-flex align-items-center`}>
                <img src={ICON_BACK} alt="back" className={`w-8px mr-2`} />
                <u>{`Back to all transactions`}</u>
              </div>
            </CustomButton>
          </div>
          <AlertOrder order={data} />
        </div>
      ) : null}
      <StepRequest order={data} />
    </React.Fragment>
  )
}

export default StepOrder
