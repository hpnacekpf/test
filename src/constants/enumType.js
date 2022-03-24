import { routes } from 'routes/mainNav'
import {
  PAYMENT_METHOD,
  PAYMENT_PROCESS_STATUS,
  PAYMENT_STATUS,
  SELL_STATUS
} from './enum'

const controlType = {
  RefundableDeposit: 'RefundableDeposit',
  SelfCollect: 'SelfCollect',
  Delivery: 'Delivery'
}

const deliveryOptions = {
  SelfCollect: 'self-collect',
  Delivery: 'delivery'
}

const collectionMethod = {
  SelfCollect: 'Self Collection',
  Delivery: 'Delivery'
}

const deliveryOptionsEnum = [
  {
    value: false,
    iconImage: require('../img/collection.png'),
    label: 'Self Collection'
  },
  {
    value: true,
    iconImage: require('../img/delivery.png'),
    label: 'Delivery'
  }
]

const discountType = {
  Weekly: 'weekly',
  Monthly: 'monthly'
}

const lendorType = {
  Lendee: 'lendee',
  Lendor: 'lendor'
}

const lendorTypeEnum = [
  {
    value: lendorType.Lendor,
    link: routes.TRANSACTIONS,
    text: 'As a Lendor'
  },
  {
    value: lendorType.Lendee,
    link: `${routes.TRANSACTIONS}/${lendorType.Lendee}`,
    text: 'As a Lendee'
  }
]

const pageView = {
  GridView: 'grid',
  MapView: 'map'
}

export const lendorSortEnumValue = {
  Popular: '100',
  Recent: '200',
  Nearest: '300',
  Lowest: '400',
  Highest: '500'
}

const lendorSortPriceEnumValue = {
  Daily: 'Daily',
  Weekly: 'Weekly',
  Monthly: 'Monthly'
}

const lendorSortPriceEnum = [
  {
    value: lendorSortPriceEnumValue.Daily,
    label: 'Daily'
  },
  {
    value: lendorSortPriceEnumValue.Weekly,
    label: 'Weekly'
  },
  {
    value: lendorSortPriceEnumValue.Monthly,
    label: 'Monthly'
  }
]

const lendorSortEnum = [
  {
    value: lendorSortEnumValue.Popular,
    label: 'Popular'
  },
  {
    value: lendorSortEnumValue.Recent,
    label: 'Recent'
  },
  {
    value: lendorSortEnumValue.Nearest,
    label: 'Nearest'
  },
  {
    value: lendorSortEnumValue.Lowest,
    label: 'Lowest Price'
  },
  {
    value: lendorSortEnumValue.Highest,
    label: 'Highest Price'
  }
]

const listedItemsSort = [
  {
    value: lendorSortEnumValue.Recent,
    label: 'Recent'
  },
  {
    value: lendorSortEnumValue.Lowest,
    label: 'Lowest Price'
  },
  {
    value: lendorSortEnumValue.Highest,
    label: 'Highest Price'
  }
]

export const productUserSort = [
  {
    value: lendorSortEnumValue.Lowest,
    label: 'Lowest Price'
  },
  {
    value: lendorSortEnumValue.Highest,
    label: 'Highest Price'
  }
]

const registerStatusValues = {
  Registration: 'registration',
  Email: 'email',
  Mobile: 'Mobile',
  Location: 'location',
  Info: 'info'
}

const paymentStatusValues = {
  checkOut: 'checkOut',
  PaymentDetails: 'paymentDetails',
  Confirmation: 'confirmation'
}

const orderStatus = {
  Placed: 'placed',
  Accepted: 'accepted',
  Payment: 'payment',
  WithDraw: 'withDraw',
  Delivered: 'delivered',
  Received: 'received',
  AcceptedItIs: 'acceptedItIs',
  Resolved: 'resolved',
  Returned: 'returned',
  Reviewed: 'reviewed',
  Canceled: 'canceled',
  Expired: 'expired',
  Declined: 'declined',
  CanceledByAdmin: 'canceledByAdmin',
  DisputeOrderByLendor: 'disputeOrderByLendor',
  DisputeOrderByLendee: 'disputeOrderByLendee',
  Created: 'created',
  Disputed: 'disputed',
  Sold: 'sold',
  WaitingVerify: 'waitingVerify',
  PORVerified: 'PORVerified'
}

