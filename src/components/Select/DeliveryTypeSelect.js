import React, { useEffect } from 'react'
import Select from 'antd/lib/select'
import Icon from 'antd/lib/icon'
import enumType from 'constants/enumType'

const DeliveryTypeSelect = ({ type, onChange }) => {
  const { Option } = Select

  useEffect(() => {
    if (onChange) onChange(type ?? enumType.deliveryType[1].value)
  }, [])

  return (
    <React.Fragment>
      <Icon type="line" className="ml-3" />
      <Select
        onChange={(value) => onChange(value)}
        value={type ?? enumType.deliveryType[0].value}
        style={{ width: '48%' }}
        className={`custom-topbar-category text-uppercase rounded-0 bg__breadcrumb border-grey font-cabin border-radius-left-2 text__search ml-3`}
      >
        {enumType.deliveryType.map((item, index) => {
          return (
            <Option value={item.value} key={index} className={`text-uppercase`}>
              {item.label}
            </Option>
          )
        })}
      </Select>
    </React.Fragment>
  )
}

export default DeliveryTypeSelect
