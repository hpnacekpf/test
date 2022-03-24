export const PRODUCT_STATUS = Object.freeze({
  SUSPENDED: 'Suspended',
  DELETED: 'Deleted',
  NORMAL: 'Normal'
})

export const FAQ_STATUS = Object.freeze({
  SUSPENDED: 'Suspended',
  DELETED: 'Deleted',
  NORMAL: 'Normal'
})

export const CATEGORY_STATUS = Object.freeze({
  DELETED: 'Deleted',
  NORMAL: 'Normal'
})

export const MEMBERSHIP_STATUS = Object.freeze({
  DELETED: 'Deleted',
  NORMAL: 'Normal'
})

export const USER_STATUS = Object.freeze({
  NOT_REGISTER: 0,
  NOT_REGISTER_EMAIL: 1,
  VERIFICATION_MAIL: 2,
  NOT_REGISTER_PHONE: 3,
  VERIFICATION_PHONE: 4,
  NOT_REGISTER_LOCATION: 5,
  SINGPASS: 6,
  PERSONAL_INFO: 7,
  VERIFIED: 8
})

export const MEDIA_TYPE = Object.freeze({
  MEDIA: 'Media',
  ARTICLE: 'Article'
})

export const FACEBOOK_PIXEL_EVENT = Object.freeze({
  ORDER_PAGE: 'Order Page',
  LOGIN: 'Login',
  REGISTER: 'Register',
  PURCHASE: 'Purchase',
  TRANSACTIONS: 'Transaction Page',
  VIEW_CONTENT: 'ViewContent',
  ADD_TO_CART: 'AddToCart'
})

export const MODAL_ORDER = Object.freeze({
  DISPUTE: 'dispute',
  CONFIRM: 'confirm'
})

export const REDUX_MODAL = Object.freeze({
  LOCATION: 'modalInputLocation',
  REGISTER_PHONE: 'modalInputPhone',
  VERIFICATION_PHONE: 'modalVerificationPhone',
  SINGPASS: 'modalSingPass',
  MINIMUM_ASSESSMENT: 'ModalMinimumAssessment',
  EXTEND: 'modalExtend',
  DATE_CHANGE: 'modalDateChange',
  DATE_CHANGE_RECEIVED: 'modalDateChangeReceived',
  SINGPASS_SUCCESS: 'modalSingPassSuccess',
  SINGPASS_FAIL: 'modalSingPassFail',
  SINGPASS_WITH_NOA: 'modalSingPassNOA',
  SINGPASS_LOADING: 'modalSingPassLoading',
  CONFIRM: 'modalConfirm',
  PAYMENT: 'paymentConfirm',
  INFO: 'modalRegister',
  ALERT: 'modalAlert',
  TRANSACTION: 'modalTransaction',
  REVIEW: 'modalReview',
  DELIVERY: 'modalDelivery',
  TERM: 'modalTerms',
  CHAT_BLOCKED: 'modalBlockedChat',
  ERROR_PAYMENT: 'modalErrorPayment',
  NOA: 'modalNOA',
  NOA_SUCCESS: 'modalNOASuccess',
  NOA_FAIL: 'modalNOAFail',
  BUY_PRODUCT: 'modalBuyProduct',
  REGISTER_ADDRESS_SINGPASS: 'modalSingPassAddress',
  PROOF_ADDRESS: 'modalProofAddress',
  PROOF_ADDRESS_REQUEST: 'modalProofAddressRequest',
  PROOF_ADDRESS_REJECT: 'modalProofAddressReject',
  LENDOR_FOR_BUSINESS: 'modalLendorForBusiness'
})

export const ORDER_MODAL_TYPE = Object.freeze({
  DISPUTE: 'confirm dispute',
  CONFIRM: 'confirm'
})

export const PRICE_SORT = Object.freeze({
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly'
})

export const PAGE_VIEW = Object.freeze({
  GRID: 'grid',
  MAP: 'map'
})

export const SEARCH_TYPE = Object.freeze({
  PRODUCTS: 'items',
  USER: 'users'
})

export const SORT_TYPE = Object.freeze({
  POPULAR: '100',
  RECENT: '200',
  NEAREST: '300',
  LOWEST: '400',
  HIGHEST: '500'
})

