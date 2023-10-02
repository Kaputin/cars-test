import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import('@/views/ErrorPage/ErrorPage.vue'),
    meta: {
      layout: 'Simple',
      tKey: 'error.notFound',
    },
  },
  {
    path: '/',
    name: 'vechicles',
    component: () => import('@/views/HomePage/HomePage.vue'),
    meta: {
      layout: 'Main',
      tKey: 'header.vechicles',
    },
  },
  {
    path: '/profile/',
    name: 'profile',
    component: () => import('@/views/ProfilePage/ProfilePage.vue'),
    meta: {
      layout: 'Main',
      tKey: 'header.profile',
    },
  },
  {
    path: '/setting/',
    name: 'setting',
    component: () => import('@/views/SettingPage/SettingPage.vue'),
    meta: {
      layout: 'Main',
      tKey: 'header.setting',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/AuthPage/AuthPage.vue'),
    meta: {
      layout: 'Auth',
      tKey: 'error.notFound',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition
    return { x: 0, top: 0 }
  },
  routes,
})

export { router, routes }
