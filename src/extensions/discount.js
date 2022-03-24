import { MIN_DISCOUNT, NO_DISCOUNT, STEP_DISCOUNT } from 'constants/index'

export const initOptionDiscount = (rangeDiscount, typeDiscount) => {
  let arrOptions = []
  for (let percent = rangeDiscount[0]; percent <= rangeDiscount[1]; percent = percent + STEP_DISCOUNT) {
    let item = {
      key: percent,
      shortLabel: percent === MIN_DISCOUNT ? NO_DISCOUNT : `${percent}%`,
      value: percent.toString(),
      label: percent === MIN_DISCOUNT
        ? NO_DISCOUNT
        : `${percent}% discount (${typeDiscount})`
    }
    arrOptions.push(item)
  }
  return arrOptions
}