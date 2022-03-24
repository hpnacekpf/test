import React from 'react'
import Menu from 'antd/lib/menu'
import Dropdown from 'antd/lib/dropdown'
import PropTypes from 'prop-types'
// actions
// selectors
// constant
// query string
// utils

import { useModal } from 'hooks/useModal'

import { REDUX_MODAL } from 'constants/enum'
import { useDeleteProduct } from '../reducers/userProfile/hook'

const ProductAction = (props) => {
  const { productId, handleDelete } = props

  const [onOpenModal, onCloseModal] = useModal()

  const [onDelete] = useDeleteProduct()

  const handleDeleteProduct = () => {
    onDelete({
      id: productId,
      onSuccess: handleDelete
    })
  }

  const onConfirmDelete = () => {
    onOpenModal(REDUX_MODAL.CONFIRM, {
      content: 'Delete listing?',
      cancelText: 'no',
      handleOkClick: handleDeleteProduct,
      handleCancelClick: onCloseModal
    })
  }

  const dropdownOption = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={onConfirmDelete}
        className={`btn-del-listing`}
      >
        Delete listing
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown
      overlay={dropdownOption}
      trigger={['click']}
      placement={`bottomRight`}
    >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <i className="fa fa-ellipsis-v" aria-hidden="true" />
      </a>
    </Dropdown>
  )
}

ProductAction.propTypes = {
  productId: PropTypes.any.isRequired
}

export default ProductAction
