import React, { Fragment } from 'react'
import className from 'classnames'
import Steps from 'antd/lib/steps'
import Tooltip from 'antd/lib/tooltip'
// extension
import dateTimeExtensions from 'extensions/datetime'
// constants
import {
  WIDTH_ORDER,
  DIRECTION_STEP_HORIZONTAL,
  DIRECTION_STEP_VERTICAL,
  formatDateTimeStep,
  UTC_0
} from 'constants/index'
import enumType from 'constants/enumType'
import { ORDER_STATUS } from 'constants/enum'

const Step = Steps.Step

const getTitleTooltip = (status) => {
  switch (status) {
    case ORDER_STATUS.SOLD:
      return 'Item automatically marked as sold in order.'

    case ORDER_STATUS.POR_VERIFIED:
      return 'Item has been verified.'

    default:
      return 'Item automatically marked as received in order.'
  }
}

const isStepAuto = (step) => {
  if (!step) return false
  return (
    (!step.user || step.isAuto) && step.value !== enumType.orderStatus.Accepted
  )
}

const DescriptionStep = ({ orderStatuses, currentStep }) => {
  let statusByStep = null
  if (orderStatuses && orderStatuses.length > 0) {
    statusByStep = orderStatuses.find(
      (item) => item.value === currentStep.value
    )
  }

  const title = getTitleTooltip(currentStep.value)

  return statusByStep ? (
    <span>
      {statusByStep.value === enumType.orderStatus.Expired ? (
        dateTimeExtensions.formatTimeToUTC(
          statusByStep.date,
          UTC_0,
          formatDateTimeStep
        )
      ) : (
        <Fragment>
          {dateTimeExtensions.formatTimeStampToUtcTime(
            statusByStep.date,
            formatDateTimeStep
          )}
          {isStepAuto(statusByStep) ? (
            <Tooltip title={title} overlayClassName={`remove-tool-tip`}>
              <span className="ml-1">
                <i className="fa fa-exclamation-circle icon-exclamation" />
              </span>
            </Tooltip>
          ) : null}
        </Fragment>
      )}
    </span>
  ) : null
}

const StepRequest = ({ order }) => {
  return order.orderId && order.steps?.length > 0 ? (
    <Steps
      current={order.activeStepIndex}
      direction={
        window.innerWidth >= WIDTH_ORDER
          ? DIRECTION_STEP_HORIZONTAL
          : DIRECTION_STEP_VERTICAL
      }
      status={order.activeStepStatus}
      className={className('mb-5', {
        'opacity-30': order.isDispute,
        'step-cancel': order.isOrderCancel
      })}
    >
      {order.steps.map((step, index) => {
        return (
          <Step
            key={index}
            title={step.label}
            icon={index + 1}
            description={
              <DescriptionStep
                currentStep={step}
                orderStatuses={order.orderStatuses}
              />
            }
          />
        )
      })}
    </Steps>
  ) : null
}
export default StepRequest
