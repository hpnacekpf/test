import { useEffect } from 'react'
import ReactPixel from 'react-facebook-pixel'
// api
// constants
import { CONTENT_TYPE_FB, CURRENCY } from 'constants/string'
import { FACEBOOK_PIXEL_EVENT } from 'constants/enum'
// extensions
import extensions from 'extensions/number'
import { getCategoryByProduct } from 'extensions/product'

export const useTrackFbProduct = (product, isServer) => {
  useEffect(() => {
    if (!isServer && product) {
      const category = getCategoryByProduct(product)
      ReactPixel.track(FACEBOOK_PIXEL_EVENT.VIEW_CONTENT, {
        content_name: product.name,
        content_category: category?.name ?? null,
        content_type: CONTENT_TYPE_FB,
        content_ids: [product._id],
        value: extensions.showDecimalPlace(product.price),
        currency: CURRENCY,
        contents: [
          {
            id: product._id,
            quantity: product.quantity
          }
        ]
      })
    }
  }, [])
}

export const useTrackFbOrder = () => {
  const onTrack = (order, isServer) => {
    if (!isServer && order) {
      ReactPixel.track(FACEBOOK_PIXEL_EVENT.ADD_TO_CART, {
        value: extensions.showDecimalPlace(order.productPrice),
        currency: CURRENCY,
        content_type: CONTENT_TYPE_FB, // required property
        content_ids: order.product?._id ?? null
      })
    }
  }

  return [onTrack]
}

export const useTrackFbOrderDetail = () => {
  const onTrack = (order, isServer) => {
    if (!isServer && order) {
      ReactPixel.track(FACEBOOK_PIXEL_EVENT.ORDER_PAGE, {
        orderId: order.orderId
      })
    }
  }

  return [onTrack]
}

export const useTrackFbTransaction = () => {
  const onTrack = (isServer) => {
    if (!isServer) {
      ReactPixel.track(FACEBOOK_PIXEL_EVENT.Transactions, {})
    }
  }
  return [onTrack]
}

export const useTrackFbChargeOrder = () => {
  const onTrack = (order, isServer) => {
    if (!isServer && order) {
      ReactPixel.track(FACEBOOK_PIXEL_EVENT.PURCHASE, {
        currency: CURRENCY,
        value: extensions.showDecimalPlace(order.totalPrice)
      })
    }
  }

  return [onTrack]
}
