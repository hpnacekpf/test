import React from 'react'
import Steps from 'antd/lib/steps'
import enumType from 'constants/enumType'

const Step = Steps.Step

const StepsRegister = (currentStep) => {
  return (
    <Steps
      current={
        currentStep && currentStep.currentStep > 0 ? currentStep.currentStep : 0
      }
      direction={window.innerWidth >= 1024 ? 'horizontal' : 'vertical'}
    >
      {enumType.stepRegister.map((step, index) => (
        <Step key={index} title={step.label} />
      ))}
    </Steps>
  )
}

export default StepsRegister
