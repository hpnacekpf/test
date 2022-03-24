import React from 'react'
import { highvalueImg } from '../../../constants'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { useModal } from 'hooks/useModal'
import { REDUX_MODAL } from 'constants/enum'
import { routes } from 'routes/mainNav'

const Assessment = ({ onCancel, onVerify, hideDescription, description }) => {
  const history = useHistory()
  const [, onCloseModal] = useModal()

  return (
    <div className="assessment">
      <div className="assessment__title text-center font-size-26">
        <h3>NOTICE OF ASSESSMENT - MYINFO</h3>
        <hr />
      </div>
      <div className="assessment__content text-center">
        {hideDescription ? null : (
          <p className="font-size-16">
            {description ?? (
              <span>
                This is a high value item. To rent this item, please allow
                Lendor to <br />
                assess your Notice of Assessment (Basic, Latest Year) through
                Myinfo via Singpass.{' '}
              </span>
            )}
          </p>
        )}
        <img
          src={highvalueImg}
          alt=""
          className="assessment__content-img mb-5"
        />
      </div>
      <div className="d-flex benefits__content mb-3 justify-content-center">
        <Icon type="lock" className="benefits__iconlock font-size-16" />
        <p className="font-size-16 singpass-color-description text-left ml-2">
          Your particulars will not be made public. The use, collection and
          disclosure of the information will be in accordance with our {''}
          <a
            className="privacy"
            onClick={() => {
              onCloseModal(REDUX_MODAL.NOA)
              history.push(routes.PRIVACY_POLICY)
            }}
          >
            privacy policy{' '}
          </a>
        </p>
      </div>

      <div className="btn-footer-singpass d-flex justify-content-between">
        <Button
          size="large"
          className={classNames(
            'text-uppercase font-weight-bold ant-btn-block mb-3 benefits__skip-popup mr-3'
          )}
          onClick={() => {
            onCancel()
          }}
        >
          CANCEL
        </Button>

        <Button
          size="large"
          className={classNames(
            'text-uppercase font-weight-bold ant-btn-block mb-3 btn-color-main ml-3'
          )}
          onClick={() => {
            onVerify()
          }}
        >
          VERIFY NOW
        </Button>
      </div>
    </div>
  )
}

export default Assessment
