import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 配置请求的跟路径
axios.defaults.baseURL = "http://vue.mengxuegu.com/pro-api";
// http://175.27.228.178:3434/api/private/v1/
// https://www.liulongbin.top:8888/api/private/v1/
// http://vue.mengxuegu.com/pro-api
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = sessionStorage.getItem("token");
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
