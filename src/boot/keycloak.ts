import { boot } from 'quasar/wrappers'
import keycloak, { keycloakInitOptions } from 'src/auth/keycloak'

let _resolveReady: (v: boolean) => void
export const keycloakReady: Promise<boolean> = new Promise(resolve => { _resolveReady = resolve })

export default boot(async () => {
  try {
    const ok = await keycloak.init(keycloakInitOptions)
    _resolveReady(ok)
  } catch (err) {
    console.error('[Keycloak] init error', err)
    _resolveReady(false)
  }
})

export { keycloak }
