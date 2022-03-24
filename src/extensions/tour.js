import { isServer } from "utils/client-api"

export const scrollToPos = (element) => {
  if (!isServer) {
    if (element) {
      const current = document.querySelector(`.${element}`)
      if (current) {
        current.scrollIntoView({ block: 'center' })
      }
    } else {
      window.scrollTo({ top: 0 })
    }
  }
}

export const openMenu = () => {
  if (document.querySelector('.drawer-open') == null )
    document.querySelector('.menuLeft__drawer-handle').click()
}

export const closeMenu = () => {
  if (document.querySelector('.drawer-open') !== null )
    document.querySelector('.menuLeft__drawer-handle').click()
}

export const openDropdownProfile = () => {
  if (document.querySelector('.ant-dropdown-open.dropdown-menu-profile') == null ) {
    document.querySelector(".dropdown-menu-profile").click()
  }
}

export const closeDropdownProfile = () => {
  if (document.querySelector('.ant-dropdown-open.dropdown-menu-profile') !== null ) {
    document.querySelector(".dropdown-menu-profile").click()
  }
} 

export const openCalendar = () => {
  if ( document.querySelector('.ant-calendar-picker-container.ant-calendar-picker-container-placement-bottomLeft') == null) {
    document.querySelector('.ant-calendar-range-picker-input').click()
  }
}

export const closeCalendar = () => {
  setTimeout( () => {
    if ( document.querySelector('.ant-calendar-picker-container.ant-calendar-picker-container-placement-bottomLeft') !== null) {
      document.querySelector('.ant-calendar-range-picker-input').click()
    }
  },200)
}

export const delayOpenMenu = ms => new Promise(res => {
  openMenu()
  closeDropdownProfile()
  setTimeout(res, ms)
})

export const delayCloseCalendar = ms => new Promise(res => {
  closeCalendar()
  setTimeout(res, ms)
})

export const delayOpenCalendar = ms => new Promise(res => {
  openCalendar()
  setTimeout(res, ms)
})