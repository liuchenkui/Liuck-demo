import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import ('../views/loginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children:[
      {
        path: '/index',
        name: 'Index',
        component: () => import ('../views/indexView.vue')
      },
      {
        path: '/member',
        name: 'Member',
        component: () => import ('../views/memberView.vue')
      },
      {
        path: '/supplier',
        name: 'Supplier',
        component: () => import ('../views/supplierView.vue')
      },
      {
        path: '/commodity',
        name: 'Commodity',
        component: () => import ('../views/commodityView.vue')
      },
      {
        path: '/staff',
        name: 'Staff',
        component: () => import ('../views/staffView.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 导航守卫
router.beforeEach((to,from,next) => {
  const token = sessionStorage.getItem('token')
  if(token && to.path == "/login"){
    return next('/index')
  }
  if(!token && to.path == "/index"){
    return next('/login')
  }
  next()
})

export default router
