import React, { Component } from 'react'
import { Route, Switch } from 'react-router'

// areas
import FrontEnd from './areas/FrontEnd'

import Policy from './views/Policy'

class AppNavigation extends Component {
  render() {
    return [
      <Switch key={'switch'}>
        <Route path={'/policy'} name={'Policy'} component={Policy} />
        <Route path={'/'} name={'FrontEnd'} component={FrontEnd} />
      </Switch>
    ]
  }
}

export default AppNavigation
