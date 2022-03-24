import React, { useEffect, useState } from 'react'
import {
  useGetIsOrderExtendable,
  useGetLoadingCheckOrderExtendable,
  useGetOrder,
  useIsOrderExtendable
} from 'reducers/order/hook'
import CustomButton from 'components/Button/CustomButton'
import { useModal } from 'hooks/useModal'
import { useParams } from 'react-router'
import { REDUX_MODAL } from 'constants/enum'
import enumType from 'constants/enumType'
import dtExtensions from 'extensions/datetime'
import { DAYS } from 'constants/string'
import { useGetProductDisabledDate } from 'reducers/productDetail/hook'
import { getDisableDate } from 'extensions/product'

const ButtonExtend = () => {
  const { id } = useParams()

  const [isClicked, setIsClicked] = useState(false)
  const [openModal] = useModal()

  const order = useGetOrder()

  const [productDisabledDate] = useGetProductDisabledDate(
    order?.product?._id
  )

  const calendarProduct = getDisableDate(productDisabledDate)

  const isExtendable = useGetIsOrderExtendable()

  const [onCheck] = useIsOrderExtendable()

  const isLoading = useGetLoadingCheckOrderExtendable()

  useEffect(
    () => {
      if (isClicked && order && !isLoading) {
        if (isExtendable) {
          openModal(REDUX_MODAL.EXTEND, {
            orderId: order._id,
            endDate: order?.endDate ?? order.toDate,
            product: order.product,
            quantity: order.quantity,
            totalLoanDay: dtExtensions.calculateDateDiff(
              order.endDate ?? order.toDate,
              order.fromDate,
              DAYS
            ),
            calendarProduct
          })
        } else {
          openModal(REDUX_MODAL.ALERT, {
            title: 'oops!',
            content:
              'You are not allowed to extend this item as it has been booked by someone else',
            typeModal: enumType.typeModalOrder.CONFIRM,
            okText: 'BACK'
          })
        }
        setIsClicked(false)
      }
    },
    [isClicked, isExtendable, isLoading]
  )

  const handleExtendOrder = () => {
    onCheck(id)
    setIsClicked(true)
  }

  return (
    <CustomButton
      loading={isLoading}
      buttonType={'btn-color-main'}
      handleClick={handleExtendOrder}
      buttonClass={`text-uppercase infoCard__title mt-4 w-100 btn-deal`}
    >
      <div className="infoCard__desc">
        <span className={`infoCard__title font-weight-bold text-uppercase`}>
          Extend Loan
        </span>
      </div>
    </CustomButton>
  )
}

export default ButtonExtend
