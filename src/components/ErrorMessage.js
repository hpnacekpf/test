//libs
import React from 'react'
import className from 'classnames'

const ErrorMessage = ({error, cssClass}) => (
  <div className='has-error'>
    <label className={className(`ant-form-explain`, {
        [cssClass] : true
    })}>
      {error}
    </label>
  </div>
)

export default ErrorMessage