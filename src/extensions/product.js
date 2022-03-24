import { SELL_STATUS } from 'constants/enum'
import enumType from 'constants/enumType'
import {
  DAY_OF_MONTH,
  DAY_OF_WEEK,
  DefaultProductImg,
  DEFAULT_QUANTITY,
  formatOutputDate,
  FORMAT_EN_DATE,
  FREE
} from 'constants/index'
import { MONTHLY, PERCENTS, WEEKLY } from 'constants/number'
import { DAYS } from 'constants/string'
import { default as dtExtensions } from 'extensions/datetime'
import numberExtensions from 'extensions/number'
import differenceBy from 'lodash/differenceBy'
import utils from 'utils'
import { getImageUrlByFilename } from './image'
import { calculatePriceProfile } from './order'
import { isUser } from './user'

export const isProduct = (product) => {
  return !!product
}

export const isProductDeleted = (product) => {
  if (!isProduct(product)) return true
  return product.status === enumType.productStatus.Deleted
}

export const isProductPublished = (product) => {
  if (!isProduct(product)) return false
  return !product.status || product.status === enumType.productStatus.Published
}

export const displayPrice = (price) => {
  if (!price) return FREE
  if (price === 0) {
    return FREE
  }
  return `${utils.showFormatPrice(price)} / day`
}

export const displayPriceByProduct = (product) => {
  if (!isProduct(product)) return null
  return displayPrice(product.price)
}

export const isMultiQuantityProduct = (product) => {
  if (!product) return false
  return product.quantity && product.quantity > DEFAULT_QUANTITY
}

export const getCoordinate = (item) => {
  if (!isProduct(item)) return null
  if (item.coordinate) return item.coordinate
  if (!isUser(item.user)) return null
  return item.user.location ? item.user.location.coordinate : null
}

export const getTextLocation = (item) => {
  if (!isProduct(item)) return null
  if (item.coordinate) return item.coordinate
  if (!isUser(item.user)) return null
  return item.user.location ? item.user.location.text : null
}

export const getProductName = (product) => {
  if (!isProduct(product)) return null
  return product.name
}

export const getPicturesProduct = (product) => {
  if (!product) return DefaultProductImg
  return product.pictures && product.pictures.length > 0
    ? product.pictures
    : null
}

export const getImageProduct = (product) => {
  if (!product) return DefaultProductImg
  const pictures = getPicturesProduct(product)
  return pictures ? pictures[0] : DefaultProductImg
}

export const getOwnerProduct = (product) => {
  if (!product) return null
  return product.user || null
}

export const getCategoryByProduct = (product) => {
  if (!product) return null
  return product.category
}

export const getCategoryName = (category) => {
  if (!category) return null
  return category.name
}

export const isPoweredByInsurance = (product, owner) => {
  if (!product) {
    return false
  }

  if (product.category?.poweredByInsurance) {
    return true
  }

  if (owner?.poweredByInsurance) {
    return true
  }

  return false
}

export const initRemoveProductItems = (data) => {
  const listProductItems = []
  if (data && data.length > 0) {
    data.map((item) => {
      listProductItems.push({
        ...item,
        id: item._id,
        image: getImageProduct(item),
        isRemoveItem: true
      })
    })
  }
  return listProductItems
}

export const checkOwnerProduct = (product, user) => {
  if (!product || !user) return false
  const ownerProduct = getOwnerProduct(product)
  if (!ownerProduct) return false
  return ownerProduct._id === user._id
}

export const initImages = ({
  data,
  fieldName,
  imageType,
  fileNameField = null
}) => {
  if (!data || !data[fieldName] || data[fieldName].length === 0) {
    return []
  }

  const dataField = data[fieldName]

  return dataField.map((image) => {
    const fileName =
      fileNameField && image[fileNameField] ? image[fileNameField] : image
    return {
      _id: image._id,
      uid: image._id || null,
      status: 'done',
      filename: fileName,
      url: getImageUrlByFilename({
        fileName: fileName,
        type: imageType
      })
    }
  })
}

export const getRemoveImageProduct = (fileUpload, product) => {
  const currentImages = initImages({
    data: product,
    fieldName: 'images',
    fileNameField: 'filename',
    imageType: enumType.imagePath.Product
  })

  return differenceBy(currentImages, fileUpload, 'filename')
}

export const calculatePriceDiscount = (price, day) => {
  if (!price) return FREE
  if (price === 0) return FREE
  const priceValueType = price * day
  return `${utils.showFormatPrice(priceValueType)} / ${
    day === DAY_OF_MONTH ? 'month' : 'week'
  }`
}

