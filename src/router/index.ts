import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { keycloak, keycloakReady } from 'src/boot/keycloak';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Global auth guard
  Router.beforeEach(async (to) => {
    // ensure Keycloak init (check-sso) completed so authenticated flag is correct
    await keycloakReady
    // Handle root entry: if unauthenticated, go straight to hosted Keycloak login
    if (to.path === '/') {
      if (keycloak.authenticated) return '/favorites'
      await keycloak.login({ redirectUri: window.location.origin + '/' })
      return false
    }

    // If someone navigates to '/login', trigger hosted login instead of rendering a page
    if (to.path === '/login') {
      await keycloak.login({ redirectUri: window.location.origin + '/' })
      return false
    }
    const tail = to.matched[to.matched.length - 1]
    const isPublic = tail?.meta.public === true
    const requiresAuth = tail?.meta.requiresAuth === true

    if (isPublic || !requiresAuth) return true

    // If not authenticated, redirect to hosted Keycloak login
    if (!keycloak.authenticated) {
      await keycloak.login({ redirectUri: window.location.origin + '/' })
      return false
    }

    return true
  })

  return Router;
});
