//libs
import anchorme from 'anchorme'
import Alert from 'antd/lib/alert'
import Form from 'antd/lib/form'
import CustomButton from 'components/Button/CustomButton'
import PresettedRange from 'components/DatePicker/PresettedRange'
import ErrorMessage from 'components/ErrorMessage'
// Components
import Feature from 'components/Feature'
import InfoCard from 'components/InfoCard'
import MessageConfirmDeal from 'components/Message/MessageConfirmDeal'
import MinimumAssessment from 'components/Modal/ModalMinimumAssessment'
import ModalProofAddress from 'components/Modal/ModalProofAddress'
import ModalProofAddressRequest from 'components/Modal/ModalProofAddressRequest'
import CountTotal from 'components/Order/CountTotal'
import ButtonFooter from 'components/Product/ButtonFooter'
import ButtonManager from 'components/Product/ButtonManager'
import MyImageGallery from 'components/Product/MyImageGallery'
import ProductDetailMap from 'components/Product/ProductDetailMap'
import ShareSocial from 'components/ShareSocial'
import { REDUX_MODAL } from 'constants/enum'
import enumType from 'constants/enumType'
//constants + utils
import { ICON_BACK } from 'constants/index'
import {
  DEPOSIT_REQUIRED_NOA_MAX,
  DEPOSIT_REQUIRED_NOA_MIN
} from 'constants/number'
import validate from 'constants/validate'
import dateTimeExtensions from 'extensions/datetime'
//actions
//extensions
import { encodeContentWithEmoji, htmlParseWithoutXss } from 'extensions/html'
import {
  checkEnablePayNOA,
  checkEnablePayWithCard
} from 'extensions/orders/payment'
import {
  checkBuyableProduct,
  checkOwnerProduct,
  getCategoryByProduct,
  getCoordinate,
  getDisableDate,
  getOwnerProduct,
  getTextLocation,
  isPoweredByInsurance,
  isProductPublished
} from 'extensions/product'
import { getUrlProductWithDomain } from 'extensions/url'
import { getUserNOA, isUserProtected } from 'extensions/user'
import xssHelper from 'extensions/xss'
import yupExtensions from 'extensions/yup'
import { withFormik } from 'formik'
import { useModal } from 'hooks/useModal'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  useCreateRequestProofAddress,
  useLoanRequest
} from 'reducers/order/hook'
import { useGetIsRegisterSingpassAddress } from 'reducers/productDetail/hook'
import { useGetSingPass } from 'reducers/user/hook'
import utils from 'utils'
import { isServer } from 'utils/client-api'
import * as Yup from 'yup'
import OrderProduct from '../../models/orderProduct'
import {
  useCheckEnableCreateProof,
  useGetCreateProof
} from '../../reducers/order/hook'
import Delivery from './Delivery'
import Discount from './Discount'
import GeneralInfo from './GeneralInfo'
import LPPInfo from './LPPInfo'
import OriginPrice from './OriginPrice'
import RefundableDeposit from './RefundableDeposit'
import SelectQuantity from './SelectQuantity'
import TNBL from './TNBL'

const message =
  'This item has been removed. Click on “EDIT LISTING” to edit the cover image.'

const messageDispute = 'Disputed item. Transaction under review.'

const formikMap = withFormik({
  // enableReinitialize: true,
  validationSchema: Yup.object().shape({
    quantity: yupExtensions.number
      .max(Yup.ref('maxQuantity'), ({ max }) => {
        return `${validate.validateSelectQuantity} ${max}`
      })
      .min(Yup.ref('minQuantity'), validate.validateMinQuantity)
  }),
  mapPropsToValues: ({ data, order, disabledDate }) => {
    return new OrderProduct({ product: data, order, disabledDate })
  },
  handleSubmit: (data, { props }) => {
    props.handleSubmitForm(data)
  },
  displayName: 'Form'
})