const orderStatusesTexts = {
  [orderStatus.Placed]: {
    buyerText: 'Loan requested',
    sellerText: 'Loan requested',
    notificationText: 'Requested',
    textColorStyle: 'text-warning',
    buttonStyleClass: 'lendor-btn-primary lendor-btn-primary--hover ',
    textButtonColorClass: ''
  },
  [orderStatus.Accepted]: {
    buyerText: 'Request accepted',
    sellerText: 'Loan accepted',
    notificationText: 'Accepted',
    textColorStyle: 'text-success',
    buttonStyleClass: 'lendor-btn-primary lendor-btn-primary--hover',
    textButtonColorClass: ''
  },
  [orderStatus.WithDraw]: {
    buyerText: 'You withdraw request',
    sellerText: 'Lendee withdraw request',
    notificationText: 'WithDraw',
    textColorStyle: 'text-normal',
    buttonStyleClass: 'lendor-btn-primary lendor-btn-primary--hover',
    textButtonColorClass: ''
  },
  [orderStatus.AcceptedItIs]: {
    buyerText: 'You accept item as it is',
    sellerText: 'Lendee accept item as it is',
    notificationText: 'acceptedItIs',
    textColorStyle: 'text-success',
    buttonStyleClass: 'lendor-btn-primary lendor-btn-primary--hover',
    textButtonColorClass: ''
  },
  [orderStatus.Delivered]: {
    buyerText: 'Lendor delivered item',
    sellerText: 'You have mark delivered',
    notificationText: 'Delivered',
    textColorStyle: 'text-success',
    buttonStyleClass: 'lendor-btn-primary lendor-btn-primary--hover',
    textButtonColorClass: ''
  },
  [orderStatus.Received]: {
    buyerText: 'Received item in order',
    sellerText: 'Lendee received item in order',
    notificationText: 'Received',
    textColorStyle: 'text-success',
    buttonStyleClass: 'lendor-btn-primary lendor-btn-primary--hover',
    //border__deal
    textButtonColorClass: ''
  },
  [orderStatus.Returned]: {
    buyerText: 'You returned item',
    sellerText: 'Lendee returned item',
    notificationText: 'Returned',
    textColorStyle: 'text-success',
    buttonStyleClass: 'lendor-btn-primary lendor-btn-primary--hover',
    textButtonColorClass: ''
  },
  [orderStatus.Resolved]: {
    buyerText: 'Lendor accept item as it is',
    sellerText: 'You accept item and resolve amicably',
    notificationText: 'Returned',
    textColorStyle: 'text-success',
    buttonStyleClass: 'lendor-btn-primary lendor-btn-primary--hover',
    textButtonColorClass: ''
  },
  [orderStatus.Reviewed]: {
    buyerText: 'Lendor received item in order',
    sellerText: 'You marked item returned in order',
    notificationText: 'Lendor received',
    textColorStyle: 'text-success',
    buttonStyleClass: 'lendor-btn-primary lendor-btn-primary--hover',
    textButtonColorClass: ''
  },
  [orderStatus.Canceled]: {
    buyerText: 'You canceled request',
    sellerText: 'Request cancelled',
    notificationText: 'Canceled',
    textColorStyle: 'text-normal',
    textButtonColorClass: ''
  },
  [orderStatus.LendeeCanceled]: {
    buyerText: 'You canceled loan',
    sellerText: 'Lendee canceled request',
    notificationText: 'LendeeCanceled',
    textColorStyle: 'text-normal',
    buttonStyleClass: 'bg__breadcrumb border__cancel',
    textButtonColorClass: 'text__cancel'
  },
  [orderStatus.Declined]: {
    buyerText: 'Request declined',
    sellerText: 'You declined Loan',
    notificationText: 'Declined',
    textColorStyle: 'text-normal',
    buttonStyleClass: 'bg__breadcrumb border__cancel',
    textButtonColorClass: 'text__cancel'
  },
  [orderStatus.CanceledByAdmin]: {
    buyerText: 'Admin has canceled the order',
    sellerText: 'Admin has canceled the order',
    notificationText: 'AdminCanceled',
    textColorStyle: 'text-normal',
    buttonStyleClass: 'bg__breadcrumb border__cancel',
    textButtonColorClass: 'text__cancel'
  },
  [orderStatus.DisputeOrderByLendor]: {
    buyerText: 'You dispute loan',
    sellerText: 'Lendee dispute request',
    notificationText: 'Dispute by lendor',
    textColorStyle: 'text-normal',
    buttonStyleClass: 'lendor-btn-primary lendor-btn-primary--hover',
    textButtonColorClass: ''
  },
  [orderStatus.DisputeOrderByLendee]: {
    buyerText: 'Lendor dispute request',
    sellerText: 'You dispute loan',
    notificationText: 'Dispute by lendee',
    textColorStyle: 'text-normal',
    buttonStyleClass: 'lendor-btn-primary lendor-btn-primary--hover',
    textButtonColorClass: ''
  }
}

