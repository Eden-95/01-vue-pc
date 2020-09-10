import Vue from 'vue'
import VueRouter from 'vue-router'
// 同步的方式
// import Index from 'Index.vue'
// 异步的方式
const Index = () => import('../views/Index.vue')
const Login = () => import('../views/Login.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index, name: 'index' },
  { path: '/login', component: Login, name: 'login' }
]

const router = new VueRouter({
  routes
})

export default router
