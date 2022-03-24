import React from 'react'
import { logoIgloo } from 'constants/index'
import classNames from 'classnames'

const IglooInsurance = ({ customClass }) => (
  <div
    className={classNames(
      'mx-4',
      {
        'px-3': !customClass
      },
      customClass
    )}
  >
    Powered by<img className="logo-payment ml-2" src={logoIgloo} alt="Igloo" />
  </div>
)

export default IglooInsurance
