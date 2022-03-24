import React, { useState } from 'react'
import Spin from 'antd/lib/spin'
// components
import CustomButton from 'components/Button/CustomButton'
import InfoCard from 'components/InfoCard'
import Title from 'components/Title'
import InformationOrder from '../InformationOrder'
import FormPayment from './FormPayment'
import {
  useChargePayment,
  useDeletePayment,
  useGetLoadingPayment,
  useGetPayment,
  usePaymentDetail
} from 'reducers/payment/hook'
import { useModal } from 'hooks/useModal'
import { REDUX_MODAL } from 'constants/enum'
import { useParams } from 'react-router-dom'
import { DATE_AMENDMENT_PAYMENT_PATH } from '../../../constants/string'

const Confirmation = () => {
  usePaymentDetail()

  const [openModal, closeModal] = useModal()

  const [onDelete] = useDeletePayment()

  const [onCharge] = useChargePayment()

  const [checked, setChecked] = useState(true)

  const paymentDetail = useGetPayment()
  const loading = useGetLoadingPayment()

  const { type, id } = useParams()

  const payment = paymentDetail?.payment ?? null
  const order = paymentDetail?.order ?? null

  const handlePayment = () => {
    closeModal(REDUX_MODAL.CONFIRM)

    onCharge({
      isSave: checked,
      order: order,
      paymentId: payment?._id
    })
  }

  const handleBack = () => {
    const refId =
      type === DATE_AMENDMENT_PAYMENT_PATH ? order.dateAmendmentId : order._id
    onDelete(refId, type)
  }

  const handleOpenModal = () => {
    openModal(REDUX_MODAL.CONFIRM, {
      title: 'CONFIRM',
      content: 'Do you wish to proceed with payment?',
      okText: 'CONFIRM',
      cancelText: 'CANCEL',
      handleOkClick: handlePayment
    })
  }

  return (
    <Spin spinning={loading}>
      <div className="utils__content confirmation">
        {payment && order ? (
          <InfoCard frameCss="rounded-0">
            <div className="row custom-cardinfo">
              <div className="col-12 p-0">
                <Title title="PAYMENT — CONFIRMATION" isBorder="hide" />
                <hr className="py-3" />
              </div>
              <div className="col-xl-6 border py-35 card-box-shadow card-box-payment">
                <FormPayment
                  payment={payment}
                  checked={checked}
                  handleChecked={(e) => {
                    setChecked(e.target.checked)
                  }}
                />
              </div>
              <div className="col-xl-6 info-payment">
                <InformationOrder
                  order={{
                    ...order,
                    paymentType: payment.type
                  }}
                />
              </div>
            </div>

            <div className="w-100 text-center">
              <div className="submit-payment d-flex justify-content-between">
                <CustomButton
                  handleClick={() => {
                    handleBack()
                  }}
                  buttonType="btn-color-grey"
                  buttonClass="btn-large btn-xlarge-100 btn-xlarge-mb-10 font-weight-bold text-uppercase"
                >
                  Back
                </CustomButton>
                <CustomButton
                  htmlType={'button'}
                  buttonType={'btn-color-main'}
                  buttonClass="btn-large btn-xlarge-100 font-weight-bold text-uppercase"
                  handleClick={handleOpenModal}
                >
                  Confirm
                </CustomButton>
              </div>
            </div>
          </InfoCard>
        ) : null}
      </div>
    </Spin>
  )
}

export default Confirmation
