import React from 'react'
import Steps from 'antd/lib/steps'
// Constants
import enumType from 'constants/enumType'

const Step = Steps.Step
const StepsPayment = (currentStep) => {
  return (
    <Steps
      current={currentStep && currentStep.currentStep > 0 ? currentStep.currentStep : 0}
      className="col-lg-8 mx-auto col-md-12 step-payment"
      direction={ window.innerWidth >= 1024 ? "horizontal" : "vertical"}
    >
      {
        enumType.stepPayment.map((step, index) => (
          <Step
            key={index}
            title={step.label}
          />
        ))
      }
    </Steps>
  )
}

export default StepsPayment