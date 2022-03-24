import React from 'react'
import Radio from 'antd/lib/radio'
import classNames from 'classnames'
// components
import Feature from 'components/Feature'
// constants
import enumType from 'constants/enumType'
// services
import extensions from 'extensions/number'
// extension
import { COLLECTION_METHOD, DELIVERY_TYPE } from 'constants/enum'

const CollectionMethod = ({ values, handleChangeDelivery, icon }) => {
  const {
    orderId,
    isDelivery,
    isSelfCollection,
    product,
    deliveryType,
    _productOneWay
  } = values

  const onChangeMethod = (e) => {
    handleChangeDelivery(
      e.target.value
        ? _productOneWay
          ? DELIVERY_TYPE.ONE_WAY
          : DELIVERY_TYPE.TWO_WAY
        : DELIVERY_TYPE.NO_DELIVERY
    )
  }

  const onChangeDeliveryType = (e) => {
    handleChangeDelivery(e.target.value)
  }

  return product ? (
    <div>
      <Feature header="Collection Method" icon={icon}>
        {orderId ? (
          <p className="font-size-14">
            {isDelivery
              ? COLLECTION_METHOD.DELIVERY
              : COLLECTION_METHOD.SELF_COLLECT}
          </p>
        ) : (
          <Radio.Group
            onChange={onChangeMethod}
            value={!isSelfCollection ? !isSelfCollection : isDelivery}
            disabled={values.orderId}
          >
            {enumType.deliveryOptionsEnum.map((method, index, array) => {
              const disableCollection = values.checkCollectionMethodDisable(
                method.label
              )
              return (
                <Radio
                  key={index}
                  value={method.value}
                  className={classNames({
                    'custom-radio-payment-method__single font-size-16 d-block line-height__2 text-color-main text-radio': true,
                    'active-text-radio': !disableCollection,
                    'mb-4': array.length - 1 !== index
                  })}
                  disabled={disableCollection}
                >
                  <img
                    src={method.iconImage}
                    className={classNames({
                      'mr__15 ml-2': true,
                      'filter-opacity': !disableCollection
                    })}
                    alt={'lendor'}
                  />
                  {method.label}
                </Radio>
              )
            })}
            {isDelivery ? (
              <Radio.Group
                className="custom-radio-create ml-5 mt-3"
                name="radiogroup"
                value={
                  deliveryType === DELIVERY_TYPE.NO_DELIVERY
                    ? DELIVERY_TYPE.ONE_WAY
                    : deliveryType
                }
                onChange={onChangeDeliveryType}
              >
                {values.collectionMethods.map((method) => (
                  <Radio
                    key={method.value}
                    value={method.value}
                    deliveryPrice={method.deliveryFee}
                  >
                    {`${
                      method.value === DELIVERY_TYPE.TWO_WAY ? '2' : '1'
                    } Way Delivery (+${extensions.showFormatPrice(
                      method.deliveryFee
                    )})`}
                  </Radio>
                ))}
              </Radio.Group>
            ) : null}
          </Radio.Group>
        )}
      </Feature>
      <div className="my-4" />
    </div>
  ) : null
}

export default CollectionMethod
