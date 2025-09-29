import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/radistions' },
      { path: 'favorites', component: () => import('pages/FavoritesPage.vue'), meta: { requiresAuth: true } },
      { path: 'radistions', component: () => import('pages/RadistionsPage.vue'), meta: { public: true } },
      { path: 'profile', component: () => import('pages/ProfilePage.vue'), meta: { requiresAuth: true } },
      { path: 'login', component: () => import('pages/LoginPage.vue'), meta: { public: true } }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