export const SORT_PRODUCT = Object.freeze({
  DATE_DESC: 'date_DESC',
  PRICE_DESC: 'price_DESC',
  PRICE_ASC: 'price_ASC',
  DISTANCE_DESC: 'distance_DESC',
  VIEW_COUNT_DESC: 'viewCount_DESC'
})

export const DELIVERY_TYPE = Object.freeze({
  ONE_WAY: 'OneWay',
  TWO_WAY: 'TwoWay',
  NO_DELIVERY: 'NoDelivery'
})

export const TNBL_DELIVERY_TYPE = Object.freeze({
  ONE_WAY: 'OneWay',
  NO_DELIVERY: 'NoDelivery'
})

export const DISCOUNT_TYPE = Object.freeze({
  WEEKLY: 'weekly',
  MONTHLY: 'monthly'
})

export const PAYMENT_METHOD = Object.freeze({
  CASH: 'cash',
  CREDIT_CARD: 'creditCard'
})

export const ORDER_STATUS = Object.freeze({
  PLACED: 'placed',
  ACCEPTED: 'accepted',
  PAYMENT: 'payment',
  WITHDRAW: 'withDraw',
  DELIVERED: 'delivered',
  RECEIVED: 'received',
  ACCEPTED_IT_IS: 'acceptedItIs',
  RESOLVED: 'resolved',
  RETURNED: 'returned',
  REVIEWED: 'reviewed',
  CANCELED: 'canceled',
  EXPIRED: 'expired',
  DECLINED: 'declined',
  CANCELED_BY_ADMIN: 'canceledByAdmin',
  DISPUTE_BY_LENDOR: 'disputeOrderByLendor',
  DISPUTE_BY_LENDEE: 'disputeOrderByLendee',
  CREATED: 'created',
  DISPUTED: 'disputed',
  SOLD: 'sold',
  WAITING_VERIFY: 'waitingVerify',
  POR_VERIFIED: 'PORVerified'
})

export const PAYMENT_STATUS = Object.freeze({
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETE: 'Complete',
  FAILED: 'Fail',
  REFUND: 'Refund'
})

export const AMENDMENT_STATUS = {
  PENDING: 'Pending',
  ACCEPT: 'Accept',
  REJECT: 'Reject'
}

export const COLLECTION_METHOD = Object.freeze({
  SELF_COLLECT: 'Self Collection',
  DELIVERY: 'Delivery'
})

export const BUTTON_ORDER_STATUS = Object.freeze({
  PLACE: 'SEND LOAN REQUEST',
  REQUESTED: 'LOAN REQUESTED',
  ACCEPTED: 'ACCEPT REQUEST',
  DELIVERED: 'MARK ITEM SENT',
  RECEIVED: 'MARK ITEM RECEIVED',
  RETURNED: 'MARK ITEM RETURNED',
  DECLINED: 'DECLINE REQUEST',
  CANCELED: 'CANCEL',
  CANCELED_REQUEST: 'CANCEL REQUEST',
  CHAT_WITH_LENDEE: 'Chat with lendee',
  WITHDRAW: 'Withdraw Request',
  CHANGE_PAYMENT_METHOD: 'Change Payment Method',
  PAYMENT: 'Payment Checkout',
  SEE_TRANSACTION: 'See transaction',
  DISPUTE_ORDER: 'DISPUTE ORDER',
  LEAVE_REVIEW: 'Leave review',
  LEND_ITEM_AGAIN: 'Borrow item again'
})

export const STATUS_STEP = Object.freeze({
  WAIT: 'wait',
  PROCESS: 'process',
  FINISH: 'finish',
  ERROR: 'error'
})

export const PAYMENT_PROCESS_STATUS = Object.freeze({
  CHECK_OUT: 'checkOut',
  DETAIL: 'paymentDetails',
  CONFIRMATION: 'confirmation'
})

export const LENDOR_TYPE = Object.freeze({
  LENDEE: 'lendee',
  LENDOR: 'lendor'
})

export const SORT_DIRECTION = Object.freeze({
  DESC: 'descend',
  ASC: 'ascend'
})

