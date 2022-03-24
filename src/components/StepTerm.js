import React from 'react'
import Steps from 'antd/lib/steps'
import { terms } from './Modal/ModalTerms'

const Step = Steps.Step
const StepTerm = (currentStep) => {
  return (
    <Steps
      current={
        currentStep && currentStep.currentStep > 0 ? currentStep.currentStep : 0
      }
      direction={window.innerWidth >= 1024 ? 'horizontal' : 'vertical'}
    >
      {terms.map((step, index) => (
        <Step key={index} title={step.label} icon={index + 1} />
      ))}
    </Steps>
  )
}

export default StepTerm
