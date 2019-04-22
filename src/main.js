import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/globle.css'

import axios from './http/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'

Vue.prototype.$http = axios

Vue.use(ElementUI, {size: 'small'})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  $http: axios,
  render: h => h(App)
})
