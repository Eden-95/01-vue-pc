import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
axios.interceptors.response.use(res => {
  if (res.data.statusCode === 401 && res.data.message === '用户信息验证失败') {
    // token验证失败
    // 删除旧信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 提示
    Message.error('token失效')
    // 跳转到登录页
    router.push('/login')
  }
  return res.data
})

Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}
