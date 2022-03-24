import Layout from 'antd/lib/layout'
import classNames from 'classnames'
// import Gtm from "../components/GA/Gtm";
import GoogleTags from 'components/GA/GoogleTags.js'
import ButtonWhatsApp from 'components/LayoutComponents/ButtonWhatsapp'
import Footer from 'components/LayoutComponents/Footer'
import Loader from 'components/LayoutComponents/Loader'
// Component
import Menu from 'components/LayoutComponents/Menu'
import TopBar from 'components/LayoutComponents/TopBar'
import ModalAlert from 'components/Modal/ModalAlert'
// Modal
import ModalConfirm from 'components/Modal/ModalConfirm'
import ModalInputLocation from 'components/Modal/ModalInputLocation'
import ModalInputPhone from 'components/Modal/ModalInputPhone'
import ModalNoa from 'components/Modal/ModalNoa'
import ModalAlertProofReject from 'components/Modal/ModalProofReject'
import ModalRegister from 'components/Modal/ModalRegister'
import ModalSingPass from 'components/Modal/ModalSingPass'
import ModalSingPassAddress from 'components/Modal/ModalSingPassAddress'
import ModalSingPassSuccess, {
  ModalSingPassNOA
} from 'components/Modal/ModalSingPassSuccess'
import ModalTerms from 'components/Modal/ModalTerms'
import ModalVerificationPhone from 'components/Modal/ModalVerificationPhone'
import ReactTour from 'components/Tour/ReacTour'
// Constant
import { ANDROID_DEVICE, IOS_DEVICE, query } from 'constants/index'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { getCookie } from 'extensions/auth'
import { checkUpdatePlayId } from 'extensions/user'
import { useGetUser, useRestoreUser } from 'hooks/globalStores/useAuthStore'
import { isEqual } from 'lodash'
import React, { Fragment, useEffect, useState } from 'react'
import { ContainerQuery } from 'react-container-query'
import ReactPixel from 'react-facebook-pixel'
import { Spinner } from 'react-redux-spinner'
import { useLocation } from 'react-router-dom'
import SmartBanner from 'react-smartbanner'
import { ToastProvider } from 'react-toast-notifications'
import { usePrevious } from 'react-use'
import { useUpdatePlayId } from 'reducers/user/hook'
import ScrollToTop from 'ScrollToTop'
import { isServer } from 'utils/client-api'
import { initializeOneSignal } from 'vendor/OneSignal'
import { useUpdateBrowserPlayId } from '../reducers/user/hook'
import { subscribeOneSignal } from '../vendor/OneSignal'
import FrontEndRoutes from './FrontEndRoutes'
import AlertNavigation from '../components/AlertNavigation'

const FACEBOOK_PIXEL = process.env.RAZZLE_APP_FACEBOOK_PIXEL_ID

let OneSignal = !isServer ? window.OneSignal || [] : []

const ONE_SIGNAL_ID = process.env.RAZZLE_APP_ONE_SIGNAL_ID

const FrontEnd = (props) => {
  let location = useLocation()

  const [onUpdatePlayId] = useUpdatePlayId()

  const [onSetBrowserPlayId] = useUpdateBrowserPlayId()

  const [isHideLogin, setIsHideLogin] = useState(false)

  const [isMobile, setMobileScreen] = useState(false)

  const [isEditProfile, setIsEditProfile] = useState(false)

  const [menuMobileOpened, setMenuMobileOpened] = useState(false)

  const [menuCollapsed, setMenuCollapsed] = useState(false)

  const currentOS = getCookie('current-os')

  useRestoreUser()

  const user = useGetUser()

  const renderSmartBanner = (osDevice) => {
    return osDevice === IOS_DEVICE || osDevice === ANDROID_DEVICE ? (
      <SmartBanner
        title={'Lendor'}
        force={osDevice}
        button={'Open'}
        appMeta={{
          ios: 'apple-app',
          android: 'google-app',
          windows: 'msApplication-ID',
          kindle: 'kindle-fire-app'
        }}
      />
    ) : null
  }

  useEffect(() => {
    if (!isServer) {
      enquireScreen((mobile) => {
        setMobileScreen(mobile)
      })

      //facebook pixel
      ReactPixel.init(FACEBOOK_PIXEL)
      ReactPixel.pageView()
      //google tags
      GoogleTags.init()
      //init one signal and add user playId
      initializeOneSignal(OneSignal, ONE_SIGNAL_ID)
    }
  }, [])

  useEffect(() => {
    return () => {
      unenquireScreen(
        enquireScreen((mobile) => {
          setMobileScreen(mobile)
        })
      )
    }
  }, [])

  const previousUser = usePrevious(user?._id)

  useEffect(
    () => {
      if (user && !isEqual(previousUser, user._id)) {
        subscribeOneSignal(OneSignal, (playId) => {
          onSetBrowserPlayId(playId)

          const needUpdate = checkUpdatePlayId(user, playId)

          if (needUpdate) {
            onUpdatePlayId(playId)
          }
        })
      }
    },
    [user]
  )

  /**
   * status: false: xem, true: edit
   */
  const handleEditProfile = (status) => {
    setIsEditProfile(status)
  }

  return (
    <Fragment>
      <ToastProvider autoDismiss autoDismissTimeout={2500}>
        <ContainerQuery query={query}>
          {(params) => {
            return (
              <div className={classNames(params || 'screen-xs')}>
                <Layout>
                  <Loader isHideLogin={isHideLogin} />
                  <Spinner />
                  <Menu
                    isMobile={isMobile}
                    pathname={location.pathname}
                    menuMobileOpened={menuMobileOpened}
                    setMenuMobileOpened={setMenuMobileOpened}
                    menuCollapsed={menuCollapsed}
                    setMenuCollapsed={setMenuCollapsed}
                  />
                  <Layout>
                    <Layout.Header className="height-auto">
                      <TopBar
                        {...props}
                        searchParams={location.search}
                        isMobile={isMobile}
                        handleEditProfile={handleEditProfile}
                        menuMobileOpened={menuMobileOpened}
                        setMenuMobileOpened={setMenuMobileOpened}
                        menuCollapsed={menuCollapsed}
                      />
                    </Layout.Header>
                    <Layout.Content>
                      <AlertNavigation
                        isMobile={isMobile}
                        pathname={location.pathname}
                      />
                      {isMobile ? renderSmartBanner(currentOS) : null}
                      <ScrollToTop>
                        <FrontEndRoutes isMobile={isMobile} />
                      </ScrollToTop>
                    </Layout.Content>
                    <Layout.Footer>
                      <Footer />
                    </Layout.Footer>
                  </Layout>
                </Layout>
              </div>
            )
          }}
        </ContainerQuery>
        {isServer ? null : <ReactTour isMobile={isMobile} />}
        <ModalConfirm />
        <ModalTerms />
        <ModalRegister />
        <ModalVerificationPhone />
        <ButtonWhatsApp />
        <ModalInputPhone />
        <ModalInputLocation />
        <ModalAlertProofReject />
        <ModalAlert />
        <ModalSingPass />
        <ModalNoa />
        <ModalSingPassSuccess />
        <ModalSingPassAddress />
        <ModalSingPassNOA />
      </ToastProvider>
    </Fragment>
  )
}

export default FrontEnd
