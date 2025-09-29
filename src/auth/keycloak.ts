import Keycloak from 'keycloak-js'
import type { KeycloakInitOptions } from 'keycloak-js'

// Keycloak config provided by you
const keycloak = new Keycloak({
  url: 'https://auth.kneo.io/',
  realm: 'semantyca',
  clientId: 'mixpla'
})

// Recommended init options
export const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: 'check-sso',
  pkceMethod: 'S256',
  checkLoginIframe: true,
  silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`
}

export default keycloak
