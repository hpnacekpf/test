import React, { Fragment } from 'react'

const showItems = (items, len) => {
  let listItems = []
  for (let i = 0; i < len; i++) {
    listItems.push(<Fragment key={i}>{items}</Fragment>)
  }
  return listItems
}
export default showItems