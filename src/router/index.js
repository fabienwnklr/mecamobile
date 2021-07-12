import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import("@/views/Services.vue"),
  },
  {
    path: '/detail',
    name: 'Detail service',
    component: () => import("@/views/DetailService.vue"),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import("@/views/Contact.vue"),
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
})

export default router
