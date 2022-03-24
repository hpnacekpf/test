import CryptoJS from 'crypto-js'

const HASH_FIELD_SECRET_KEY =
  process.env.HASH_FIELD_SECRET_KEY || 'W5ThZ6GH3Xr7PcXiHu0J'

export const encryptFieldValue = (value) => {
  if (!value) {
    return null
  }

  return CryptoJS.AES.encrypt(
    JSON.stringify(value),
    HASH_FIELD_SECRET_KEY
  ).toString()
}

export const decryptFieldValue = (value) => {
  if (!value) {
    return null
  }

  const bytes = CryptoJS.AES.decrypt(value, HASH_FIELD_SECRET_KEY)

  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
