export const API_BASE_URL = process.env.RAZZLE_APP_BACKEND_SERVER

export const DEFAULT_SEARCH_HISTORY = 10

export const DEFAULT_SKIP_PRODUCT = 0

export const DEFAULT_PAGE_SIZE = 12

export const DEFAULT_PAGE_INDEX = 1

export const DEFAULT_PRODUCT_SHOW = 24

export const DEFAULT_MESSAGE_PAGE_SIZE = 20

export const DEFAULT_PRODUCT_LOAD_MORE = 24

export const EXPIRES_DAY_COOKIES = 14

export const TIME_TO_REFRESH_TOKEN = 2

export const TIME_TO_CHECK_TOKEN = 58 // 58m

export const DEFAULT_IMAGES_PRODUCT = 4

export const DEFAULT_REVIEW_SHOW = 3

export const DEFAULT_LIMIT_TRENDING = 6

export const DEFAULT_LIMIT_PARTNER = 3

export const AUTH_TOKEN = 'AUTH_TOKEN'

export const WIDTH_DEFAULT_IMAGE = 500

export const HEIGHT_DEFAULT_IMAGE = 500

export const WIDTH_DEFAULT_AVATAR_IMAGE = 200

export const HEIGHT_DEFAULT_AVATAR_IMAGE = 200

export const WIDTH_DEFAULT_BANNER_IMAGE = 500

export const HEIGHT_DEFAULT_BANNER_IMAGE = 400

export const DEFAULT_SIZE_AVATAR = 120

export const DEFAULT_SIZE_CAROUSEL_PRODUCT = 16

export const WIDTH_MENU = 250

export const WIDTH_MENU_LG = 308

export const MAX_COOR_X_MENU_SWIPE = -40

export const MAX_COOR_Y_MENU_SWIPE = {
  top: 15,
  bottom: -15
}

export const WIDTH_ORDER = 1024

export const WIDTH_SHARE_BUTTON = 32

export const DEFAULT_LIMIT = 100

export const CANCEL_ORDER_REQUEST =
  'Your request will be cancelled. Do you wish to proceed?'

export const CONFIRM_MODAL_TEXT = `By confirming, you agree to the terms and conditions under the Lendor Protection Guarantee to protect your transaction.`

export const DEFAULT_AVATAR = 'w'

export const DIRECTION_STEP_HORIZONTAL = 'horizontal'

export const DIRECTION_STEP_VERTICAL = 'vertical'

export const MAX_LENGTH_DESCRIPTION = 300

export const DEFAULT_FONT_SIZE_AVATAR = 14

export const MIN_WIDTH_IMAGE = 200

export const LIMIT_PRODUCT_FEATURE = 8

export const DECIMAL_PLACE = 2

export const STEP_DISCOUNT = 5

export const MIN_DISCOUNT = 0

export const MAX_DISCOUNT = 95

export const LENGTH_VERIFY_PHONE = 6

export const MIN_LENGTH_PHONE = 6

export const MAX_LENGTH_PHONE = 8

export const MIN_PASS_LENGTH = 6

export const BYTE = 1024

export const IMAGE_MAX_SIZE = 5

export const MAX_PRODUCT_IMAGE = 4

export const MIN_PRODUCT_IMAGE = 1

export const MIN_HEIGHT_MAP = 550

export const MAX_WIDTH_MAP = '100%'

export const MIN_TOTAL_PRICE = 0.5

export const UTC_0 = 0

export const MAX_QUANTITY = 1000

export const MIN_QUANTITY = 0

export const DEFAULT_QUANTITY = 1

export const MAX_RENTAL_DAYS = 365

export const MIN_RENTAL_DAYS = 1

export const MIN_EMAIL_VERIFICATION_CODE = 6

export const MAX_EMAIL_VERIFICATION_CODE = 6

export const SORT_BY_UPDATED_AT_DESC = 'updatedAt_DESC'

export const SORT_BY_CREATED_AT_DESC = 'createdAt_DESC'

