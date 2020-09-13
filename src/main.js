import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/element'
import './style/base.scss'
import './utils/request'
import moment from 'moment'

Vue.config.productionTip = false

Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
