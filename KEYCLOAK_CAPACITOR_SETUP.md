# Keycloak + Capacitor Android Setup

## Keycloak Client Configuration

In your Keycloak admin console for the `mixpla` client in the `semantyca` realm, ensure the following URIs are configured:

### Valid Redirect URIs
Add these entries:
- `capacitor://localhost/*`
- `app://localhost/*`
- `https://your-web-domain.com/*` (your existing web domain)

### Valid Post Logout Redirect URIs
Add these entries:
- `capacitor://localhost/*`
- `app://localhost/*`
- `https://your-web-domain.com/*` (your existing web domain)

### Web Origins
Add these entries:
- `capacitor://localhost`
- `app://localhost`
- `https://your-web-domain.com` (your existing web domain)

## Build and Sync Commands

After code changes, run these commands to build and sync the Android project:

```bash
# Build the Quasar app for Capacitor Android
quasar build -m capacitor -T android

# Sync Capacitor (copies web assets and updates native project)
npx cap sync android
```

## Code Changes Made

1. **src/auth/keycloak.ts**
   - Added Capacitor platform detection
   - Created `getRedirectUri()` helper that returns `capacitor://localhost` for native apps
   - Disabled `checkLoginIframe` for native platforms
   - Removed `silentCheckSsoRedirectUri` for native platforms

2. **src/router/index.ts**
   - Updated all `keycloak.login()` calls to use `getRedirectUri()`

3. **src/pages/ProfilePage.vue**
   - Updated `keycloak.logout()` to use `getRedirectUri()`

## Testing

After building and syncing:
1. Install the APK on your Android device
2. Test login flow - should redirect back to app after Keycloak authentication
3. Test logout flow - should redirect back to app after logout
4. Verify no overlap with status bar (already fixed with safe-area-inset-top)
