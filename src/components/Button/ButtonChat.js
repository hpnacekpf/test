// libs
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

// reducers
import { useGetBlockUser, useUnBlockUser } from 'reducers/blockUser/hook'
import { useRegisterGroup } from 'reducers/chat/hook'
import { useModal } from 'hooks/useModal'

// Constants
import { REDUX_MODAL } from 'constants/enum'

// routes
import { routes } from 'routes/mainNav'

// Components
import ButtonPermission from './ButtonPermission'

const ButtonChat = (props) => {
  const { toUser, product, buttonClass, children } = props

  const history = useHistory()
  const location = useLocation()

  const [onOpenModal, onCloseModal] = useModal()
  const [onRegister] = useRegisterGroup()
  const { blockUsers } = useGetBlockUser()
  const [onUnBlockUser] = useUnBlockUser()

  let isBlockedUser = false

  const handleCheckBlockedUser = () => {
    isBlockedUser = blockUsers.some((user) => user._id == toUser._id)
  }

  const handleChat = () => {
    //register group chat
    handleCheckBlockedUser()

    if (isBlockedUser) {
      onOpenModal(REDUX_MODAL.ALERT, {
        title: 'Chat blocked',
        content:
          'This person has been blocked. You need to unblock to be able to chat with this person',
        okText: 'cancel',
        handleOkClick: () => {
          onCloseModal(REDUX_MODAL.ALERT)
        }
      })
    } else {
      onOpenModal(REDUX_MODAL.CONFIRM, {
        content: 'Chat with user?',
        handleOkClick: () => {
          onRegister({
            receiver: toUser,
            product,
            pathname: location.pathname
          })

          onCloseModal(REDUX_MODAL.CONFIRM)
          history.push(routes.CHAT)
        }
      })
    }
  }
  //
  return (
    <ButtonPermission
      handleClick={handleChat}
      size={'large'}
      buttonType="btn-color-main-outline"
      buttonClass={buttonClass}
      allowSkip={false}
      checkSingpass={false}
    >
      {children}
    </ButtonPermission>
  )
}

export default ButtonChat
