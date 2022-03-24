import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Setting'

const Setting = DynamicImport(() => import('./index'))
export const navSetting = [
	{
		component: Setting,
		isProtected: true,
		path: `/settings`
	}
]
