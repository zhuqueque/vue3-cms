import router from './router'
import store from './store'
import { isCheck } from './api/sys'

// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  const { data } = await isCheck()
  if (data.code === 0 && data.data._id) {
    // 不允许进入login页面
    if (to.path === '/login') {
      next('/')
    } else {
      if (router.getRoutes().length > 6 && to.path) {
        next()
      } else {
        const { permission } = data.data
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        next({
          ...to,
          replace: true
        })
      }
    }
  } else { // 当前未登录
    // 是否在白名单里
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
