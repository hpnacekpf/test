import React from 'react'
import Steps from 'antd/lib/steps'
const { Step } = Steps

const StepNumber = ({ number, description }) => {
  return (
  <div className='d-flex align-items-center step-covid'>
    <Steps current={number} className="step-number">
      <Step key={number} icon={number}/>
    </Steps>
    <span className="font-size-20 ml-3 description-covid"><strong>{description}</strong></span>
  </div>
  )
}

export default StepNumber