const chatOrderStatus = {
  CREATED: 'created',
  ACCEPTED: 'accepted',
  DISPUTED_ORDER_BY_LENDOR: 'disputed',
  DISPUTED_ORDER_BY_LENDEE: 'disputed',
  DELIVERED: 'delivered',
  RECEIVED: 'received',
  RETURNED: 'returned',
  CANCELED: 'canceled',
  DECLINED: 'declined'
}

const statusStep = {
  StepWait: 'wait',
  StepProcess: 'process'
}

const stepRequestLateReturn = [
  {
    value: orderStatus.Placed,
    label: 'Loan Requested'
  },
  {
    value: orderStatus.Accepted,
    label: 'Request Accepted'
  },
  {
    value: orderStatus.Delivered,
    label: 'Item Sent'
  },
  {
    value: orderStatus.Received,
    label: 'Item Accepted'
  },
  {
    value: orderStatus.Sold,
    label: 'Item Sold'
  }
]

const stepRequestIdentityVerify = [
  {
    value: orderStatus.Placed,
    label: 'Loan Requested'
  },
  {
    value: orderStatus.PORVerified,
    label: 'Identity Verification'
  },
  {
    value: orderStatus.Accepted,
    label: 'Request Accepted'
  },
  {
    value: orderStatus.Delivered,
    label: 'Item Sent'
  },
  {
    value: orderStatus.Received,
    label: 'Item Accepted'
  },
  {
    value: orderStatus.Returned,
    label: 'Item Returned'
  },
  {
    value: orderStatus.Reviewed,
    label: 'Item Returned In Order'
  }
]

const stepRequest = [
  {
    value: orderStatus.Placed,
    label: 'Loan Requested'
  },
  {
    value: orderStatus.Accepted,
    label: 'Request Accepted'
  },
  {
    value: orderStatus.Delivered,
    label: 'Item Sent'
  },
  {
    value: orderStatus.Received,
    label: 'Item Accepted'
  },
  {
    value: orderStatus.Returned,
    label: 'Item Returned'
  },
  {
    value: orderStatus.Reviewed,
    label: 'Item Returned In Order'
  }
]

const stepCancel = [
  {
    value: orderStatus.Placed,
    label: 'Loan Requested'
  },
  {
    value: orderStatus.Canceled,
    label: 'Request Cancelled'
  }
]

const stepDecline = [
  {
    value: orderStatus.Placed,
    label: 'Loan Requested'
  },
  {
    value: orderStatus.Declined,
    label: 'Request Declined'
  }
]

const stepExpired = [
  {
    value: orderStatus.Placed,
    label: 'Loan Requested'
  },
  {
    value: orderStatus.Expired,
    label: 'Request Expired'
  }
]

const stepRequestViaCard = [
  {
    value: orderStatus.Accepted,
    label: 'Loan Requested'
  },
  {
    value: orderStatus.Delivered,
    label: 'Item Sent'
  },
  {
    value: orderStatus.Received,
    label: 'Item Accepted'
  },
  {
    value: orderStatus.Returned,
    label: 'Item Returned'
  },
  {
    value: orderStatus.Reviewed,
    label: 'Item Returned In Order'
  }
]

