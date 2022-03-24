import {
  DefaultProductImg,
  DefaultProfileImgBg,
  HEIGHT_DEFAULT_BANNER_IMAGE,
  WIDTH_DEFAULT_BANNER_IMAGE,
  HEIGHT_DEFAULT_AVATAR_IMAGE,
  HEIGHT_DEFAULT_IMAGE,
  MIN_WIDTH_IMAGE,
  WIDTH_DEFAULT_AVATAR_IMAGE,
  WIDTH_DEFAULT_IMAGE,
  productImageBaseUrl,
  bannerImageBaseUrl,
  userImageBaseUrl,
  BYTE
} from 'constants/index'
import enumType from 'constants/enumType'
import { isUser } from './user'
import { isServer } from 'utils/client-api'

const USE_AWS = process.env.RAZZLE_APP_USE_AWS || false

export const checkHttpUrl = (url) => {
  let pattern = /^((http|https|ftp):\/\/)/
  return pattern.test(url)
}

export const getImageUrlByFilename = ({
  fileName,
  type,
  defaultImage = null,
  autoSize = false
}) => {
  if (!fileName) return defaultImage
  if (checkHttpUrl(fileName)) return fileName
  return USE_AWS
    ? getPreviewImage({
        fileName: fileName,
        imagePath: type,
        autoSize
      })
    : `${productImageBaseUrl}${fileName}`
}
// lấy link anh của avatar
export const getAvatarUrl = (url) => {
  if (!url) return null
  if (checkHttpUrl(url)) return url
  return USE_AWS
    ? getPreviewImage({
        fileName: url,
        imagePath: enumType.imagePath.Avatar
      })
    : `${userImageBaseUrl}${url}`
}

export const getAvatarByUser = (user) => {
  if (!isUser(user)) return null
  return getAvatarUrl(user.icon)
}

export const getUrlImageProduct = (url, autoSize) => {
  if (!url) return DefaultProductImg
  if (checkHttpUrl(url)) return url
  return USE_AWS
    ? getPreviewImage({
        fileName: url,
        autoSize: autoSize,
        imagePath: enumType.imagePath.Product
      })
    : `${productImageBaseUrl}${url}`
}

export const getSingleUrlImageProduct = (product, autoSize) => {
  if (!product || !product.pictures || product.pictures.length === 0) {
    return DefaultProductImg
  }

  const images = product ? product.pictures[0] : ''

  return getUrlImageProduct(images, autoSize)
}

// get banner image url
export const getBannerUrl = (url) => {
  if (!url) return DefaultProfileImgBg
  if (checkHttpUrl(url)) return url
  return USE_AWS
    ? getPreviewImage({
        fileName: url,
        imagePath: enumType.imagePath.Banner
      })
    : `${bannerImageBaseUrl}${url}`
}

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export const isImageType = (fileType) =>
  ['image/jpeg', 'image/png'].indexOf(fileType) >= 0

export const getInfoImage = async (image) => {
  //check whether browser fully supports all File API
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    return new Promise((resolve) => {
      const fr = new FileReader()
      fr.onload = function() {
        // file is loaded
        const img = new Image()
        img.onload = function() {
          // image is loaded; sizes are available
          return resolve({
            width: img.width,
            height: img.height
          })
        }
        img.src = fr.result // is the data URL because called with readAsDataURL
      }
      fr.readAsDataURL(image)
    })
  } else {
    return null
  }
}

export const checkImageSize = async (image) => {
  return await getInfoImage(image).then((result) => {
    if (!result) return false
    if (!result.width || !result.height) return false
    return result.width === result.height && result.width >= MIN_WIDTH_IMAGE
  })
}

export const checkImageByRatio = async (image, ratio = 1) => {
  return await getInfoImage(image).then((result) => {
    if (!result) return false
    if (!result.width || !result.height) return false
    return result.width / result.height === ratio
  })
}

export const getImagePathByType = (type) => {
  switch (type) {
    case enumType.uploadType.Product:
      return enumType.imagePath.Product
    case enumType.uploadType.Avatar:
      return enumType.imagePath.Avatar
    case enumType.uploadType.Banner:
      return enumType.imagePath.Banner
    case enumType.uploadType.Chat:
      return enumType.imagePath.Chat
    case enumType.uploadType.Ping:
      return enumType.imagePath.Ping
    default:
      return enumType.imagePath.Product
  }
}

export const getDefaultImage = (path) => {
  switch (path) {
    case enumType.imagePath.Product:
      return {
        width: WIDTH_DEFAULT_IMAGE,
        height: HEIGHT_DEFAULT_IMAGE
      }
    case enumType.imagePath.Avatar:
      return {
        width: WIDTH_DEFAULT_AVATAR_IMAGE,
        height: HEIGHT_DEFAULT_AVATAR_IMAGE
      }
    case enumType.imagePath.Banner:
      return {
        width: WIDTH_DEFAULT_BANNER_IMAGE,
        height: HEIGHT_DEFAULT_BANNER_IMAGE
      }
    case enumType.imagePath.Chat:
      return {
        width: WIDTH_DEFAULT_IMAGE,
        height: WIDTH_DEFAULT_IMAGE
      }
    default:
      return {
        width: WIDTH_DEFAULT_IMAGE,
        height: HEIGHT_DEFAULT_IMAGE
      }
  }
}

export const btoaServer = (str) => {
  if (Buffer.byteLength(str) !== str.length) throw new Error('bad string!')
  return Buffer(str, 'binary').toString('base64')
}

export const getPreviewImage = ({
  width,
  height,
  imagePath,
  fileName,
  autoSize,
  fit,
  noResize
}) => {
  const keyName = `${imagePath}/${fileName}`

  const _edits = {}

  _edits.resize = {}

  if (!noResize) {
    const defaultSize = getDefaultImage(imagePath)
    if (!autoSize) {
      _edits.resize.width = Number(width || defaultSize.width)
      _edits.resize.height = Number(height || defaultSize.height)
    }
  }
  _edits.resize.fit = fit ? fit : 'cover'
  //'contain'
  // Set up the request body
  const request = {
    bucket: process.env.RAZZLE_APP_BUCKET_NAME,
    key: keyName,
    edits: _edits
  }
  const str = JSON.stringify(request)
  // const enc = btoa(str)
  const enc = isServer
    ? btoaServer(str)
    : btoa(unescape(encodeURIComponent(str)))
  return `${process.env.RAZZLE_APP_CLOUD_FRONT_END_URL}/${enc}`
}

export const getImageSize = (file) => {
  if (!file) {
    return 0
  }
  return file.size / BYTE / BYTE
}
