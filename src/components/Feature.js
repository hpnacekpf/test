import React from 'react'
import { Link } from 'react-router-dom'
import className from 'classnames'
import IconFeature from './IconFeature'

const Feature = ({
  header,
  children,
  frameCss,
  icon,
  subTitle,
  linkTo,
  disableSubTitle,
  onClickSubTitle,
  defaultIconSize,
  customClass
}) => (
  <div className={className('productDetails__descr mt-0', frameCss)}>
    {header && (
      <div
        className={className(
          {
            'd-flex feature mt-10 mb-3 align-items-center': !customClass
          },
          customClass
        )}
      >
        {icon ? (
          <IconFeature icon={icon} defaultIconSize={defaultIconSize} />
        ) : null}
        <h3 className="font-size-18 font-weight-bold text__main mb-0">
          <span
            className={className(
              {
                'align-middle': icon
              },
              `font-roboto`
            )}
          >
            {header}
          </span>
        </h3>
        {disableSubTitle ? null : subTitle ? (
          onClickSubTitle ? (
            <a className="ml-3 link" onClick={onClickSubTitle}>
              <p>{subTitle}</p>
            </a>
          ) : (
            <Link className="ml-3 link" to={linkTo}>
              <p>{subTitle}</p>
            </Link>
          )
        ) : null}
      </div>
    )}
    {children}
  </div>
)
export default Feature
