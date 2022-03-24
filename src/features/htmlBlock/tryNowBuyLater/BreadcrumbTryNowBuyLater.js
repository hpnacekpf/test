import React from 'react'
import Breadcrumb from 'antd/lib/breadcrumb'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import enumType from 'constants/enumType'
import { routes } from 'routes/mainNav'
import MenuTryNowBuyLater from './menuTNBL'
import { menuTNBL } from 'constants/menu/menuFooter'

const BreadcrumbTNBL = ({ text, isMobile, isHiddenChild }) => {
  return (
    <Breadcrumb
      className={classNames('custom-breadcrumb', {
        'mt-0 mb-3': isMobile
      })}
      separator=">"
    >
      <Breadcrumb.Item>
        <Link to={routes.HOME}>Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to={routes.TRY_NOW_BUY_LATER}>Try Now, Buy Later</Link>
      </Breadcrumb.Item>
      {isHiddenChild ? null : (
        <Breadcrumb.Item
          overlay={MenuTryNowBuyLater(menuTNBL.Lendor, menuTNBL.Lendee)}
        >
          {text}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  )
}
export default BreadcrumbTNBL
