//libs
import Badge from 'antd/lib/badge'
import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import classNames from 'classnames'
//constants
import { DefaultLogoMenuLeft, MAX_MENU_LEVEL } from 'constants/index'
//extensions
import { defaultOpenMenu, menuParams } from 'extensions/menu'
import { isCompleteProfile } from 'extensions/user'
import React, { Fragment } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Link } from 'react-router-dom'
// step Tour
import { useGetCategorySidebar } from 'reducers/category/hook'
import { isServer } from 'utils/client-api'

// hooks
import { useGetAllCategoriesSSR } from 'reducers/category/hook'
import { getAvatarUrl, getBannerUrl } from 'extensions/image'
// hocs
import { withComponentSSR } from 'hocs/withComponentSSR'

const Sider = Layout.Sider
const SubMenu = Menu.SubMenu
const Divider = Menu.Divider

const CustomizeMenuItem = ({
  isSubMenu,
  icon,
  orderSubMenu,
  showIcon,
  title,
  menuCollapsed,
  badge,
  countBadge,
  isUppercase
}) => {
  const checkShowIcon = showIcon && orderSubMenu === MAX_MENU_LEVEL
  const iconUrl = icon ? getBannerUrl(icon) : null

  return (
    <Fragment>
      <span
        className={classNames({
          'menuLeft__item-title': true,
          'px-3': checkShowIcon,
          'item-title': showIcon,
          menu__item_icon: !checkShowIcon && orderSubMenu && !menuCollapsed,
          'text-uppercase':
            (isSubMenu && checkShowIcon) || isUppercase || orderSubMenu === 2
        })}
      >
        {title}
      </span>
      {showIcon ? (
        <span
          style={{
            backgroundImage: `url('${iconUrl}') `,
            backgroundSize: '1.8rem',
            backgroundRepeat: 'no-repeat'
          }}
          className={classNames({
            [`${icon}`]: orderSubMenu !== MAX_MENU_LEVEL,
            menuLeft__icon: true,
            'icon-submenu': orderSubMenu
          })}
        >
          {badge && countBadge > 0 ? (
            <Badge
              className="custom-badge"
              count={countBadge}
              //showZero
              offset={[2, -15]}
            />
          ) : null}
        </span>
      ) : null}
    </Fragment>
  )
}

const CustomizeLinkMenuItem = ({
  url,
  isSubMenu,
  icon,
  orderSubMenu,
  showIcon,
  title,
  onClick,
  menuCollapsed,
  isActive,
  badge,
  countBadge,
  isUppercase
}) => {
  return (
    <Link to={url} onClick={onClick}>
      <CustomizeMenuItem
        orderSubMenu={orderSubMenu}
        title={title}
        showIcon={showIcon}
        isSubMenu={isSubMenu}
        icon={icon}
        menuCollapsed={menuCollapsed}
        isActive={isActive}
        badge={badge}
        countBadge={countBadge}
        isUppercase={isUppercase}
      />
    </Link>
  )
}

