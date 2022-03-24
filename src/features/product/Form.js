import React, { useEffect, useState, Fragment } from 'react'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Select from 'antd/lib/select'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import Checkbox from 'antd/lib/checkbox'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

// constants
import {
  MIN_DISCOUNT,
  MAX_DISCOUNT,
  MAX_PRODUCT_IMAGE,
  MIN_PRODUCT_IMAGE,
  DEFAULT_TEXTAREA_ROWS,
  DefaultDiscountBlack,
  DEFAULT_QUANTITY,
  MIN_RENTAL_DAYS,
  DefaultIconLPP,
  DELIVERY_TOOLTIP,
  MAX_RENTAL_DAYS
} from 'constants/index'
import enumType from 'constants/enumType'
import { SELL_STATUS, TNBL_DELIVERY_TYPE } from 'constants/enum'
import utils from 'utils'
import validate from 'constants/validate'
import { routes } from 'routes/mainNav'
// extensions
import formikExtensions from 'extensions/formik'
import yupExtensions from 'extensions/yup'
import xss from 'extensions/xss'
// import { isChangeQuantity } from 'extensions/user'
// components
import CategorySelect from 'components/Select/CategorySelect'
import DiscountSelect from 'components/Select/DiscountSelect'
import CustomButton from 'components/Button/CustomButton'
import ErrorField from 'components/ErrorField'
import UploadImageProduct from 'components/Upload/UploadImageProduct'
import UploadInfo from 'components/Upload/UploadInfo'
import InputNumber from 'components/Input/InputNumber'
import CustomizeTooltip from 'components/CustomizeTooltip'
import DeliveryTypeSelect from 'components/Select/DeliveryTypeSelect'
import { isUserProtected } from 'extensions/user'
import Tooltip from 'antd/lib/tooltip'
import ButtonPermission from 'components/Button/ButtonPermission'

const FormItem = Form.Item
const { TextArea } = Input
const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
    md: { span: 7 },
    lg: { span: 7 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    md: { span: 17 },
    lg: { span: 17 }
  }
}

const getProductOwner = (product, currentUser) => {
  if (!product || !product.user) {
    if (currentUser) {
      return currentUser._id
    }
    return null
  }
  return product.user._id
}

