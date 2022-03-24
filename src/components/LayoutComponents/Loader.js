import React from 'react'

const Loader = (props) => {
  const {isHideLogin} = props
  if (!isHideLogin) return null
  return <div className="utils__loadingPage"/>
}
export default Loader
