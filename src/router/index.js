import Vue from 'vue'
import VueRouter from 'vue-router'
// 同步的方式
// import Index from 'Index.vue'
// 异步的方式
const Index = () => import('../views/Index.vue')
const Login = () => import('../views/Login.vue')
const List = () => import('../views/List.vue')
const Publish = () => import('../views/Publish.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    name: 'index',
    children: [
      { path: '/', component: List, name: 'list' },
      { path: '/publish', component: Publish, name: 'publish' }
    ]
  },
  { path: '/login', component: Login, name: 'login' }
]

const router = new VueRouter({
  routes
})

// 全局的前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断to去哪
  // 如果是去登录页，直接放行
  // 如果不是，判断是否有token，有token放行，没有就去登录
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})

export default router
