import React from 'react'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import { isBlockUserEnabled } from 'constants/index'
import { useBlockChat, useDeleteGroup } from 'reducers/chat/hook'
import { useBlockUser, useUnBlockUser } from 'reducers/blockUser/hook'

const Item = Menu.Item

const DropdownChat = ({
  children,
  toUserId,
  fromUserId,
  groupChatKey,
  open,
  setOpen,
  block,
  toUserName
}) => {
  const [onBlock, onUnblock] = useBlockChat()

  const [onBlockUser] = useBlockUser()

  const [onUnBlockUser] = useUnBlockUser()

  const [onDelete] = useDeleteGroup()

  const menuDropdown = (
    <Menu>
      {isBlockUserEnabled ? (
        <Item>
          <div
            onClick={() => {
              if (toUserId && groupChatKey && fromUserId) {
                setOpen(false)
                if (block) {
                  onUnBlockUser(toUserId)
                  onUnblock(groupChatKey, toUserId)
                } else {
                  onBlockUser(toUserId)
                  onBlock(groupChatKey, toUserId)
                }
              }
            }}
            className={`font-roboto`}
          >
            {`${block ? 'Unblock' : 'Block'} @${toUserName}`}
          </div>
        </Item>
      ) : null}
      <Item>
        <div
          onClick={() => {
            if (toUserId && groupChatKey) {
              setOpen(false)
              onDelete(groupChatKey)
            }
          }}
        >
          Delete
        </div>
      </Item>
    </Menu>
  )

  return (
    <Dropdown
      overlay={menuDropdown}
      trigger={['click']}
      visible={open}
      onVisibleChange={(open) => setOpen(open)}
      placement={`bottomRight`}
    >
      {children}
    </Dropdown>
  )
}

export default DropdownChat
