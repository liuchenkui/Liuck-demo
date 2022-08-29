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
        path: "/books",
        name: "books",
        meta: {
          name: "图书管理"
        },
        component: () => import("../views/books.vue")
      },
      {
        path: "/Backstage",
        name: "Backstage",
        meta: {
          name: "后台管理"
        },
        component: () => import("../views/Backstage.vue")
      },
      {
        path: "/Internation",
        name: "Internation",
        meta: {
          name: "国际化"
        },
        component: () => import("../views/Internation.vue")
      },
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
