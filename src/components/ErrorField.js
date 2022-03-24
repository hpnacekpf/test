//libs
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
// extensions
import formikExtensions from 'extensions/formik'

const ErrorField = (props) => {
  const { errors, touched, cssClass, fieldName } = props
  return formikExtensions.checkFieldError(errors, touched, fieldName) ? (
    <div className="has-error">
      <label className={classNames('ant-form-explain', cssClass)}>
        {errors[fieldName]}
      </label>
    </div>
  ) : null
}

ErrorField.propTypes = {
  errors: PropTypes.any,
  touched: PropTypes.any,
  cssClass: PropTypes.string,
  fieldName: PropTypes.string
}

export default ErrorField
