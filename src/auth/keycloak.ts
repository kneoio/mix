import Keycloak, { type KeycloakInitOptions } from 'keycloak-js'
import { Capacitor } from '@capacitor/core'

const isNative = Capacitor.isNativePlatform()

// Keycloak config provided by you
const keycloak = new Keycloak({
  url: 'https://auth.semantyca.com/',
  realm: 'mixpla',
  clientId: 'mixpla_mobile'
})

export const keycloakInitOptions = {
  onLoad: 'check-sso',
  pkceMethod: 'S256',
  checkLoginIframe: false,
  silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`
} as KeycloakInitOptions

export function getRedirectUri(path = '/') {
  return isNative ? `capacitor://localhost${path}` : `${window.location.origin}${path}`
}

export default keycloak
