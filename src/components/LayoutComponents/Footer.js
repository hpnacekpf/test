import className from 'classnames'
import {
  APP_STORE_ICON,
  APP_STORE_LINK,
  DefaultImage,
  DefaultLogoLendorImg,
  DEFAULT_LIMIT_TRENDING,
  GOOGLE_PLAY_ICON,
  GOOGLE_PLAY_LINK
} from 'constants/index'
// Constant
import { menuFooter } from 'constants/menu/menuFooter'
import { isEqual } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { usePrevious } from 'react-use'
import { useGetLeafCategory } from 'reducers/category/hook'
import { routes } from 'routes/mainNav'

const generateLinkRedirect = (menu) => {
  if (menu.url) {
    return <Link to={menu.url}>{menu.title}</Link>
  }
  if (menu.otherUrl) {
    return (
      <a href={menu.otherUrl} target={'_blank'}>
        {menu.title}
      </a>
    )
  }
  return menu.title
}

const FooterColumn = ({ header, children }) => (
  <div
    className={className({
      'footer-menu-item': header
    })}
  >
    <p
      className={className(
        {
          'footer-terms': !header
        },
        `footer-menu-item-title font-roboto text-color-primary-v2`
      )}
    >
      {header || <span>&nbsp;</span>}
    </p>
    <ul
      className={className(
        {
          'mb-0': !header
        },
        `line-height__1 list-unstyled`
      )}
    >
      {children.map((item, index) => (
        <li
          className="font-cabin font-size-16 mb-15 footer-menu-item-link cursor-pointer"
          key={index}
        >
          {generateLinkRedirect(item)}
        </li>
      ))}
    </ul>
  </div>
)

const Footer = () => {
  const [trending, setTrending] = useState([])
  const categories = useSelector(useGetLeafCategory(), isEqual)

  const previousCategory = usePrevious(categories)

  useEffect(
    () => {
      if (!isEqual(previousCategory, categories)) {
        onResetTrending()
      }
    },
    [categories]
  )

  const onResetTrending = () => {
    const trending = [
      {
        title: 'Blog',
        key: 'Blog',
        url: routes.BLOG
      }
    ]

    if (categories.length > 0) {
      const trendingCategory = categories
        .filter((category) => category.isTrending)
        .sort(
          (first, second) => first.trendingPosition - second.trendingPosition
        )
        .slice(0, DEFAULT_LIMIT_TRENDING)
        .map((category) => ({
          title: category.name,
          url: `/category/${category.slug}`
        }))
      trending.push(...trendingCategory)
    }

    setTrending(trending)
  }

  const footer = menuFooter(trending)
  const year = new Date().getFullYear()
  return (
    <div className="utils__content footer-main">
      <div className="footer m-0 rounded-0 text__footer bg-color-footer text-color-footer border-top-0 pb-0">
        <div className="footer-menu height-content-footer">
          {footer.map((column, index) => (
            <FooterColumn
              header={column.header}
              children={column.children}
              key={index}
            />
          ))}
        </div>

        <div className="footer-divider" />
        <div className="footer-link py-4 d-flex align-items-center">
          <div className="footer-link-store d-flex col-sm-7 flex-column">
            <div className={`mb-3`}>
              All Rights Reserved. Linear to Circular Pte. Ltd. 2020-{year}
            </div>
            <div className={`d-flex align-items-center btn-lendor-app`}>
              <div className={`cursor-pointer`}>
                <img
                  alt="app-store"
                  src={APP_STORE_ICON}
                  className={`btn-lendor-app-store mr-2`}
                  onClick={() => {
                    window.location.href = APP_STORE_LINK
                  }}
                />
              </div>
              <div className={`cursor-pointer`}>
                <img
                  alt="google-play"
                  src={GOOGLE_PLAY_ICON}
                  className={`cursor-pointer btn-lendor-google-play`}
                  onClick={() => {
                    window.location.href = GOOGLE_PLAY_LINK
                  }}
                />
              </div>
            </div>
          </div>
          <div className="logo-footer col-md-5 pt-3 pt-md-0">
            <Link to={routes.HOME}>
              <img src={DefaultLogoLendorImg} alt="lendor" />
            </Link>
          </div>
        </div>
      </div>
      <img className={'d-none'} src={DefaultImage} alt={'default-image'} />
    </div>
  )
}

export default Footer
