import React from 'react'
import Title from '../Title'

const AuthLayout = ({ titleCenter, titlePage, children }) => (
  <div className="login bg-transparent">
    <div className="login__header" />
    <div className="login__block py-0">
      <div className="row">
        <div className="col-xl-12">
          <div className="login__block__inner custom-login-form pb-5">
            <div className="login__block__form">
              {/* <h4 className={`text-uppercase title-form mb-15 ${titleCenter ? 'text-center' : ''}`}>
                {titlePage}
              </h4> */}
              <Title
                title={titlePage}
                isCenter={titleCenter}
                isContentCenter={true}
              />
              <br />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="login__footer" />
  </div>
)

export default AuthLayout
