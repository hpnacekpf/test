import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import React from 'react'

import {
  lendorLendeeImg,
  personalDataImg,
  premiumImg,
  singPassImg
} from 'constants/index'
import { routes } from 'routes/mainNav'
import { useHistory } from 'react-router-dom'
import Title from './title'
import { useModal } from 'hooks/useModal'
import { REDUX_MODAL } from 'constants/enum'

const Benefits = ({
  onCancel,
  onVerify,
  showTitle,
  description,
  hideDescription,
  isPopup
}) => {
  const history = useHistory()

  const [, onCloseModal] = useModal()

  const feature = [
    {
      img: singPassImg,
      alt: 'Icon via SingPass',
      description: `Log in via ${isPopup ? '' : '\n'}SingPass`
    },
    {
      img: lendorLendeeImg,
      alt: 'Icon Lendor/Lendee',
      description: 'Identified Lendor/Lendee'
    },
    {
      img: personalDataImg,
      alt: 'Icon Personal Data',
      description: 'Verify your Personal Data'
    },
    {
      img: premiumImg,
      alt: 'Icon Premium',
      description: 'Rent from Premium user'
    }
  ]

  return (
    <div className="benefits text-center pt-3">
      {showTitle ? <Title /> : null}
      {hideDescription ? null : (
        <p className="font-size-16 singpass-color-description mb-5">
          {description ??
            'To be sure that you’re a real user, we need you to verify your identity through Myinfo via SingPass. '}
        </p>
      )}

      <div className="benefits__footer">
        <div className="row ">
          {feature.map((feature, index) => (
            <div
              key={index}
              className={classNames({
                'col-xl-6': isPopup,
                'col-xl-3': !isPopup
              })}
            >
              <div
                className={
                  isPopup ? 'singpass-feature__popup' : 'singpass-feature'
                }
              >
                <img
                  className="mb-3 img-fluid"
                  src={feature.img}
                  alt={feature.alt}
                />
              </div>
              <p
                className={classNames(' font-size-16', {
                  'mb-0': !isPopup
                })}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className={classNames(
          'd-flex benefits__content mb-3 justify-content-center',
          {
            'mt-5': !isPopup,
            'mt-3': isPopup
          }
        )}
      >
        <Icon type="lock" className="benefits__iconlock font-size-16" />
        <p className="font-size-16 singpass-color-description text-left ml-2">
          Your particulars will not be made public. The use, collection and
          disclosure of the information will be in accordance with our {''}
          <a
            className="privacy"
            onClick={() => {
              onCloseModal(REDUX_MODAL.SINGPASS)
              history.push(routes.PRIVACY_POLICY)
            }}
          >
            privacy policy{' '}
          </a>
        </p>
      </div>

      <div
        className={classNames('', {
          'btn-footer-singpass d-flex justify-content-between': isPopup,
          'btn-footer-singpass': !isPopup
        })}
      >
        <Button
          size="large"
          className={classNames(
            'text-uppercase font-weight-bold ant-btn-block mb-3',
            {
              'benefits__skip-popup mr-3': isPopup,
              'btn-color-main': !isPopup
            }
          )}
          onClick={() => {
            isPopup ? onCancel() : onVerify()
          }}
        >
          {isPopup ? ' CANCEL' : 'VERIFY NOW'}
        </Button>

        <Button
          size="large"
          className={classNames(
            'text-uppercase font-weight-bold ant-btn-block mb-3',
            {
              'benefits__skip-popup': !isPopup,
              'btn-color-main ml-3': isPopup
            }
          )}
          onClick={() => {
            isPopup ? onVerify() : onCancel()
          }}
        >
          {isPopup ? ' VERIFY NOW' : 'SKIP'}
        </Button>
      </div>
    </div>
  )
}

Benefits.propTypes = {
  onVerify: PropTypes.func,
  onCancel: PropTypes.func,
  showTitle: PropTypes.bool,
  description: PropTypes.string,
  hideDescription: PropTypes.bool
}
export default Benefits
