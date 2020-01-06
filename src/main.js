import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/global.css'
// import 'element-ui/lib/theme-chalk/index.css'

import ElementUI from 'element-ui'

import axios from 'axios'
Vue.use(ElementUI)

// 配置后端服务器接口公共根地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
