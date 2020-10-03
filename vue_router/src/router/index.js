import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/route',
    name: 'RoutedTo',
    // route level code-splitting
    // see more regarding code-splitting on the webpack site 
    // this generates a separate chunk (route.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* this is a magic comment, provided by webpack to help with debugging. */ '../views/RoutedTo.vue'),
    children: [
      {
        path: '/nestedroute',
        name: "NestedRoute",
        component: () => import('../views/NestedRoute')
      }
    ]
  },
  {
    path: '/nextroute',
    name: 'RoutesToNext',
    props: true,
    component: () => import(/* webpackChunkName: "nextroute" */ '../views/RoutedToNext.vue')
  },
  {
    path: '/badId',
    name: "badId",
    component: () => import('../views/Id')
  },
  {
    // automatically adapt to the id param
    path: '/id/:id',
    name: "id",
    component: () => import('../views/Id')
  },
]

const router = new VueRouter({
  routes,
  // this removes the # from the url by using the history.pushState API to prevent page reloads on url change
  mode: "history",
})

export default router
