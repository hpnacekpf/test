import * as Yup from 'yup'
import validate from 'constants/validate'

const stringRequired = Yup.string()
  .required(validate.required)
  .typeError(validate.required)
  .trim(validate.required)

const passwordValidate = Yup.string()
  .required(validate.required)
  .typeError(validate.required)
  .min(6, 'Password must be at least 6 characters')

const string = Yup.string().nullable()

const emailRequired = Yup.string()
  .required(validate.required)
  .typeError(validate.required)
  .trim(validate.required)
  .email(validate.email)

const email = Yup.string()
  .email(validate.email)
  .nullable()

const number = Yup.number()
  .nullable()
  .typeError(validate.invalidNumber)

const rentalSettingNumber = Yup.number()
  .required(validate.required)
  .typeError(validate.required)
  .integer(validate.rentalSettingNumber)

const boolRequired = Yup.bool().required(validate.required)

const boolRequiredTrue = Yup.bool().oneOf([true], validate.required)

const url = Yup.string()
  .url(validate.url)
  .nullable()

const objectRequired = Yup.object()
  .required(validate.required)
  .typeError(validate.required)

const userNameRegex = stringRequired.test(
  'checkInputUsername',
  `User name must not contain "/ ".`,
  (value) => {
    const regexUsernameInput = /^[^/]*$/
    return regexUsernameInput.test(value)
  }
)

//validate product
const nameProductRegex = stringRequired.test(
  'checkInputChinese',
  'Not input chinese language!',
  function(value) {
    const chineseLanguageRegex = /[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+/g
    return !chineseLanguageRegex.test(value)
  }
)

const dailyRate = Yup.number()
  .required(validate.required)
  .typeError(validate.invalidNumber)

const flatRate = Yup.number().when('delivery', {
  is: true,
  then: Yup.number()
    .required(validate.flatRate)
    .typeError(validate.flatRate),
  otherwise: Yup.number().nullable()
})

const fileUpload = Yup.array().test(
  'fileUpload',
  'Images is required',
  (value) => value.length > 0
)

const maxRentDay = Yup.number()
  .nullable()
  .test({
    name: 'validate-max-day',
    message: validate.maxRentalDay,
    test: function(value) {
      const minDay = Number(this.parent.minRentalDay)
      if (value) {
        const maxDay = Number(value)
        return maxDay - minDay >= 0
      }
      return true
    }
  })
  .typeError(validate.invalidNumber)

export default {
  boolRequired,
  boolRequiredTrue,
  dailyRate,
  emailRequired,
  email,
  fileUpload,
  flatRate,
  nameProductRegex,
  string,
  stringRequired,
  url,
  objectRequired,
  number,
  userNameRegex,
  passwordValidate,
  rentalSettingNumber,
  maxRentDay
}
