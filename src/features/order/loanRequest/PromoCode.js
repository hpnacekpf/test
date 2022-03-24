import React, { useState } from 'react'
import Input from 'antd/lib/input'
// components
import CustomButton from 'components/Button/CustomButton'
import className from 'classnames'
import Feature from 'components/Feature'
import { isUserProtected } from 'extensions/user'
import { useVerifyPromo } from 'reducers/order/hook'

const PromoCode = ({ values, handleApplyPromo, icon, allowPromoCode }) => {
  const { orderId, promo, discountWithPromo, product } = values

  const [onVerify] = useVerifyPromo()

  const [promoCode, setPromoCode] = useState(values.promo?.code ?? '')

  const handlePromoCode = () => {
    onVerify({
      code: promoCode,
      productId: product?._id,
      onSuccess: handleApplyPromo
    })
  }

  return (
    <div className={className({ 'd-flex align-items-center': promo })}>
      {orderId && promo?.code ? (
        <div>
          <h3
            className={`font-size-18 font-weight-bold text__main mr-auto font-roboto`}
          >
            <div className={`d-flex align-items-center`}>
              <Feature header="Promo Code:" icon={icon} />
              <span className={`text-success ml-2`}>
                {promo ? promo.code || '' : ''}
              </span>
            </div>
          </h3>
          <div className={`font-italic`}>{`$${discountWithPromo?.toFixed(
            2
          )} off`}</div>
        </div>
      ) : null}

      {orderId ? (
        discountWithPromo && discountWithPromo > 0 ? (
          <p className={`font-size-18 text__main mb-0`}>
            {/* valid code { `$${ discountPromo.toFixed (2) }` } off */}
          </p>
        ) : null
      ) : isUserProtected(product?.user) || allowPromoCode ? (
        <div className={`custom-promo-code ${promo ? 'success' : ''}`}>
          <div className="my-4" />
          <Feature header="Promo Code" icon={icon} />
          <div className="ant-input-group-wrapper d-flex justify-content-around">
            <div
              className={`ant-input-wrapper rounded flex-auto position-relative`}
            >
              <Input
                name={`promoCode`}
                disabled={!!promo}
                placeholder="Enter promo code here if any.."
                className={className(
                  {
                    'bg-color-applied': promo
                  },
                  `ant-input border`
                )}
                onChange={(code) => setPromoCode(code.target.value)}
                //  onBlur={() => setFieldTouched('promoCode', true)}
                onPressEnter={handlePromoCode}
                defaultValue={promo?.code}
              />
              <div
                className={className(
                  {
                    'd-none': !promo
                  },
                  `btn-remove-promo`
                )}
                onClick={() => {
                  handleApplyPromo(null)
                }}
              >
                <i className="fa fa-times-circle fa-lg" aria-hidden="true" />
              </div>
            </div>
            <CustomButton
              disabled={!promoCode?.trim()}
              type="link"
              htmlType={'button'}
              handleClick={handlePromoCode}
              buttonType="btn-color-grey"
              buttonClass="btn-large text-uppercase infoCard__title rounded-left-0 z-2"
            >
              {promo ? 'CODE APPLIED' : 'Apply'}
            </CustomButton>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default PromoCode
