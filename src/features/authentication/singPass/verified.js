import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { singPassImg } from 'constants/index'
import Icon from 'antd/lib/icon'
import numberExtensions from 'extensions/number'
import { isInvalidNOA } from 'extensions/user'
import { encryptFieldValue } from 'extensions/crypto'

const Verified = ({ singpass, isPopup, noa }) => {
  const infoClassName = classNames('verified-content-text font-size-16', {
    'text-left': !!isPopup
  })

  const isInvalid = isInvalidNOA({
    noaInfo: encryptFieldValue(noa)
  })

  return (
    <div className="identity identity-verified">
      <div className="verified__icon text-center">
        <Icon type="check-circle" theme="filled" />
      </div>
      <div className="text-center">
        <img src={singPassImg} className="img-fluid h-30" alt="logo singpass" />
      </div>
      {singpass ? (
        <div className="verified__content">
          <div className={infoClassName}>
            <p>Partial NRIC/FIN</p>
            <p>{singpass.partialuinfin}</p>
          </div>
          <div className={infoClassName}>
            <p>Principal Name</p>
            <p>{singpass.name}</p>
          </div>
          <div className={infoClassName}>
            <p>Sex</p>
            <p>{singpass.sex}</p>
          </div>
          <div className={infoClassName}>
            <p>Race</p>
            <p>{singpass.race}</p>
          </div>
          <div className={infoClassName}>
            <p>Date of Birth</p>
            <p>{singpass.dob}</p>
          </div>
          <div className={infoClassName}>
            <p>Nationality</p>
            <p>{singpass.nationality}</p>
          </div>
          <div className={infoClassName}>
            <p>Registered Address</p>
            <p>{singpass.regadd}</p>
          </div>
          <div className={infoClassName}>
            <p>Pass Type</p>
            <p>{singpass.passtype}</p>
          </div>
        </div>
      ) : null}
      {noa ? (
        <div className="verified__content">
          <div className={infoClassName}>
            <p>
              Notice of Assessment (Basic,{' '}
              {isInvalid ? noa.yearOfAssessment ?? '-' : 'Latest Year'})
            </p>
            <p>
              {noa.amount ? numberExtensions.showFormatPrice(noa.amount) : '-'}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

Verified.propTypes = {
  singpass: PropTypes.any,
  isPopup: PropTypes.bool
}

export default Verified
