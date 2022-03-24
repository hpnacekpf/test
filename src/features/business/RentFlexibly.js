// components
import { Button, Card, Col, Row } from 'antd'
import React from 'react'
import CustomButton from 'components/Button/CustomButton'

import classNames from 'classnames'
import { MAP_IMG } from 'constants/index'
import { REDUX_MODAL } from '../../constants/enum'
import { useModal } from 'hooks/useModal'
import Title from '../../components/Title'

const MapImage = ({ isMobile }) => {
  return (
    <div
      className={classNames(
        {
          'p-0 text-center': isMobile,
          'pl-4 text-right': !isMobile
        },
        'bg-white business-area--image ml-auto'
      )}
    >
      <img src={MAP_IMG} alt="" className="img-fluid" />
    </div>
  )
}

const RentFlexibly = (props) => {
  const { isMobile } = props

  const [openModalRedux] = useModal()

  const handleClick = () => {
    openModalRedux(REDUX_MODAL.LENDOR_FOR_BUSINESS)
  }

  return (
    <div className="utils__content custom-category">
      <div className={'card card-shadow'}>
        <div className="row">
          <div className="col-md-6">
            <div className={classNames('text-center text-md-left')}>
              <div className="card-body pb-0">
                <h2 className="lendor-color-primary-v1 font-cabin font-weight-bold font-size-24 text-center text-md-left">
                  Rent flexibly in Singapore & the APAC region
                </h2>
                <p className={classNames('w-100 business-area--description')}>
                  Register now as a business customer and rent tech in
                  Singapore, India, Malaysia and Thailand.
                </p>
              </div>
              <div className="d-block d-md-none">
                <MapImage isMobile={isMobile} />
              </div>

              <div className="card-body">
                <CustomButton
                  handleClick={handleClick}
                  buttonType="btn-color-red"
                  buttonClass={classNames(
                    {
                      'btn-xlarge': !isMobile,
                      'mt-4': isMobile
                    },
                    'btn-large text-uppercase font-weight-bold'
                  )}
                >
                  Talk With Us
                </CustomButton>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-none d-md-block">
            <div className="card-body">
              <MapImage />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RentFlexibly
