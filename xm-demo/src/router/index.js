import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Vuex_index from "../store/index"
Vue.use(VueRouter)
// 解决：Uncaught (in promise) NavigationDuplicated; 
let originalPush = VueRouter.prototype.push; // 先保存一份 VueRouter.prototype.push方法
let originalRepace = VueRouter.prototype.replace;

VueRouter.prototype.push = function push(location) {
 // call(); 篡改上下文    catch(); 捕获异常 **** 
 return originalPush.call(this, location).catch(e => e);
}
VueRouter.prototype.replace = function replace(location) {
 return originalRepace.call(this, location).catch(e => e);
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/allGoods',
        name: 'AllGoods',
        component: () => import('../views/allGoods.vue'),
      },
      {
        path: '/aboutUs',
        name: 'aboutUs',
        component: () => import('../views/aboutUs.vue')
      },
      {
        path: '/goods/details',
        name: 'Details',
        component: () => import('../views/details.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/order.vue')
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/cartView.vue')
      },
      {
        path: '/collect',
        name: 'collect',
        component: () => import('../views/collect.vue')
      },
      {
        path: '/confirmOrder',
        name: 'confirmOrder',
        component: () => import('../views/confirmOrder.vue')
      }
    ]
  },

]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next) => {
  // console.log(Vuex_index.state);
  if (to.path == '/order' && !Vuex_index.state.user.userName
    || to.path == '/cart' && !Vuex_index.state.user.userName
    || to.path == '/collect' && !Vuex_index.state.user.userName) {
    Vuex_index.commit('openLoginDialog',0)
    next('/')
  } else {
    next()
  }
  next()
})
export default router
