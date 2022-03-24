import {
  aboutUsNav,
  aboutUsResources,
  aboutUsRoutes
} from 'features/aboutUs/nav'
import {
  locationResources,
  locationRoutes
} from 'features/authentication/location/nav'

import {
  singpassNav,
  singpassResources,
  singpassRoutes
} from 'features/authentication/singPass/nav'

import {
  personalInfoNav,
  personalInfoResources,
  personalInfoRoutes
} from 'features/authentication/personalInfo/nav'
import {
  registerEmailNav,
  registerEmailResources,
  registerEmailRoutes
} from 'features/authentication/registerEmail/nav'
import {
  registerPhoneNav,
  registerPhoneResources,
  registerPhoneRoutes
} from 'features/authentication/registerPhone/nav'
import {
  verificationEmailNav,
  verificationEmailResources,
  verificationEmailRoutes
} from 'features/authentication/verificationEmail/nav'
import {
  verificationPhoneNav,
  verificationPhoneResources,
  verificationPhoneRoutes
} from 'features/authentication/verificationPhone/nav'
import {
  forgotPasswordNav,
  forgotPasswordResources,
  forgotPasswordRoutes
} from 'features/authentication/forgotPassword/nav'
import {
  loginNav,
  loginResources,
  loginRoutes
} from 'features/authentication/login/nav'

import {
  loanRequestedNav,
  loanRequestedResources,
  loanRequestedRoutes
} from 'features/order/loanRequest/nav'

import {
  transactionsNav,
  transactionsResources,
  transactionsRoutes
} from 'features/order/transaction/nav'

import {
  registerNav,
  registerResources,
  registerRoutes
} from 'features/authentication/register/nav'
import { homeNav, homeResources, homeRoutes } from 'features/home/nav'

import {
  htmlBlockNav,
  htmlBlockResources,
  htmlBlockRoutes
} from 'features/htmlBlock/nav'

import {
  paymentConfirmationNav,
  paymentConfirmationResources,
  paymentConfirmationRoutes
} from 'features/paymentCreditCart/confirmation/nav'
import {
  paymentDetailsNav,
  paymentDetailsResources,
  paymentDetailsRoutes
} from 'features/paymentCreditCart/paymentDetail/nav'
import {
  paymentReceiptNav,
  paymentReceiptResources,
  paymentReceiptRoutes
} from 'features/paymentCreditCart/paymentReceipt/nav'
import {
  productNav,
  productResources,
  productRoutes
} from 'features/product/nav'
import {
  productDetailNav,
  productDetailResources,
  productDetailRoutes
} from 'features/productDetail/nav'
import {
  categoryNav,
  categoryRoutes,
  categoryResources
} from 'features/category/nav'

import { searchNav, searchRoutes, searchResources } from 'features/search/nav'
import {
  home40Nav,
  home40Routes,
  home40Resources
} from 'features/errorPage/nav'

import {
  changePasswordNav,
  changePasswordRoutes,
  changePasswordResources
} from 'features/userProfile/changePassword/nav'
import {
  userProNav,
  userProRoutes,
  userProResources
} from 'features/userProfile/navUserPro'
import {
  editProfileNav,
  editProfileRoutes,
  editProfileResources
} from 'features/userProfile/editProfile/nav'
import {
  orderApplyAffiliateNav,
  orderApplyAffiliateRoutes,
  orderApplyAffiliateResources
} from 'features/userProfile/orderApplyAffiliate/nav'
import {
  rentalSettingsNav,
  rentalSettingsRoutes,
  rentalSettingsResources
} from 'features/userProfile/rentalSettings/nav'

import { userNav, userResources, userRoutes } from 'features/user/nav'
import {
  buyProductNav,
  buyProductResources,
  buyProductRoutes
} from 'features/order/buyProduct/nav'
import { blogNav, blogResources, blogRoutes } from 'features/blog/nav'
import {
  businessNav,
  businessResources,
  businessRoutes
} from 'features/business/nav'

export const mainNav = [
  ...loginNav,
  ...registerNav,
  ...forgotPasswordNav,
  ...aboutUsNav,
  ...productNav,
  ...productDetailNav,
  ...htmlBlockNav,
  // ...locationNav,
  ...personalInfoNav,
  ...registerEmailNav,
  ...registerPhoneNav,
  ...verificationEmailNav,
  ...verificationPhoneNav,
  ...paymentConfirmationNav,
  ...paymentDetailsNav,
  ...paymentReceiptNav,

  ...home40Nav,
  ...categoryNav,
  ...searchNav,
  ...orderApplyAffiliateNav,
  ...userProNav,
  ...editProfileNav,
  ...changePasswordNav,
  ...rentalSettingsNav,
  ...singpassNav,
  ...userNav,

  ...buyProductNav,
  ...loanRequestedNav,
  ...transactionsNav,
  ...blogNav,
  ...businessNav,
  ...homeNav
]

export const routes = {
  ...loginRoutes,
  ...homeRoutes,
  ...registerRoutes,
  ...forgotPasswordRoutes,
  ...aboutUsRoutes,
  ...productRoutes,
  ...productDetailRoutes,
  ...htmlBlockRoutes,
  ...locationRoutes,
  ...personalInfoRoutes,
  ...registerEmailRoutes,
  ...registerPhoneRoutes,
  ...verificationEmailRoutes,
  ...verificationPhoneRoutes,
  ...paymentConfirmationRoutes,
  ...paymentDetailsRoutes,
  ...paymentReceiptRoutes,

  ...home40Routes,
  ...categoryRoutes,
  ...searchRoutes,
  ...orderApplyAffiliateRoutes,
  ...userProRoutes,
  ...editProfileRoutes,
  ...changePasswordRoutes,
  ...rentalSettingsRoutes,
  ...singpassRoutes,

  ...buyProductRoutes,
  ...userRoutes,
  ...loanRequestedRoutes,
  ...transactionsRoutes,
  ...businessRoutes,
  ...blogRoutes
}

console.log('routes......', routes)

export const resources = {
  //
  ...loginResources,
  ...homeResources,
  ...registerResources,
  ...forgotPasswordResources,
  ...aboutUsResources,

  // product
  ...productResources,
  ...productDetailResources,

  ...htmlBlockResources,
  ...locationResources,
  ...personalInfoResources,

  ...registerEmailResources,
  ...registerPhoneResources,
  ...verificationEmailResources,
  ...verificationPhoneResources,

  ...paymentConfirmationResources,
  ...paymentDetailsResources,
  ...paymentReceiptResources,

  ...home40Resources,
  ...categoryResources,
  ...searchResources,
  ...orderApplyAffiliateResources,
  ...userProResources,
  ...editProfileResources,
  ...changePasswordResources,
  ...rentalSettingsResources,
  ...singpassResources,
  ...userResources,
  ...loanRequestedResources,
  ...buyProductResources,
  ...transactionsResources,
  ...businessResources,
  ...blogResources
}
console.log('resources......', resources)
