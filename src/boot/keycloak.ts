import { boot } from 'quasar/wrappers'
import keycloak, { keycloakInitOptions } from 'src/auth/keycloak'

let _resolveReady: (v: boolean) => void
export const keycloakReady: Promise<boolean> = new Promise(resolve => { _resolveReady = resolve })

// Initialize Keycloak on app boot so it can handle SSO and session
export default boot(async () => {
  try {
    const ok = await keycloak.init(keycloakInitOptions)
    _resolveReady(ok)
  } catch (err) {
    // Non-fatal: app can still render, guard will redirect to login on protected routes
    console.error('[Keycloak] init error', err)
    _resolveReady(false)
  }
})

export { keycloak }