export const SIZE_DEFAULT_IMAGE = `${WIDTH_DEFAULT_IMAGE}x${HEIGHT_DEFAULT_IMAGE}`

export const isBlockUserEnabled =
  process.env.RAZZLE_ENABLE_BLOCK_USER === 'true'

export const DISPLAY_BALANCE_USER =
  process.env.RAZZLE_DISPLAY_BALANCE_USER === 'true'

export const API_SIGNIN_APPLE =
  'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js'

export const GOOGLE_MAP_API_KEY =
  process.env.RAZZLE_APP_GOOGLE_MAP_API ||
  'AIzaSyAAS8_xNjm3ZQyt037dEl4UXLp-eVO2Ep8'

export const GOOGLE_MAP_EMBEDED = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAP_API_KEY}`

export const GOOGLE_MAP_URL = `http://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=geometry,drawing,places&sensor=false&language=en`
// MAP.js
// https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&language=en&v=3.exp&libraries=geometry,drawing,places
// export const GOOGLE_MAP_API_KEY = 'AIzaSyBXZOJ38wfwt_YDStahnYobK2vKi8GVRjA'
export const productImageBaseUrl = `${
  process.env.RAZZLE_APP_IMAGE_SERVER
}/product/pictures/`
export const userImageBaseUrl = `${
  process.env.RAZZLE_APP_IMAGE_SERVER
}/user/pictures/`
export const bannerImageBaseUrl = `${
  process.env.RAZZLE_APP_IMAGE_SERVER
}/banners/pictures/`
export const pingImageBaseUrl = `${
  process.env.RAZZLE_APP_IMAGE_SERVER
}/ping/pictures/`
export const chatImageBaseUrl = `${
  process.env.RAZZLE_APP_IMAGE_SERVER
}/chat/photo/`
export const UPLOAD_IMAGE_URL = `${
  process.env.RAZZLE_APP_BACKEND_SERVER
}/uploads`
export const RESIZE_IMAGE_URL = `${
  process.env.RAZZLE_APP_BACKEND_SERVER
}/resize`
export const CROP_IMAGE_URL = `${process.env.RAZZLE_APP_BACKEND_SERVER}/crop`

export const FACEBOOK_FAN_PAGE = 'https://www.facebook.com/lendorapp'
export const INSTAGRAM_FAN_PAGE = 'https://www.instagram.com/lendor.sg/'
export const YOUTUBE_FAN_PAGE =
  'https://www.youtube.com/channel/UCl159HsyrVl-4CUcgHs1F1w/featured'
export const LINKEDIN_FAN_PAGE = 'https://www.linkedin.com/company/lendor-app/'

export const WHATS_APP_PHONE_NUMBER = '+6587808375'

export const WHATS_APP_LINK = `https://api.whatsapp.com/send?phone=${WHATS_APP_PHONE_NUMBER}`

export const APP_STORE_LINK = process.env.RAZZLE_APP_STORE_LINK

export const GOOGLE_PLAY_LINK = process.env.RAZZLE_GOOGLE_PLAY_LINK

export const ENABLE_GTM = process.env.RAZZLE_ENABLE_GTM === 'true'

export const ENABLE_GA = process.env.RAZZLE_ENABLE_GA === 'true'

export const FACEBOOK_SOCIAL = 'facebook'

export const GOOGLE_SOCIAL = 'google'

export const UNKNOWN = 'unknown'

export const DEFAULT_USER_NAME = 'WIZER'

export const UPLOAD_PRODUCT = 'product/pictures'

export const FORMAT_EN_DATE = 'YYYY-MM-DD'

export const formatOutputDate = 'DD/MM/YYYY'

export const formatDateTransaction = 'DD/MM/YY'

export const formatDateInput = 'MM/DD/YYYY'

export const formatDateTime = 'DD-MM-YYYY HH:mm'

export const formatDateTimeStamp = 'DD-MM-YYYY HH:mm:ss'

