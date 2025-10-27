import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/space' },
      { path: 'space', component: () => import('pages/SpacePage.vue'), meta: { public: true } },
      { path: 'station/:slug', component: () => import('pages/RadioStationStatusPage.vue'), meta: { public: true } },
      { path: 'player/:slug', component: () => import('pages/PlayerPage.vue'), meta: { public: true } },
      { path: 'radiostations', component: () => import('pages/RadioStationsPage.vue'), meta: { requiresAuth: true } },
      { path: 'radiostations/:id', component: () => import('pages/RadioStationFormPage.vue'), meta: { requiresAuth: true } },
      { path: 'fragments', component: () => import('pages/SoundFragmentsPage.vue'), meta: { requiresAuth: true } },
      { path: 'fragments/:id', component: () => import('pages/SoundFragmentFormPage.vue'), meta: { requiresAuth: true } },
      { path: 'listeners', component: () => import('pages/ListenersPage.vue'), meta: { requiresAuth: true } },
      { path: 'listeners/:id', component: () => import('pages/ListenerFormPage.vue'), meta: { requiresAuth: true } },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue'), meta: { requiresAuth: true } },
      { path: 'profile', component: () => import('pages/ProfilePage.vue'), meta: { public: true } },
      { path: 'login', component: () => import('pages/LoginPage.vue'), meta: { public: true } },
      { path: 'register', component: () => import('pages/RegisterPage.vue'), meta: { public: true } }
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
