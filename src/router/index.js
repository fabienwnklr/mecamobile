import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress';
import "nprogress/nprogress.css";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Accueil',
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
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: "/admin/login",
    component: () => import("@/views/admin/Index.vue"),
    meta: {
      guest: true
    },
    children: [
      {
        path: '/admin/login', name: 'Login', component: () => import('@/views/admin/Login.vue')
      },
      {
        path: '/admin/dashboard', name: 'Dashboard', component: () => import('@/views/admin/Dashboard.vue'), meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'active',
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const userItem = localStorage.getItem("user");
  let user = userItem !== null ? JSON.parse(userItem) : undefined;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: "/admin/login",
        params: {
          nextUrl: to.fullPath
        }
      });
    } else {
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user !== "undefined" && user.is_admin == 1) {
          next();
        } else {
          next({
            name: "home"
          });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("jwt") == null) {
      next();
    } else {
      next({
        name: "home"
      });
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

router.afterEach((to) => {
  const currentTitle = document.title;
  const webPageName = currentTitle.split('-')[0];
  const newTitle = `${webPageName} - ${to.name}`;

  document.title = newTitle;
})

export default router