export const formatInputDate = 'YYYY/MM/DD HH:mm:ss'

export const formatDateTimeStep = 'DD/MM HH:mm'

export const FORMAT_LONG_DATE = 'LL'

export const FORMAT_DATE_WITH_SPACE = 'YYYY MM DD'

export const FORMAT_DATE_TEXT = 'MMMM Do YYYY'

export const EARTH_RADIUS_KM = 6371

export const MAX_MENU_LEVEL = 3

export const DEFAULT_LIMIT_ITEMS = 10

export const CURRENCY = `sgd`

export const imageType = 'image/jpeg, image/png'

export const DefaultCateTrending = 2200

export const NoRefund = 'No Refundable Deposits'

export const LPPToolTip =
  'The amount payable for LPG is a portion of the deposit amount, or SGD$5 (whichever is greater)'

export const LateFeeChargeToolTip =
  'Late fee will be triggered if Item is not returned by 12:30 on the official rental and date'

export const OriginalItemValue =
  'Item considered sold if payment Is not made 72 hours after rental end date '

export const NO_DISCOUNT = `No discount`

export const Suspended = 'Suspended'

export const Deleted = 'Deleted'

export const FREE = 'FREE'

export const MAX_LENGTH_TEXTAREA = 600

export const DEFAULT_WIDTH_BANNER = 1806

export const DEFAULT_HEIGHT_BANNER = 741

export const HEIGHT_ARTICLE_THUMBNAIL = 800
export const WIDTH_ARTICLE_THUMBNAIL = 2000

export const HEIGHT_ARTICLE_COVER = 500
export const WIDTH_ARTICLE_COVER = 1500

export const LIMIT_CHARACTER_PARTNER = 200

export const TERM_OF_USE_CODE = 'TERM_OF_USE'

export const COMMUNITY_GUIDELINES_CODE = 'COMMUNITY_GUIDELINES'

export const PROHIBITED_ITEMS_CODE = 'PROHIBITED_ITEMS'

export const LOAN_POLICY_CODE = 'LOAN_POLICY'

export const PRIVACY_POLICY_CODE = 'PRIVACY_POLICY'

export const LPG_TERMS_CODE = 'LENDOR_PROTECTION_GUARANTEE'

export const SEARCH_KEYWORD = 'keyword=&searchby=items&sort=100'

export const MAX_LENGTH_INPUT = 6

export const NO_USERS_FOUND = 'No users found.'

export const NO_ITEMS_WISHLIST = 'No items in wishlist.'

export const LOAN_REQUEST_SEND = `Loan request sent`

export const LISTING_UPLOADED = 'Listing uploaded'

export const LISTING_UPDATED = 'Listing updated'

export const PRODUCT_DELETED = 'Listing deleted'

export const DELIVERY_TOOLTIP =
  'Option to select 1 way OR 2 way Delivery trip. When Selecting 2 way trip, price for 1 way trip will automatically be set as 50%'

export const ONE_WAY_DELIVERY = 'Delivery (1 way delivery)'

export const TWO_WAY_DELIVERY = 'Delivery (2 way delivery)'

export const DEFAULT_DELIVERY = 'Delivery'

export const DEFAULT_TEXTAREA_ROWS = 4

export const DEFAUT_EXPIRED_REDUCER = 60 * 5

export const EDIT_PROFILE_ROW = 4

export const CHANGE_PASSWORD_ROW = 3

export const DAY = 'days'

export const MONTH = 'months'

export const HOUR_24 = 24

export const HOUR_72 = 72

// color accent react tour
export const ACCENT_COLOR = '#FED80B'

export const PRODUCT_REMOVED_TOOLTIP =
  'These items have been removed as they do not fit the product image upload guidelines. Edit the cover image to reupload.'

export const VIEW_PRODUCTS = 'View Products'
export const CHANGE_PASSWORD = 'Change Password'
export const EDIT_PROFILE = 'Edit Profile'
export const RENTAL_SETTINGS = 'Rental Settings'

