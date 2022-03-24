import React from 'react'
import Icon from 'antd/lib/icon'
import classNames from 'classnames'

const ErrorMessageSingPass = ({ isPopUp }) => {
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
            'font-size-22': !isPopUp
          })}
        >
          <strong>Note:</strong> We are unable to retrieve your information from
          Singpass. Click here to proceed with your application.
        </p>
      </div>
    </div>
  )
}

export default ErrorMessageSingPass