const MenuLeft = (props) => {
  const {
    theme,
    isMobile,
    menuCollapsed,
    handleMenuCollapseMobile,
    handleToggleMenuCollapse,
    handleToggleMenuMobileOpen
  } = props

  const {
    nav,
    user,
    openKeys,
    selectedKeys,
    buttonCollapse,
    scrollbarWidth,
    onOpenChange,
    handleClickTour,
    handleClickMenu
  } = useGetCategorySidebar(props)

  const generateMenuPartitions = (items) => {
    const isComplete = isCompleteProfile({
      user,
      checkLocation: false,
      checkSingPass: false
    })
    if (items && items.length > 0) {
      return items.map((menuItem) => {
        let menu = null
        if (isComplete) {
          menu = generateMenuItem(menuItem)
        } else {
          if (!menuItem.isAuth) {
            menu = generateMenuItem(menuItem)
          }
        }
        return menu
      })
    }
  }

  const renderLevelMenu = (item) => {
    return (
      <SubMenu
        title={
          <span className={`menuLeft__title-wrap`}>
            <CustomizeMenuItem
              title={item.title}
              showIcon={!!item.icon}
              isSubMenu={true}
              icon={item.icon}
              isUppercase={item.isUppercase}
              orderSubMenu={item.orderSubMenu}
              menuCollapsed={menuCollapsed}
            />
          </span>
        }
        key={item.key}
      >
        {generateMenuPartitions(item.children)}
      </SubMenu>
    )
  }

  const generateMenuItem = (item) => {
    const {
      key,
      title,
      url,
      icon,
      disabled,
      divider,
      orderSubMenu,
      children,
      badge,
      countBadge,
      customClass,
      handleClick
    } = item

    let menuItem = []
    if (divider) {
      menuItem.push(<Divider key={Math.random()} />)
    }
    if (children && children.length > 0) {
      menuItem.push(renderLevelMenu(item))
      // return
    } else {
      menuItem.push(
        <Menu.Item
          key={key}
          disabled={disabled}
          className={classNames({
            'menu-item': true,
            [customClass]: customClass,
            'submenu-2': orderSubMenu === 2,
            'submenu-3': orderSubMenu === MAX_MENU_LEVEL
          })}
        >
          {url ? (
            <CustomizeLinkMenuItem
              url={url}
              onClick={() => {
                if (isMobile) {
                  handleMenuCollapseMobile()
                }
              }}
              orderSubMenu={orderSubMenu}
              title={title}
              showIcon={!!icon}
              isSubMenu={item.isTextBold}
              icon={icon}
              menuCollapsed={menuCollapsed}
              badge={badge}
              countBadge={countBadge || 0}
              isUppercase={item.isUppercase}
            />
          ) : (
            <a
              onClick={() => {
                if (handleClick) {
                  handleClickTour()
                }
              }}
            >
              <CustomizeMenuItem
                orderSubMenu={orderSubMenu}
                title={title}
                showIcon={!!icon}
                isSubMenu={item.isTextBold}
                icon={icon}
                menuCollapsed={menuCollapsed}
                isUppercase={item.isUppercase}
                handleClick={handleClickTour}
              />
            </a>
          )}
        </Menu.Item>
      )
    }
    return menuItem
  }

  const onCollapse = (value, type) => {
    if (type !== 'responsive') {
      handleToggleMenuCollapse()
    }
  }

  const menuItems = generateMenuPartitions(nav)

  const params = menuParams(isMobile, menuCollapsed, onCollapse)
  return (
    <Sider
      {...params}
      className="menuLeft"
      trigger={
        <div
          ref={buttonCollapse}
          className={classNames(
            {
              'custom-trigger bg-color-yellow': !params.collapsed,
              'custom-trigger-collapse bg-color-white-v1': params.collapsed
            },
            `text-color-primary-v1`
          )}
          onClick={onCollapse}
        >
          <i
            className={classNames(
              {
                'fa-chevron-left': !params.collapsed,
                'fa-chevron-right': params.collapsed
              },
              `fa`
            )}
          />
        </div>
      }
    >
      <div className="menuLeft__logo bg-main">
        <div
          className={classNames({
            menuLeft__logoContainer: !params.collapsed
          })}
        >
          <a
            className={classNames({
              'menuLeft__logoContainer menuLeft__logoContainer--collapsed text-light d-flex justify-content-center align-items-center':
                params.collapsed,
              'd-flex justify-content-center align-items-center w-100': !params.collapsed
            })}
            onClick={() => {
              isMobile
                ? handleToggleMenuMobileOpen()
                : buttonCollapse.current.click()
            }}
          >
            {params.collapsed ? null : (
              <img src={DefaultLogoMenuLeft} alt="default-logo-menu" />
            )}
            <i
              className={classNames({
                'fa fa-bars': true,
                'text-light menuLeft__icon': !params.collapsed
              })}
              style={{
                fontSize: 1.5 + 'em',
                top: 'auto'
              }}
            />
          </a>
        </div>
      </div>
      {scrollbarWidth !== null ? (
        <Scrollbars
          autoHide
          style={{
            height: isMobile
              ? `calc(${
                  !isServer ? window.innerHeight + 'px' : '100vh'
                } - 114px)`
              : `calc(${
                  !isServer ? window.innerHeight + 'px' : '100vh'
                } - 112px)`
          }}
          className={classNames(
            {
              'scrollbar-windows': scrollbarWidth !== 0,
              'scrollbar-macos': scrollbarWidth === 0
            },
            `scrollbar scrollbar-custom`
          )}
        >
          <Menu
            theme={theme}
            onClick={handleClickMenu}
            selectedKeys={[selectedKeys]}
            defaultOpenKeys={defaultOpenMenu(isMobile, menuCollapsed, openKeys)}
            onOpenChange={onOpenChange}
            mode="inline"
            className="menuLeft__navigation"
          >
            {menuItems}
          </Menu>
        </Scrollbars>
      ) : null}
    </Sider>
  )
}

export default withComponentSSR({
  frontLoad: 'category-sidebar-ssr',
  fetchData: useGetAllCategoriesSSR
})(MenuLeft)