export const MANAGE_CALENDAR = `Select the dates that you want to mark the item as blocked out, then click on “SAVE CHANGES” to update your calendar.`
export const LENDABLE_DATES_UPDATED = 'Lendable dates updated'
export const MANAGE_CALENDAR_SAVE_CHANGES =
  'Dates marked unavailable will be blocked out and Lendees will not be able to borrow the item on the selected dates.'
export const DEFAULT_MAP = {
  lat: 1.3483853,
  long: 103.839395
}

// outdated browser alert
export const OUTDATED_BROWSER = `Unsupported Browser! We only support the recent versions of major browsers like Chrome, Firefox, Safari, and Edge.`
export const IE = `IE`
export const IE_MOBILE = `IEMobile`
export const IOS_DEVICE = `ios`
export const ANDROID_DEVICE = `android`

export const categoryOfProduct = {
  100: 'Mobile Devices & Tablets',
  200: 'Computer & Accessories',
  300: 'Tools & Equipments',
  400: 'Sports equipments',
  500: 'Wedding Essentials',
  600: 'Clothings',
  700: 'Travel essentials',
  800: 'Toys & hobbies',
  900: 'Books & Comics',
  1000: 'Healthcare Items',
  1100: 'Camera & Accessories',
  1200: 'Bicycles and E-scooter',
  1300: 'Home Appliances',
  1400: 'Party & Events',
  1500: 'Board games',
  1600: 'Video games',
  1700: 'Everything Else',
  1800: 'Outdoor Essentials',
  1900: 'Music Related',
  2000: 'Luxury',
  2100: 'Car Accessories',
  2200: 'Costumes',
  2300: 'Furniture & Home Decor',
  2400: 'Parents Kids & Babies'
}

export const calendarControl = {
  next: 'next',
  prev: 'prev'
}

export const validate = {
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  password: 'These passwords do not match. Try again',
  loanDuration: 'This field is required.',
  phone: 'Please enter a phone number.',
  cvc: 'CVC must be exactly 3-4 characters.',
  zipCode: 'Zip code must be exactly 6 digits.',
  flatRate: 'Please input flat rate eg. $10',
  minPassword: 'Password must contain at least 6 characters.',
  validateEndDate: 'Loan and return date cannot be the same.',
  deliveryOptions: 'Please choose one of the options.',
  validateRentalDay: 'Lendor has set product Minimum rental to',
  validateMaxRentalDay: 'Lendor has set product Maximum rental to',
  validateSelectQuantity: 'Lendor has set quantity product Maximum rental to',
  validateMinQuantity: 'Quantity must be minimum of 1',
  emailVerification: 'Verification code must contains 6 characters'
}

export const notification = {
  Success: 'success',
  Error: 'error',
  Warning: 'warning',
  Info: 'info'
}

export const firebaseConfig = {
  apiKey: process.env.RAZZLE_APP_FIREBASE_APIKEY,
  authDomain: process.env.RAZZLE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.RAZZLE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.RAZZLE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.RAZZLE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.RAZZLE_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.RAZZLE_APP_FIREBASE_APPID,
  measurementId: process.env.RAZZLE_APP_MEASUREMENTID
}

export const updateProfile = {
  updateAvatar: 'updateAvatar',
  updateBanner: 'updateBanner',
  openSetting: 'openSetting',
  openEditProfile: 'openEditProfile'
}
export const inputPhone = {
  placeholder: '1234-5678'
}

export const textCountDown = {
  lendor: 'returned in order',
  lendee: 'received in order'
}

export const faqType = [
  {
    label: 'As a Lendor',
    type: 'Lendor'
  },
  {
    label: 'As a Lendee',
    type: 'Lendee'
  }
]

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
}

// Discount set by lendor
export const NO_DISCOUNT_SET = 'No discount set.'
export const NO_DISCOUNT_SET_BY_LENDOR = 'No discount set by Lendor.'

