import enumType from 'constants/enumType'

export const isLendor = (type) => {
  if (type === enumType.lendorType.Lendor || type === undefined) return false
  if (type === enumType.lendorType.Lendee) return true
}