const enableSingPassFeature =
  process.env.RAZZLE_ENABLE_SINGPASS_FEATURE === true.toString()

const stepRegister = [
  {
    value: routes.REGISTER,
    label: 'Registration'
  },
  {
    value: [routes.VERIFICATION_EMAIL, routes.REGISTER_EMAIL],
    label: 'Email Verification'
  },
  {
    value: [routes.REGISTER_PHONE, routes.VERIFICATION_PHONE],
    label: 'Mobile Verification'
  },
  // {
  //   value: routes.LOCATION,
  //   label: 'Location'
  // },
  {
    value: enableSingPassFeature ? routes.SINGPASS : routes.LOCATION,
    label: enableSingPassFeature ? 'IDENTITY VERIFICATION' : 'Location'
  },
  {
    value: routes.PERSONAL_INFO,
    label: 'Personal Info'
  }
]

const termStatusValues = {
  TermsOfUse: 0,
  PrivacyPolicy: 1,
  LoanPolicy: 2,
  ProhibitedItems: 3
}

const stepPayment = [
  {
    value: PAYMENT_PROCESS_STATUS.CHECK_OUT,
    label: 'Check Out'
  },
  {
    value: PAYMENT_PROCESS_STATUS.DETAIL,
    label: 'Payment Details'
  },
  {
    value: PAYMENT_PROCESS_STATUS.CONFIRMATION,
    label: 'Confirmation'
  }
]

const orderStatusButton = {
  Place: 'SEND LOAN REQUEST',
  Requested: 'LOAN REQUESTED',
  Accepted: 'ACCEPT REQUEST',
  Delivered: 'MARK ITEM SENT',
  Received: 'MARK ITEM RECEIVED',
  Returned: 'MARK ITEM RETURNED',
  Declined: 'DECLINE REQUEST',
  Canceled: 'CANCEL',
  CanceledRequested: 'CANCEL REQUEST',
  ChatWithLendee: 'Chat with lendee',
  WithDraw: 'Withdraw Request',
  ChangePaymentMethod: 'Change Payment Method',
  Payment: 'Payment Checkout',
  SeeTransaction: 'See transaction',
  DisputeOrder: 'DISPUTE ORDER',
  LeaveReview: 'Leave review',
  LendItemAgain: 'Borrow item again'
}

const discountTypeEnum = [
  {
    value: 7,
    label: 7
  },
  {
    value: 14,
    label: 14
  }
]

const paymentMethodValues = {
  Cash: 'Cash',
  Credit: 'Credit Card'
}

const paymentMethod = {
  Cash: 'cash',
  CreditCash: 'CreditCash',
  CreditCard: 'creditCard'
}

const paymentMethodEnum = [
  {
    value: PAYMENT_METHOD.CASH,
    label: 'Payment via Cash',
    image: require('../img/cash.png')
  },
  {
    value: PAYMENT_METHOD.CREDIT_CARD,
    label: 'Payment via Credit Card',
    image: require('../img/creadit-card.png')
  }
]

const paymentStatus = {
  Pending: 'Pending',
  Processing: 'Processing',
  Complete: 'Complete',
  Fail: 'Fail'
}

const searchBy = {
  Users: 'users',
  Items: 'items'
}

const searchByEnum = [
  {
    value: searchBy.Items,
    label: 'Items'
  },
  {
    value: searchBy.Users,
    label: 'Users'
  }
]

const uploadType = {
  Product: 'product',
  Avatar: 'avatar',
  Banner: 'banner',
  Chat: 'chat',
  Ping: 'ping'
}

const imagePath = {
  Product: 'product_pictures',
  Avatar: 'profile_pictures',
  Banner: 'banner_pictures',
  Chat: 'chat_pictures',
  Ping: 'ping_pictures'
}

const productStatus = {
  Published: 'Published',
  Suspended: 'Suspended',
  Deleted: 'Deleted'
}

const sortDirection = {
  DESC: 'descend',
  ASC: 'ascend'
}

