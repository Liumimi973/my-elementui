import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'






import axios from 'axios'

import './permission.js'
//import Vuex from 'vuex'

import store from '../src/store/index'


//Vue.use(Vuex)



Vue.prototype.axios = axios

Vue.config.productionTip = false

Vue.use(ElementUI)

//Vue.prototype.$echarts = echarts

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
