import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import ElementUi from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import fullscreen from 'vue-fullscreen'
Vue.use(fullscreen)

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUi)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