const LPP = [
  {
    label: 'Yes, count me in',
    value: true
  },
  {
    label: 'No, opt me out',
    value: false
  }
]

const VerifyNOAProof = [
  {
    label: ' Verify with Notice of Assessment ',
    value: 1
  },
  {
    label: ' Verify by Proof of Residency ',
    value: 2
  }
]

const typeNotification = {
  Chat: 'Chat',
  Transaction: 'Transaction'
}

const typeTransactionOrder = {
  Canceled: 'Canceled',
  Returned: 'Returned',
  Requested: 'Requested',
  LendorReceived: 'Lendor received',
  DisputeByLendor: 'Dispute by lendor',
  DisputeByLendee: 'Dispute by lendee'
}

const typeModalOrder = {
  DISPUTE: 'confirm dispute',
  CONFIRM: 'confirm'
}

const messageType = {
  text: 'text',
  image: 'image'
}

const menuLPP = {
  Lendee: {
    link: routes.LENDEE,
    text: 'Lendees'
  },
  Lendor: {
    link: routes.LENDOR,
    text: 'Lendors'
  }
}

const modalName = {
  Confirm: 'modalConfirm',
  Payment: 'paymentConfirm',
  Information: 'modalRegister',
  Alert: 'modalAlert'
}

const facebookPixelEvent = {
  OrderPage: 'Order Page',
  Login: 'Login',
  Register: 'Register',
  Purchase: 'Purchase',
  Transactions: 'Transaction Page',
  ViewContent: 'ViewContent',
  AddToCart: 'AddToCart'
}

const articleStatus = {
  ACTIVE: 'Active',
  HIDDEN: 'Hidden',
  DELETE: 'Delete'
}

const sellStatusType = [
  {
    label: 'No',
    value: SELL_STATUS.RENT_ONLY
  },
  {
    label: 'Yes',
    value: SELL_STATUS.TRY_NOW_BUY_LATER
  }
]

const deliveryType = [
  {
    label: '1 way trip',
    value: 'OneWay'
  },
  {
    label: '2 way trip',
    value: 'TwoWay'
  }
]

const deliveryOptionType = {
  OneWay: 'OneWay',
  TwoWay: 'TwoWay',
  NoDelivery: 'NoDelivery'
}

const mediaType = {
  MEDIA: 'Media',
  ARTICLE: 'Article'
}

export const enumPaymentStatus = [
  { value: PAYMENT_STATUS.COMPLETE, label: 'Paid', color: 'text-success' },
  { value: PAYMENT_STATUS.FAILED, label: 'Failed', color: 'text-danger' },
  { value: PAYMENT_STATUS.PENDING, label: 'Pending', color: 'text-warning' },
  {
    value: PAYMENT_STATUS.PROCESSING,
    label: 'Processing',
    color: 'text-warning'
  }
]

export default {
  controlType,
  collectionMethod,
  deliveryOptions,
  deliveryOptionsEnum,
  discountType,
  discountTypeEnum,
  paymentMethod,
  paymentMethodValues,
  paymentMethodEnum,
  orderStatus,
  registerStatusValues,
  paymentStatusValues,
  orderStatusButton,
  stepRequest,
  stepRequestLateReturn,
  stepRequestIdentityVerify,
  stepRequestViaCard,
  stepRegister,
  stepPayment,
  stepCancel,
  stepExpired,
  stepDecline,
  lendorType,
  lendorSortEnum,
  lendorTypeEnum,
  orderStatusesTexts,
  pageView,
  paymentStatus,
  searchBy,
  searchByEnum,
  uploadType,
  productStatus,
  sortDirection,
  LPP,
  lendorSortEnumValue,
  termStatusValues,
  typeNotification,
  typeTransactionOrder,
  typeModalOrder,
  imagePath,
  menuLPP,
  statusStep,
  modalName,
  facebookPixelEvent,
  chatOrderStatus,
  deliveryType,
  deliveryOptionType,
  messageType,
  mediaType,
  lendorSortPriceEnumValue,
  lendorSortPriceEnum,
  listedItemsSort,
  sellStatusType,
  articleStatus,
  VerifyNOAProof
}