export const DefaultUserImg = require('../img/Profile_UnSelected.png')
export const DefaultProductImg = require('../img/default-images.png')
export const DefaultProfileImgBg = require('../img/bg-profile.jpg')
export const DefaultBannerImg = require('../img/lendor-masthead.jpg')
export const DefaultLendorLogo = require('../img/Profile_UnSelected.png')
export const DefaultLogoLendorImg = require('../img/link-store/logo.png')
export const DefaultLogoMenuLeft = require('../img/handshake.png')
export const DefaultDiscountBlack = require('../img/discount-tag-black.png')
export const DiscountTag = require('../img/discount-tag.png')
export const DefaultCalendar = require('../img/calendar.png')
export const DefaultIconLPP = require('../img/shield-small.png')
export const DefaultImgUpload = require('../img/demo-upload.png')
export const DefaultImage = require('../img/default-image.jpg')
export const DefaultAvatarIcon = require('../img/avatar-default.png')

//about_us
export const Confirm = require('../img/svg/confirm.svg')

// img tick
export const Tick = require('../img/icons-handshake/tick.png')
//icons-handshake
export const icon_facebook = require('../img/icons-handshake/facebook.png')
export const icon_facebook2 = require('../img/icons-handshake/facebook2.png')
export const icon_phone = require('../img/icons-handshake/phone.png')
export const icon_phone2 = require('../img/icons-handshake/phone2.png')
export const icon_email = require('../img/icons-handshake/envelope.png')
export const icon_email2 = require('../img/icons-handshake/envelope2.png')
export const icon_success = require('../img/icons-handshake/tick.png')
export const icon_google_plus = require('../img/icons-handshake/google-plus.png')
export const icon_google_plus_2 = require('../img/icons-handshake/google-plus2.png')
//LPP
export const LENDOR_LEFT = require('../img/lpp/lendor-left.png')
export const LPP_MAIN = require('../img/lpp/lendee-logo.png')
export const LPP_BUTTON = require('../img/lpp/label-large.png')
export const LENDOR_BUTTON = require('../img/lpp/lendee-content2.png')
export const LENDEE_BUTTON = require('../img/lpp/lendee-content1.png')
export const IT_WORK = require('../img/lpp/lendee-work.png')
export const LENDOR_NOTE = require('../img/lpp/lendor-note.png')
export const LENDEE_NOTE = require('../img/lpp/lendee-note.png')
export const LENDEE_PHONE = require('../img/lpp/lendee-phone.png')
export const DISPUTE_ORDER = require('../img/svg/dispute.svg')
export const CONFIRM_ORDER = require('../img/svg/confirm.svg')
export const LENDOR_BUTTON_CONTENT = require('../img/lpp/lendee-content.png')
// Try Now By Later
export const TRY_NOW_BUY_LATER_HOME = require('../img/svg/tnbl-page-01.svg')
export const TRY_NOW_BUY_LATER = require('../img/svg/tnbl-page-02.svg')
export const LENDEE_TRY = require('../img/svg/tnbl-page-03.svg')
export const LENDOR_TRY = require('../img/svg/tnbl-page-04.svg')
export const LENDEE_BUY = require('../img/try-now-buy-later/buy-lendee.png')
export const LENDEE_COLLECT = require('../img/try-now-buy-later/collect-lendee.png')
export const LENDEE_RENT = require('../img/try-now-buy-later/rent-lendee.png')
export const LENDEE_RETURN = require('../img/try-now-buy-later/return-lendee.png')
export const LENDOR_RENT = require('../img/try-now-buy-later/rent-lendor.png')
export const LENDOR_BUY = require('../img/try-now-buy-later/buy-lendor.png')
export const LENDOR_SEND = require('../img/try-now-buy-later/send-lendor.png')
// Transaction Icons
export const CHARGES_ICON = require('../img/transactions/charges_icon.svg')
export const DELIVERY_ICON = require('../img/transactions/delivery_icon.svg')
export const LPG_ICON = require('../img/transactions/LPG_icon.svg')
export const MAP_COLORED_ICON = require('../img/transactions/map_colored.svg')
export const MAP_ICON = require('../img/transactions/map.svg')
export const NOTE_ICON = require('../img/transactions/note_icon.svg')
export const PAYMENT_METHOD_ICON = require('../img/transactions/paymentmethod_icon.svg')
export const PROMO_ICON = require('../img/transactions/promo_icon.svg')
export const CALENDAR_ICON = require('../img/calendar.png')
export const COLLECTION_ICON = require('../img/transactions/collection_icon.svg')
export const DEFAULT_ICON_WIDTH = '27px'
export const DEFAULT_ICON_HEIGHT = '27px'
export const TRANSACTIONS_ICON_WIDTH = '35px'
export const TRANSACTIONS_ICON_HEIGHT = '35px'
export const ORDERS_CHARGES = require('../img/transactions/order_charges.svg')

