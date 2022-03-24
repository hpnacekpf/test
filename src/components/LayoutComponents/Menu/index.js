// lib
import React, { useState, useEffect } from 'react'
import 'rc-drawer/assets/index.css'
import DrawerMenu from 'rc-drawer'
import classNames from 'classnames'
// import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import Swipe from 'react-easy-swipe'
// component
import MenuLeft from './MenuLeft'
import { MAX_COOR_X_MENU_SWIPE, MAX_COOR_Y_MENU_SWIPE } from 'constants/index'
import { isServer } from 'utils/client-api'

const CustomizeMenuLeft = ({
  pathname,
  isMobile,
  menuMobileOpened,
  menuCollapsed,
  settingsOpened,
  handleToggleMenuMobileOpen,
  handleMenuMobileOpen,
  handleToggleSettingOpened,
  handleMenuCollapseMobile,
  handleToggleMenuCollapse
}) => {
  return (
    <MenuLeft
      pathname={pathname}
      isMobile={isMobile}
      menuMobileOpened={menuMobileOpened}
      menuCollapsed={menuCollapsed}
      settingsOpened={settingsOpened}
      handleToggleMenuMobileOpen={handleToggleMenuMobileOpen}
      handleMenuMobileOpen={handleMenuMobileOpen}
      handleToggleSettingOpened={handleToggleSettingOpened}
      handleMenuCollapseMobile={handleMenuCollapseMobile}
      handleToggleMenuCollapse={handleToggleMenuCollapse}
    />
  )
}

const AppMenu = (props) => {
  const {
    isMobile,
    pathname,
    setMenuMobileOpened,
    menuMobileOpened,
    menuCollapsed,
    setMenuCollapsed
  } = props

  // const [menuCollapsed, setMenuCollapsed] = useState(false)

  const [settingsOpened, setSettingsOpened] = useState(false)

  const handleToggleMenuMobileOpen = () => {
    setMenuMobileOpened(!menuMobileOpened)
    handleMenuCollapseMobile()
  }

  const handleMenuMobileOpen = () => {
    setMenuMobileOpened(false)
  }

  const handleToggleSettingOpened = () => {
    setSettingsOpened(!settingsOpened)
  }

  const handleMenuCollapseMobile = () => {
    setMenuCollapsed(false)
  }

  const handleToggleMenuCollapse = () => {
    setMenuCollapsed(!menuCollapsed)
  }

  useEffect(
    () => {
      if (pathname === '/business') {
        setMenuCollapsed(true)
      }
    },
    [pathname]
  )

  // const disableBody = target => disableBodyScroll(target)
  // const enableBody = target => enableBodyScroll(target)

  return isMobile ? (
    <DrawerMenu
      getContainer={null}
      level={null}
      open={menuMobileOpened}
      onClose={handleToggleMenuMobileOpen}
      onHandleClick={handleToggleMenuMobileOpen}
      onChange={(open) => {
        const body = !isServer ? document.body : null
        if (body) {
          if (open) body.style.overflowY = 'hidden'
          else body.style.overflowY = 'unset'
        }
      }}
    >
      <Swipe
        onSwipeMove={(pos, e) => {
          if (
            pos.x <= MAX_COOR_X_MENU_SWIPE &&
            pos.y <= MAX_COOR_Y_MENU_SWIPE.top &&
            pos.y >= MAX_COOR_Y_MENU_SWIPE.bottom
          ) {
            setMenuMobileOpened(false)
          }
        }}
      >
        <CustomizeMenuLeft
          pathname={pathname}
          isMobile={isMobile}
          menuMobileOpened={menuMobileOpened}
          menuCollapsed={menuCollapsed}
          settingsOpened={settingsOpened}
          handleToggleMenuMobileOpen={handleToggleMenuMobileOpen}
          handleMenuMobileOpen={handleMenuMobileOpen}
          handleToggleSettingOpened={handleToggleSettingOpened}
          handleMenuCollapseMobile={handleMenuCollapseMobile}
          handleToggleMenuCollapse={handleToggleMenuCollapse}
        />
        <div
          className={classNames(
            {
              'custom-trigger bg-color-yellow': !menuCollapsed,
              'custom-trigger-collapse bg-color-white-v1': menuCollapsed
            },
            `z-2 text-color-primary-v1 text-center position-absolute  bottom-0 height-50 d-flex justify-content-center align-items-center`
          )}
          onClick={handleToggleMenuMobileOpen}
        >
          <i
            className={classNames(
              {
                'fa-chevron-left': !menuCollapsed,
                'fa-chevron-right': menuCollapsed
              },
              `fa`
            )}
          />
        </div>
      </Swipe>
    </DrawerMenu>
  ) : (
    <CustomizeMenuLeft
      pathname={pathname}
      isMobile={isMobile}
      menuMobileOpened={menuMobileOpened}
      menuCollapsed={menuCollapsed}
      settingsOpened={settingsOpened}
      handleToggleMenuMobileOpen={handleToggleMenuMobileOpen}
      handleMenuMobileOpen={handleMenuMobileOpen}
      handleToggleSettingOpened={handleToggleSettingOpened}
      handleMenuCollapseMobile={handleMenuCollapseMobile}
      handleToggleMenuCollapse={handleToggleMenuCollapse}
    />
  )
}

export default AppMenu
