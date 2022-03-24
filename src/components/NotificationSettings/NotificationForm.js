import React from 'react'
// components
import NotificationFormItem from './NotificationFormItem'

const NotificationForm = (props) => {

  const {
    title,
    itemPosted,
    newChat,
    newDeal,
    transactions,
    setFieldValue,
    values
  } = props
  return (
    <div className={`col-xl-12`}>
      <div className="py-3 mb-2">
        <h4 className="text__card-header font-size-20 mb-0">
          {title}
        </h4>
      </div>
      <div className={'card-box-shadow px-50 card-notifications py-50'}>
        
        {/* <NotificationFormItem
          field={itemPosted}
          title={`Item Posted`}
          setFieldValue={setFieldValue}
          values={values[itemPosted]}
        /> */}

        <NotificationFormItem
          field={newChat}
          title={`New Message`}
          setFieldValue={setFieldValue}
          values={values[newChat]}
        />

        <NotificationFormItem
          field={newDeal}
          title={`New Loan Request`}
          setFieldValue={setFieldValue}
          values={values[newDeal]}
        />

        <NotificationFormItem
          field={transactions}
          title={`Transaction Statuses`}
          setFieldValue={setFieldValue}
          values={values[transactions]}
        />

      </div>
    </div>
  )
}

export default NotificationForm
