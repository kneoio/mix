// Global augmentation for Vue Router route meta
// Ensures `route.meta.public` and `route.meta.requiresAuth` are typed everywhere
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    public?: boolean
    requiresAuth?: boolean
  }
}
