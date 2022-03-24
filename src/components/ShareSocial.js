import React from 'react'
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share'
import { 
  FACEBOOK_ICON, 
  WIDTH_SHARE_BUTTON, 
  SHARE_ICON, 
  MESSENGER_ICON, 
  TWITTER_ICON, 
  TELEGRAM_ICON, 
  WHATSAPP_ICON, 
  LINKEDIN_ICON 
} from 'constants/index';

const ButtonShare = ({icon, customWidth, customClassName}) => {
  return(
    <span className={`mr-2 ${customClassName}`}>
      <img 
        src={icon} 
        alt={'social-icon'}
        style={{ width: customWidth ? customWidth : WIDTH_SHARE_BUTTON }}
      />
    </span>
  )
}

const ShareSocial = (props) => {
  const { className } = props
  return (
    <div className={`my-2 d-flex align-items-center ${className}`}>
      <div className={`icon-social-sharing`}>
        <ButtonShare 
          icon={SHARE_ICON}
          customWidth={40}
          customClassName={`toggle`}
        />
        <span className={`social-item`}>
          <FacebookShareButton
            url={props.url}
            quote={props.quote || null}
          >
            <ButtonShare
              icon={FACEBOOK_ICON}
            />
          </FacebookShareButton>
          <FacebookMessengerShareButton
            url={props.url}
          >
          <ButtonShare
              icon={MESSENGER_ICON}
            />
          </FacebookMessengerShareButton>
          <TwitterShareButton
            url={props.url}
          >
            <ButtonShare
              icon={TWITTER_ICON}
            />
          </TwitterShareButton>
          <TelegramShareButton
            url={props.url}
          >
            <ButtonShare
              icon={TELEGRAM_ICON}
            />
          </TelegramShareButton>
          <WhatsappShareButton
            url={props.url}
          >
            <ButtonShare
              icon={WHATSAPP_ICON}
            />
          </WhatsappShareButton>
          <LinkedinShareButton
            url={props.url}
          >
            <ButtonShare
              icon={LINKEDIN_ICON}
            />
          </LinkedinShareButton> 
        </span>
      </div>
    </div>
  )
}
export default ShareSocial