export const calculatePriceSearch = (searchPrice, product, showDate = true) => {
  if (!product) return null
  switch (searchPrice?.toLowerCase()) {
    case enumType.lendorSortPriceEnumValue.Daily.toLowerCase():
      return displayPriceByProduct(product)
    case enumType.lendorSortPriceEnumValue.Weekly.toLowerCase():
      if (product.discount && product.discount.weekly) {
        return `${utils.showFormatPrice(
          calculatePriceProfile(product.discount, product.price, DAY_OF_WEEK)
            .discountPrice * DAY_OF_WEEK
        )} ${showDate ? '/ week' : ''}`
      } else {
        return calculatePriceDiscount(product.price, DAY_OF_WEEK)
      }
    case enumType.lendorSortPriceEnumValue.Monthly.toLowerCase():
      if (product.discount && product.discount.monthly) {
        return `${utils.showFormatPrice(
          calculatePriceProfile(product.discount, product.price, DAY_OF_MONTH)
            .discountPrice * DAY_OF_MONTH
        )} ${showDate ? '/ month' : ''}`
      } else {
        return calculatePriceDiscount(product.price, DAY_OF_MONTH)
      }
    default:
      return displayPriceByProduct(product)
  }
}

export const getProductDisableDate = (product) => {
  if (!product) return []

  const isMultiQuantity = isMultiQuantityProduct(product)
  // return this.getActiveDate(product?.[path] ?? [], isMultiQuantity)

  const lendDate = product.lendableDates
  if (lendDate?.length === 0) return []

  return lendDate
    .map((date) => {
      let disable = date.isBlock
      if (!disable && !isMultiQuantity) {
        disable = !!date.order
      }

      return disable ? dtExtensions.initNewDate(date.lendableDate) : null
    })
    .filter((date) => date)
}

export const getDisableDate = (productDisabledDate) => {
  if (!productDisabledDate) return []

  return productDisabledDate.map((date) => {
    return dtExtensions.initNewDate(date)
  })
}

export const getProductSaleOff = (product) => {
  if (!product || product.sellStatus !== SELL_STATUS.TRY_NOW_BUY_LATER)
    return {}
  const { maxRentalDay, discount, originPrice, price } = product
  const maxDay = numberExtensions.parseToNumber(maxRentalDay)
  if (!maxDay) {
    return {}
  }

  let discountPercentage = 0

  if (discount) {
    const { weekly, monthly } = discount
    if (weekly > 0 && maxDay >= WEEKLY && maxDay < MONTHLY) {
      discountPercentage = weekly
    }
    if (monthly > 0 && maxDay >= MONTHLY) {
      discountPercentage = monthly
    }
  }

  const subTotal = price * maxDay

  const discountPrice = subTotal * (discountPercentage / PERCENTS)

  const productOriginPrice = numberExtensions.parseToNumber(originPrice)
  if (productOriginPrice < 0) {
    productOriginPrice = 0
  }

  let maximumRentalDebate = subTotal - discountPrice
  if (maximumRentalDebate < 0) {
    maximumRentalDebate = 0
  }
  if (maximumRentalDebate > productOriginPrice) {
    maximumRentalDebate = productOriginPrice
  }
  const lowestDailyRate = numberExtensions.roundDown(
    numberExtensions.roundUp(maximumRentalDebate / maxDay, 3),
    1
  )
  const saleOff =
    productOriginPrice > 0
      ? numberExtensions.roundUp(
          (maximumRentalDebate / productOriginPrice) * PERCENTS,
          0
        )
      : 0
  let priceBuy = originPrice - maximumRentalDebate
  if (priceBuy < 0) {
    priceBuy = 0
  }

  return {
    lowestDailyRate,
    saleOff,
    priceBuy,
    originPrice: productOriginPrice
  }
}

export const checkBuyableProduct = (product, seller) => {
  if (!product) {
    return false
  }

  if (product.sellStatus !== SELL_STATUS.TRY_NOW_BUY_LATER) {
    return false
  }

  if (seller && seller.sellStatus !== SELL_STATUS.TRY_NOW_BUY_LATER) {
    return false
  }

  if (
    product.user &&
    product.user.sellStatus !== SELL_STATUS.TRY_NOW_BUY_LATER
  ) {
    return false
  }

  return true
}

export const checkValidDuration = ({ fromDate, toDate, disabledDate }) => {
  // let start = dateTimeExtensions.initStartOfDay(fromDate)
  let startDate = dtExtensions.formatDateOutput(
    fromDate,
    formatOutputDate,
    FORMAT_EN_DATE
  )
  // let end = dateTimeExtensions.initStartOfDay(toDate)
  let endDate = dtExtensions.formatDateOutput(
    toDate,
    formatOutputDate,
    FORMAT_EN_DATE
  )

  //check start date , end date
  const betweenDate = dtExtensions.checkValidDateTime({
    fromDate,
    toDate,
    disableDates: disabledDate
  })

  if (betweenDate?.length > 0) {
    const initEndDate = dtExtensions.subtractDuration(betweenDate[0], 1, DAYS)
    //set end day again
    endDate = dtExtensions.formatDateOutput(
      initEndDate,
      formatOutputDate,
      FORMAT_EN_DATE
    )
  }

  return {
    fromDate: startDate,
    toDate: endDate
  }
}
