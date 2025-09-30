import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/radiostations' },
      { path: 'favorites', component: () => import('pages/FavoritesPage.vue'), meta: { requiresAuth: true } },
      { path: 'radiostations', component: () => import('pages/RadioStationsPage.vue'), meta: { public: true } },
      { path: 'fragments', component: () => import('pages/SoundFragmentsPage.vue'), meta: { requiresAuth: true } },
      { path: 'profile', component: () => import('pages/ProfilePage.vue'), meta: { public: true } }
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
