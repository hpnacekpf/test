import React from 'react'
import notification from 'antd/lib/notification'
import { WhatsappIcon } from 'react-share'
import { GoogleTrackEvent, WHATS_APP_LINK } from 'constants/index'
import { Royce2 } from 'constants/image'
import { htmlParse } from 'extensions/html'
import { isServer } from '../../utils/client-api'
import GoogleTags from '../GA/GoogleTags'

const ButtonWhatsApp = () => {
  const openNotification = () => {
    const onClickStartChat = (e) => {
      e.preventDefault()
      //google tags
      GoogleTags.trackEvent([{ event: GoogleTrackEvent.Contact }])
      if (!isServer) {
        window.open(WHATS_APP_LINK, '_blank')
      }
    }

    notification.destroy()
    notification.open({
      style: { marginRight: 0 },
      className: 'notification-feed',
      duration: 0,
      bottom: 80,
      placement: 'bottomRight',
      getContainer: () => document.body,
      onClose: () => {
        notification.destroy()
      },
      description: (
        <div>
          <div className="mb__20">
            <div className={'feedback-header text__divider'}>
              <div className="d-flex align-items-center">
                <div
                  className={
                    'd-flex align-items-center avatar avatar--50 justify-content-center'
                  }
                >
                  <img src={Royce2} alt="User" className={'avatar-whats-app'} />
                </div>
                <div className={`feedback-header-infor`}>
                  <div className={'feedback-header-infor-name'}>Royce</div>
                  <div className={'feedback-header-infor-answerTime'}>
                    Typically replies within a day
                  </div>
                </div>
              </div>
            </div>
            <div className={'feedback-body'}>
              <div className={'feedback-message-container'}>
                <div className="feedback__dots">
                  <div className="feedback__dots__inner">
                    <div className="feedback__dots__item" />
                    <div className="feedback__dots__item" />
                    <div className="feedback__dots__item" />
                  </div>
                </div>
                <div className="feedback__message">
                  <div className="feedback__author">Royce</div>
                  <div className="feedback__text">
                    {htmlParse(
                      `Thank you for contacting Lendor! Unable to find what you need🏑🥊🥋? Or facing some difficulties🤔 using our website? Please let us know how we can help you💁🏻. Our Team will be with you asap🕐!`
                    )}
                  </div>
                  <div className="feedback__time">18:44</div>
                </div>
              </div>
            </div>

            <a
              id="btn-start-whatsapp"
              className={'feedback-footer'}
              role="button"
              onClick={onClickStartChat}
              target={'_blank'}
            >
              <WhatsappIcon
                size={20}
                round={true}
                bgStyle={{ fill: '#4fce5d' }}
              />{' '}
              Start Chat
            </a>
          </div>
        </div>
      )
    })
  }

  return (
    <div>
      <a
        onClick={openNotification}
        className={'btn-whatsapp'}
        id={'myMessageContainer'}
      >
        <WhatsappIcon size={60} round={true} />
      </a>
    </div>
  )
}

export default ButtonWhatsApp
