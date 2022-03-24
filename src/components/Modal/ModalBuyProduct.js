import React, { useState, useEffect } from 'react'
import { connectModal } from 'redux-modal'
import Modal from 'antd/lib/modal'
import { Button } from 'antd'
import { COLLECTION_ICON } from 'constants/index'
import {
  TNBL_DELIVERY_TYPE,
  COLLECTION_METHOD,
  REDUX_MODAL,
  PAYMENT_METHOD
} from 'constants/enum'
import CollectionMethod from '../../features/order/loanRequest/CollectionMethod'
import PaymentMethod from 'features/order/loanRequest/PaymentMethod'
import Feature from 'components/Feature'
import { useBuyProduct } from 'reducers/order/hook'
import numberExtensions from 'extensions/number'
import { useModal } from 'hooks/useModal'
import { useGetUser } from 'hooks/globalStores/useAuthStore'

const ModalBuyProduct = (props) => {
  const {
    orderId,
    productId,
    selfCollect,
    deliveryType,
    flatRate,
    show,
    handleHide,
    totalPrice
  } = props

  const [delivery, setDelivery] = useState(null)

  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.CREDIT_CARD)

  const [total, setTotal] = useState(totalPrice)

  const [onBuyProduct] = useBuyProduct()

  const [openModal] = useModal()

  const user = useGetUser()

  useEffect(
    () => {
      if (selfCollect) {
        setDelivery(TNBL_DELIVERY_TYPE.NO_DELIVERY)
      } else {
        if (deliveryType) {
          setDelivery(deliveryType)
          onChangeTotal(flatRate)
        }
      }
    },
    [selfCollect, deliveryType]
  )

  const onChangeTotal = (deliveryFee) => {
    const total = numberExtensions.parseToNumber(totalPrice)
    const flatRate = numberExtensions.parseToNumber(deliveryFee)
    setTotal(total + flatRate)
  }

  const handleChangeDelivery = (delivery) => {
    setDelivery(delivery)
    onChangeTotal(delivery === TNBL_DELIVERY_TYPE.NO_DELIVERY ? 0 : flatRate)
  }

  const handleChangePaymentMethod = (method) => {
    setPaymentMethod(method)
  }

  const checkCollectionMethodDisable = (collectionMethod) => {
    if (collectionMethod === COLLECTION_METHOD.SELF_COLLECT) {
      return !selfCollect
    }
    if (collectionMethod === COLLECTION_METHOD.DELIVERY) {
      return deliveryType === TNBL_DELIVERY_TYPE.NO_DELIVERY
    }
    return false
  }

  const checkPaymentMethodDisable = (method) => {
    return method === PAYMENT_METHOD.CASH
  }

  const handleConfirm = () => {
    handleHide()
    if (delivery === TNBL_DELIVERY_TYPE.NO_DELIVERY) {
      onSubmitRequest()
    } else {
      openModal(REDUX_MODAL.DELIVERY, {
        title: 'Delivery ADDRESS',
        content: `Please input your delivery address.`,
        isSaveDeliveryInfo: user?.isSaveDeliveryInfo ?? false,
        user,
        handleSubmitOrder: (address) => {
          onSubmitRequest(address)
        }
      })
    }
  }

  const onSubmitRequest = (address) => {
    onBuyProduct({
      deliveryType: delivery,
      orderId,
      productId,
      addressBuyer: address?.addressDelivery ?? null,
      cityBuyer: address?.cityDelivery ?? null,
      zipCodeBuyer: address?.zipCodeDelivery ?? null,
      isSaveDeliveryInfo: !!address?.isSaveDeliveryInfo
    })
  }

  const collectionMethods = [
    {
      value: TNBL_DELIVERY_TYPE.ONE_WAY,
      deliveryFee: flatRate
    }
  ]

  return (
    <Modal
      centered={true}
      visible={show}
      mask={true}
      maskClosable={false}
      closable={false}
      footer={null}
      className="custom-modal modal-delivery"
    >
      <Feature header="Shipping and Payment">
        <CollectionMethod
          icon={COLLECTION_ICON}
          values={{
            isDelivery: delivery !== TNBL_DELIVERY_TYPE.NO_DELIVERY,
            isSelfCollection: selfCollect,
            deliveryType,
            product: {},
            checkCollectionMethodDisable,
            collectionMethods
          }}
          handleChangeDelivery={handleChangeDelivery}
        />
        <PaymentMethod
          values={{
            paymentMethod,
            disableAllPayment: false,
            checkPaymentMethodDisable,
            totalPrice: total
          }}
          handleChangePaymentMethod={handleChangePaymentMethod}
          isVertical={true}
        />
      </Feature>

      <hr className="my-4" />
      <div className="text-center">
        <div className="d-flex">
          <Button
            size="large"
            className={
              'text-uppercase font-weight-bold ant-btn-block mb-3 benefits__skip-popup mr-3 bg-color-secondary-v4'
            }
            onClick={handleHide}
          >
            Cancel
          </Button>
          <Button
            size="large"
            className={
              'text-uppercase font-weight-bold ant-btn-block mb-3 ml-3 btn-color-main'
            }
            onClick={handleConfirm}
          >
            Buy Product
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default connectModal({ name: REDUX_MODAL.BUY_PRODUCT })(ModalBuyProduct)
