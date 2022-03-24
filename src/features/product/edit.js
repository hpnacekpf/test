import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'
// components
import GeneratorSeo from 'components/GeneratorSeo'
import InfoCard from 'components/InfoCard'
import LoadingComponent from 'components/LoadingComponent'
import SkeletonEditListing from 'components/Skeleton/SkeletonEditListing'
// utils
import { getUrlByProduct } from 'extensions/url'
import { isChangeQuantity } from 'extensions/user'
//hook
import { useModal } from 'hooks/useModal'
import {
  useGetProducts,
  useUpdateProduct,
  useUserMembership
} from 'reducers/product/hook'
import Form from './Form'
import { REDUX_MODAL } from 'constants/enum'

const Edit = () => {
  const history = useHistory()
  const { id } = useParams()

  const [isError, setIsError] = useState(false)

  const { user, sellStatus } = useUserMembership()
  const [product, loading] = useGetProducts()
  const [onUpdate] = useUpdateProduct()
  const [openModalRedux, closeModalRedux] = useModal()

  if (product) {
    const owner = product.user
    if (!owner || !user || owner._id !== user._id) {
      setIsError(true)
    }
  }

  const handleSubmit = (data) => {
    openModalRedux(REDUX_MODAL.CONFIRM, {
      content: 'Save changes?',
      handleOkClick: () => onUpdate(data, id),
      handleCancelClick: () => closeModalRedux(REDUX_MODAL.CONFIRM)
    })
  }

  const handleCancel = () => {
    openModalRedux(REDUX_MODAL.CONFIRM, {
      content: 'Discard changes?',
      handleOkClick: () => history.push(getUrlByProduct(product)),
      handleCancelClick: () => closeModalRedux(REDUX_MODAL.CONFIRM)
    })
  }

  return product && !isError ? (
    <div className="utils__content">
      <GeneratorSeo />
      <InfoCard
        widthTitle="col-lg-10 col-md-12 col-12"
        frameCss="mt__30 card-body-mobile"
        headerCss="d-flex justify-content-center pt-55"
        isHeader={true}
        title={
          <strong>
            <span className="text-uppercase">Edit Listing</span>
          </strong>
        }
      >
        <LoadingComponent
          isLoading={loading}
          loadingComponent={<SkeletonEditListing />}
        >
          <Form
            data={product}
            user={user}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            sellStatus={sellStatus}
            isChangeQuantity={isChangeQuantity(user)}
          />
        </LoadingComponent>
      </InfoCard>
    </div>
  ) : null
}

export default Edit
