export default {
  required: 'This field is required.',
  email: 'Please enter a valid email address.',
  password: "Those password didn't match. Try again.",
  loanDuration: 'This field is required.',
  phone: 'Please enter a phone number',
  cvc: 'CVC must be exactly 3-4 characters',
  zipCode: 'Zip code must be exactly 5 characters',
  flatRate: 'Please input flat rate eg. $10',
  minPassword: 'Password must contain at least 6 characters',
  verifyCodePhone: (length) =>
    `Phone verification must contain ${length} characters`,
  minPhoneNumber: (length) =>
    `Phone number must contain at least ${length} characters`,
  minProductImage: (min) => `You must upload at least ${min} image`,
  maxProductImage: (max) => `You can upload maximum ${max} images`,
  validateEndDate: 'Loan and return date cannot be the same.',
  deliveryOptions: 'Please choose one of the options.',
  invalidValue: 'Please enter valid value.',
  requiredImage: 'Please upload an item image',
  requiredProofImage: 'Please upload at least one image',
  invalidNumber: 'Please enter a number ',
  rentalSettingNumber: 'This field must be an integer',
  validateRentalDay: 'Lendor has set Minimum rental to',
  validateMaxRentalDay: 'Lendor has set Maximum rental to',
  maxRentalDay:
    'Maximum rental days must be greater than or equal to minimum rental days.',
  validateSelectQuantity: 'Lendor has set quantity product Maximum rental to',
  validateRequestDateChange:
    'New loan duration must be different from origin loan duration'
}
