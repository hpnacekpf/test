import React from 'react'
import Steps from 'antd/lib/steps'
import { isServer } from 'utils/client-api'

const Step = Steps.Step

const CustomizeStep = ({ path, data }) => {

  const activeStep = data.findIndex(item => {
    return item.value && item.value.length > 0 ? item.value.includes(path) : 1
  })

  return (
    <Steps
      current={activeStep}
      direction={!isServer ? window.innerWidth > 1024 ? 'horizontal' : 'vertical' : 'vertical'}
    >
      {
        data.map((step, index) => (
          <Step
            key={index}
            icon={index + 1}
            title={step.label}
          />
        ))
      }
    </Steps>
  )
}

export default CustomizeStep