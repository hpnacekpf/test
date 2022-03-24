import React from 'react'
import Spin from 'antd/lib/spin'
// actions
// selectors
// constant
import enumType from 'constants/enumType'
// component
import InfoCard from 'components/InfoCard'
import AuthLayout from 'components/LayoutComponents/AuthLayout'
import DynamicImport from 'components/LayoutComponents/DynamicImport'
import { useLocation } from 'react-router-dom'
import {
  useGetLoading,
  useGetSingPass,
  useResetStateLoading
} from 'reducers/user/hook'

const CustomizeStep = DynamicImport(() => import('components/CustomizeStep'))

export const withRegister = ({ titlePage, customLayout, topBarComponent }) => (
  Component
) => {
  return (props) => {
    const { pathname } = useLocation()

    useResetStateLoading()

    const singpass = useGetSingPass()

    const loading = useGetLoading()

    return (
      <React.Fragment>
        <InfoCard frameCss="rounded-0 step-responsive">
          <CustomizeStep data={enumType.stepRegister} path={pathname} />
        </InfoCard>
        {customLayout ? (
          <Spin spinning={loading}>
            <div className="utils__content pt-1 singpass__custom-pd">
              {topBarComponent(singpass)}
              <InfoCard title={titlePage}>
                <Component {...props} />
              </InfoCard>
            </div>
          </Spin>
        ) : (
          <AuthLayout titleCenter={true} titlePage={titlePage}>
            <Spin spinning={loading}>
              <Component {...props} />
            </Spin>
          </AuthLayout>
        )}
      </React.Fragment>
    )
  }
}
