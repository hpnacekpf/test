import axios from 'axios'
import imageCompression from 'browser-image-compression'
import { UPLOAD_FILE_URL, CROP_IMAGE_URL } from 'constants/environments'

export const uploadFiles = async (files, type) => {
  const data = new FormData()
  for (let item = 0; item < files.length; item++) {
    const newFile = await imageCompression(files[item], {
      exifOrientation: 1
    })
    data.append('file', newFile)
  }

  return await axios
    .post(UPLOAD_FILE_URL, data, {
      headers: {
        UploadType: type
      }
    })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export const cropImage = async (data) => {
  return await axios
    .post(CROP_IMAGE_URL, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