// Chat icons
export const ICON_ACCEPTED = require('../img/chat/accepted.svg')
export const ICON_CANCELED = require('../img/chat/canceled.svg')
export const ICON_CREATED = require('../img/chat/created.svg')
export const ICON_DELIVERED = require('../img/chat/delivered.svg')
export const ICON_DISPUTED = require('../img/chat/disputed.svg')
export const ICON_RECEIVED = require('../img/chat/received.svg')
export const ICON_RETURNED = require('../img/chat/returned.svg')
export const ICON_MORE = require('../img/chat/more.svg')

// Button icons
export const ICON_FAVOURITED = require('../img/buttons/favourited.svg')
export const ICON_NOT_FAVOURITED = require('../img/buttons/not-favourited.svg')
export const ICON_BACK = require('../img/buttons/back.svg')
export const ICON_NEXT = require('../img/buttons/next.svg')

// Calendar icons
export const AVAILABILITY_ICON = require('../img/calendar/availability_icon.svg')
// export const GREEN_EDIT_ICON = require('../img/calendar/green_edit_icon.svg')
// export const RED_EDIT_ICON = require('../img/calendar/red_edit_icon.svg')

// social sharing
export const FACEBOOK_ICON = require('../img/social/facebook.svg')
export const LINKEDIN_ICON = require('../img/social/linkedin.svg')
export const MESSENGER_ICON = require('../img/social/messenger.svg')
export const SHARE_ICON = require('../img/social/share.svg')
export const TELEGRAM_ICON = require('../img/social/telegram.svg')
export const TWITTER_ICON = require('../img/social/twitter.svg')
export const WHATSAPP_ICON = require('../img/social/whatsapp.svg')

// get app icon
export const APP_STORE_ICON = require('../img/app/app-store.png')
export const GOOGLE_PLAY_ICON = require('../img/app/google-play.png')

// singpass
export const singPassImg = require('../img/singpass/singpass_logo_fullcolours.svg')
export const singPassBlackImg = require('../img/singpass/singpass_logo_black.svg')
export const lendorLendeeImg = require('../img/lendee.png')
export const personalDataImg = require('../img/checkdocument.png')
export const premiumImg = require('../img/premium.png')
export const singpassButtonInlineImg = require('../img/singpass/btn-inline-primary.svg')
export const singpassButtonStackedImg = require('../img/singpass/btn-stacked-primary.svg')
export const highvalueImg = require('../img/singpass/highvalue.svg')
export const rentImg = require('../img/singpass/rent.svg')

// business
export const ACCESSORIES_IMG = require('../img/business/accessories.jpg')
export const CAMERA_IMG = require('../img/business/camera.jpg')
export const DESKTOPS_IMG = require('../img/business/desktops.jpg')
export const LAPTOPS_IMG = require('../img/business/laptops.jpg')
export const MOBILEPHONES_IMG = require('../img/business/mobilephones.jpg')
export const MONITORS_IMG = require('../img/business/monitors.jpg')
export const TABLETS_IMG = require('../img/business/tablets.jpg')
export const WEARABLES_IMG = require('../img/business/wearables.jpg')
export const MAP_IMG = require('../img/business/map.png')
export const ADAM_KHOO_IMG = require('../img/business/adamKhoo.jpg')
export const LARES_SOLUTIONS_IMG = require('../img/business/lauresSolutions.jpg')

