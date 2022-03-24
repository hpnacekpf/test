import React from 'react'
import { useHistory } from 'react-router'
import Alert from 'antd/lib/alert'
import GeneratorSeo from 'components/GeneratorSeo'
import InfoCard from 'components/InfoCard'
// components
import MessageLimitProduct from 'components/Message/MessageLimitProduct'
import ModalInputLocation from 'components/Modal/ModalInputLocation'
import ModalInputPhone from 'components/Modal/ModalInputPhone'
//hook
import { useModal } from 'hooks/useModal'
import { useCreateProduct, useUserMembership } from 'reducers/product/hook'
import Form from './Form'
import { REDUX_MODAL } from 'constants/enum'

const Create = () => {
  const history = useHistory()

  const { user, limitProduct, isLimitProduct, sellStatus } = useUserMembership()
  const [openModalRedux, closeModalRedux] = useModal()
  const [onCreate] = useCreateProduct()

  const handleSubmit = (data) => {
    openModalRedux(REDUX_MODAL.CONFIRM, {
      content: 'List item?',
      handleOkClick: () => onCreate(data),
      handleCancelClick: () => closeModalRedux(REDUX_MODAL.CONFIRM)
    })
  }

  const handleCancel = () => {
    openModalRedux(REDUX_MODAL.CONFIRM, {
      content: 'Discard changes?',
      handleOkClick: () => history.goBack(),
      handleCancelClick: () => closeModalRedux(REDUX_MODAL.CONFIRM)
    })
  }

  return (
    <div className="container">
      <GeneratorSeo />
      {isLimitProduct ? (
        <div className="col-12 p-0">
          <Alert
            message={<MessageLimitProduct limit={limitProduct} />}
            type="warning"
            showIcon
            className="font-size-14 alert-lend-item"
          />
        </div>
      ) : null}
      <InfoCard
        widthTitle="col-lg-10 col-md-12 col-12"
        frameCss="mt__30 card-body-mobile"
        headerCss="d-flex justify-content-center pt-55"
        isHeader={true}
        title={'Lend an item'}
        opacity={isLimitProduct}
      >
        <Form
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          isLimit={isLimitProduct}
          isCreate
          user={user}
          sellStatus={sellStatus}
          // isChangeQuantity={isChangeQuantity(user)}
          // isUserProtected={isUserProtected(user)}
        />
      </InfoCard>
      <ModalInputPhone />
      <ModalInputLocation />
    </div>
  )
}

export default Create
