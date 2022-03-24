import React from 'react'
import { connectModal } from 'redux-modal'
import * as Yup from 'yup'
import Form from 'antd/lib/form'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import FormItem from 'antd/lib/form/FormItem'
import { withFormik } from 'formik'
import { connect } from 'react-redux'
// components
import CustomButton from '../Button/CustomButton'
import validate from 'constants/validate'
// extensions
import stringHelper from 'extensions/string'
import ErrorField from '../ErrorField'
import { useGetUser } from 'hooks/globalStores/useAuthStore'

const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    affiliateCode: Yup.string()
      .label('Affiliate code')
      .matches(/^((?:[A-Za-z0-9]+ ?){1,4})$/, 'Invalid Code.')
      .min(6)
      .max(10)
      .typeError(validate.required)
  }),
  mapPropsToValues: () => {
    return {
      affiliateCode: ''
    }
  },
  handleSubmit: (data, { props }) => {
    const { handleAffiliateCode, handleHide } = props
    const clause = `code: "${data.affiliateCode}"`
    handleAffiliateCode(clause)
      .then(() => {
        handleHide()
      })
      .catch((error) => console.log(error))
  },
  displayName: 'Form'
})

const ModalAffiliateCode = (props) => {
  const {
    show,
    handleHide,
    title,
    content,
    handleCancelClick,
    handleSubmit,
    okText,
    cancelText,
    className,
    setFieldTouched,
    setFieldValue,
    values,
    classInput,
    errors,
    touched
  } = props

  const user = useGetUser()

  const userName = user?.name

  return (
    <Modal
      visible={show}
      mask={false}
      closable={false}
      cancelText={cancelText ? cancelText : 'Cancel'}
      okText={okText ? okText : 'Confirm'}
      className={`custom-modal custom-modal-sign-out modal-delivery ${
        className ? className : ''
      }`}
      autoFocusButton="cancel"
      maskClosable={true}
      cancelButtonProps={{
        style: { order: 1 },
        className: `btn-color-grey`
      }}
      okButtonProps={{
        style: { order: 2 },
        className: `btn-color-main`,
        disabled: !values.affiliateCode
      }}
      title={
        <h4 className="text-center title-modal font-roboto text-uppercase font-weight-bold">
          {title}
        </h4>
      }
      onCancel={() => {
        if (handleCancelClick) {
          handleCancelClick()
        }
        handleHide()
      }}
      onOk={() => {
        if (handleSubmit) {
          handleSubmit()
        }
      }}
    >
      <div className={'text-center'}>
        <p className="ant-modal-description">{content}</p>
        <Form>
          <FormItem>
            <span className="d-flex custom-promo-code">
              <Input
                className={`ant-input border ${classInput}`}
                type="text"
                placeholder="generate code"
                value={values.affiliateCode}
                onChange={(event) => {
                  const affiliateCode = event.target.value
                  if (affiliateCode) {
                    setFieldValue(
                      'affiliateCode',
                      stringHelper
                        .upperCaseString(affiliateCode.replace(/:( )?/g, ''))
                        .replace(/\s/g, '')
                    )
                  } else {
                    setFieldValue('affiliateCode', '')
                  }
                }}
                onBlur={() => setFieldTouched('affiliateCode ', true)}
              />
              <CustomButton
                type="link"
                htmlType={'button'}
                handleClick={() =>
                  setFieldValue(
                    'affiliateCode',
                    `${stringHelper.upperCaseString(
                      userName.replace(/\s/g, '')
                    )}`
                  )
                }
                buttonType="btn-color-grey"
                buttonClass="btn-large text-uppercase infoCard__title rounded-left-0"
              >
                Generate Code
              </CustomButton>
            </span>
            <ErrorField
              errors={errors}
              touched={touched}
              fieldName={'affiliateCode'}
            />
          </FormItem>
        </Form>
      </div>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch) => ({})

export default connectModal({ name: 'modalAffiliateCode' })(
  connect(
    null,
    mapDispatchToProps
  )(formikMap(ModalAffiliateCode))
)
