import { Button, Checkbox } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import TextArea from 'antd/lib/input/TextArea'
import Modal from 'antd/lib/modal'
import Tooltip from 'antd/lib/tooltip'
import classNames from 'classnames'
import PresettedRange from 'components/DatePicker/PresettedRange'
import ErrorMessage from 'components/ErrorMessage'
import Feature from 'components/Feature'
import { PAYMENT_METHOD, PAYMENT_STATUS, REDUX_MODAL } from 'constants/enum'
import { formatInputDate, formatOutputDate } from 'constants/index'
import { FORMAT_EN_DATE } from 'constants/string'
import dateTimeExtensions from 'extensions/datetime'
import numberExtensions from 'extensions/number'
import { getDisableDate } from 'extensions/product'
import { useModal } from 'hooks/useModal'
import BaseOrderAmendment from 'models/orderAmendment'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useCreateAmendmentRequest } from 'reducers/order/hook'
import { useGetProductDisabledDate } from 'reducers/productDetail/hook'
import { connectModal } from 'redux-modal'
import errorValidate from 'constants/validate'

const Charges = ({
  originalFee,
  discountPrice,
  discountType,
  discountOrder,
  additionalFee,
  penaltyFeeAmendment
}) => {
  return (
    <Feature header="Charges">
      <div className="d-flex row mt-10">
        <div className="font-weight-bold col-8">
          <FormattedMessage
            id="Label.OriginFee"
            defaultMessage="Original Fee"
          />
        </div>

        <div className="font-size-16 text-right col-4">
          <span>{numberExtensions.showFormatPrice(originalFee)}</span>
        </div>
      </div>

      <div className="d-flex row mt-10">
        <div className="font-weight-bold col-8">
          <FormattedMessage
            id="Label.AdditionalFee"
            defaultMessage="Additional Fee"
          />
        </div>

        <div className="font-size-16 text-right col-4">
          <span>{numberExtensions.showFormatPrice(additionalFee)}</span>
        </div>
      </div>

      {discountType ? (
        <div className="d-flex row mt-10">
          <div className="font-weight-bold col-8">
            <FormattedMessage
              id="Label.Discount"
              defaultMessage={`Discount (${discountType} ${discountOrder}%)`}
            />
          </div>

          <div className="font-size-16 text-right col-4">
            <span>{numberExtensions.showFormatPrice(discountPrice * -1)}</span>
          </div>
        </div>
      ) : null}
      {penaltyFeeAmendment ? (
        <div className="d-flex row mt-10">
          <div className="font-weight-bold col-8">
            <FormattedMessage
              id="Label.PenaltyFee"
              defaultMessage="Penalty Fee"
            />
            <Tooltip
              title={
                <span>
                  Please refer to our Loan Policy.{` `}
                  <Link
                    to={`/terms-condition/loan-policy`}
                    target={'_blank'}
                    className="text-color-white font-weight-bold text-underline"
                  >
                    Click here for more information
                  </Link>
                </span>
              }
              overlayClassName={`remove-tool-tip`}
            >
              <span className="ml-1">
                <i className="fa fa-question-circle-o" aria-hidden="true" />
              </span>
            </Tooltip>
          </div>

          <div className="font-size-16 text-right col-4">
            <span>{numberExtensions.showFormatPrice(penaltyFeeAmendment)}</span>
          </div>
        </div>
      ) : null}
    </Feature>
  )
}

const LoanDuration = ({
  fromDate,
  toDate,
  selectedRange,
  onChange,
  validateLoanDuration,
  calendarProduct,
  preventBooking
}) => {
  const originalFromDate = dateTimeExtensions.initStartOfDay(fromDate)
  const originalToDate = dateTimeExtensions.initStartOfDay(toDate)

  return (
    <React.Fragment>
      <FormItem>
        <div className="font-size-18 font-weight-bold text__main mb-0">
          <FormattedMessage
            id="Label.OriginalLoanDuration"
            defaultMessage="Original Loan Duration"
          />
        </div>
        <div className="w-100 font-size-14">
          {originalFromDate.format(formatOutputDate)} -{' '}
          {originalToDate.format(formatOutputDate)}
        </div>
      </FormItem>

      <FormItem>
        <div className="info-product-wrap lendable-date loan-date">
          <div className="font-size-18 font-weight-bold text__main mb-0">
            <FormattedMessage
              id="Label.NewLoanDuration"
              defaultMessage="New Loan Duration"
            />
          </div>
          <Feature header={'Select dates'}>
            <div className="mb-10">
              <PresettedRange
                valueRange={selectedRange}
                handleChange={onChange}
                disableDateTime={calendarProduct}
                className="datepicker "
                preventBooking={preventBooking}
              />
            </div>
            {validateLoanDuration ? (
              <ErrorMessage
                cssClass={'d-block mt-2'}
                error={validateLoanDuration}
              />
            ) : null}
          </Feature>
          {selectedRange.length > 0 && (
            <span className="font-size-14">
              {selectedRange[0].format(formatOutputDate)} -{' '}
              {selectedRange[1].format(formatOutputDate)}
            </span>
          )}
        </div>
      </FormItem>
    </React.Fragment>
  )
}

