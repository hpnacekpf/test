import React, { useEffect } from 'react'
import { useGetLoadingOrder, useGetOrder } from 'reducers/order/hook'
import Spin from 'antd/lib/spin'
import { useHistory, useParams } from 'react-router'
import InfoCard from 'components/InfoCard'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import Form from './Form'
import { useModal } from 'hooks/useModal'
import { useBuyProduct, useOrderDetail } from '../../../reducers/order/hook'
import { REDUX_MODAL, TNBL_DELIVERY_TYPE } from '../../../constants/enum'
import ModalDelivery from 'components/Modal/ModalDelivery'

const BuyProduct = () => {
  const history = useHistory()

  const { id } = useParams()
  const loading = useGetLoadingOrder()
  const order = useGetOrder()

  const user = useGetUser()

  const [onBuyProduct] = useBuyProduct()

  const [openModal] = useModal()

  const [onFetchOrderDetail] = useOrderDetail(false, false)

  const orderRent = order?._id === id ? order : null

  useEffect(() => {
    onFetchOrderDetail()
  }, [])

  const handleSubmitForm = (values) => {
    if (values.deliveryType === TNBL_DELIVERY_TYPE.NO_DELIVERY) {
      onSubmitRequest(values)
    } else {
      openModal(REDUX_MODAL.DELIVERY, {
        title: 'Delivery ADDRESS',
        content: `Please input your delivery address.`,
        isSaveDeliveryInfo: user?.isSaveDeliveryInfo ?? false,
        user,
        handleSubmitOrder: (address) => {
          values.setDeliveryAddress(address)
          onSubmitRequest(values)
        }
      })
    }
  }

  const onSubmitRequest = (values) => {
    onBuyProduct(values)
  }

  const handleCancel = () => {
    history.push(`/order/detail/${id}`)
  }

  return (
    <Spin spinning={loading}>
      <div className="utils__content confirmation">
        {orderRent ? (
          <InfoCard frameCss="rounded-0">
            <Form
              user={user}
              order={orderRent}
              handleSubmitForm={handleSubmitForm}
              handleCancel={handleCancel}
            />
            <ModalDelivery />
          </InfoCard>
        ) : null}
      </div>
    </Spin>
  )
}

export default BuyProduct
