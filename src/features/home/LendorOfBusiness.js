import { Button, Col, Row } from 'antd'
import { DESKTOPS_IMG, LAPTOPS_IMG } from 'constants/index'
import React from 'react'
import { useHistory } from 'react-router'

const BusinessImages = ({ image, title }) => {
  return (
    <div className="col-6 p-1">
      <div className="text-center">
        <div className="shadow p-1 mb-2 bg-white border-radius-11 justify-content-center">
          <img src={image} alt="fluid" className="img-fluid" />
        </div>
        <div>
          <strong className="step-title font-size-16">{title}</strong>
        </div>
      </div>
    </div>
  )
}

const LendorOfBusiness = (props) => {
  const history = useHistory()
  const handClick = () => {
    history.push('/business')
  }

  const businessImage = [
    {
      image: LAPTOPS_IMG,
      title: 'Laptops'
    },
    {
      image: DESKTOPS_IMG,
      title: 'Desktops'
    }
  ]
  return (
    <div className="utils__content pb-0">
      <div className="row">
        <div className="col-lg-12">
          <div className={'card card-shadow bg-color-primary mb-40'}>
            <div className="card-body p-1">
              <Row>
                <Col span={12}>
                  <div className="m-4">
                    <div className="font-size-18 mb-3">
                      <strong>Lendor for Business</strong>
                    </div>

                    <div className="font-size-14 w-100 mb-3">
                      <span>
                        Rent the latest tech hassle-free and supercharge your
                        business growth!
                      </span>
                    </div>

                    <Button
                      onClick={handClick}
                      className="border-radius-11 text-color-primary-v1 shadow bg-white border-0 "
                    >
                      <strong>Find Out More</strong>
                    </Button>
                  </div>
                </Col>

                <Col span={12} className="my-5 d-flex">
                  {businessImage.map((item, index) => {
                    return (
                      <BusinessImages image={item.image} title={item.title} />
                    )
                  })}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LendorOfBusiness
