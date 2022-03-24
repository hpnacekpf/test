import reduce from 'lodash/reduce'
import { WIDTH_MENU, WIDTH_MENU_LG } from 'constants/index'
import { getUrlCategory } from './url'
import { menuLeft } from 'constants/menu/menuLeft'
import { isServer } from 'utils/client-api'

export const initObjectMenuItem = (items, children, orderSubMenu) => {
  return {
    title: items.name,
    key: items.name,
    url: getUrlCategory(items),
    icon: items.menuIcon || null,
    iconRight: false,
    children: children,
    orderSubMenu: orderSubMenu || 1,
    isTextBold: items.isTextBold || false
  }
}

export const initMenuCategory = (categories, level) => {
  return categories.map((category) => {
    let children = []

    if (category.children.length > 0) {
      //sub menu in category
      const categoryChildren = [...category.children]

      categoryChildren.sort((pre, next) => pre.priority - next.priority)
      categoryChildren.map((item) => {
        children.push(initObjectMenuItem(item, [], Number(level || 1) + 2))
      })
    }

    //parent menu in category
    return initObjectMenuItem(category, children, Number(level || 1) + 1)
  })
}

export const initListMenus = ({
  categories,
  user,
  unreadChat,
  unreadOrder,
  handleClick
}) => {
  if (!categories) return menuLeft([])
  const initCategories = initMenuCategory(categories)
  return menuLeft({
    categories: initCategories,
    user,
    unreadChat,
    unreadOrder,
    handleClick
  })
}

export const menuParams = (isMobile, collapsed, onCollapse) => {
  const widthMenu = !isServer
    ? window.screen.width < 1366
      ? WIDTH_MENU
      : WIDTH_MENU_LG
    : WIDTH_MENU_LG
  return {
    width: widthMenu,
    collapsible: !isMobile,
    collapsed: isMobile ? false : collapsed,
    onCollapse: onCollapse,
    breakpoint: isMobile ? null : 'lg'
  }
}

export const getPath = (data, id, parents = [], selectedKeys) => {
  let items = reduce(
    data,
    (result, entry) => {
      if (result.length) {
        return result
      } else if (entry.url === id && selectedKeys === '') {
        return [entry].concat(parents)
      } else if (entry.key === id && selectedKeys !== '') {
        return [entry].concat(parents)
      } else if (entry.children) {
        const nested = getPath(
          entry.children,
          id,
          [entry].concat(parents),
          selectedKeys
        )
        return nested ? nested : result
      }
      return result
    },
    []
  )
  return items.length > 0 ? items.filter((item) => item) : false
}

export const defaultOpenMenu = (isMobile, menuCollapsed, openKeys) => {
  return !isMobile
    ? !menuCollapsed && openKeys === ''
      ? ['CATEGORIES']
      : openKeys
    : openKeys === ''
      ? ['CATEGORIES']
      : openKeys
}
