import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Chat'

const Chat = DynamicImport(() => import('./index'))
export const navChat = [
	{
		component: Chat,
		isProtected: true,
		path: `/chats`
	}
]
