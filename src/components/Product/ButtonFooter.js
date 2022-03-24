import React, { useState } from 'react'
import ButtonChat from '../Button/ButtonChat'
import classNames from 'classnames'
import { isServer } from 'utils/client-api'
import ButtonPermission from '../Button/ButtonPermission'
import { isUserProtected } from 'extensions/user'

/**
 * Button footer
 * @param productId
 * @param handleDeal
 * @returns {*}
 * @constructor
 */
// const [visible, setVisible] = useState(false)

const ButtonFooter = ({
  product,
  chatWithUser,
  ownerProduct,
  disabled,
  handleDeal,
  location,
  className
}) => {
  const [btnIsFixed, setBtnIsFixed] = useState(true)

  const btnMobileClass = 'btn-footer-mobile'

  if (!isServer) {
    if (!ownerProduct) {
      window.onscroll = () => {
        if (className === btnMobileClass) {
          const bodyPos = document.querySelector('.card')
          const btnPos = document.querySelector(`.${btnMobileClass}`)
          if (bodyPos && btnPos) {
            setBtnIsFixed(
              !(
                window.pageYOffset >=
                bodyPos.offsetTop +
                  bodyPos.offsetHeight +
                  btnPos.offsetHeight -
                  screen.height
              )
            )
          }
        }
      }
    }
  }

  const checkSingPass = isUserProtected(product?.user)

  return ownerProduct ? null : (
    <div
      className={classNames(
        {
          'position-fixed': btnIsFixed && className === btnMobileClass,
          'position-unset': !btnIsFixed
        },
        `d-flex flex-md-row flex-column justify-content-between ${className}`
      )}
    >
      <ButtonChat
        toUser={chatWithUser}
        product={product}
        buttonClass={`text-uppercase infoCard__title d-block my-4 w-100 mr-4 btn-chat-now ${className}-chat`}
        location={location}
      >
        Chat Now
      </ButtonChat>
      <ButtonPermission
        allowSkip={false}
        checkSingpass={checkSingPass}
        handleClick={handleDeal}
        disabled={!!disabled}
        buttonType="btn-color-main"
        buttonClass={`text-uppercase infoCard__title my-4 w-100 btn-deal ${className}-deal`}
      >
        RENT NOW
      </ButtonPermission>
    </div>
  )
}

export default ButtonFooter
