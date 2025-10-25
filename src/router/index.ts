import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { keycloak, keycloakReady } from 'src/boot/keycloak';
import { Capacitor } from '@capacitor/core';
import { nativeAuth } from 'src/auth/nativeAuth';

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
    const isNative = Capacitor.isNativePlatform()
    
    if (isNative) {
      nativeAuth.loadFromStorage()
      
      if (to.path === '/') {
        return nativeAuth.isAuthenticated ? '/radiostations' : '/space'
      }

      const tail = to.matched[to.matched.length - 1]
      const isPublic = tail?.meta.public === true
      const requiresAuth = tail?.meta.requiresAuth === true

      if (isPublic || !requiresAuth) return true

      if (!nativeAuth.isAuthenticated) {
        return '/login'
      }

      return true
    }

    await keycloakReady
    nativeAuth.loadFromStorage()

    const isWebAuthenticated = keycloak.authenticated || nativeAuth.isAuthenticated

    if (to.path === '/') {
      return isWebAuthenticated ? '/radiostations' : '/space'
    }

    const tail = to.matched[to.matched.length - 1]
    const isPublic = tail?.meta.public === true
    const requiresAuth = tail?.meta.requiresAuth === true

    if (isPublic || !requiresAuth) return true

    if (!isWebAuthenticated) {
      return '/login'
    }

    return true
  })

  return Router;
});