export const TERM_STATUS = Object.freeze({
  TERM_OF_USE: 0,
  PRIVACY_POLICY: 1,
  LOAN_POLICY: 2,
  PROHIBITED_ITEM: 3
})

export const UPLOAD_TYPE = Object.freeze({
  PRODUCT: 'product',
  AVATAR: 'avatar',
  BANNER: 'banner',
  CHAT: 'chat',
  PING: 'ping'
})

export const RATIO_IMAGE = Object.freeze({
  SQUARE: 1,
  VERTICAL_4_5: 4 / 5,
  HORIZONTAL_5_3: 5 / 3,
  HORIZONTAL_5_4: 5 / 4,
  HORIZONTAL_4_3: 4 / 3
})

export const NOTIFICATION_TYPE = Object.freeze({
  CHAT: 'Chat',
  TRANSACTION: 'Transaction'
})

export const CHAT_MESSAGE_TYPE = Object.freeze({
  IMAGE: 'image',
  TEXT: 'text'
})

export const CARD_PAYMENT = Object.freeze({
  CREDIT_CARD: 'credit',
  DEBIT_CARD: 'debit'
})

export const PRODUCT_MIXED_TYPE = Object.freeze({
  PRODUCT: 'Product',
  PARTNERSHIP: 'Partnership'
})

export const SELL_STATUS = Object.freeze({
  TRY_NOW_BUY_LATER: 'TNBL',
  RENT_ONLY: 'RentOnly'
})

export const PROMO_TYPE = Object.freeze({
  FIXED: 'Fixed',
  PERCENTAGE: 'Percentage'
})

export const ORDER_TYPE = Object.freeze({
  PRIMARY: 'Primary',
  EXTENSION: 'Extension',
  LATE_RETURN: 'LateReturn',
  BUY: 'Buy'
})

export const ORDER_BUTTON = Object.freeze({
  CANCEL_REQUEST: 'CancelRequest',
  SENT_REQUEST: 'SentRequest',
  CANCEL_ORDER: 'CancelOrder',
  SEE_TRANSACTION: 'SeeTransaction',
  PAYMENT: 'Payment',
  REQUESTED: 'Requested',
  RECEIVED: 'Received',
  DISPUTE: 'Dispute',
  BUYER_RETURNED: 'BuyerReturn',
  LEND_AGAIN: 'LendAgain',
  LEAVE_REVIEW: 'Review',
  DECLINED: 'Decline',
  ACCEPTED: 'Accept',
  DELIVERED: 'Delivery',
  SELLER_RETURN: 'SellerReturn'
})

export const ORDER_BUTTON_NAME = Object.freeze({
  PLACED: 'SEND LOAN REQUEST',
  REQUESTED: 'LOAN REQUESTED',
  ACCEPTED: 'ACCEPT REQUEST',
  DELIVERED: 'MARK ITEM SENT',
  RECEIVED: 'MARK ITEM RECEIVED',
  RETURNED: 'MARK ITEM RETURNED',
  DECLINED: 'DECLINE REQUEST',
  CANCELED: 'CANCEL',
  CANCEL_REQUEST: 'CANCEL REQUEST',
  CHAT_WITH_LENDEE: 'Chat with lendee',
  WITH_DRAW: 'Withdraw Request',
  CHANGE_PAYMENT_METHOD: 'Change Payment Method',
  PAYMENT: 'Payment Checkout',
  SEE_TRANSACTION: 'See transaction',
  DISPUTE: 'DISPUTE ORDER',
  LEAVE_REVIEW: 'Leave review',
  LEND_AGAIN: 'Borrow item again',
  CANCEL_ORDER: 'CANCEL ORDER'
})

export const ARTICLE_TRENDING_POSITION = Object.freeze({
  TOP: 'Top',
  LEFT: 'Left',
  RIGHT: 'Right',
  BOTTOM: 'Bottom'
})

export const PAYMENT_TYPE = Object.freeze({
  ORDER: 'Order',
  DATE_AMENDMENT: 'DateAmendment',
  MERGE: 'Merge'
})

export const BUTTON_TYPE = Object.freeze({
  BUSINESS_REQUEST: 'BusinessRequest',
  NONE: 'None'
})
