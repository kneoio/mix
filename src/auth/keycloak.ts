import Keycloak, { type KeycloakInitOptions } from 'keycloak-js'
import { Capacitor } from '@capacitor/core'

const isNative = Capacitor.isNativePlatform()

// Keycloak config provided by you
const keycloak = new Keycloak({
  url: 'https://auth.kneo.io/',
  realm: 'semantyca',
  clientId: 'mixpla'
})

export const keycloakInitOptions = {
  onLoad: isNative ? 'login-required' : 'check-sso',
  pkceMethod: 'S256',
  checkLoginIframe: !isNative,
  ...(isNative ? { adapter: 'capacitor', responseMode: 'query', redirectUri: 'capacitor://localhost/' } : { silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html` })
} as KeycloakInitOptions

export function getRedirectUri(path = '/') {
  return isNative ? `capacitor://localhost${path}` : `${window.location.origin}${path}`
}

export default keycloak