export const GREEN_EATRH_SVG = require('../img/svg/green-earth.svg')
export const SHIELD_SVG = require('../img/svg/shield.svg')
export const SMILING_SVG = require('../img/svg/smiling.svg')
export const REFRESH_TECH_SVG = require('../img/svg/synchronization.svg')

// logo payment
export const logoIgloo = require('../img/svg/igloo_logo.svg')

//get before proceed icon
export const BEFORE_PROCEED_ICON = require('../img/before-proceed/late_return_pop_up_image_original_version.png')

export const BEFORE_PROCEED_TITLE = 'HEY THERE! BEFORE YOU PROCEED...'

export const BEFORE_PROCEED_SUBTITLE =
  'To ensure a pleasant sharing experience for both Lendors and Lendees, please remember to '

export const BEFORE_PROCEED_BOLD = 'return the product on time!'

export const BEFORE_PROCEED_CONTENT =
  '*Please note that you may be automatically billed for late return of rentals based on the number of days (will only be triggered after multiple reminders).'

export const BEFORE_PROCEED_BTN = 'PROCEED WITH PAYMENT'

export const MINIMUM_NOA_MESSAGE = `Your Notice of Assessment (Basic, Latest Year) does not meet the required minimum amount. You may opt out of Lendor Protection Guarantee (LPG) and rent with a deposit subject to merchant's approval.`
export const MINIMUM_NOA_MESSAGE_DEPOSIT_MAX = `Your Notice of Assessment (Basic, Latest Year) does not meet the required minimum amount. Try renting other items from this Lendor.`
export const MINIMUM_NOA_WITH_PROOF = `Your Notice of Assessment (Basic, Latest Year) does not meet the
required minimum amount. Please proceed to upload Proof of Residency
for verification`

export const query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
}

export const FORM_ITEM_NORMAL_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
}

export const FORM_ITEM_VERIFICATION_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

export const FORM_ITEM_VERTICAL_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 }
  }
}

export const SLIDE_ITEM_PRODUCT_LAYOUT = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 8,
  xl: 6
}

export const HIDE_BACK_BUTTON_AUTH = true

export const SKIP_REGISTER_PHONE = true

export const PRODUCT_RATE_HEIGHT = 17

export const PRODUCT_RATE_WIDTH = 13

export const PRODUCT_SEARCH_MAP_ZOOM = 14

export const DAY_OF_WEEK = 7

export const DAY_OF_MONTH = 30

export const DEFAULT_AVATAR_SIZE = 40

export const PAYMENT_CARD_NAME_LENGTH = 255

export const PAYMENT_CARD_ADDRESS_LENGTH = 255

export const PAYMENT_CARD_CITY_LENGTH = 20

export const PAYMENT_CARD_ZIP_CODE_LENGTH = 6

export const DEFAULT_SCROLL_BAR_WIDTH = 5

export const PAGE_SIZE_ARTICLE_RELATE = 5

//COVID19
export const PICTURE_1 = require('../img/covid-19/1.png')
export const PICTURE_2 = require('../img/covid-19/2.png')
export const PICTURE_3 = require('../img/covid-19/3.png')
export const PICTURE_4 = require('../img/covid-19/4.png')
export const PICTURE_5 = require('../img/covid-19/5.png')
export const PICTURE_6 = require('../img/covid-19/6.png')
export const TABLE = require('../img/covid-19/table.png')

export const enableSingPassFeature =
  process.env.RAZZLE_ENABLE_SINGPASS_FEATURE === true.toString()

export const GoogleTrackEvent = {
  Contact: 'Contact',
  SignUpComplete: 'SignUpCompleted',
  LoanRequestComplete: 'LoanRequestSent'
}
