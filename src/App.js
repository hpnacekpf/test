import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Policy from './features/policy'
import FrontEnd from './areas/FrontEnd'

import 'react-perfect-scrollbar/dist/css/styles.css'
import './scss/_antd.less' // redefinition AntDesign variables
import 'bootstrap/dist/css/bootstrap.min.css' // bootstrap styles
// import 'bootstrap-daterangepicker/daterangepicker.css'
import 'antd/dist/antd.css'
import './scss/CleanStyles/Core/cleanui.scss'
import './scss/CleanStyles/Vendors/vendors.cleanui.scss'
import './scss/AntStyles/AntDesign/antd.cleanui.scss'

// css slick
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

//phone
import 'react-phone-input-2/lib/style.css'

import 'react-image-gallery/styles/scss/image-gallery.scss'

import './scss/custom.scss'

import 'react-smartbanner/dist/main.css'

const App = () => {
  return [
    <Switch>
      <Route path={'/policy'} name={'Policy'} component={Policy} />
      <Route path={'/'} name={'FrontEnd'} component={FrontEnd} />
    </Switch>
  ]
}

export default App
