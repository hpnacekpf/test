import { Button } from 'antd'
import DatePicker from 'antd/lib/date-picker'
import Modal from 'antd/lib/modal'
import classNames from 'classnames'
import Feature from 'components/Feature'
import MessageExtend from 'components/Message/MessageExtend'
import { REDUX_MODAL } from 'constants/enum'
import enumType from 'constants/enumType'
import { FORMAT_EN_DATE } from 'constants/string'
import dateTimeExtensions from 'extensions/datetime'
import { checkValidDuration } from 'extensions/product'
import { useModal } from 'hooks/useModal'
import React, { Fragment, useState } from 'react'
import { useCreateOrderExtend } from 'reducers/order/hook'
import { connectModal } from 'redux-modal'
import utils from 'utils'
import { calculateDiscount } from '../../extensions/orders/form'

const RangePicker = DatePicker.RangePicker

const TotalOrderExtend = (props) => {
  const {
    countDayExtend,
    productDiscount,
    countDayLoanDuration,
    productPrice,
    quantity
  } = props

  const totalDay = Math.abs(countDayExtend) + countDayLoanDuration

  const subTotal = productPrice * Math.abs(countDayExtend) * quantity

  const { discount, discountType, discountPrice } = calculateDiscount({
    discount: productDiscount,
    loanDay: totalDay,
    price: subTotal
  })

  const totalOrderExtend = subTotal - discountPrice

  return (
    <div className="row">
      <div className="col-8">
        <p className="font-size-16">Quantity</p>
      </div>
      <div className="col-4">
        <p className="pull-right">{quantity}</p>
      </div>
      <div className="col-8">
        <p className="font-size-16">
          {Math.abs(countDayExtend)} days x{' '}
          {utils.showFormatPrice(productPrice)}
        </p>
      </div>
      <div className="col-4">
        <p className="pull-right">{utils.showFormatPrice(subTotal)}</p>
      </div>
      {discountType ? (
        <Fragment>
          <div className="col-8">
            <p className="m-0 font-size-16">
              {discount}%&nbsp;
              {discountType === enumType.discountType.Monthly
                ? 'Monthly Discount (30 Days)'
                : 'Weekly Discount (7 Days)'}
            </p>
            <p className="lendor-color-primary-v1 font-size-12">
              Discount will automatically apply when users take a minimum loan
              of&nbsp;
              {discountType === enumType.discountType.Monthly
                ? '30 days'
                : '7 days'}
            </p>
          </div>
          <hr className="my-3" />

          <div className="col-4">
            <p className="pull-right">
              -{utils.showFormatPrice(discountPrice)}
            </p>
          </div>
        </Fragment>
      ) : null}
      <div className="col-8">
        <p className="font-size-16 font-weight-bold text__main font-roboto">
          Total
        </p>
      </div>
      <div className="col-4">
        <p className="pull-right ">{utils.showFormatPrice(totalOrderExtend)}</p>
      </div>
    </div>
  )
}
const CountTotalEmpty = () => {
  return (
    <Fragment>
      <hr className="my-3" />
      <div className="d-flex justify-content-between">
        <h3 className={`font-size-18 font-weight-bold text__main font-roboto`}>
          Total
        </h3>
        <h3 className={`font-size-18 font-weight-bold text__main`}>$ -</h3>
      </div>
    </Fragment>
  )
}
const ModalExtend = (props) => {
  const {
    show,
    handleHide,
    orderId,
    endDate,
    product,
    quantity,
    totalLoanDay,
    calendarProduct
  } = props

  const [expandDate, setExpandDate] = useState([])

  const [onOpenModal] = useModal()

  const [onExtendOrder] = useCreateOrderExtend()

  const orderEndDate = dateTimeExtensions.initNewDate(endDate)

  const momentFromDate = dateTimeExtensions.initStartOfDay()
  const momentToDate = dateTimeExtensions.initStartOfDay(endDate)
  const difference = dateTimeExtensions.calculateDateDiffWithMoment(
    momentToDate,
    momentFromDate,
    'days'
  )

  const validExtendDate = expandDate.length > 1

  const countDayExtend = validExtendDate
    ? dateTimeExtensions.calculateDateDiff(expandDate[1], expandDate[0], 'days')
    : 0

  const onChange = (dates) => {
    if (dates.length > 0) {
      const calendarDate = checkValidDuration({
        fromDate: orderEndDate,
        toDate: dates[1],
        disabledDate: calendarProduct
      })
      setExpandDate([
        dateTimeExtensions.initNewDate(calendarDate.fromDate),
        dateTimeExtensions.initNewDate(calendarDate.toDate)
      ])
    }
  }

  const handleConfirm = () => {
    onOpenModal(REDUX_MODAL.CONFIRM, {
      typeModal: enumType.typeModalOrder.CONFIRM,
      content: <MessageExtend />,
      handleOkClick: () => {
        handleHide()
        onExtendOrder({
          orderId,
          extendDate: dateTimeExtensions.formatTimeStampToString(
            expandDate[1],
            FORMAT_EN_DATE
          )
        })
      }
    })
  }
  return (
    <Modal
      centered={true}
      visible={show}
      mask={true}
      maskClosable={false}
      closable={false}
      footer={null}
      className="extend-order__modal custom-modal-extend"
      title={
        <h4 className={'text-center title-modal font-cabin text-uppercase'}>
          Extend Loan Duration
        </h4>
      }
    >
      <div className="extend-order__range-picker">
        <RangePicker
          open={true}
          placeholder={['Loan', 'Return']}
          inputPrefixCls="extend-order__input"
          className="extend-order__date rounded-5 custom-box-datetime"
          pickerClass="extend-order__picker"
          dropdownClassName="extend-order__dropdown"
          pickerInputClass="extend-order__picker-input"
          onChange={onChange}
          value={expandDate}
          ranges={dateTimeExtensions.rangeCalendar()}
          disabledDate={(current) => {
            return dateTimeExtensions.disabledDate(
              current,
              calendarProduct,
              difference > 0 ? difference : 0
            )
          }}
          getCalendarContainer={(trigger) => {
            return trigger.parentNode
          }}
        />
      </div>
      <Feature header="Extension Charges">
        {validExtendDate ? (
          countDayExtend < 1 ? (
            <React.Fragment>
              <div className="has-error">
                <div className="ant-form-explain d-block mt-2">
                  You must extend at least 1 day
                </div>
              </div>
              <CountTotalEmpty />
            </React.Fragment>
          ) : (
            <TotalOrderExtend
              productDiscount={product?.discount}
              countDayLoanDuration={totalLoanDay}
              productPrice={product?.price}
              quantity={quantity}
              countDayExtend={countDayExtend}
            />
          )
        ) : (
          <CountTotalEmpty />
        )}
      </Feature>

      <hr className="my-4" />
      <div className="text-center">
        <div className="d-flex">
          <Button
            size="large"
            className={classNames(
              'text-uppercase font-weight-bold ant-btn-block mb-3 benefits__skip-popup mr-3 bg-color-secondary-v4'
            )}
            onClick={handleHide}
          >
            Cancel
          </Button>
          <Button
            disabled={!validExtendDate || countDayExtend < 1}
            size="large"
            className={classNames(
              'text-uppercase font-weight-bold ant-btn-block mb-3 ml-3 btn-color-main',
              {
                'button-extend': validExtendDate
              }
            )}
            onClick={handleConfirm}
          >
            Extend Loan
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default connectModal({
  name: REDUX_MODAL.EXTEND
})(ModalExtend)
