import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress';
import "nprogress/nprogress.css";

// Custom component
import Home from '../views/Home.vue'
import CreateService from '../views/admin/services/Create.vue'
import EditService from '../views/admin/services/Edit.vue'
import ListService from '../views/admin/services/List.vue'
import Users from '../views/admin/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/views/error/404.vue")
  },
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
    path: '/contact',
    name: 'Contact',
    component: () => import("@/views/Contact.vue"),
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: "/admin/login",
    component: () => import("@/views/admin/Index.vue"),
    children: [
      {
        path: '/admin/login',
        name: 'Login',
        component: () => import('@/views/admin/Login.vue'),
        meta: {
          title: 'Se connecter',
          guest: true
        }
      },
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/admin/services/list',
        name: 'Services/List',
        component: ListService,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/services/create',
        name: 'Service/Create',
        component: CreateService,
        meta: { requiresAuth: true }
      },
      {
        path: '/admin/services/edit/:id',
        name: 'Service/Edit',
        component: EditService,
        meta: { requiresAuth: true }
      },
      {
        path: '/admin/users/',
        name: 'Users',
        component: Users,
        meta: { requiresAuth: true }
      },
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: "/admin/login",
        params: {
          nextUrl: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("jwt") == null) {
      next();
    } else {
      next({
        name: "Dashboard"
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
  const newTitle = `${webPageName} - ${to.meta.title}`;

  document.title = newTitle;
})

export default router
