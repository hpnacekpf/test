import {
  scrollToPos,
  closeMenu,
  openDropdownProfile,
  delayOpenMenu,
  delayCloseCalendar,
  delayOpenCalendar
} from '../extensions/tour'

export const homepageDesktop = [
  {
    selector: '.lendor-logo-topbar',
    content: `Welcome to Lendor, home to thousands of consumer products for short term use. Here's a quick tour!`,
    actionBefore: () => scrollToPos('lendor-logo-topbar')
  },
  {
    selector: '.menuLeft',
    content: `Here's where you navigate through 24 product categories and toggle this tutorial on and off.`
  },
  {
    selector: '.menuLeft__logo',
    content: `Collapse this menu to enjoy a wider browsing screen area.`
  },
  {
    selector: '.box-search',
    content: `Search for products you wish to rent or stores that are onboard Lendor.`,
    actionBefore: () => scrollToPos('box-search')
  },
  {
    selector: '.btn-whatsapp',
    content: `If you need any help, Isabelle will be here to respond to you!`
  },
  {
    selector: '.btn-signup',
    content: `Join this vibrant community by signing up here!`,
    actionBefore: () => scrollToPos('btn-signup')
  }
]

export const homepageMobile = [
  {
    selector: '.lendor-logo-topbar',
    content: `Welcome to Lendor, home to thousands of consumer products for short term use. Here's a quick tour!`,
    actionBefore: () => {
      closeMenu()
      scrollToPos('lendor-logo-topbar')
    }
  },
  {
    selector: '.drawer-content-wrapper',
    content: `Here's where you navigate through 24 product categories and toggle this tutorial on and off.`,
    actionBefore: async () => {
      await delayOpenMenu(350)
      scrollToPos('drawer-content-wrapper')
    }
  },
  {
    selector: '.menuLeft__drawer-handle',
    content: `Collapse this menu to enjoy a wider browsing screen area.`,
    actionBefore: () => {
      closeMenu()
      scrollToPos('menuLeft__drawer-handle')
    }
  },
  {
    selector: '.box-search-mobile',
    content: `Search for products you wish to rent or stores that are onboard Lendor.`,
    actionBefore: () => {
      closeMenu()
      scrollToPos('box-search-mobile')
    }
  },
  {
    selector: '.btn-whatsapp',
    content: `If you need any help, Isabelle will be here to respond to you!`,
    actionBefore: () => closeMenu()
  },
  {
    selector: '.btn-signup',
    content: `Join this vibrant community by signing up here!`,
    actionBefore: () => {
      closeMenu()
      scrollToPos('btn-signup')
    }
  }
]

//overview when logged first time
export const userOverview = [
  {
    selector: '.menuLeft',
    content: `Welcome! As a signed up user, you notice there are more features you can use and they are all here!`
  },
  {
    selector: '.menu-chats',
    content: `Keep track of all your conversations with both Lendors. You have an unread message from us!`
  },
  {
    selector: '.menu-transactions',
    content: `View your transaction history and status for all your rentals!`
  },
  {
    selector: '.menu-listings',
    content: `Here's where you can see all the products you have listed for rent.`
  },
  {
    selector: '.menu-wishlist',
    content: `Keep a wishlist of items you wish to rent so you don't lose it.`
  },
  {
    selector: '.menu-notifications-settings',
    content: `Set your email and SMS notification settings so you don't miss any messages.`
  },
  {
    selector: '.menu-edit-profile',
    content: `Edit your store or profile details here.`,
    actionBefore: () => {
      openDropdownProfile()
      scrollToPos('menu-edit-profile')
    }
  },
  {
    selector: '.lend-btn-displayed',
    content: `Share your first item with the community here!`,
    actionBefore: () => {
      scrollToPos('lend-btn-displayed')
    }
  }
]

// userOverview mobile
export const userOverviewMoblie = [
  {
    selector: '.drawer-content-wrapper',
    content: `Welcome! As a signed up user, you notice there are more features you can use and they are all here!`,
    actionBefore: async () => await delayOpenMenu(350)
  },
  {
    selector: '.menu-chats',
    content: `Keep track of all your conversations with both Lendors. You have an unread message from us!`,
    actionBefore: async () => await delayOpenMenu(350)
  },
  {
    selector: '.menu-transactions',
    content: `View your transaction history and status for all your rentals!`,
    actionBefore: async () => await delayOpenMenu(350)
  },
  {
    selector: '.menu-listings',
    content: `Here's where you can see all the products you have listed for rent.`,
    actionBefore: async () => await delayOpenMenu(350)
  },
  {
    selector: '.menu-wishlist',
    content: `Keep a wishlist of items you wish to rent so you don't lose it.`,
    actionBefore: async () => await delayOpenMenu(350)
  },
  {
    selector: '.menu-notifications-settings',
    content: `Set your email and SMS notification settings so you don't miss any messages.`,
    actionBefore: async () => await delayOpenMenu(350)
  },
  {
    selector: '.menu-edit-profile',
    content: `Edit your store or profile details here.`,
    actionBefore: () => {
      scrollToPos()
      openDropdownProfile()
      closeMenu()
    }
  },
  {
    selector: '.btn-lend-mobile',
    content: `Share your first item with the community here!`,
    actionBefore: () => {
      scrollToPos()
      openDropdownProfile()
      closeMenu()
    }
  }
]

