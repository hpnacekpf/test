import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'blog'

const Article = DynamicImport(() => import('./article/index'))
const Category = DynamicImport(() => import('./category/index'))

export const nav = [
  {
    component: Article,
    isProtected: false,
    path: `/blog/p/:slug`
  },
  {
    component: Category,
    isProtected: false,
    path: `/blog/c/:slug`
  },
  {
    component: Category,
    isProtected: false,
    path: `/blog`
  }
]

export const { blogRoutes, blogResources, blogNav } = createNav({
  name: navName,
  nav: nav
})
