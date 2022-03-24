import React from 'react'
import Menu from 'antd/lib/menu'
import { Link } from 'react-router-dom'

const MenuTNBL = (routes1, routes2) => {
  return (
    <Menu className="custom-dropdown-menu">
      <Menu.Item>
        <Link to={routes2.link}>{routes2.text}</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={routes1.link}>{routes1.text}</Link>
      </Menu.Item>
    </Menu>
  )
}

export default MenuTNBL
