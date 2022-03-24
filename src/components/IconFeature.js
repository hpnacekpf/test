import React from 'react'
import { DEFAULT_ICON_HEIGHT, DEFAULT_ICON_WIDTH, TRANSACTIONS_ICON_HEIGHT, TRANSACTIONS_ICON_WIDTH } from '../constants'

const IconFeature = ({icon, defaultIconSize}) => {
  const style = {
    backgroundImage: `url('${icon}')`,
		backgroundSize: 'cover',
		objectFit: 'contain',
    width: defaultIconSize ? DEFAULT_ICON_WIDTH : TRANSACTIONS_ICON_WIDTH,
		height: defaultIconSize ? DEFAULT_ICON_HEIGHT : TRANSACTIONS_ICON_HEIGHT
  }

  return <div style={style} className={`mr-2 align-middle`}/>
}

export default IconFeature
