import React, { useEffect, useRef } from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
// extensions
import yupExtensions from 'extensions/yup'
// components
import CustomButton from 'components/Button/CustomButton'
import ErrorField from 'components/ErrorField'

const FormItem = Form.Item

const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    email: yupExtensions.emailRequired
  }),
  mapPropsToValues: () => ({
    email: null
  }),
  handleSubmit: (data, { props }) => {
    props.handleSubmit(data)
  },
  displayName: 'Form'
})

const FormRegister = (props) => {
  const {
    handleSubmit,
    handleCancel,
    errors,
    touched,
    setFieldValue,
    setFieldTouched
  } = props

  const mailRef = useRef(null)

  useEffect(() => {
    if (mailRef && mailRef.current) {
      mailRef.current.focus()
    }
  }, [])

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <FormItem className="my__25">
        <Input
          placeholder="Enter your e-mail here"
          className="input-form"
          ref={mailRef}
          onChange={(email) => setFieldValue('email', email.target.value)}
          onBlur={() => setFieldTouched('email', true)}
        />
        <ErrorField touched={touched} errors={errors} fieldName="email" />
      </FormItem>
      <CustomButton
        htmlType="submit"
        buttonType="btn-color-main"
        buttonClass="login-form-button btn-block btn-form btn-login mb-3 font-weight-bold text-uppercase"
      >
        Proceed
      </CustomButton>
    </Form>
  )
}

export default formikMap(FormRegister)
