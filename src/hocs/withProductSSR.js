import React from 'react'
import { useFrontload } from 'react-frontload'
import { isServer } from 'utils/client-api'
import { useProductDetail } from 'reducers/productDetail/hook'
import { useRefreshProduct } from 'reducers/productDetail/hook'
import { useTrackFbProduct } from 'hooks/useTrackFb'

const withProductDetail = (WrappedComponent) => {
  const Wrapper = (props) => {
    const [onFetch] = useProductDetail()
    return <WrappedComponent {...props} onFetch={onFetch} />
  }

  return Wrapper
}

export const withProductSSR = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { data, frontloadMeta } = useFrontload('product-ssr', async () => ({
      product: await props.onFetch({
        updateView: true,
        isServer: isServer
      })
    }))

    const [productDetail, loading] = useRefreshProduct(isServer)

    useTrackFbProduct(productDetail, isServer)

    return (
      <WrappedComponent
        {...props}
        productDetail={productDetail}
        isLoadingPage={loading}
      />
    )
  }

  return withProductDetail(Wrapper)
}
