import Button from 'antd/lib/button'
import { singPassImg } from 'constants/index'
import PropTypes from 'prop-types'
import React from 'react'
import ButtonNOA from './buttonNOA'
import ButtonSingPass from './buttonSingPass'
import Title from './title'
import { SINGPASS_PURPOSE } from 'constants/environments'

const Verification = ({
  onCancel,
  showTitle,
  redirectUrl,
  isNoa,
  forceUpdate,
  isTemporary
}) => {
  const listInfo = isNoa
    ? ['Notice of Assessment (Basic, Latest Year)']
    : [
        'Partial NRIC/FIN',
        'Principal Name',
        'Sex',
        'Race',
        'Date of Birth',
        'Nationality',
        'Registered Address',
        'Pass Type'
      ]

  return (
    <div className="pop-up">
      {showTitle ? <Title /> : null}
      <div className="text-center my-4">
        <img
          className="h-30 img-fluid"
          src={singPassImg}
          alt="Icon via SingPass"
        />
      </div>
      <p className="font-size-16 font-weight-bold text-left mb-4 singpass-color-verification">
        Singpass enables you to retrieve your personal data from relevant
        government agencies to pre-fill the relevant fields, making digital
        transactions faster and more convenient.
      </p>
      <p className="pop-up__content font-size-16 singpass-color-verification mb-4">
        This digital service is requesting the following information from
        Singpass, for the purpose of {SINGPASS_PURPOSE}.
      </p>

      <div className="mb-5 font-weight-bold text-left font-size-16 singpass-verification">
        {listInfo.map((info, index) => (
          <p className="font-size-16" key={index}>
            {info}
          </p>
        ))}
      </div>

      <div className="text-center">
        <div className="d-inline-block">
          <div className="mb-2">
            {isNoa ? (
              <ButtonNOA pathname={redirectUrl} forceUpdate={forceUpdate} />
            ) : (
              <ButtonSingPass
                pathname={redirectUrl}
                forceUpdate={forceUpdate}
                isTemporary={isTemporary}
              />
            )}
          </div>
          <Button
            size="large"
            onClick={onCancel}
            className="text-uppercase font-weight-bold ant-btn-block mb-3 benefits__skip-popup h-48"
          >
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  )
}

Verification.propTypes = {
  onCancel: PropTypes.func,
  showTitle: PropTypes.bool,
  redirectUrl: PropTypes.string
}

export default Verification
