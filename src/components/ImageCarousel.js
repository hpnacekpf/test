import React, { Fragment, useState, useEffect, useRef } from 'react'
import Carousel from 'antd/lib/carousel'
import { withRouter } from 'react-router'
import Slider from 'react-slick'
// Constants
import { DEFAULT_IMAGES_PRODUCT } from 'constants/index';
// Utils
import { getUrlImageProduct } from 'extensions/image'
// Components
import Heart from './Product/Heart'

const ImageCarousel = (props) => {
  const [imgActiveStatus, setImgActive] = useState([])

  const [clientXonMouseDown, setClientXonMouseDown] = useState(null)
  const [clientYonMouseDown, setClientYonMouseDown] = useState(null)

  const { images } = props

  const slider = useRef(null)

  useEffect(() => {
    generateImgStatus()
  }, [])

  const generateImgStatus = () => {
    images.forEach((img, index) => {
      imgActiveStatus[index] = 'not-active'
      if (index === 0) {
        imgActiveStatus[0] = 'active'
      }
    })
  }

  const setActiveImg = (imgNumber) => {
    imgActiveStatus.forEach((imgStatus, index) => {
      imgActiveStatus[index] = 'not-active'
      if (imgNumber === index) {
        imgActiveStatus[index] = 'active'
      }
    })
    setImgActive(imgActiveStatus)
  }

  const handleOnMouseDown = (e) => {
    setClientYonMouseDown(e.clientY)
    setClientXonMouseDown(e.clientX)
    e.preventDefault() // stops weird link dragging effect
  }

  const settings = {
    dots: false,
    infinite: true,
    draggable: true,
    speed: 500,
    slidesToShow: Math.min(images.length, DEFAULT_IMAGES_PRODUCT)
  }

  return (
    <Fragment>
      <div className="productDetails__item rounded-0">
        <div className="productDetails__item__img">
          <Heart />
          <Carousel ref={slider} autoplay={false} dots={false} effect="fade">
            {images &&
              images.length > 0 &&
              images.map((image, index) => (
                <div key={index}>
                  <img
                    className="productDetails__item__img-item"
                    src={getUrlImageProduct(image)}
                    alt="product-details"
                  />
                </div>
              ))}
          </Carousel>
        </div>
      </div>
      <div className="productDetails__photos slide-product-detail">
        <Slider {...settings}>
          {images &&
            images.length > 0 &&
            images.map((image, index) => (
              <div
                key={index}
                onClick={(e) => {
                  if (
                    clientXonMouseDown === e.clientX ||
                    clientYonMouseDown === e.clientY
                  ) {
                    slider.current.slick.innerSlider.slickGoTo(index)
                    setActiveImg(index)
                    e.preventDefault()
                  }
                }}
                className={
                  imgActiveStatus[index] === 'active'
                    ? 'productDetails__photos-item productDetails__photos-item--active'
                    : 'productDetails__photos-item'
                }
                onMouseDown={handleOnMouseDown}
              >
                <img src={getUrlImageProduct(image)} alt="product-details" />
              </div>
            ))}
        </Slider>
      </div>
    </Fragment>
  )
}

export default withRouter(ImageCarousel)
