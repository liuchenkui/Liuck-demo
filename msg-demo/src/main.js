import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 配置请求的跟路径
axios.defaults.baseURL = "https://api.imooc-admin.lgdsunday.club/api";
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
Vue.prototype.$axios = axios;
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
