// libs
import Spin from 'antd/lib/spin'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import {
  useAmendmentDate,
  useCreateOrder,
  useGetAmendmentDate,
  useGetDuplicateOrder,
  useGetLoadingOrder,
  useGetOrder,
  useGetOrderExceed,
  useGetOrderExtend,
  useOrderDetail,
  useOrderExceed,
  useOrderExtend,
  useIsEnableLoanExtension,
  useGetEnableLoanExtension
} from 'reducers/order/hook'
// components
import Form from './Form'

const DetailOrder = (props) => {
  const history = useHistory()

  const { id } = useParams()

  const [onFetchOrderDetail] = useOrderDetail(true, true)

  const [onFetchOrderExtend] = useOrderExtend()

  const [onFetchOrderExceed] = useOrderExceed()

  const [onFetchAmendmentDate] = useAmendmentDate()

  const order = useGetOrder()

  const orderExtends = useGetOrderExtend()

  const orderExceeds = useGetOrderExceed()

  const orderAmendmentDate = useGetAmendmentDate()

  const user = useGetUser()

  const loading = useGetLoadingOrder()

  const duplicateOrder = useGetDuplicateOrder()

  const [, onUpdate] = useCreateOrder()

  const [onCheckEnableLoanExtension] = useIsEnableLoanExtension()

  const isEnableLoanExtension = useGetEnableLoanExtension()

  /**
   * load data when render page
   */
  useEffect(() => {
    onCheckEnableLoanExtension()
    onFetchOrderDetail()
    onFetchOrderExtend()
    onFetchOrderExceed()
    onFetchAmendmentDate()
  }, [])

  const handleSubmit = (data) => {
    //update status order
    onUpdate(data.id, data.nextStatus)
  }

  return (
    <Spin spinning={loading}>
      {order?._id === id ? (
        <React.Fragment>
          <Form
            data={order}
            orderExtends={orderExtends}
            orderExceeds={orderExceeds}
            orderAmendmentDate={orderAmendmentDate}
            isEnableExtension={isEnableLoanExtension}
            user={user}
            handleSubmitForm={handleSubmit}
            history={history}
            duplicateOrder={duplicateOrder}
            isMobile={props.isMobile}
            allowReset={true}
          />
        </React.Fragment>
      ) : null}
    </Spin>
  )
}

export default DetailOrder
