import Form from 'antd/lib/form'
import className from 'classnames'
import ButtonChat from 'components/Button/ButtonChat'
// components
import Feature from 'components/Feature'
import IglooInsurance from 'components/IglooInsurance'
import InfoCard from 'components/InfoCard'
import LenderDate from 'components/LenderDate'
import ModalBuyProduct from 'components/Modal/ModalBuyProduct'
import ModalDateChange from 'components/Modal/ModalDateChange'
import ModalDateChangeReceived from 'components/Modal/ModalDateChangeReceived'
import ModalDelivery from 'components/Modal/ModalDelivery'
import ModalExtend from 'components/Modal/ModalExtend'
import ModalPaymentConfirm from 'components/Modal/ModalPaymentConfirm'
import ModalReview from 'components/Modal/ModalReview'
import ModalTransaction from 'components/Modal/ModalTransaction'
import MyImageGallery from 'components/Product/MyImageGallery'
import {
  AMENDMENT_STATUS,
  ORDER_BUTTON,
  ORDER_TYPE,
  REDUX_MODAL
} from 'constants/enum'
import enumType from 'constants/enumType'
// Constants
import {
  CALENDAR_ICON,
  CHARGES_ICON,
  COLLECTION_ICON,
  DELIVERY_ICON,
  LPG_ICON,
  NOTE_ICON,
  PAYMENT_METHOD_ICON,
  PROMO_ICON
} from 'constants/index'
import formikExtensions from 'extensions/formik'
import numberExtensions from 'extensions/number'
import { checkEnableOpenModalAmendment } from 'extensions/orders'
// extensions
import { checkOwnerProduct, isPoweredByInsurance } from 'extensions/product'
import { getUrlByProduct } from 'extensions/url'
import { withFormik } from 'formik'
import { useModal } from 'hooks/useModal'
import isEqual from 'lodash/isEqual'
import OrderBuy from 'models/orderBuy'
import OrderRent from 'models/orderRent'
import Request from 'models/orderRequest'
import React, { Fragment, useEffect, useState } from 'react'
import { usePrevious } from 'react-use'
import * as Yup from 'yup'
import AmendmentDate from './AmendmentDate'
import ButtonBuyProduct from './ButtonBuyProduct'
import ButtonDateChange from './ButtonDateChange'
import ButtonExtend from './ButtonExtend'
import ButtonFooter from './ButtonFooter'
import ChargeInfo from './ChargeInfo'
import CollectionMethod from './CollectionMethod'
import LateFeeCharge from './LateFeeCharge'
import OrderExtend from './OrderExtend'
import OrderInfo from './OrderInfo'
import OrderNote from './OrderNote'
import OrderTitle from './OrderTitle'
import PaymentMethod from './PaymentMethod'
import PromoCode from './PromoCode'
import StepOrder from './StepOrder'

const OrderRequest = Request.OrderRequest

const formikMap = withFormik({
  // enableReinitialize: true,
  validationSchema: Yup.object().shape({}),
  mapPropsToValues: ({ data, user, product }) => {
    if (data.orderId) {
      if (data.type === ORDER_TYPE.BUY) {
        return new OrderBuy(data, user)
      }
      return new OrderRent(data, user)
    }
    return new OrderRequest({ order: data, user, product })
  },
  handleSubmit: (data, { props }) => {
    props.handleSubmitForm(data)
  },
  displayName: 'Form'
})

