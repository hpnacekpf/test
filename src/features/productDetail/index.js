// libs
import GeneratorSeo from 'components/GeneratorSeo'
import LoadingComponent from 'components/LoadingComponent'
import RedirectUrl from 'components/RedirectUrl'
import SkeletonProductDetail from 'components/Skeleton/SkeletonProductDetail'
// constants
import { MAX_LENGTH_DESCRIPTION } from 'constants/index'
import { truncateHtmlContent } from 'extensions/html'
// extensions
import { getUrlImageProduct } from 'extensions/image'
import { getImageProduct } from 'extensions/product'
import { withProductSSR } from 'hocs/withProductSSR'
import { withSingPass } from 'hocs/withSingPass'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import React from 'react'
// hooks
import { useGetOrder } from 'reducers/order/hook'
import { useGetProductDisabledDate } from 'reducers/productDetail/hook'
// components
import Form from './Form'
import SameCategory from './SameCategory'
import SameStore from './SameStore'

const ProductDetail = (props) => {
  const { productDetail } = props
  const currentUser = useGetUser()
  const order = useGetOrder()
  const user = productDetail?.user ?? null
  const categorySlug = productDetail?.category?.slug ?? null

  const [productDisabledDate] = useGetProductDisabledDate(productDetail?._id)

  const currentOrder = !order?.orderId ? order : null

  return (
    <LoadingComponent
      isLoading={props.isLoadingPage}
      loadingComponent={<SkeletonProductDetail />}
    >
      {productDetail ? (
        <React.Fragment>
          <RedirectUrl />
          <GeneratorSeo
            title={`${productDetail.name} Rental | Lendor Singapore`}
            description={truncateHtmlContent(
              productDetail.description,
              MAX_LENGTH_DESCRIPTION
            )}
            image={getUrlImageProduct(getImageProduct(productDetail))}
            product={productDetail}
          />

          <div className="utils__content product-detail">
            <Form
              data={productDetail}
              order={currentOrder}
              user={currentUser}
              disabledDate={productDisabledDate}
              isMobile={props.isMobile}
            />
          </div>
          <SameStore user={user} categorySlug={categorySlug} />
          <SameCategory user={user} categorySlug={categorySlug} />
        </React.Fragment>
      ) : null}
    </LoadingComponent>
  )
}

const Wrapper = React.memo(ProductDetail)

export default withSingPass({
  allowPopup: true,
  allowPopupSuccess: true,
  allowNOA: true,
  forceVerifyNOA: false,
  checkNOAMinimum: true,
  checkAddress: true,
  verifyProofAddress: true
})(withProductSSR(Wrapper))
