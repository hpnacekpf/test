// libs
import Form from 'antd/lib/form'
import ButtonPermission from 'components/Button/ButtonPermission'
// components
import NotificationForm from 'components/NotificationSettings/NotificationForm'
import formikExtensions from 'extensions/formik'
import { withFormik } from 'formik'
import React, { useEffect } from 'react'

const formikMap = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    id: props.data ? props.data._id : null,
    //setting app
    appItemPosted: props.data ? props.data.appItemPosted || false : false,
    appNearbyPing: props.data ? props.data.appNearbyPing || false : false,
    appNewChat: props.data ? props.data.appNewChat || false : false,
    appNewDeal: props.data ? props.data.appNewDeal || false : false,
    appTransactions: props.data ? props.data.appTransactions || false : false,
    //setting email
    emailItemPosted: props.data ? props.data.emailItemPosted || false : false,
    emailNearbyPing: props.data ? props.data.emailNearbyPing || false : false,
    emailNewChat: props.data ? props.data.emailNewChat || false : false,
    emailNewDeal: props.data ? props.data.emailNewDeal || false : false,
    emailTransactions: props.data
      ? props.data.emailTransactions || false
      : false,

    //setting sms
    smsItemPosted: !!formikExtensions.getDefaultValueField(
      props.data,
      'smsItemPosted',
      false
    ),
    smsNearbyPing: !!formikExtensions.getDefaultValueField(
      props.data,
      'smsNearbyPing',
      false
    ),
    smsNewChat: !!formikExtensions.getDefaultValueField(
      props.data,
      'smsNewChat',
      false
    ),
    smsNewDeal: !!formikExtensions.getDefaultValueField(
      props.data,
      'smsNewDeal',
      false
    ),
    smsTransactions: !!formikExtensions.getDefaultValueField(
      props.data,
      'smsTransactions',
      false
    ),
    //user
    user: props.data ? props.data.user : props.user ? props.user : null
  }),
  handleSubmit: (data, { props }) => {
    props.handleSubmitForm(data)
  },

  displayName: 'Form'
})

const NotificationSettingForm = (props) => {
  useEffect(
    () => {
      const { resetForm } = props
      resetForm()
    },
    [props.data]
  )

  const { values, setFieldValue, handleSubmit } = props

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row notifications pt-10">
        <NotificationForm
          title={`Email notifications`}
          itemPosted={`emailItemPosted`}
          newChat={`emailNewChat`}
          newDeal={`emailNewDeal`}
          nearbyPing={`emailNearbyPing`}
          transactions={`emailTransactions`}
          values={values}
          setFieldValue={setFieldValue}
        />

        <NotificationForm
          title={`SMS notifications`}
          itemPosted={`smsItemPosted`}
          newChat={`smsNewChat`}
          newDeal={`smsNewDeal`}
          nearbyPing={`smsNearbyPing`}
          transactions={`smsTransactions`}
          values={values}
          setFieldValue={setFieldValue}
        />

        <NotificationForm
          title={`App notifications`}
          itemPosted={`appItemPosted`}
          newChat={`appNewChat`}
          newDeal={`appNewDeal`}
          nearbyPing={`appNearbyPing`}
          transactions={`appTransactions`}
          values={values}
          setFieldValue={setFieldValue}
        />
      </div>
      <div className="row mt-10">
        <div className="col-xl-12 text-center">
          <ButtonPermission
            allowSkip={false}
            checkSingpass={false}
            handleClick={handleSubmit}
            htmlType={'submit'}
            buttonType="btn-color-main"
            buttonClass="btn-order infoCard d-inline-block text-center min-width__245 py-3 py-2 font-weight-bold text-uppercase"
          >
            Save Changes
          </ButtonPermission>
        </div>
      </div>
    </Form>
  )
}

export default formikMap(NotificationSettingForm)
