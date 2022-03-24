import React from 'react'

const TitleModalOrder = ({ titleName, icon }) => {
  return (
    <span>
      <img className="max-height_50px mb-15" src={icon} />
      <span className="font-roboto"> {titleName}</span>
    </span>
  )
}

export default TitleModalOrder