export const productTourMobile = (product) => {
  let productTour = [
    {
      selector: '.image-gallery',
      content: `Perhaps you wish to rent this item?`,
      actionBefore: () => scrollToPos('image-gallery')
    }
  ]

  if (document.querySelector('.ant-calendar-picker-input') != null)
    productTour.push({
      selector: '.ant-calendar-range-with-ranges',
      content: `Select the dates you wish to rent. Unavailable dates will be greyed out.`,
      actionBefore: async () => {
        await delayOpenCalendar(100)
        scrollToPos('ant-calendar-range-with-ranges')
      }
    })

  if (!product) return productTour

  if (document.querySelector('.lpp') != null) {
    productTour.push({
      selector: '.lpp',
      content: `Opt in for our exclusive Lendor Protection Guarantee so you don't have to pay any deposits. If you don't see it, means this user is not under our LPG program.`,
      actionBefore: async () => {
        await delayCloseCalendar(230)
        scrollToPos('lpp')
      }
    })
  }

  if (product.discount.monthly !== 0 || product.discount.weekly !== 0) {
    productTour.push({
      selector: '.discount',
      content: `Notice the generous weekly & monthly discount, perhaps you should consider a longer rental!`,
      actionBefore: async () => {
        await delayCloseCalendar(230)
        scrollToPos('discount')
      }
    })
  }

  if (
    document.querySelector('.btn-footer-mobile-chat') !== null &&
    document.querySelector('.btn-footer-mobile-deal') !== null
  ) {
    productTour.push(
      {
        selector: '.btn-footer-mobile-chat',
        content: `If you wish to find out more about the product, chat with the product owner!`,
        actionBefore: async () => await delayCloseCalendar(230)
      },
      {
        selector: '.btn-footer-mobile-deal',
        content: `Else let's deal and checkout!`,
        actionBefore: async () => await delayCloseCalendar(230)
      }
    )
  }

  return productTour
}

export const productTourDesktop = (product) => {
  let productTour = [
    {
      selector: '.image-gallery',
      content: `Perhaps you wish to rent this item?`,
      actionBefore: async () => {
        scrollToPos('image-gallery')
        await delayCloseCalendar(230)
      }
    }
  ]

  if (document.querySelector('.ant-calendar-picker-input') != null)
    productTour.push({
      selector: '.ant-calendar-range-with-ranges',
      content: `Select the dates you wish to rent. Unavailable dates will be greyed out.`,
      actionBefore: async () => {
        await delayOpenCalendar(230)
        scrollToPos('ant-calendar-range-with-ranges')
      }
    })

  if (!product) return productTour

  if (document.querySelector('.lpp') != null) {
    productTour.push({
      selector: '.lpp',
      content: `Opt in for our exclusive Lendor Protection Guarantee so you don't have to pay any deposits. If you don't see it, means this user is not under our LPG program.`,
      actionBefore: async () => {
        await delayCloseCalendar(230)
        scrollToPos('lpp')
      }
    })
  }

  if (product.discount.monthly !== 0 || product.discount.weekly !== 0) {
    productTour.push({
      selector: '.discount',
      content: `Notice the generous weekly & monthly discount, perhaps you should consider a longer rental!`,
      actionBefore: async () => {
        await delayCloseCalendar(230)
        scrollToPos('discount')
      }
    })
  }

  if (
    document.querySelector('.btn-footer-desktop-chat') !== null &&
    document.querySelector('.btn-footer-desktop-deal') !== null
  ) {
    productTour.push(
      {
        selector: '.btn-footer-desktop-chat',
        content: `If you wish to find out more about the product, chat with the product owner!`,
        actionBefore: async () => {
          await delayCloseCalendar(230)
          scrollToPos('btn-footer-desktop-chat')
        }
      },
      {
        selector: '.btn-footer-desktop-deal',
        content: `Else let's deal and checkout!`,
        actionBefore: async () => {
          await delayCloseCalendar(230)
          scrollToPos('btn-footer-desktop-deal')
        }
      }
    )
  }

  return productTour
}

export const tourHome = {
  mobile: homepageMobile,
  desktop: homepageDesktop
}

export const tourProductDetail = (product) => {
  return {
    mobile: productTourMobile(product),
    desktop: productTourDesktop(product)
  }
}

export const tourUserOverview = {
  mobile: userOverviewMoblie,
  desktop: userOverview
}
