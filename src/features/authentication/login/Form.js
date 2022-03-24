import React from 'react'
import { Link } from 'react-router-dom'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Checkbox from 'antd/lib/checkbox'

import ErrorField from 'components/ErrorField'
import CustomButton from 'components/Button/CustomButton'
import ButtonFacebook from 'components/Button/ButtonFacebook'
import ButtonGoogle from 'components/Button/ButtonGoogle'

import { routes } from 'routes/mainNav'
import yupExtension from 'extensions/yup'
import xss from 'extensions/xss'
import ButtonApple from 'components/Button/ButtonApple'

const FormItem = Form.Item

const formikMap = withFormik({
	validationSchema: Yup.object().shape({
		email: yupExtension.emailRequired,
		password: yupExtension.stringRequired
	}),
	mapPropsToValues: () => ({
		email: null,
		password: null
	}),
	handleSubmit: (data, { props }) => {
		props.handleLogin({
			...data,
			email: xss.removeXssContent(data.email)
		})
	},
	displayName: 'Form'
})

const FormLogin = (props) => {
	const {
		values,
		handleSubmit,
		errors,
		touched,
		setFieldValue,
		setFieldTouched,
		loginSocialClick,
		handleLoginFacebook,
		handleLoginGoogle,
		handleClickSocial
	} = props

	return (
		<Form onSubmit={handleSubmit} className="login-form">
			<FormItem className="mb-3">
				<label className="form-label mb-3 label-form">Email: </label>
				<Input
					placeholder="Enter your email address here"
					className="input-form"
					value={values.email}
					onChange={(email) => setFieldValue('email', email.target.value)}
					onBlur={() => setFieldTouched('email', true)}
				/>
				<ErrorField errors={errors} touched={touched} fieldName="email" />
			</FormItem>
			<FormItem className="mb-4">
				<label className="form-label mb-3 label-form">Password: </label>
				<Input.Password
					type="password"
					placeholder="Enter your password here"
					className="input-form custom-input-password"
					value={values.password}
					onChange={(password) =>
						setFieldValue('password', password.target.value)
					}
					onBlur={() => setFieldTouched('password', true)}
				/>
				<ErrorField errors={errors} touched={touched} fieldName="password" />
			</FormItem>
			<FormItem className="mb-4">
				<Checkbox className="custom-checkbox">Remember me</Checkbox>
				<Link
					className="login-form-forgot pull-right text__card-header"
					style={{ lineHeight: '36px' }}
					to={routes.FORGOT_PASSWORD}
				>
					Forgot Password?
				</Link>
			</FormItem>
			<div className="form-actions">
				<FormItem>
					<div
						className={`d-md-flex justify-content-between flex-wrap text-center`}
					>
						<div className="register-link text__card-header">
							<Link
								to={routes.REGISTER}
								className="text__yellow-main utils__link--underlined"
							>
								Register
							</Link>{' '}
							if you don't have an account
						</div>
						<Link
							className="text__card-header"
							style={{ lineHeight: '36px' }}
							to={routes.TERMS_OF_USE}
						>
							View Terms of Use
						</Link>
					</div>
				</FormItem>
				<CustomButton
					buttonType="btn-color-main"
					htmlType="submit"
					block
					size={'large'}
					buttonClass="text-uppercase font-weight-bold"
				>
					Login
				</CustomButton>
				<div className="form-group d-flex flex-row justify-content-between custom-btn-login">
					<ButtonFacebook
						text={'Facebook Login'}
						loginSocialClick={loginSocialClick}
						callBack={(response) => {
							if (loginSocialClick) {
								handleLoginFacebook(response)
							}
						}}
						handleClick={handleClickSocial}
					/>
					<ButtonGoogle
						text={' Google Login'}
						loginSocialClick={loginSocialClick}
						handleLoginSuccess={handleLoginGoogle}
						handleClick={handleClickSocial}
					/>
					<ButtonApple
						text="Apple Login"
						redirectURI={process.env.RAZZLE_APPLE_LOGIN_REDIRECT_URI}
					/>
				</div>
			</div>
		</Form>
	)
}
export default formikMap(FormLogin)
