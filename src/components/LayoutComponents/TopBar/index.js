// libs
import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
//constants
import { DefaultLogoLendorImg, DISPLAY_BALANCE_USER } from 'constants/index'
import utils from 'utils'
import { routes } from 'routes/mainNav'
// extensions
import { getUserBalance, isCompleteProfile } from 'extensions/user'
// selectors
// component
import Profile from './Profile'
import CustomButton from 'components/Button/CustomButton'
import SearchBox from './SearchBox'

import { useLogout } from 'reducers/user/hook'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useModal } from 'hooks/useModal'
import { REDUX_MODAL } from 'constants/enum'
import { getCookie } from 'utils/cookie'
import { FORCE_LOGOUT } from 'constants/string'
import { SESSION_EXPIRED } from 'constants/message'
import { useToasts } from 'react-toast-notifications'

const TopMenu = (props) => {
  const {
    history,
    setMenuMobileOpened,
    menuMobileOpened,
    menuCollapsed,
    isMobile
  } = props

  const user = useGetUser()

  const [onLogout] = useLogout()

  const [onOpenModal, onCloseModal] = useModal()

  const { addToast } = useToasts()

  const forceLogout = getCookie(FORCE_LOGOUT)

  useEffect(
    () => {
      if (user && forceLogout) {
        onLogout()
        addToast(SESSION_EXPIRED, { appearance: 'error' })
      }
    },
    [forceLogout]
  )

  const handleLendIt = () => {
    history.push(routes.PRODUCT_CREATE)
  }

  const handleLogout = () => {
    onOpenModal(REDUX_MODAL.CONFIRM, {
      title: 'Logout?',
      content: 'You will be logged out. Do you wish to proceed?',
      handleOkClick: () => handleAcceptLogout(),
      handleCancelClick: () => handleCancelLogout()
    })
  }

  const handleAcceptLogout = () => {
    onLogout()
    history.push(routes.HOME)
    handleCancelLogout()
  }

  const handleCancelLogout = () => {
    onCloseModal(REDUX_MODAL.CONFIRM)
  }

  const isVerified = isCompleteProfile({
    user,
    checkLocation: false,
    checkSingPass: false
  })

  return (
    <div className="topbar row align-items-center">
      <div className="col-xl-4 col-lg-4 col-4 topbar-left p-0">
        <div className="btn-menu-mobile">
          <span
            className="font-size-20 menuLeft__drawer-handle"
            onClick={() => {
              setMenuMobileOpened(!menuMobileOpened)
            }}
          >
            <i className="fa fa-bars" />
          </span>
        </div>
        <div className="box-search">
          <SearchBox menuCollapsed={menuCollapsed} isMobile={isMobile} />
        </div>
      </div>

      <div className="col-xl-4 col-lg-4 col-4 text-center">
        <Link to={routes.HOME} className="icon-logo">
          <img
            src={DefaultLogoLendorImg}
            alt="logo"
            className={`lendor-logo-topbar`}
          />
        </Link>
      </div>

      <div className="col-xl-4 col-lg-4 col-4 custom-profile topbar-right">
        <div className={`d-md-flex justify-content-end align-items-center`}>
          {isVerified ? (
            <React.Fragment>
              {DISPLAY_BALANCE_USER ? (
                <span className="d-flex justify-content-between font-size-18 mr-4 custom-balance">
                  <span className="opacity-44 mr-2">Balance: </span>
                  <span className="font-weight-bold text-color-black-v1">
                    ${utils.showDecimalPlace(getUserBalance(user))}
                  </span>
                </span>
              ) : null}
              <div className="profile d-flex justify-content-end">
                <Profile
                  user={user}
                  handleLogout={handleLogout}
                  handleEditProfile={props.handleEditProfile}
                  displayBalanceUser={DISPLAY_BALANCE_USER}
                />
              </div>
              <CustomButton
                type="button"
                buttonType="btn-color-main"
                buttonClass="px-50 text-uppercase font-size-14 font-weight-bold lend-btn-displayed"
                handleClick={handleLendIt}
              >
                Upload
              </CustomButton>
            </React.Fragment>
          ) : (
            <Fragment>
              <Link
                to={routes.LOGIN}
                onClick={() => onLogout()}
                className="border-0 text-uppercase font-weight-bold px-15 text-color-primary-v1"
              >
                Login
              </Link>
              <Link
                onClick={() => onLogout()}
                to={routes.REGISTER}
                className="border-0 text-uppercase font-weight-bold text-color-primary-v1 btn-signup"
              >
                Sign up
              </Link>
            </Fragment>
          )}
        </div>
      </div>

      <div className="col-lg-12 box-search-mobile">
        <div className="d-flex justify-content-center">
          <SearchBox />
        </div>
      </div>
      <div className="clearfix" />
    </div>
  )
}

export default TopMenu
