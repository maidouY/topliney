import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // import xxx from xxx      模块化导入
  // import(xxx)     函数调用    好处按需导入，节省资源
  // @符号代表src目录的绝对路径名地址
  // index.vue是默认索引文件，不用设置，代码更节省、更优雅
  // name属性作用：编程式导航可以利用
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  { path: '/home', name: 'home', component: () => import('@/views/home') }
]

const router = new VueRouter({
  routes
})

// 守卫
router.beforeEach((to, from, next) => {
  // 用户如果是非登录状态，还要访问其他页面，强制登录
  let userinfo = window.sessionStorage.getItem('userinfo')
  if (!userinfo && to.path !== '/login') {
    return next('/login')
  }
  next()
})

export default router
