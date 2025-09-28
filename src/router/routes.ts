import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/favorites' },
      { path: 'favorites', component: () => import('pages/FavoritesPage.vue') },
      { path: 'radistions', component: () => import('pages/RadistionsPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') }
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
