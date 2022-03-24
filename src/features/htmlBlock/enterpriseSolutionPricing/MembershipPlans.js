import Divider from 'antd/lib/divider'
import classNames from 'classnames'
import CustomButton from 'components/Button/CustomButton'
import { WHATS_APP_LINK } from 'constants/index'
import numberExtensions from 'extensions/number'
import { withComponentSSR } from 'hocs/withComponentSSR'
import React from 'react'
// extensions
import {
  getMembershipPlans,
  useMembershipPlansSSR
} from 'reducers/htmlBlock/hook'

const MembershipPlans = () => {
  // const [membershipPlans, loadingMembershipPlans] = getMembershipPlans()
  // const membership =
  //   membershipPlans?.length > 0
  //     ? membershipPlans.map((value, index) => {
  //         const {
  //           name,
  //           isProtected,
  //           lendorProtectionPlan,
  //           isUnlimitProduct,
  //           limitProducts,
  //           isRentalDeposit,
  //           isCalendarManagement,
  //           isProductSearchPriority,
  //           isProductMigration,
  //           isMassProductUpload,
  //           isChangeQuantity,
  //           isFeature,
  //           allowCredit,
  //           isMinimumRentalDuration,
  //           isMinimumRentalNotice,
  //           isApplyPromoCodes,
  //           isOfflineToOnlineRentalKit,
  //           pricePerMonth,
  //           commissions,
  //           mediaValue,
  //           isAnnualPlan
  //         } = value
  //         const properties = []
  //         if (commissions === 0 || !commissions) {
  //           properties.push({ text: `No commissions` })
  //         } else {
  //           properties.push({ text: `${commissions}% commissions` })
  //         }
  //         if (isUnlimitProduct) {
  //           properties.push({ text: `Unlimited Products` })
  //         } else {
  //           properties.push({ text: `${limitProducts ?? 0} Products limit` })
  //         }
  //         if (isProductSearchPriority) {
  //           properties.push({ text: `Priority listing` })
  //         }
  //         if (isCalendarManagement) {
  //           properties.push({ text: `Calendar Management` })
  //         }
  //         if (!isChangeQuantity) {
  //           properties.push({ text: `Single quantity listings` })
  //         }
  //         if (lendorProtectionPlan > 0) {
  //           properties.push({
  //             text: `Lendor Protection Guarantee up to `,
  //             strongText: `${numberExtensions.showPrice(
  //               lendorProtectionPlan
  //             )}/year`
  //           })
  //         }
  //         if (allowCredit) {
  //           properties.push({ text: `Instant Booking (Credit Card)` })
  //         } else {
  //           properties.push({ text: `Cash Transaction Only` })
  //         }
  //         if (isMassProductUpload) {
  //           properties.push({
  //             text: `One-time Bulk product upload`
  //           })
  //         }
  //         if (isUnlimitProduct) {
  //           properties.push({
  //             text: `Multi-quantity listings`
  //           })
  //         }
  //         if (isMinimumRentalDuration) {
  //           properties.push({
  //             text: `Minimum rental duration`
  //           })
  //         }
  //         if (isMinimumRentalNotice) {
  //           properties.push({
  //             text: `Minimum rental notice`
  //           })
  //         }
  //         if (isApplyPromoCodes) {
  //           properties.push({
  //             text: `Apply promo codes`
  //           })
  //         }
  //         if (isOfflineToOnlineRentalKit) {
  //           properties.push({
  //             text: `Offline to online rental kit`
  //           })
  //         }
  //         if (mediaValue > 0) {
  //           properties.push({
  //             text: `Media value `,
  //             strongText: `${numberExtensions.showPrice(mediaValue)}`
  //           })
  //         }
  //         return (
  //           <div
  //             className={classNames(
  //               'col-lg-3 col-md-3 col-12 flex-1 position-relative pt-25',
  //               {
  //                 'enterprise-left ': index === 0,
  //                 'bg-color-yellow enterprise-main': isFeature,
  //                 'bg-color-secondary-v2 text-color-white ': !isProtected,
  //                 'bg-color-white': isProtected && !isFeature,
  //                 'enterprise-right ': index === 4
  //               }
  //             )}
  //           >
  //             <div className={isFeature ? `enterprise-main-child` : null}>
  //               <div className={`font-roboto`}>
  //                 {isAnnualPlan ? null : <div className={`hidden`} />}
  //                 {isAnnualPlan ? (
  //                   <div>
  //                     <strong>Annual Plan</strong>
  //                   </div>
  //                 ) : null}
  //                 <h1 className={!isProtected ? `text-color-white` : null}>
  //                   <strong>{name}</strong>
  //                 </h1>
  //                 <div className={`hidden`} />
  //                 <div>
  //                   <strong>
  //                     {pricePerMonth === 0 || !pricePerMonth
  //                       ? `FREE`
  //                       : `$${pricePerMonth}/MO`}
  //                   </strong>
  //                 </div>
  //               </div>
  //               <Divider
  //                 className={classNames({
  //                   'divider-color-1': !isProtected,
  //                   'divider-color-2': isProtected,
  //                   'divider-color-3': isFeature
  //                 })}
  //               />
  //               <ul
  //                 className={classNames(
  //                   `list-style-none pl-0 mb-20 list-enterprise px-20`
  //                 )}
  //               >
  //                 {properties?.length > 0
  //                   ? properties.map((item, index) => {
  //                       return (
  //                         <React.Fragment>
  //                           <li>
  //                             {item.text}
  //                             {item.strongText ? (
  //                               <strong>{item.strongText}</strong>
  //                             ) : null}
  //                           </li>
  //                         </React.Fragment>
  //                       )
  //                     })
  //                   : null}
  //               </ul>
  //               {isProtected ? (
  //                 <div>
  //                   <CustomButton
  //                     buttonType={
  //                       isFeature ? 'lendor-btn-gray' : 'btn-color-main-outline'
  //                     }
  //                     buttonClass="text-uppercase font-size-12 mb-2 btn-contact-us w-75 font-weight-bold"
  //                   >
  //                     <a href={'#'}>Contact us</a>
  //                   </CustomButton>
  //                 </div>
  //               ) : null}
  //             </div>
  //           </div>
  //         )
  //       })
  //     : null
  // return !loadingMembershipPlans ? membership : null

  return (
    <>
      <div
        className={`col-lg-4 col-md-4 col-12 bg-color-secondary-v2 text-color-white flex-1 position-relative pt-25 enterprise-left`}
      >
        <div className={`font-roboto text-center`}>
          <div className={`hidden`} />
          <h1 className={`text-color-white`}>
            <strong>Personal</strong>
          </h1>
          <div className={`hidden`} />
          <div className={`hidden`} />
          <div>
            <strong>FREE</strong>
          </div>
        </div>
        <Divider className={`divider-color-1`} />
        <ul className={`list-style-none pl-0 mb-20 list-enterprise px-20`}>
          <li>
            <i className="fa fa-check" /> No commissions
          </li>
          <li>
            <i className="fa fa-check" /> 10 Products limit
          </li>
          <li>
            <i className="fa fa-check" /> Single quantity listings
          </li>
          <li>
            <i className="fa fa-check" /> Cash Transaction Only
          </li>
        </ul>
      </div>
      <div
        className={`col-lg-4 col-md-4 col-12 bg-color-white flex-1 position-relative pt-25`}
      >
        <div className={`font-roboto text-center`}>
          <div className={`hidden`} />
          <h1>
            <strong>Premium</strong>
          </h1>
          <div className={`hidden`} />
          <div>
            <strong>FREE*</strong>
            <div>
              <strong>
                <s>$99/mth</s>
              </strong>
            </div>
          </div>
        </div>
        <Divider className={`divider-color-2`} />
        <ul className={`list-style-none pl-0 mb-20 list-enterprise px-20`}>
          <li>
            <i className="fa fa-check" /> 15% commissions
          </li>
          <li>
            <i className="fa fa-check" /> Unlimited Products
          </li>
          <li>
            <i className="fa fa-check" /> Multi-quantity listings
          </li>
          <li>
            <i className="fa fa-check" /> Instant Booking (Credit Card)
          </li>
          <li>
            <i className="fa fa-check" /> Lendor Protection Guarantee
          </li>
          <li>
            <i className="fa fa-check" /> SingPass MyInfo Verification
          </li>
          <li>
            <i className="fa fa-check" /> Premium tag
          </li>
          <li>
            <i className="fa fa-check" /> Priority listing
          </li>
          <li>
            <i className="fa fa-check" /> Minimum rental duration
          </li>
          <li>
            <i className="fa fa-check" /> Minimum rental notice
          </li>
          <li>
            <i className="fa fa-check" /> Apply promo codes
          </li>
          <li>
            <i className="fa fa-check" /> Offline-to-Online Rental Kit
          </li>
          <li>
            <i className="fa fa-check" /> <i>Try Now , Buy Later</i>
          </li>
        </ul>
        <div>
          <div
            className={`text-center list-style-none pl-0 mb-20 list-enterprise px-20`}
          >
            <span>*Monthly fees waived</span>
            <div>
              <span> until 31 Dec 2022</span>
            </div>
          </div>
          <CustomButton
            buttonType="btn-color-main-outline"
            buttonClass="text-uppercase font-size-12 mb-2 btn-contact-us w-75 font-weight-bold"
          >
            <a href={WHATS_APP_LINK} target='_blank'>Contact us</a>
          </CustomButton>
        </div>
      </div>
      <div
        className={`col-lg-4 col-md-4 col-12 bg-color-origin flex-1 position-relative pt-25 enterprise-right `}
      >
        <div className={`font-roboto text-center`}>
          <div>
            <strong>Annual Plan</strong>
          </div>
          <h1>
            <strong>BUSINESS</strong>
          </h1>
          <div className={`hidden`} />
          <div className={`hidden`} />
          <div>
            <strong>$149/MO</strong>
          </div>
        </div>
        <Divider className={`divider-color-3`} />
        <ul className={`list-style-none pl-0 mb-20 list-enterprise px-20`}>
          <li>
            <i className="fa fa-check" /> 5% commission
          </li>
          <li>
            <i className="fa fa-check" /> Unlimited Products
          </li>
          <li>
            <i className="fa fa-check" /> Multi-quantity listings
          </li>
          <li>
            <i className="fa fa-check" /> Instant Booking (Credit Card)
          </li>
          <li>
            <i className="fa fa-check" /> Lendor Protection Guarantee
          </li>
          <li>
            <i className="fa fa-check" /> SingPass MyInfo Verification
          </li>
          <li>
            <i className="fa fa-check" /> Premium & Preferred tag
          </li>
          <li>
            <i className="fa fa-check" /> VIP priority listing
          </li>
          <li>
            <i className="fa fa-check" /> Minimum rental duration
          </li>
          <li>
            <i className="fa fa-check" /> Minimum rental notice
          </li>
          <li>
            <i className="fa fa-check" /> Apply promo codes
          </li>
          <li>
            <i className="fa fa-check" /> Offline-to-Online Rental Kit
          </li>
          <li>
            <i className="fa fa-check" />
            <i>Try Now , Buy Later</i>
          </li>
          <li>
            <i className="fa fa-check" />
            <i> Lease to Own</i>
          </li>
          <li>
            <i className="fa fa-check" /> Enhanced LPG options
          </li>
          <li>
            <i className="fa fa-check" /> Priority flash sales & campaigns
          </li>
          <li>
            <i className="fa fa-check" /> Media kit $10,000
          </li>
        </ul>
        <div>
          <CustomButton
            buttonType="lendor-btn-gray"
            buttonClass="text-uppercase font-size-12 mb-2 btn-contact-us w-75 font-weight-bold"
          >
            <a href={WHATS_APP_LINK} target="_blank">
              Contact us
            </a>
          </CustomButton>
        </div>
      </div>
    </>
  )
}

export default withComponentSSR({
  frontLoad: 'membership-plans-ssr',
  fetchData: useMembershipPlansSSR
})(MembershipPlans)