const ModalDateChange = (props) => {
  const { id } = useParams()
  const { show, handleHide, ...order } = props

  const [productDisabledDate] = useGetProductDisabledDate(
    order?.product?._id,
    order?._id
  )

  const [onCreateAmendment] = useCreateAmendmentRequest()
  const { toDate, fromDate, product } = order

  const [noteMerchant, setNoteMerchant] = useState('')
  const [validateLoanDuration, setValidateLoanDuration] = useState(null)
  const [selectedRange, setSelectedRange] = useState([])
  const [acceptAmendment, setAcceptAmendment] = useState(false)

  const [openModal] = useModal()

  const orderAmendment = new BaseOrderAmendment({
    fromDate: selectedRange[0],
    toDate: selectedRange[1],
    product,
    order,
    disabledDate: productDisabledDate
  })

  const {
    discountPrice,
    discountType,
    discountOrder,
    originalFee,
    additionalFee,
    newFee,
    penaltyFeeAmendment,
    payment
  } = orderAmendment

  const calendarProduct = getDisableDate(productDisabledDate)

  const handleChangeDateTime = (fromDate, toDate, calendarProduct) => {
    //check date selected is same origin date order?
    const isSameStartDateOrigin = dateTimeExtensions.isSameDate(
      dateTimeExtensions.formatDateOutput(
        fromDate,
        formatOutputDate,
        FORMAT_EN_DATE
      ),
      dateTimeExtensions.formatDateOutput(
        order?.fromDate,
        formatInputDate,
        FORMAT_EN_DATE
      )
    )

    const isSameToDateOrigin = dateTimeExtensions.isSameDate(
      dateTimeExtensions.formatDateOutput(
        toDate,
        formatOutputDate,
        FORMAT_EN_DATE
      ),
      dateTimeExtensions.formatDateOutput(
        order?.toDate,
        formatInputDate,
        FORMAT_EN_DATE
      )
    )

    orderAmendment.checkValidDuration(fromDate, toDate, calendarProduct)
    setValidateLoanDuration(orderAmendment?.errorDuration)

    if (isSameStartDateOrigin && isSameToDateOrigin) {
      setValidateLoanDuration(errorValidate.validateRequestDateChange)
    }

    setSelectedRange([
      dateTimeExtensions.initStartOfDay(orderAmendment.fromDate),
      dateTimeExtensions.initStartOfDay(orderAmendment.toDate)
    ])
  }

  const onChange = (value) => {
    handleChangeDateTime(
      value.fromDate,
      value.toDate,
      calendarProduct,
      product.minRentalDay,
      product.maxRentalDay
    )
  }

  const handleConfirm = () => {
    const isPaidOrigin =
      order?.paymentMethod === PAYMENT_METHOD.CASH ||
      order.payment?.status === PAYMENT_STATUS.COMPLETE

    onCreateAmendment(
      {
        orderId: id,
        fromDate: dateTimeExtensions
          .initStartOfDay(selectedRange[0])
          .format(FORMAT_EN_DATE),
        toDate: dateTimeExtensions
          .initStartOfDay(selectedRange[1])
          .format(FORMAT_EN_DATE),
        note: noteMerchant
      },
      isPaidOrigin
    )
    handleHide()
  }

  const handleAcceptAmendment = () => {
    if (!orderAmendment?.fromDate) {
      setValidateLoanDuration(orderAmendment?.errorDuration)
    }
    setAcceptAmendment((value) => !value)
  }

  return (
    <Modal
      centered={true}
      visible={show}
      mask={true}
      maskClosable={false}
      closable={false}
      footer={null}
      className="date-change__modal"
    >
      <div className="row d-flex">
        <div className="col-lg-7">
          <LoanDuration
            onChange={onChange}
            selectedRange={selectedRange}
            fromDate={fromDate}
            toDate={toDate}
            validateLoanDuration={validateLoanDuration}
            calendarProduct={calendarProduct}
            preventBooking={product?.user?.preventBooking}
          />
          <Feature header="Notes for Merchant">
            <TextArea
              // name="note"
              placeholder="Notes for Merchant"
              value={noteMerchant}
              autoSize={{ minRows: 4 }}
              onChange={(e) => setNoteMerchant(e.target.value)}
            />
          </Feature>
        </div>
        <div className="col-lg-5 d-flex flex-column justify-content-between">
          <Charges
            originalFee={originalFee}
            discountPrice={discountPrice * -1}
            discountType={discountType}
            discountOrder={discountOrder}
            additionalFee={additionalFee}
            penaltyFeeAmendment={penaltyFeeAmendment}
          />
          <div className="d-flex row font-weight-bold mt-10">
            <span className=" font-size-18 col-8">
              <FormattedMessage id="Label.NewFee" defaultMessage="New Fee" />
            </span>

            <div className="font-size-16 text-right col-4">
              <span>{numberExtensions.showFormatPrice(newFee)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className=" row mt-10">
        <div className=" d-flex align-items-center col-lg-7">
          <Checkbox
            className="custom-checkbox"
            value={acceptAmendment}
            onChange={handleAcceptAmendment}
          />
          <span className="font-size-12 font-italic ml-10">
            By proceeding, you are agreeing to any additional charges that may
            apply for additional days. Rental fees will NOT be refunded for any
            reduction of rental periods.
          </span>
        </div>
      </div>
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
            disabled={!acceptAmendment || !!validateLoanDuration}
            size="large"
            className={classNames(
              'text-uppercase font-weight-bold ant-btn-block mb-3 ml-3 btn-color-main'
            )}
            onClick={handleConfirm}
          >
            REQUEST DATE CHANGE
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default connectModal({
  name: REDUX_MODAL.DATE_CHANGE
})(ModalDateChange)
