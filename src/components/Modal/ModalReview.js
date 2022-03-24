import React, { useState } from 'react'
import { connectModal } from 'redux-modal'
import { FastField, withFormik } from 'formik'
import * as Yup from 'yup'
import Modal from 'antd/lib/modal'
// actions
// service
import { getUrlByUser } from 'extensions/url'
// constants
import { getUserThumbnail } from 'extensions/user'
// components
import Rating from '../Rating'
import Avatar from '../Avatar'
import { REDUX_MODAL } from 'constants/enum'
import { useReviewOrder } from 'reducers/order/hook'

const ReviewLendor =
  'Lendee is great! Fast replies and punctual returning of items.'

const ReviewLendee =
  'Lendor is great! Fast replies and punctual sending of items.'

const formikMap = withFormik({
  validationSchema: Yup.object().shape({}),
  mapPropsToValues: ({ data }) => {
    return {
      note: '',
      rate: 0,
      orderId: data?.orderId ?? null,
      isBuyer: data?.isBuyer ?? false,
      user: data?.user ?? null,
      reviewBy: data?.reviewBy ?? null
    }
  },
  handleSubmit: (data, { props }) => {
    props.onReview(data)
  },
  displayName: 'Form'
})

const ModalReview = (props) => {
  const [active, setActive] = useState(true)

  const { show, handleHide, handleSubmit } = props

  const { values, setFieldValue } = props

  const { user } = values || null

  const { rate } = values || 0

  const { isBuyer } = values || false

  const ownerImg = getUserThumbnail(user)

  const ownerLink = getUrlByUser(user)

  return (
    <Modal
      visible={show}
      mask={false}
      closable={false}
      cancelText={'Cancel'}
      okText={'Submit'}
      className="custom-modal custom-modal-sign-out"
      autoFocusButton="cancel"
      maskClosable={true}
      cancelButtonProps={{
        style: { order: 1 },
        className: `btn-color-grey`
      }}
      okButtonProps={{
        style: { order: 2 },
        className: `btn-color-main`,
        disabled: active
      }}
      onCancel={handleHide}
      onOk={() => {
        if (handleSubmit) {
          handleSubmit()
        }
        handleHide()
      }}
    >
      <h4 className="text-center title-modal font-roboto text-uppercase font-weight-bold mt-10">
        Rate your experience
      </h4>
      <p className="text__message font-size-15 font-cabin text-center mb-10">
        How would you rate this {isBuyer ? 'Lendor' : 'Lendee'}?
      </p>
      <Avatar
        size={116}
        src={ownerImg}
        border={true}
        customClass={`border-main mt__20 mb-20`}
        avatarLink={ownerLink}
        username={user.name}
      />
      <Rating
        width={45}
        height={35}
        value={rate}
        customClass="d-flex justify-content-center align-items-center mb-20 mt-10"
        handleClick={(rate) => {
          setActive(false)
          setFieldValue('rate', Number(rate) + 1)
        }}
      />
      <FastField
        name="note"
        rows={4}
        component="textarea"
        placeholder={isBuyer ? ReviewLendee : ReviewLendor}
        className={`ant-input height-auto`}
        onChange={(note) => setFieldValue('note', note.target.value)}
      />
    </Modal>
  )
}

const ModalFormik = formikMap(ModalReview)

const Review = (props) => {
  const [onReview] = useReviewOrder()

  return <ModalFormik {...props} onReview={onReview} />
}

export default connectModal({ name: REDUX_MODAL.REVIEW })(Review)
