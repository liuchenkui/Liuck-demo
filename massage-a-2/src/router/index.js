import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/faculty',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/faculty',
        name: 'Faculty',
        component: () => import ('../views/facultyView.vue')
      },
      {
        path: '/trainer',
        name: 'Trainer',
        component: () => import ('../views/TrainerView.vue')
      },
      {
        path: '/assistant',
        name: 'Assistant',
        component: () => import ('../views/assistantView.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
