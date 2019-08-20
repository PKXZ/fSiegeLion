import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

import axios from './config/axiosConfig'
import baseUrl from './config/api';
Vue.prototype.api = baseUrl;
Vue.use(axios, axios)
Vue.prototype.axios = axios;

import './assets/font/iconfont.css'

import './assets/css/common.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
