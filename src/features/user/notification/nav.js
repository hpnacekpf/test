import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Notification'

const Notification = DynamicImport(() => import('./index'))
export const navNotification = [
	{
		component: Notification,
		isProtected: true,
		path: `/setting-notification`
	}
]
