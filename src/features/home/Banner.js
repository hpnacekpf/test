import Alert from 'antd/lib/alert'
import Carousel from 'antd/lib/carousel'
import Icon from 'antd/lib/icon'
import classNames from 'classnames'
import { SampleNexArrow, SamplePrevArrow } from 'components/Arrow'
// components
import SkeletonBanner from 'components/Skeleton/SkeletonBanner'
import enumType from 'constants/enumType'
// constants
import { DEFAULT_HEIGHT_BANNER, DEFAULT_WIDTH_BANNER } from 'constants/index'
// utils
import { getPreviewImage } from 'extensions/image'
import { withComponentSSR } from 'hocs/withComponentSSR'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
//hook
import { useBanner, useBannerSSR } from 'reducers/home/hook'
import { useGetSingPass, useGetUserState } from 'reducers/user/hook'
import { routes } from 'routes/mainNav'
import LendorOfBusiness from './LendorOfBusiness'
import { useSearchParam } from 'react-use'
import { USING_SAME_SINGPASS } from 'constants/string'

const MessageAlertHome = () => {
  return (
    <span>
      Due to the current Covid-19 situation, we advise Lendors and Lendees to
      take additional precautions.{` `}
      <Link to={routes.COVID_ADVISORY}>
        <u className="text-color-primary-v1">Click here for more info.</u>
      </Link>
    </span>
  )
}

const MessageLateFeeAlert = () => {
  return (
    <span className="text-color-white font-weight-bold">
      Note: you have an outstanding payment to be made.{` `}
      <Link to={routes.TRANSACTIONS}>
        <u className="text-color-white font-weight-bold">Click here</u>
      </Link>
      {` `}to view
    </span>
  )
}

const MessageSingPassAlert = () => {
  return (
    <div className="d-flex">
      <Icon
        type="exclamation-circle"
        theme="filled"
        className="singpass-icon-error"
      />
      <div className="error__message-text error__message-text-popup ml-3">
        <p className={'mb-0 font-size-16'}>
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

const Banner = (props) => {
  const { isMobile } = props

  const singpass = useGetSingPass()

  const spCode = useSearchParam('sp-code')

  const [hideError, setHideError] = useState(false)

  const showErrorSingpass =
    singpass && singpass?.error === USING_SAME_SINGPASS && spCode

  useEffect(
    () => {
      if (showErrorSingpass) {
        setTimeout(() => {
          setHideError(true)
        }, 5000)
      }
    },
    [singpass]
  )

  const [banner, isLoading] = useBanner()

  if (isLoading) return <SkeletonBanner />

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNexArrow />
  }

  return (
    <div className="p-0 home-banner">
      {/* <Alert
        message={<MessageLateFeeAlert />}
        className="font-size-14 alert-lateFee text-center "
      /> */}
      {/* <Alert
        message={<MessageAlertHome />}
        type="warning"
        banner
        closable
        showIcon
        className="font-size-14 alert-covid19"
      /> */}

      {showErrorSingpass ? (
        <Alert
          id="singPassAlert"
          message={<MessageSingPassAlert />}
          className={classNames(
            `px-3 py-4 align-items-start singpass-error-message text-left `,
            {
              'hide-error-singpass': hideError
            }
          )}
        />
      ) : null}

      {banner ? (
        <Carousel
          centerMode={true}
          centerPadding="0px"
          autoplay={true}
          effect="scrollx"
          dots={true}
          arrows
          pauseOnHover={true}
          pauseOnFocus={true}
          {...settings}
        >
          {(banner.banner ?? []).map((item, index) => {
            return (
              <div key={index}>
                {item.codeEmbed ? (
                  <div
                    className={'player-wrapper'}
                    style={{
                      backgroundImage: `url( ${getPreviewImage({
                        autoSize: true,
                        fileName: item.image,
                        imagePath: enumType.imagePath.Banner,
                        width: DEFAULT_WIDTH_BANNER,
                        height: DEFAULT_HEIGHT_BANNER
                      })})`,
                      backgroundSize: 'cover'
                    }}
                  >
                    <a href={item.url} target="_blank">
                      <ReactPlayer
                        className="react-player"
                        url={item.codeEmbed ? item.codeEmbed : null}
                        width={`${63 + 1 / 3}%`}
                        height="100%"
                        config={{
                          youtube: {
                            origin: process.env.RAZZLE_APP_DOMAIN
                          }
                        }}
                      />
                    </a>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="position-relative d-flex justify-content-center align-items-center "
                  >
                    <a href={item.url ? item.url : null} target="_blank">
                      <img
                        src={`${getPreviewImage({
                          autoSize: true,
                          fileName: item.image,
                          imagePath: enumType.imagePath.Banner,
                          width: DEFAULT_WIDTH_BANNER,
                          height: DEFAULT_HEIGHT_BANNER
                        })}`}
                        className="slide-without-player  mx-auto img-fluid img-wrapper"
                      />
                    </a>
                  </div>
                )}
              </div>
            )
          })}
        </Carousel>
      ) : null}

      {isMobile ? <LendorOfBusiness /> : null}
    </div>
  )
}

export default withComponentSSR({
  frontLoad: 'banner-ssr',
  fetchData: useBannerSSR
})(Banner)

//export default Banner
