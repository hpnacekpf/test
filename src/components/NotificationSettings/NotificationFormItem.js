import React from 'react'
// libs
import Form from 'antd/lib/form'
import Switch from 'antd/lib/switch'
import Icon from 'antd/lib/icon'
// constants
import { formItemLayout } from 'constants/index'

const NotificationFormItem = (props) => {
  const FormItem = Form.Item

  const { field, title, setFieldValue, values } = props

  return (
    <FormItem
      {...formItemLayout}
      htmlFor={field}
      label={<span className="font-size-18 text__card-header">{title}</span>}
      className="custom-input mb-4"
    >
      <Switch
        checkedChildren={<Icon type="check" />}
        unCheckedChildren={<Icon type="close" />}
        onClick={() => {
          setFieldValue(field, !values)
        }}
        checked={values}
      />
    </FormItem>
  )
}

export default NotificationFormItem
