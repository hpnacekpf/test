import React from 'react'
import Breadcrumb from 'antd/lib/breadcrumb'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import enumType from 'constants/enumType'
import { routes } from 'routes/mainNav'
import MenuLPP from './menuLPP'

const BreadcrumbLPP = ({ text, isMobile, isHiddenChild }) => {
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
        <Link to={routes.LENDOR_PROTECTION_GUARANTEE}>
          Lendor Protection Guarantee
        </Link>
      </Breadcrumb.Item>
      {isHiddenChild ? null : (
        <Breadcrumb.Item
          overlay={MenuLPP(enumType.menuLPP.Lendor, enumType.menuLPP.Lendee)}
        >
          {text}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  )
}
export default BreadcrumbLPP