const formikMap = withFormik({
  // enableReinitialize: true,
  validationSchema: Yup.object().shape({
    name: yupExtensions.nameProductRegex,
    category: yupExtensions.stringRequired,
    dailyRate: yupExtensions.dailyRate,
    originPrice: yupExtensions.number,
    sellStatus: yupExtensions.stringRequired,

    images: Yup.array()
      .required(validate.requiredImage)
      .min(MIN_PRODUCT_IMAGE, ({ min }) => validate.minProductImage(min))
      .max(MAX_PRODUCT_IMAGE, ({ max }) => validate.maxProductImage(max)),
    maxRentalDay: yupExtensions.maxRentDay,
    noWay: Yup.bool().when(['oneWay', 'twoWay'], {
      is: false,
      then: Yup.bool().oneOf(
        [true],
        'Please select at least one delivery option.'
      ),
      otherwise: Yup.bool()
    }),
    tnblNoWay: Yup.bool().when(['tnblOneWay', 'sellStatus'], {
      is: (tnblOneWay, sellStatus) =>
        sellStatus === SELL_STATUS.TRY_NOW_BUY_LATER && !tnblOneWay,
      then: Yup.bool().oneOf(
        [true],
        'Please select at least one delivery option.'
      ),
      otherwise: Yup.bool()
    }),
    tnblOneWayFee: Yup.number().when('tnblOneWay', {
      is: true,
      then: yupExtensions.flatRate,
      otherwise: Yup.number().nullable()
    })
  }),
  mapPropsToValues: ({ data, user }) => {
    return {
      id: formikExtensions.getDefaultValueField(data, '_id', null),
      name: formikExtensions.getDefaultValueField(data, 'name', ''),
      category: formikExtensions.getObjectValueField({
        rawValue: data ? data.category : null,
        labelField: 'name',
        valueField: '_id'
      }),
      description: utils.handleShowLineBreakTextarea(
        xss.removeTagExceptBr(
          formikExtensions.getDefaultValueField(data, 'description', null)
        )
      ),
      dailyRate: formikExtensions.getDefaultValueField(data, 'price', '0'),
      originPrice: formikExtensions.getDefaultValueField(
        data,
        'originPrice',
        '0'
      ),
      quantity: formikExtensions.getDefaultValueField(data, 'quantity', '1'),
      minRentalDay: formikExtensions.getDefaultValueField(
        data,
        'minRentalDay',
        '1'
      ),
      sellStatus: formikExtensions.getDefaultValueField(
        data,
        'sellStatus',
        SELL_STATUS.RENT_ONLY
      ),
      maxRentalDay: formikExtensions.getDefaultValueField(
        data,
        'maxRentalDay',
        null
      ),
      refundableDeposit: formikExtensions.getDefaultValueField(
        data,
        'deposit',
        '0'
      ),
      discountWeekly:
        data && data.discount && data.discount.weekly > 0
          ? Number(data.discount.weekly)
          : null,
      discountMonthly:
        data && data.discount && data.discount.monthly > 0
          ? Number(data.discount.monthly)
          : null,
      user: getProductOwner(data, user),
      images: formikExtensions.getListImageValueField({
        data: data,
        fieldName: 'pictures',
        fileNameField: 'filename',
        imageType: enumType.imagePath.Product
      }),
      noWay:
        data && data.collectionMethod && data.collectionMethod.noWay
          ? data.collectionMethod.noWay.applied
          : false,
      oneWay:
        data && data.collectionMethod && data.collectionMethod.oneWay
          ? data.collectionMethod.oneWay.applied
          : false,
      twoWay:
        data && data.collectionMethod && data.collectionMethod.twoWay
          ? data.collectionMethod.twoWay.applied
          : false,
      oneWayFee:
        data && data.collectionMethod && data.collectionMethod.oneWay
          ? data.collectionMethod.oneWay.fee
          : 0,
      twoWayFee:
        data && data.collectionMethod && data.collectionMethod.twoWay
          ? data.collectionMethod.twoWay.fee
          : 0,
      tnblNoWay:
        data && data.tnblCollectionMethod && data.tnblCollectionMethod.noWay
          ? data.tnblCollectionMethod.noWay.applied
          : false,
      tnblOneWay:
        data && data.tnblCollectionMethod && data.tnblCollectionMethod.oneWay
          ? data.tnblCollectionMethod.oneWay.applied
          : false,
      tnblOneWayFee:
        data && data.tnblCollectionMethod && data.tnblCollectionMethod.oneWay
          ? data.tnblCollectionMethod.oneWay.fee
          : 0
    }
  },
  handleSubmit: (data, { props }) => {
    props.handleSubmit({
      ...data,
      name: xss.removeXssContent(data.name),
      description: xss.removeXssContent(data.description)
    })
  },
  displayName: 'Form'
})

const LabelForm = ({ children, subTitle, isRequire }) => (
  <span
    className={classNames(
      {
        'required-field': isRequire
      },
      'font-size-16 text-color-primary-v1'
    )}
  >
    {children}
    {subTitle || null}
  </span>
)

