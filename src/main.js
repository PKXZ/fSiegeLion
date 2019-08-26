import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import antDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
Vue.use(antDesignVue);

import echarts from 'echarts'
import 'echarts/theme/macarons.js'
Vue.prototype.$echarts = echarts;
/*颜色选择器插件*/
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker);
/*在线代码编辑器*/
/*import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodemirror);*/
/*ckeditor*/
import CKEditor from '@ckeditor/ckeditor5-vue';
Vue.use( CKEditor );

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