const OrderForm = (props) => {
  const {
    values,
    data,
    user,
    isMobile,
    history,
    isSubmitting,
    duplicateOrder,
    isEnableExtension,
    setFieldValue,
    handleSubmit,
    orderExtends,
    orderExceeds,
    orderAmendmentDate,
    allowReset,
    resetForm
  } = props

  const [isUpdate, setIsUpdated] = useState(false)
  const previousData = usePrevious(data)

  useEffect(
    () => {
      if (allowReset && !isEqual(previousData, data)) {
        let values
        if (data.orderId) {
          values =
            data.type === ORDER_TYPE.BUY
              ? new OrderBuy(data, user)
              : new OrderRent(data, user)
        }
        resetForm({
          values
        })
      }
    },
    [data]
  )

  //check is lendor?, will open modal date amendment
  useEffect(
    () => {
      const enableAmendment = checkEnableOpenModalAmendment({
        isBuyer,
        orderAmendmentDate,
        data
      })
      if (enableAmendment) {
        openModal(REDUX_MODAL.DATE_CHANGE_RECEIVED, orderAmendmentDate)
      }
    },
    [orderAmendmentDate]
  )

  const handleChangeDelivery = (deliveryType) => {
    values.setDeliveryType(deliveryType)
    setIsUpdated(!isUpdate)
  }

  const handleChangeNote = (note) => {
    values.setNote(note)
    setIsUpdated(!isUpdate)
  }

  const handleChangePaymentMethod = (method) => {
    values.setPaymentMethod(method)
    setIsUpdated(!isUpdate)
  }

  const handleApplyPromo = (promoItem) => {
    values.setPromoCode(promoItem)
    setIsUpdated(!isUpdate)
  }

  const handleCancel = () => {
    history.push(getUrlByProduct(values.product))
  }

  const {
    product,
    fromDate,
    toDate,
    orderId,
    promo,
    paymentMethod,
    addressBuyer,
    cityBuyer,
    zipCodeBuyer,
    seller,
    showButtonExtension
  } =
    values || null

  const isOrderStatues = values.orderStatuses?.length > 0

  const linkToProduct = getUrlByProduct(product)

  // DONE

  const ownerProduct = checkOwnerProduct(product, user)

  const hasInsurance = isPoweredByInsurance(product, seller)

  const isCompletePayment = values.isPaid

  const isExtend = values.isExtendable

  const isEnableBuyProduct = values.isEnableBuyProduct

  const isEnableAmendment = values.isEnableAmendment

  const isBuyer = values.isBuyer

  const [openModal] = useModal()

  const isPending =
    !!orderAmendmentDate &&
    orderAmendmentDate?.status === AMENDMENT_STATUS.PENDING

  const buttons = values.orderId
    ? values.getButtonOrder(duplicateOrder)
    : values.buttons

  const buttonTop = buttons.length > 1 ? buttons.slice(-1)[0] : null
  const buttonBottom = buttonTop ? buttons.slice(0, -1) : buttons

  return (
    <Fragment>
      <Form
        onKeyDown={formikExtensions.preventEnterSubmitForm}
        onSubmit={handleSubmit}
      >
        <div className="utils__content">
          <StepOrder data={values} />
          <InfoCard frameCss="rounded-0">
            <OrderTitle data={values} user={user} ownerProduct={ownerProduct} />
            <div className="row">
              <div className="col-xl-5">
                {product ? (
                  <MyImageGallery
                    product={product}
                    path={linkToProduct}
                    disableKeyDown
                  />
                ) : null}
              </div>
              <div className="col-xl-7">
                <OrderInfo data={values} />
                {values.type !== ORDER_TYPE.BUY ? (
                  <React.Fragment>
                    <Feature
                      header="Loan Duration"
                      subTitle="Change"
                      disableSubTitle={isOrderStatues}
                      onClickSubTitle={handleCancel}
                      icon={CALENDAR_ICON}
                      defaultIconSize={true}
                    >
                      <LenderDate
                        fromDate={fromDate}
                        toDate={toDate}
                        marginLeft={false}
                      />
                    </Feature>
                    {values.isLPP ? (
                      <div>
                        <div className="my-4" />
                        <Feature
                          header="Lendor Protection Guarantee (LPG)"
                          subTitle="Change"
                          disableSubTitle={isOrderStatues}
                          onClickSubTitle={handleCancel}
                          icon={LPG_ICON}
                          customClass="d-flex feature mt-10 mb-0 align-items-center"
                        >
                          {hasInsurance && values.isOptedIn ? (
                            <IglooInsurance customClass="px-4" />
                          ) : null}

                          <i>{values.isOptedIn ? 'Opted in' : 'Opted out'}</i>
                        </Feature>
                      </div>
                    ) : null}
                  </React.Fragment>
                ) : null}

                <PromoCode
                  values={values}
                  setFieldValue={setFieldValue}
                  handleApplyPromo={handleApplyPromo}
                  icon={PROMO_ICON}
                />

                <div className="my-4" />
                <CollectionMethod
                  values={values}
                  handleChangeDelivery={handleChangeDelivery}
                  icon={COLLECTION_ICON}
                />
                <div className="my-4" />
                {addressBuyer &&
                cityBuyer &&
                zipCodeBuyer &&
                orderId &&
                values.isDelivery ? (
                  <Feature header="Delivery Address" icon={DELIVERY_ICON}>
                    <div>
                      <div>{addressBuyer}</div>
                      <div>{`${cityBuyer} ${zipCodeBuyer}`}</div>
                    </div>
                  </Feature>
                ) : null}
                <OrderNote
                  data={values}
                  handleChangeNote={handleChangeNote}
                  icon={NOTE_ICON}
                />
                {orderId ? (
                  <div>
                    <div className="my-4" />
                    <Feature header="Payment Method" icon={PAYMENT_METHOD_ICON}>
                      <p className="font-size-14">
                        {paymentMethod === enumType.paymentMethod.Cash ? (
                          <span>{enumType.paymentMethodValues.Cash}</span>
                        ) : (
                          <Fragment>
                            <span>{enumType.paymentMethodValues.Credit}</span>
                            <span
                              className={`text-bold ${
                                isCompletePayment
                                  ? 'text-success'
                                  : 'text-warning'
                              } text-uppercase ml-2`}
                            >
                              ({isCompletePayment ? 'PAID' : 'PENDING'})
                            </span>
                          </Fragment>
                        )}
                      </p>
                    </Feature>
                  </div>
                ) : null}
                <div className="my-4" />
                <ChargeInfo data={values} promo={promo} icon={CHARGES_ICON} />

                <div className="my-4" />
                {orderId ? (
                  <div>
                    <hr className="my-4" />
                    <div className="font-size-16 text__main">
                      <h4 className="d-inline-block mb-0 font-size-16 text__main">
                        {orderExtends?.length > 0 ? 'Initial Charges' : 'Total'}
                      </h4>
                      <span className="pull-right font-weight-bold font-size-18">
                        {numberExtensions.showFormatPrice(values.totalPrice)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <PaymentMethod
                    values={values}
                    handleChangePaymentMethod={(e) => {
                      handleChangePaymentMethod(e.target.value)
                    }}
                  />
                )}
                <OrderExtend
                  isBuyer={values.isBuyer}
                  data={orderExtends}
                  totalOrder={data?.totalOrder}
                  parentLoanDuration={data?.countDayLoanDuration}
                />
                <LateFeeCharge
                  data={orderExceeds}
                  parentEndDate={data?.endDate ?? data?.toDate}
                  penaltyFee={data?.penaltyFee}
                />

                {/* just show info date amendment status "pending" for lendee, other cases don't show */}
                {isBuyer &&
                orderAmendmentDate?.status === AMENDMENT_STATUS.PENDING ? (
                  <AmendmentDate
                    data={orderAmendmentDate}
                    paymentParent={values?.payment?.status}
                  />
                ) : null}

                <div
                  className={className({
                    'justify-content-between d-flex mt__30': orderId,
                    'd-none': !orderId,
                    'flex-column': isMobile
                  })}
                >
                  {values.isHiddenChat ? null : (
                    <ButtonChat
                      toUser={values.isBuyer ? values.seller : values.buyer}
                      product={values.product}
                      buttonClass={className(
                        `py-3 btn-xlarge-100 btn-xlarge-mb-10 d-lg-inline-block d-md-inline-block d-block `,
                        {
                          'width-100p': !buttonTop,
                          'btn-xlarge': !!buttonTop,
                          'order-2 mt-xs-20': isMobile
                        }
                      )}
                    >
                      <div className="infoCard__desc">
                        <span
                          className={`infoCard__title font-weight-bold text-uppercase`}
                        >
                          Chat
                        </span>
                      </div>
                    </ButtonChat>
                  )}
                  {buttonTop ? (
                    <ButtonFooter
                      isProtected={buttonTop.isProtected}
                      disabled={isSubmitting || buttonTop.disabled}
                      values={values}
                      onSubmitRequest={handleSubmit}
                      className={className(`py-3 btn-xlarge btn-xlarge-100 `, {
                        'btn-color-main': !buttonTop.className,
                        'ml-2': !values.isHiddenChat,
                        'ml-auto': values.isHiddenChat,
                        'order-2': isMobile,
                        [buttonTop.className]: !!buttonTop.className
                      })}
                      name={buttonTop.name}
                      type={buttonTop.type}
                    />
                  ) : null}
                </div>
                {isEnableAmendment && !isPending ? (
                  <ButtonDateChange
                    isPending={isPending}
                    className={className(
                      `py-3 btn-color-main mt-4 btn-deal w-100`,
                      {
                        'order-1': isMobile,
                        'btn-pending-date': isPending
                      }
                    )}
                  />
                ) : null}
                {isExtend && isEnableExtension && showButtonExtension ? (
                  <ButtonExtend />
                ) : null}
                {isEnableBuyProduct ? (
                  <ButtonBuyProduct values={values} />
                ) : null}
              </div>
            </div>
          </InfoCard>
          <div
            className={className(
              {
                'justify-content-center': orderId,
                'justify-content-between': !orderId
              },
              'd-flex loan-button'
            )}
          >
            {buttonBottom?.length > 0
              ? buttonBottom.map(
                  (button) =>
                    button ? (
                      <ButtonFooter
                        key={button.type}
                        isProtected={button.isProtected}
                        disabled={isSubmitting || button.disabled}
                        values={values}
                        onSubmitRequest={handleSubmit}
                        className={className(
                          `py-3 btn-xlarge order-2 order-md-1 mt-xs-20 mr-2`,
                          button.className ??
                            (values.orderId
                              ? 'btn-color-danger'
                              : 'btn-color-grey')
                        )}
                        name={button.name}
                        type={button.type}
                      />
                    ) : null
                )
              : null}

            {!values.orderId && buttonTop ? (
              <ButtonFooter
                isProtected={buttonTop.isProtected}
                disabled={isSubmitting || buttonTop.disabled}
                values={values}
                onSubmitRequest={handleSubmit}
                className={className(
                  `py-3 btn-xlarge btn-xlarge-100 order-1`,
                  buttonTop.className ?? 'btn-color-main'
                )}
                name={buttonTop.name}
                type={buttonTop.type}
              />
            ) : null}
          </div>

          <div />
        </div>
      </Form>
      <ModalTransaction />
      <ModalReview />
      <ModalExtend />
      <ModalDateChange />
      <ModalDateChangeReceived />
      <ModalPaymentConfirm />
      <ModalDelivery />
      <ModalBuyProduct />
    </Fragment>
  )
}

export default formikMap(OrderForm)
