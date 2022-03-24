import React from 'react'
import Icon from 'antd/lib/icon'
import classNames from 'classnames'

const ErrorUsingSameSingPass = ({ isPopUp }) => {
  return (
    <div
      className={classNames(
        'd-flex px-3 py-4 align-items-start singpass-error-message text-left',
        {
          'mb-5': isPopUp,
          'mb-3': !isPopUp
        }
      )}
    >
      <Icon
        type="exclamation-circle"
        theme="filled"
        className="singpass-icon-error"
      />
      <div className="error__message-text error__message-text-popup ml-3">
        <p
          className={classNames('mb-0', {
            'font-size-16': isPopUp,
            'font-size-18': !isPopUp
          })}
        >
          <strong>Note:</strong>{' '}
          <>
            An account has already been verified using the same Singpass
            information. Please get in touch with{' '}
            <strong>
              <a
                className="text-color-black-v3"
                href="mailto:contact@lendor.co"
              >
                contact@lendor.co
              </a>
            </strong>{' '}
            for assistance.{' '}
          </>
        </p>
      </div>
    </div>
  )
}

export default ErrorUsingSameSingPass
