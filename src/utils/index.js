import number from 'extensions/number'
import string from 'extensions/string'
import enumType from 'constants/enumType'
import dateTimeExtensions from 'extensions/datetime'
import { getEmailByUser } from 'extensions/user'
import { isMultiQuantityProduct } from 'extensions/product'
import { RECEIVED_IMAGE, SENT_IMAGE, typeOfMessage } from 'constants/chat'

const utils = {
  //get pagination
  pager: (data, pageSize, connection, formData) => {
    const dataConnection = data ? data[connection] : {}
    const total = data ? (dataConnection ? dataConnection.count : 0) : 0
    const totalPage = total ? total / pageSize : 1
    const pageIndex = formData.pageIndex ? parseInt(formData.pageIndex) : 1
    const totalItemInPage =
      pageIndex === 1
        ? total < pageSize
          ? total
          : pageSize
        : pageIndex >= totalPage && pageIndex <= totalPage + 1
          ? total
          : pageSize

    return {
      total,
      totalPage,
      totalItemInPage
    }
  },

  getActiveDateByProduct(product, path = 'lendableDates') {
    if (!product) return []
    const isMultiQuantity = isMultiQuantityProduct(product)
    return this.getActiveDate(product?.[path] ?? [], isMultiQuantity)
  },

  getActiveDate(lendableDates, isMultiQuantity) {
    if (lendableDates && lendableDates.length > 0) {
      return lendableDates.map((item) => {
        if (!isMultiQuantity) {
          if (item?.order || item?.isBlock)
            return dateTimeExtensions.initNewDate(item.lendableDate)
        } else {
          if (item?.isBlock)
            return dateTimeExtensions.initNewDate(item.lendableDate)
        }
      })
    }
    return []
  },

  getBlockDate(product, path = 'lendableDates', hasOrder) {
    if (!product) return []
    // if (isMultiQuantityProduct(product)) return []
    return this.getBlockDateOrder(product?.[path] ?? [], hasOrder)
  },

  getBlockDateOrder(lendableDates, hasOrder) {
    if (lendableDates && lendableDates.length > 0) {
      // let lendableDateWithoutOrder = []
      // let lendableDateWithOrder = []
      // lendableDates.map(item => {
      //   const dateTime = dateTimeExtensions.initNewDate(item.lendableDate)
      //   if (!item?.order)
      //     lendableDateWithoutOrder.push(dateTime)
      //   else lendableDateWithOrder.push({
      //     date: dateTime,
      //     order: item?.order?._id,
      //     orderId: item?.order?.orderId
      //   })
      // })

      // return hasOrder ? lendableDateWithOrder : lendableDateWithoutOrder

      let blockDate = []
      lendableDates.map((item) => {
        const dateTime = dateTimeExtensions.initNewDate(item.lendableDate)
        blockDate.push({
          date: dateTime,
          order: item?.order?._id ?? null,
          orderId: item?.order?.orderId ?? null,
          isBlocked: item?.isBlock ?? false
        })
      })
      return blockDate
    }
    return []
  },

  s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  },
  generateId() {
    return (
      this.s4() +
      this.s4() +
      this.s4().substr(0, 3) +
      this.s4() +
      this.s4() +
      this.s4()
    ).toLowerCase()
  },

  mapStatusOrder(orderStatus, paymentMethod) {
    if (orderStatus && orderStatus.length > 0) {
      let currentStatus
      let lastOrderStatus = orderStatus[orderStatus.length - 1]
      if (
        lastOrderStatus.value === enumType.orderStatus.DisputeOrderByLendee ||
        lastOrderStatus.value === enumType.orderStatus.DisputeOrderByLendor
      ) {
        lastOrderStatus = orderStatus[orderStatus.length - 2]
        currentStatus = orderStatus[orderStatus.length - 1]
      } else {
        currentStatus = orderStatus[orderStatus.length - 1]
      }
      const step =
        paymentMethod === enumType.paymentMethod.CreditCard
          ? enumType.stepRequestViaCard.findIndex(
              ({ value }) => value === lastOrderStatus.value
            )
          : enumType.stepRequest.findIndex(
              ({ value }) => value === lastOrderStatus.value
            )
      return {
        status: currentStatus.value,
        step: step + 1
      }
    }
    return {
      status: enumType.orderStatus.Placed,
      step: 0
    }
  },

  mapStatusPayment(path) {
    switch (path) {
      case '/order/payment-check-out/:id':
        return {
          status: enumType.paymentStatusValues.checkOut,
          step: 0
        }
      case '/order/payment-details/:id':
        return {
          status: enumType.paymentStatusValues.PaymentDetails,
          step: 1
        }
      case '/order/payment-confirmation/:id':
        return {
          status: enumType.paymentStatusValues.Confirmation,
          step: 2
        }
      default:
        return {
          status: enumType.paymentStatusValues.checkOut,
          step: 0
        }
    }
  },

  getRating(user) {
    if (!user) return 0

    const {
      buyerRating,
      lendorRating,
      buyerReviewsNumber,
      lendorReviewsNumber
    } =
      user || 0

    let rating =
      (buyerRating * buyerReviewsNumber + lendorRating * lendorReviewsNumber) /
      (buyerReviewsNumber + lendorReviewsNumber)

    rating = rating.toFixed(1)

    if (isNaN(rating)) {
      rating = 0
    }
    return rating
  },

  convertUserToObjectFireBase(
    user,
    text,
    lastTime,
    product,
    type,
    isFromUser,
    isBlocked,
    status
  ) {
    return {
      name: user.name || '',
      email: getEmailByUser(user),
      avatar: user.icon ? user.icon : user.iconThumbnail || '',
      product: product
        ? {
            id: product._id,
            name: product.name
          }
        : null,
      owner: user._id,
      lastMessage:
        type === typeOfMessage.Image
          ? isFromUser
            ? SENT_IMAGE
            : RECEIVED_IMAGE
          : text,
      lastTime: lastTime,
      status: status ? status : '',
      type: type ?? typeOfMessage.Text,
      block: isBlocked ?? false
    }
  },
  getNameFromEmail(email) {
    let nameReplace = email.replace(/@.*$/, '')
    return email !== nameReplace ? nameReplace : null
  },

  featureHomePage(popularItems) {
    let feature = {
      user: null,
      banner: null
    }
    if (!popularItems || !popularItems.homeFeatureUser) return null
    feature.user = this.featureUser(popularItems.homeFeatureUser)
    feature.banner = this.featureBanner(popularItems.homeFeatureUser)
    return feature
  },

  featureUser(feature) {
    if (!feature) return null
    return feature.user
  },

  featureBanner(feature) {
    if (!feature) return null
    return feature.groupBanner ? feature.groupBanner.banner : null
  },

  getSortDirection(searchField, fieldName) {
    if (searchField && searchField.sortField === fieldName) {
      return searchField.sortDirection
    }
    return false
  }
}

export default {
  ...utils,
  ...number,
  ...string
}
