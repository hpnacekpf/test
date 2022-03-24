import { DECIMAL_PLACE } from 'constants/index'

export default {
  roundHundred(number) {
    return number ? Math.round(number) : 0
  },

  roundTwoDecimalPlace(num) {
    return num ? Math.round(num * 100) / 100 : 0
  },

  roundDecimalPlace(num, decimal, defaultNumber) {
    const pow = Math.pow(10, decimal ? decimal : 0)
    return num ? Math.round(num * pow) / pow : defaultNumber
  },

  getInclFromExcl(price, tax) {
    return price * (1 + Number(tax ? tax : 0) / 100)
  },

  getExclFromIncl(price, tax) {
    return price / (1 + Number(tax ? tax : 0) / 100)
  },

  formatNumber(val, location) {
    return new Intl.NumberFormat(location ? location : 'vi-VN', {
      maximumSignificantDigits: 3
    }).format(val)
  },

  showDecimalPlace(number, decimal) {
    return Number.parseFloat(number || 0).toFixed(decimal || DECIMAL_PLACE)
  },
  rounding: (value, exp) => {
    function decimalAdjust(type, value, exp) {
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value)
      }
      value = +value
      exp = +exp

      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN
      }

      value = value.toString().split('e')
      value = Math[type](
        +(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp))
      )

      value = value.toString().split('e')
      return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp))
    }

    if (!Math.round10) {
      Math.round10 = function(value, exp) {
        return decimalAdjust('round', value, exp)
      }
    }
    return Math.round10(value, exp)
  },

  showFormatPrice(price, decimal) {
    if (price === null) return null
    const priceDecimal = this.showDecimalPlace(Math.abs(price), decimal)
    return price < 0 ? `-$${priceDecimal}` : `$${priceDecimal}`
  },

  showPrice(price, decimal) {
    if (price === null) return null
    const priceInteger = (Math.round(price * 100) / 100).toLocaleString()
    return price < 0 ? `-$${priceInteger}` : `$${priceInteger}`
  },

  parseToNumber(num) {
    let number = Number(num)
    if (Number.isNaN(number)) {
      return 0
    }

    return number
  },

  roundUp(num, decimal) {
    const pow = Math.pow(10, decimal ? decimal : 0)
    return decimal > 0 ? Math.round(num * pow) / pow : Math.round(num)
  },

  roundDown(num, decimal) {
    const pow = Math.pow(10, decimal ? decimal : 0)
    return Math.floor(num * pow) / pow
  },

  removeExponential(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1])
      if (e) {
        x *= Math.pow(10, e - 1)
        x = '0.' + new Array(e).join('0') + x.toString().substring(2)
      }
    } else {
      var e = parseInt(x.toString().split('+')[1])
      if (e > 20) {
        e -= 20
        x /= Math.pow(10, e)
        x += new Array(e + 1).join('0')
      }
    }
    return this.roundUp(Number(x), 2)
  }
}
