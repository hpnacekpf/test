export const NODE_ENV = process.env.NODE_ENV || 'development'

export const API_URL =
  process.env.RAZZLE_APP_BACKEND_SERVER || 'http://localhost:4000'

export const UPLOAD_FILE_URL = `${API_URL}/uploads`

export const RESIZE_IMAGE_URL = `${API_URL}/resize`

export const CROP_IMAGE_URL = `${API_URL}/crop`

export const DISABLE_CACHE =
  process.env.RAZZLE_APP_DISABLE_CACHE === true.toString()

export const CACHE_URL =
  process.env.RAZZLE_APP_REDIS_LRU_CACHE_URL || 'redis://localhost:6379/4'

export const CACHE_TIME = process.env.RAZZLE_APP_CACHE_TIME || 5

export const ENABLE_SINGPASS_FEATURE =
  process.env.RAZZLE_ENABLE_SINGPASS_FEATURE === true.toString()

export const SINGPASS_MYINFO_AUTH_API =
  process.env.RAZZLE_SINGPASS_MYINFO_API_AUTHORISE
export const SINGPASS_MYINFO_CLIENT_ID =
  process.env.RAZZLE_SINGPASS_MYINFO_CLIENT_ID
export const SINGPASS_MYINFO_REDIRECT_URL =
  process.env.RAZZLE_SINGPASS_MYINFO_REDIRECT_URL
export const SINGPASS_MYINFO_ATTRIBUTES =
  'partialuinfin,name,sex,race,nationality,dob,regadd,passtype'

export const SINGPASS_VERIFY_AUTH_API =
  process.env.RAZZLE_SINGPASS_VERIFY_API_AUTHORISE
export const SINGPASS_VERIFY_CLIENT_ID =
  process.env.RAZZLE_SINGPASS_VERIFY_CLIENT_ID
export const SINGPASS_VERIFY_REDIRECT_URL =
  process.env.RAZZLE_SINGPASS_VERIFY_REDIRECT_URL
export const SINGPASS_VERIFY_ATTRIBUTES = 'noa-basic'

export const SINGPASS_PURPOSE =
  'validating your personal identity to facilitate rental transaction'

export const ENABLE_LOAN_EXTENSION =
  process.env.RAZZLE_ENABLE_LOAN_EXTENSION === true.toString()

export const RAZZLE_SENTRY_ENVIRONMENT =
  process.env.RAZZLE_SENTRY_ENVIRONMENT || 'staging'

export const RECAPTCHA_SITE_KEY = process.env.RAZZLE_RECAPTCHA_SITE_KEY
