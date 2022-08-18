import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: "/table",
    children: [
      {
        path: "/table",
        name: "Table",
        meta: {
          name: "基础表格"
        },
        component: () => import("../views/tableView.vue")
      },
      {
        path: "/tab",
        name: "Tab",
        meta: {
          name: "tab选项卡"
        },
        component: () => import("../views/tabView.vue")

      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