const FormProduct = (props) => {
  const {
    isLimit,
    isCreate,
    values,
    data,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    resetForm,
    handleCancel,
    user,
    sellStatus
  } = props

  const [showUploadInfo, setShowUploadInfo] = useState(false)
  const [rangeDiscountWeekly, setRangeDiscountWeekly] = useState([
    MIN_DISCOUNT,
    MAX_DISCOUNT
  ])
  const [rangeDiscountMonthly, setRangeDiscountMonthly] = useState([
    MIN_DISCOUNT,
    MAX_DISCOUNT
  ])

  const isPremiumUser = isUserProtected(user)

  useEffect(
    () => {
      resetForm()
    },
    [data]
  )

  useEffect(
    () => {
      const { discountMonthly } = values
      const maxDiscountTemp =
        typeof discountMonthly === 'number'
          ? Number(discountMonthly)
          : MAX_DISCOUNT

      setRangeDiscountWeekly([MIN_DISCOUNT, maxDiscountTemp])
    },
    [values.discountMonthly]
  )

  useEffect(
    () => {
      const { discountWeekly } = values

      const minDiscountMonthly =
        typeof discountWeekly === 'number'
          ? Number(discountWeekly)
          : MIN_DISCOUNT

      setRangeDiscountMonthly([minDiscountMonthly, MAX_DISCOUNT])
    },
    [values.discountWeekly]
  )

  const limitPointerClass = isLimit ? 'pointer-event-none' : ''

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row px-15 d-flex justify-content-center">
        <div className="col-lg-10">
          <FormItem
            {...formItemLayout}
            label={<LabelForm isRequire={true}>Product Name</LabelForm>}
            className="custom-input mb-4"
          >
            <Input
              name="name"
              className={classNames(
                'ant-input border__input rounded-0 bg-input-lend-item',
                limitPointerClass
              )}
              placeholder="Enter name of item"
              value={xss.htmlBBCodeWithoutXss(values?.name)}
              onChange={(event) => setFieldValue('name', event.target.value)}
              onBlur={() => setFieldTouched('name', true)}
            />
            <ErrorField errors={errors} touched={touched} fieldName="name" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<LabelForm isRequire={true}>Category</LabelForm>}
            className="custom-input mb-4 category-responsive"
          >
            <CategorySelect
              value={values.category}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              path={'category'}
              setPointer={limitPointerClass}
            />
            <ErrorField
              touched={touched}
              errors={errors}
              fieldName="category"
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<LabelForm>Description</LabelForm>}
            className="custom-input mb-4"
          >
            <TextArea
              placeholder="Key in details of the item"
              name="description"
              value={xss.htmlBBCodeWithoutXss(values?.description)}
              rows={DEFAULT_TEXTAREA_ROWS}
              onChange={(value) =>
                setFieldValue('description', value.target.value)
              }
              className={classNames(
                'text-area-custom textarea-primary bg-input-lend-item',
                limitPointerClass
              )}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <LabelForm
                subTitle={
                  <CustomizeTooltip
                    title={
                      'We recommend anywhere between 1-5% of the current Retail Price.'
                    }
                  >
                    <i className="fa fa-question-circle-o ml-2" />
                  </CustomizeTooltip>
                }
                isRequire={true}
              >
                Daily Rate
              </LabelForm>
            }
            className="custom-input mb-4"
          >
            <InputNumber
              onChange={(dailyRate) => {
                setFieldValue('dailyRate', utils.showDecimalPlace(dailyRate))
              }}
              onBlur={() => setFieldTouched('dailyRate', true)}
              values={values.dailyRate}
              className={classNames('w-100', limitPointerClass)}
            />
            <ErrorField
              errors={errors}
              touched={touched}
              fieldName="dailyRate"
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <Fragment>
                <LabelForm isRequire={true}>Delivery Options</LabelForm>
              </Fragment>
            }
            className="custom-input mb-4"
          >
            <div className={`d-flex align-items-center flex-wrap`}>
              <Checkbox
                className={classNames('custom-checkbox', limitPointerClass)}
                onChange={() => setFieldValue('noWay', !values.noWay)}
                checked={values.noWay}
              >
                Self-Collect
              </Checkbox>
              <Checkbox
                className={classNames('custom-checkbox', limitPointerClass)}
                onChange={() => {
                  setFieldValue('oneWay', !values.oneWay)
                }}
                checked={values.oneWay}
              >
                1-Way Delivery
              </Checkbox>
              <Checkbox
                className={classNames('custom-checkbox', limitPointerClass)}
                onChange={() => {
                  setFieldValue('twoWay', !values.twoWay)
                }}
                checked={values.twoWay}
              >
                2-Way Delivery
              </Checkbox>
            </div>
            <ErrorField errors={errors} touched={touched} fieldName="noWay" />
          </FormItem>
          {values.oneWay ? (
            <FormItem
              {...formItemLayout}
              label={<LabelForm>1-Way Delivery Price</LabelForm>}
              className=""
            >
              <InputNumber
                values={values.oneWayFee}
                className={classNames(
                  'border__input rounded-0 w-100 custom-input-number ant-input bg-input-lend-item',
                  limitPointerClass
                )}
                onBlur={() => setFieldTouched('oneWayFee', true)}
                onChange={(value) =>
                  setFieldValue('oneWayFee', utils.showDecimalPlace(value))
                }
              />
            </FormItem>
          ) : null}
          {values.twoWay ? (
            <FormItem
              {...formItemLayout}
              label={<LabelForm>2-Way Delivery Price</LabelForm>}
              className=""
            >
              <InputNumber
                values={values.twoWayFee}
                className={classNames(
                  'border__input rounded-0 w-100 custom-input-number ant-input bg-input-lend-item',
                  limitPointerClass
                )}
                onBlur={() => setFieldTouched('twoWayFee', true)}
                onChange={(value) =>
                  setFieldValue('twoWayFee', utils.showDecimalPlace(value))
                }
              />
            </FormItem>
          ) : null}
          <FormItem
            {...formItemLayout}
            label={
              <LabelForm
                subTitle={
                  <CustomizeTooltip
                    title={
                      'Anywhere between 50% to 100% of the current Retail Price.'
                    }
                  >
                    <i className="fa fa-question-circle-o ml-2" />
                  </CustomizeTooltip>
                }
              >
                Refundable Deposit
                <small className="font-size-14 text__small-label text-color-upload-image mx-2">
                  (optional)
                </small>
              </LabelForm>
            }
            className=""
          >
            <InputNumber
              values={values.refundableDeposit}
              className={classNames(
                'border__input rounded-0 w-100 custom-input-number ant-input bg-input-lend-item',
                limitPointerClass
              )}
              onBlur={() => setFieldTouched('refundableDeposit', true)}
              onChange={(value) =>
                setFieldValue(
                  'refundableDeposit',
                  utils.showDecimalPlace(value)
                )
              }
              placeholder="Set a deposit amount"
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <LabelForm>
                <div className="font-size-16 text-color-primary-v1">
                  Discounts
                  <small className="font-size-14 text__small-label text-color-upload-image mx-2">
                    (optional)
                  </small>
                </div>
              </LabelForm>
            }
            className="custom-input mb-2 discount-responsive"
          >
            <Row gutter={10}>
              <Col span={12}>
                <DiscountSelect
                  typeDiscount={enumType.discountType.Weekly}
                  customClass={limitPointerClass}
                  placeholder={'Set a Weekly Discount'}
                  value={values.discountWeekly}
                  fieldName="discountWeekly"
                  onChange={(path, value) =>
                    setFieldValue(path, Number(value ? value : 0))
                  }
                  onBlur={setFieldTouched}
                  rangeDiscount={rangeDiscountWeekly}
                />
                <CustomizeTooltip title={'30% - 40% to attract more rentals!'}>
                  <i className="fa fa-question-circle-o ml-2" />
                </CustomizeTooltip>
                {values.discountWeekly ? (
                  <div className="py-1 d-flex align-items-center">
                    <span>
                      <span>
                        <img
                          src={DefaultDiscountBlack}
                          alt="discount tag"
                          className="mr__15"
                          style={{
                            width: '6%',
                            height: '6%'
                          }}
                        />
                      </span>
                      <span className="lendor-color-primary-v1">
                        {`Weekly Prices (After ${
                          values.discountWeekly
                        }% Discount) = `}
                      </span>
                      <span className={`font-weight-bold font-size-22 mr-1`}>
                        {`$${(
                          (values.dailyRate *
                            7 *
                            (100 - values.discountWeekly)) /
                          100
                        ).toFixed(2)}`}
                      </span>
                    </span>
                  </div>
                ) : null}
              </Col>
              <Col span={12}>
                <DiscountSelect
                  typeDiscount={enumType.discountType.Monthly}
                  customClass={limitPointerClass}
                  placeholder={'Set a Monthly Discount'}
                  value={values.discountMonthly}
                  fieldName="discountMonthly"
                  onChange={(path, value) =>
                    setFieldValue(path, Number(value ? value : 0))
                  }
                  onBlur={setFieldTouched}
                  rangeDiscount={rangeDiscountMonthly}
                />
                <CustomizeTooltip title={'50% - 60% to attract more rentals!'}>
                  <i className="fa fa-question-circle-o ml-2" />
                </CustomizeTooltip>
                {values.discountMonthly ? (
                  <div className="py-1 d-flex align-items-center">
                    <span>
                      <span>
                        <img
                          src={DefaultDiscountBlack}
                          alt="discount tag"
                          className="mr__15"
                          style={{
                            width: '6%',
                            height: '6%'
                          }}
                        />
                      </span>
                      <span className="lendor-color-primary-v1">
                        {`Monthly Prices (After ${
                          values.discountMonthly
                        }% Discount) = `}
                      </span>
                      <span className={`font-weight-bold font-size-22 mr-1`}>
                        {`$${(
                          (values.dailyRate *
                            30 *
                            (100 - values.discountMonthly)) /
                          100
                        ).toFixed(2)}`}
                      </span>
                    </span>
                  </div>
                ) : null}
              </Col>
            </Row>
            <div className="line-height__1 mt-2">
              <small className="font-size-14 text__small-label-v1">
                Will apply when users take a min. loan of 7 - 30 days.
              </small>
            </div>
          </FormItem>
          <hr className="my-4" />
          <FormItem
            {...formItemLayout}
            label={
              <Fragment>
                <div
                  onClick={() => {
                    setShowUploadInfo(!showUploadInfo)
                  }}
                >
                  <LabelForm isRequire={true}>Upload Item Image</LabelForm>
                  <span className={`cursor-pointer ml-2`}>
                    <i
                      className={classNames(`fa`, {
                        'fa-chevron-down': !showUploadInfo,
                        'fa-chevron-up': showUploadInfo
                      })}
                    />
                  </span>
                </div>
              </Fragment>
            }
            className="custom-input mb-0 py-20"
          >
            <UploadImageProduct
              data={values.images}
              type={enumType.uploadType.Product}
              handleUploadFile={(file) => setFieldValue('images', file)}
              handleChangeFile={(fileList) => setFieldValue('images', fileList)}
              multiple={true}
              isCrop={true}
            />
            <UploadInfo show={showUploadInfo} />
            <ErrorField errors={errors} touched={touched} fieldName="images" />
            {/* <ModalUploadInfo show={showModal} setShowModal={setShowModal} /> */}

            {/* upload item list */}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<LabelForm>Original item value</LabelForm>}
            className="custom-input mb-4"
          >
            <InputNumber
              onChange={(originPrice) => {
                setFieldValue(
                  'originPrice',
                  utils.showDecimalPlace(originPrice)
                )
              }}
              onBlur={() => setFieldTouched('originPrice', true)}
              values={values.originPrice}
              className={classNames('w-100', limitPointerClass)}
            />
            <ErrorField
              errors={errors}
              touched={touched}
              fieldName="originPrice"
            />
          </FormItem>
          <h5>
            {isPremiumUser ? null : (
              <Fragment>
                <hr className="my-4 pb-5" />
                <div className={`d-flex align-items-center flex-wrap`}>
                  <img src={DefaultIconLPP} alt="LPP" />
                  <span className={`ml-2`}>PREMIUM FEATURES TO UNLOCK</span>
                  <Link
                    to={routes.ENTERPRISE_SOLUTION_PRICING}
                    className="custom-link opacity-58"
                  >
                    See details
                  </Link>
                </div>
              </Fragment>
            )}
          </h5>
          <hr className="my-4" />
          <FormItem
            {...formItemLayout}
            label={<LabelForm>Product Quantity</LabelForm>}
            className="custom-input mb-4"
          >
            <InputNumber
              onChange={(quantity) =>
                setFieldValue(
                  'quantity',
                  utils.roundDecimalPlace(quantity, 0, 1)
                )
              }
              onBlur={(quantity) =>
                setFieldTouched(
                  'quantity',
                  utils.roundDecimalPlace(quantity, 0, 1)
                )
              }
              values={values.quantity}
              className={classNames(limitPointerClass)}
              step="1"
              min={DEFAULT_QUANTITY}
              // max={MAX_QUANTITY}
              disablePrefix
              disabled={!isPremiumUser}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <LabelForm>
                Min Rental Duration
                <small className="font-size-14 text__small-label text-color-upload-image mx-2">
                  (optional)
                </small>
              </LabelForm>
            }
            className="custom-input mb-4"
          >
            <InputNumber
              onChange={(minRentalDay) =>
                setFieldValue(
                  'minRentalDay',
                  utils.roundDecimalPlace(minRentalDay, 0, 1)
                )
              }
              onBlur={(minRentalDay) =>
                setFieldTouched(
                  'minRentalDay',
                  utils.roundDecimalPlace(minRentalDay, 0, 1)
                )
              }
              values={values.minRentalDay}
              className={classNames(limitPointerClass)}
              step="1"
              min={MIN_RENTAL_DAYS}
              // max={MAX_RENTAL_DAYS}
              disablePrefix
              disabled={!isPremiumUser}
            />
            {'  '}
            days
          </FormItem>

          {/* max rental days */}
          <FormItem
            {...formItemLayout}
            label={
              <LabelForm>
                Max Rental Duration
                <small className="font-size-14 text__small-label text-color-upload-image mx-2">
                  (optional)
                </small>
              </LabelForm>
            }
            className="custom-input mb-4"
          >
            <InputNumber
              onChange={(maxRentalDay) =>
                setFieldValue(
                  'maxRentalDay',
                  utils.roundDecimalPlace(maxRentalDay, 0, null)
                )
              }
              values={values.maxRentalDay}
              className={classNames(limitPointerClass)}
              step="1"
              max={MAX_RENTAL_DAYS}
              disablePrefix
              disabled={!isPremiumUser}
            />
            {'  '}
            days
            <ErrorField
              errors={errors}
              touched={touched}
              fieldName="maxRentalDay"
            />
          </FormItem>
          <hr className="my-4" />
          {/* try now pay later */}
          {sellStatus === SELL_STATUS.TRY_NOW_BUY_LATER ? (
            <Fragment>
              <FormItem
                {...formItemLayout}
                label={<LabelForm>Try Now, Buy Later</LabelForm>}
                className="custom-input mb-4"
              >
                <Select
                  onChange={(value) => setFieldValue('sellStatus', value)}
                  value={values.sellStatus}
                  style={{ width: '200px' }}
                  suffixIcon={<Icon type="caret-down" />}
                  className={`custom-topbar-category text-uppercase rounded-0 bg__breadcrumb border-grey font-cabin border-radius-left-2 text__search`}
                >
                  {enumType.sellStatusType.map((item, index) => {
                    return (
                      <Option
                        value={item.value}
                        key={index}
                        className={`custom-selection-category ant-dropdown-menu-item`}
                      >
                        {item.label}
                      </Option>
                    )
                  })}
                </Select>
              </FormItem>

              {values.sellStatus === SELL_STATUS.TRY_NOW_BUY_LATER ? (
                <Fragment>
                  <FormItem
                    {...formItemLayout}
                    label={
                      <Fragment>
                        <LabelForm isRequire={true}>Delivery Options</LabelForm>
                      </Fragment>
                    }
                    className="custom-input mb-4"
                  >
                    <div className={`d-flex align-items-center flex-wrap`}>
                      <Checkbox
                        className={classNames(
                          'custom-checkbox',
                          limitPointerClass
                        )}
                        onChange={() =>
                          setFieldValue('tnblNoWay', !values.tnblNoWay)
                        }
                        checked={values.tnblNoWay}
                      >
                        Self-Collect
                      </Checkbox>
                      <Checkbox
                        className={classNames(
                          'custom-checkbox',
                          limitPointerClass
                        )}
                        onChange={() => {
                          setFieldValue('tnblOneWay', !values.tnblOneWay)
                        }}
                        checked={values.tnblOneWay}
                      >
                        Delivery
                      </Checkbox>
                    </div>
                    <ErrorField
                      errors={errors}
                      touched={touched}
                      fieldName="tnblNoWay"
                    />
                  </FormItem>
                  {values.tnblOneWay ? (
                    <FormItem
                      {...formItemLayout}
                      label={<LabelForm>Delivery Price</LabelForm>}
                      className=""
                    >
                      <InputNumber
                        values={values.tnblOneWayFee}
                        className={classNames(
                          'border__input rounded-0 w-100 custom-input-number ant-input bg-input-lend-item',
                          limitPointerClass
                        )}
                        onBlur={() => setFieldTouched('tnblOneWayFee', true)}
                        onChange={(value) =>
                          setFieldValue(
                            'tnblOneWayFee',
                            utils.showDecimalPlace(value)
                          )
                        }
                      />
                    </FormItem>
                  ) : null}
                </Fragment>
              ) : null}
            </Fragment>
          ) : null}

          <FormItem className="custom-input mb-2">
            <div className="d-flex justify-content-between align-items-center submit-product ">
              <CustomButton
                buttonType="btn-color-main-outline"
                handleClick={handleCancel}
                buttonClass={classNames(
                  'btn-large text-uppercase mb-0 font-weight-bold',
                  limitPointerClass
                )}
              >
                Cancel
              </CustomButton>
              {/* <CustomButton
                buttonType="btn-color-main"
                handleClick={handleSubmit}
                buttonClass={classNames(
                  'btn-large text-uppercase mb-0 font-weight-bold',
                  limitPointerClass
                )}
              >
                {isCreate ? 'List Item' : 'Update Listing'}
              </CustomButton> */}
              <ButtonPermission
                allowSkip={false}
                checkSingpass={false}
                buttonType="btn-color-main"
                handleClick={handleSubmit}
                buttonClass={classNames(
                  'btn-large text-uppercase mb-0 font-weight-bold',
                  limitPointerClass
                )}
              >
                {isCreate ? 'List Item' : 'Update Listing'}
              </ButtonPermission>
            </div>
          </FormItem>
        </div>
      </div>
    </Form>
  )
}

export default formikMap(FormProduct)
