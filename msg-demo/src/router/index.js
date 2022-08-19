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
    path: '/home',
    name: 'Home',
    component: HomeView,
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/profile.vue')
      },
      {
        path: '/chart',
        name: 'chart',
        component: () => import('../views/chart.vue')
      },
      {
        path: '/user/manage',
        name: 'manage',
        component: () => import('../views/manage.vue')
      },
      {
        path: '/user/role',
        name: 'role',
        component: () => import('../views/role.vue')
      },
      {
        path: '/user/permission',
        name: 'permission',
        component: () => import('../views/permission.vue')
      },
      {
        path: '/article/ranking',
        name: 'ranking',
        component: () => import('../views/ranking.vue')
      },
      {
        path: '/article/create',
        name: 'create',
        component: () => import('../views/create.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/loginView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
