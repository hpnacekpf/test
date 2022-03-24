import { getUrlByUser } from 'extensions/url'
import { routes } from 'routes/mainNav'

export const menuLeft = ({
  categories,
  user,
  unreadChat,
  unreadOrder,
  handleClick
}) => {
  return [
    {
      title: 'Home',
      key: 'Home',
      url: routes.HOME,
      icon: 'icmn icmn-home',
      iconRight: true,
      isAuth: false,
      divider: false,
      isTextBold: true,
      isUppercase: true
    },
    {
      title: 'Chats',
      key: 'Chats',
      url: routes.CHAT,
      icon: 'icmn icmn-bubbles',
      iconRight: true,
      isAuth: true,
      divider: true,
      isTextBold: true,
      badge: true,
      countBadge: unreadChat ?? 0,
      isUppercase: true,
      customClass: 'menu-chats'
    },
    {
      title: 'Transactions',
      key: 'Transactions',
      url: routes.TRANSACTIONS,
      icon: 'icmn icmn-cart',
      iconRight: true,
      isAuth: true,
      divider: true,
      isTextBold: true,
      badge: true,
      countBadge: unreadOrder ?? 0,
      isUppercase: true,
      customClass: 'menu-transactions'
    },
    {
      title: 'LISTINGS',
      key: 'LISTINGS',
      url: user ? getUrlByUser(user) : routes.PROFILE,
      icon: 'icmn icmn-books',
      iconRight: true,
      isAuth: true,
      divider: true,
      isTextBold: true,
      isUppercase: true,
      customClass: 'menu-listings'
    },
    {
      title: 'WISH LIST',
      key: 'WISH LIST',
      url: routes.WISH_LIST,
      icon: 'icmn icmn-heart',
      iconRight: true,
      isAuth: true,
      divider: true,
      isTextBold: true,
      isUppercase: true,
      customClass: 'menu-wishlist'
    },
    {
      title: 'NOTIFICATIONS SETTINGS',
      key: 'NOTIFICATIONS SETTINGS',
      url: routes.NOTIFICATION,
      icon: 'icmn icmn-cog',
      iconRight: true,
      isAuth: true,
      divider: true,
      isTextBold: true,
      isUppercase: true,
      customClass: 'menu-notifications-settings'
    },
    {
      title: 'TUTORIALS',
      key: 'TUTORIALS',
      // url: mainRoutes.HOME,
      icon: 'icmn icmn-book',
      iconRight: true,
      isAuth: false,
      divider: true,
      isTextBold: true,
      isUppercase: true,
      handleClick: handleClick
    },
    {
      title: 'CATEGORIES',
      key: 'CATEGORIES',
      children: categories,
      icon: 'icmn icmn-list-numbered',
      isAuth: false,
      divider: true,
      isTextBold: true,
      isUppercase: true
    }
  ]
}
