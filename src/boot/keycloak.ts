import { boot } from 'quasar/wrappers'
import keycloak, { keycloakInitOptions } from 'src/auth/keycloak'
import { Capacitor } from '@capacitor/core'

let _resolveReady: (v: boolean) => void
export const keycloakReady: Promise<boolean> = new Promise(resolve => { _resolveReady = resolve })

export default boot(async () => {
  if (Capacitor.isNativePlatform()) {
    _resolveReady(false)
    return
  }
  
  try {
    const ok = await keycloak.init(keycloakInitOptions)
    _resolveReady(ok)
  } catch (err) {
    console.warn('[Keycloak] init failed, using native auth flow:', err)
    _resolveReady(false)
  }
})

export { keycloak }
