import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/ecom',
    name: 'ecom',
    component: function () { return import('../views/website/Ecom.vue') },
    children: [
      {
        path: '/init',
        name: 'init',
        component: function () { return import('../views/website/Init.vue') },
      },
      {
        path: '/catalogue',
        name: 'catalogue',
        component: function () { return import('../views/website/Catalogue.vue') },
      },
      {
        path: '/detail',
        name: 'detail',
        component: function () { return import('../views/website/Detail.vue') },
      },
      {
        path: '/order',
        name: 'order',
        component: function () { return import('../views/website/Order.vue') },
      },
    ]
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/categories',
        name: 'categories',
        component: function () { return import('../views/Categories.vue') }
      },
      {
        path: '/products',
        name: 'products',
        component: function () { return import('../views/Products.vue') }
      },
      {
        path: '/models',
        name: 'models',
        component: function () { return import('../views/Models.vue') }
      },
      {
        path: '/orders',
        name: 'orders',
        component: function () { return import('../views/Orders.vue') }
      },
      {
        path: '/detailorder',
        name: 'detailorder',
        component: function () { return import('../views/detailOrder.vue') }
      }
    ]
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