const ProductDetailForm = (props) => {
  const location = useLocation()

  const history = useHistory()

  const [validateLoanDuration, setValidateLoanDuration] = useState(null)

  const [isUpdate, setIsUpdated] = useState(false)

  const [openMap, setOpenMap] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const [selectedRange, setSelectedRange] = useState([])

  const [onCreateRequest] = useLoanRequest()

  const [onOpenModal] = useModal()

  const singpass = useGetSingPass()

  const isVerifySingpassAddress = useGetIsRegisterSingpassAddress()

  const [onCheckEnableCreateProof] = useCheckEnableCreateProof()

  const isEnableCreateProofAddress = useGetCreateProof()

  const [onCreateProof] = useCreateRequestProofAddress()

  const {
    values,
    user,
    data,
    resetForm,
    setFieldTouched,
    handleSubmit,
    errors,
    disabledDate
  } = props

  const noa = getUserNOA(user)

  const { product } = values

  // effect
  useEffect(
    () => {
      resetForm()
    },
    [data]
  )

  useEffect(() => {
    onCheckEnableCreateProof()
  }, [])

  useEffect(
    () => {
      if (props.isMobile) {
        if (!isServer) {
          const positionToScroll = document.querySelector(
            '.scroll-position-mobile'
          )
          if (positionToScroll) {
            positionToScroll.scrollIntoView()
          }
        }
      }
    },
    [data]
  )

  const categoryInfo = getCategoryByProduct(product)

  const isOwnerProduct = checkOwnerProduct(product, user)

  const hasInsurance = isPoweredByInsurance(product, product.user)

  const userCoordinate = getCoordinate(product)

  const textLocation = getTextLocation(product)

  const calendarProduct = getDisableDate(disabledDate)

  const isBuyableProduct = checkBuyableProduct(product)

  const handleDeal = () => {
    const { isOptedIn } = values
    const { deposit } = data

    if (isOptedIn) {
      // check registered address
      if (!isVerifySingpassAddress) {
        onOpenModal(REDUX_MODAL.REGISTER_ADDRESS_SINGPASS)
        return
      }

      // case 200 <= deposit < 800
      if (
        deposit >= DEPOSIT_REQUIRED_NOA_MIN &&
        deposit < DEPOSIT_REQUIRED_NOA_MAX &&
        isEnableCreateProofAddress
      ) {
        //check noa user
        if (noa) {
          const enablePayNOA = checkEnablePayNOA({
            user,
            noa,
            singpass,
            pathname: location.pathname,
            onOpenModal,
            isNoaWithProof: true
          })

          if (!enablePayNOA) {
            return
          }
        } else {
          // case pull noa or proof address, 400 <= deposit < 1000
          onOpenModal(REDUX_MODAL.PROOF_ADDRESS, {
            user,
            noa,
            singpass
          })

          return
        }
      } else {
        if (deposit >= DEPOSIT_REQUIRED_NOA_MAX) {
          // case check NOA --> create proof address, deposit >= 800
          const enablePayNOA = checkEnablePayNOA({
            user,
            noa,
            singpass,
            pathname: location.pathname,
            onOpenModal,
            isIdentity: true
          })

          if (!enablePayNOA) {
            return
          }

          if (isEnableCreateProofAddress) {
            //open modal proof address

            onOpenModal(REDUX_MODAL.PROOF_ADDRESS_REQUEST, {
              handleCreateProof: (value) => {
                onCreateProof(value)
              }
            })

            return
          }
        }
      }
    }

    if (values.product) {
      if (values.fromDate && values.toDate) {
        onOpenModal(REDUX_MODAL.CONFIRM, {
          content: (
            <MessageConfirmDeal
              isOptedIn={values.isOptedIn}
              isLPP={values.isLPP}
            />
          ),
          handleOkClick: () => {
            onCreateRequest(values.toJson())
          }
        })
      } else {
        setValidateLoanDuration(validate.loanDuration)
      }
    }
  }

  const handleChangeDateTime = (fromDate, toDate, calendarProduct) => {
    values.checkValidDuration(fromDate, toDate, calendarProduct)
    setValidateLoanDuration(values.errorDuration)
  }

  const handleChangeLPG = (e) => {
    values.setLPG(e.target.value)
    setIsUpdated(!isUpdate)
  }

  const handleChangeQuantity = (quantity) => {
    values.setQuantity(quantity)
    setIsUpdated(!isUpdate)
  }

  const quoteShareProduct = (product) => {
    const quote = `Check out ${
      product?.name
    } on Lendor! You can rent it now only at ${utils.showFormatPrice(
      product?.price
    )}`
    return encodeContentWithEmoji(quote)
  }

  const renderDescription = (content) => {
    const description = anchorme(content)
    const descriptionWithoutXss = htmlParseWithoutXss(
      xssHelper.removeXssContent(description)
    )
    return descriptionWithoutXss
  }

  return product ? (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <InfoCard hideBorder={true}>
          <div className="card-body pt-0">
            <Feature>
              <CustomButton
                type="link"
                handleClick={() => {
                  history.goBack()
                }}
                buttonClass="p-0 text__footer font-size-18 lendor-color-gray-v1"
              >
                <div className={`d-flex align-items-center`}>
                  <img alt="back" src={ICON_BACK} className={`w-8px mr-2`} />
                  Back
                </div>
              </CustomButton>
            </Feature>
            <hr className="my-4 scroll-position-mobile" />
            {!isProductPublished(product) && isOwnerProduct ? (
              <Alert
                className="font-size-14 alert-item-delete my-5"
                message={
                  product?.status === enumType.productStatus.Suspended
                    ? messageDispute
                    : message
                }
                type="warning"
                showIcon
              />
            ) : null}
            <GeneralInfo
              ownerProduct={isOwnerProduct}
              product={product}
              category={categoryInfo}
              customClass={'product__detail-mobile'}
              isMobile={true}
            />
            <div className="row">
              <div className="col-lg-4 mt__10">
                <MyImageGallery product={product} />
              </div>
              <div className="col-lg-8 mt__10">
                <ButtonManager
                  productId={product._id}
                  ownerProduct={isOwnerProduct}
                  className={`btn-manager-desktop`}
                />
                <GeneralInfo
                  ownerProduct={isOwnerProduct}
                  product={product}
                  category={categoryInfo}
                  customClass={'product__detail-desktop'}
                />
                <Discount product={product} />
                <ShareSocial
                  url={getUrlProductWithDomain(product)}
                  quote={quoteShareProduct(product)}
                />
                {isOwnerProduct ? null : (
                  <div
                    className={`px-20 py-20 border__product-detail info-product-wrap lendable-date`}
                  >
                    <Feature
                      header={
                        isOwnerProduct ? 'Lendable dates' : 'Select dates'
                      }
                    >
                      <div className="mb-20">
                        <PresettedRange
                          valueRange={
                            values.fromDate && values.toDate
                              ? [
                                  dateTimeExtensions.formatTimeStampToMoment(
                                    values.fromDate
                                  ),
                                  dateTimeExtensions.formatTimeStampToMoment(
                                    values.toDate
                                  )
                                ]
                              : []
                          }
                          handleChange={(value) => {
                            handleChangeDateTime(
                              value.fromDate,
                              value.toDate,
                              calendarProduct,
                              product.minRentalDay,
                              product.maxRentalDay
                            )
                            setSelectedRange(value.selectedRange)
                          }}
                          disableDateTime={calendarProduct}
                          className="datepicker "
                          preventBooking={data?.user?.preventBooking}
                        />
                        {validateLoanDuration ? (
                          <ErrorMessage
                            cssClass={'d-block mt-2'}
                            error={validateLoanDuration}
                          />
                        ) : null}
                      </div>
                    </Feature>

                    {isBuyableProduct && values.isBuyable ? (
                      <TNBL
                        originPrice={product?.originPrice}
                        priceBuy={values.priceBuyProduct}
                      />
                    ) : null}
                    <SelectQuantity
                      values={values}
                      setFieldValue={handleChangeQuantity}
                      setFieldTouched={setFieldTouched}
                      errors={errors}
                      setShowModal={setShowModal}
                    />
                    {isUserProtected(product?.user) ? (
                      <LPPInfo
                        hasInsurance={hasInsurance}
                        values={values}
                        onChange={handleChangeLPG}
                        ownerProduct={isOwnerProduct}
                      />
                    ) : null}
                    <CountTotal product={product} data={values} />
                    <ButtonFooter
                      product={product}
                      chatWithUser={getOwnerProduct(product)}
                      ownerProduct={isOwnerProduct}
                      disabled={validateLoanDuration || errors?.quantity}
                      handleDeal={handleDeal}
                      location={location}
                      className={`btn-footer-desktop`}
                    />
                  </div>
                )}
                <OriginPrice price={product.originPrice} />
                {!values.isOptedIn || !values.isLPP ? (
                  <RefundableDeposit product={product} values={values} />
                ) : null}
                <Delivery
                  product={product}
                  setOpenMap={setOpenMap}
                  openMap={openMap}
                />
                {data?.description ? (
                  <Fragment>
                    <hr />
                    <Feature header="Description">
                      <span className="lendor-color-primary-v1">
                        {renderDescription(data.description)}
                      </span>
                    </Feature>
                  </Fragment>
                ) : null}
              </div>
            </div>
            <ProductDetailMap
              location={userCoordinate}
              textLocation={textLocation}
              openMap={openMap}
            />
          </div>
        </InfoCard>
        <ButtonManager
          productId={product._id}
          ownerProduct={isOwnerProduct}
          className={`btn-manager-mobile`}
        />
        <ButtonFooter
          product={product}
          chatWithUser={getOwnerProduct(product)}
          ownerProduct={isOwnerProduct}
          disabled={validateLoanDuration || errors?.quantity}
          handleDeal={handleDeal}
          location={location}
          className={`btn-footer-mobile`}
        />
      </Form>
      {/* <ModalQuantityCalendar
        show={showModal}
        setShowModal={setShowModal}
        product={product}
        calendarProduct={calendarProduct}
        isOwnerProduct={isOwnerProduct}
        selectedRange={selectedRange}
      /> */}
      <ModalProofAddress />
      <MinimumAssessment />
      <ModalProofAddressRequest />
    </Fragment>
  ) : null
}

export default formikMap(ProductDetailForm)
