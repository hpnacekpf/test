import React from 'react'
import ReactPhoneInput from 'react-phone-input-2'

const InputPhone = ({ name, value,disabled, disableDropdown, handleChange , disableCountryCode, placeholder}) => {
  return (
    <ReactPhoneInput
      inputExtraProps={{
        name: name,
        required: true,
        autoFocus: true
      }}
      disableDropdown={disableDropdown || true}
      disableCountryCode={disableCountryCode || true}
      country={process.env.RAZZLE_APP_PHONE_COUNTRY}
      value={value}
      onChange={handleChange}
      onlyCountries={[process.env.RAZZLE_APP_PHONE_COUNTRY]}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}

export default InputPhone