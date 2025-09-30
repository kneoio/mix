import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { keycloak } from 'src/boot/keycloak'

// Base API server. Adjust if your backend differs.
export const apiServer: string = import.meta.env.VITE_API_SERVER || '/api'

// Helper: build absolute base without trailing /api for endpoints that are not prefixed
const baseWithoutApi = apiServer.replace(/\/api\/?$/, '')

// Unsecured client: no auth headers
export const unsecuredClient: AxiosInstance = axios.create({
  baseURL: apiServer,
  withCredentials: true,
  headers: {
    'X-Client-ID': 'mixpla-web'
  }
})

unsecuredClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401 || status === 403) {
      try {
        if (window?.location?.pathname !== '/radiostations') {
          window.location.assign('/radiostations')
        }
      } catch { /* ignore */ }
    }
    if (status >= 500 && status <= 599) {
      try {
        const data = error?.response?.data
        const msg = typeof data === 'string'
          ? data
          : (data?.message || 'Server error. Please try again later.')
        const text = (msg && String(msg).trim().length > 0) ? String(msg) : 'Server error. Please try again later.'
        if (typeof window !== 'undefined' && window.alert) window.alert(text)
      } catch { /* ignore */ }
    }
    const err = (error instanceof Error)
      ? error
      : new Error(
          typeof error === 'string'
            ? error
            : (error?.message ? String(error.message) : JSON.stringify(error))
        )
    return Promise.reject(err)
  }
)

// Secured client: adds Bearer token from Keycloak if available
export const apiClient: AxiosInstance = axios.create({
  baseURL: apiServer,
  withCredentials: true,
  headers: {
    'X-Client-ID': 'mixpla-web'
  }
})
apiClient.interceptors.request.use((config) => {
  const token = keycloak?.token
  if (token) {
    config.headers = config.headers || {}
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Redirect to public view when session is lost or unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status
    if (status === 401 || status === 403) {
      try {
        // clear private stores before redirecting to public view
        try {
          const mod = await import('src/stores/soundFragmentsStore')
          const store = mod.useSoundFragmentsStore()
          store.reset()
        } catch { /* ignore store cleanup errors */ }
        if (window?.location?.pathname !== '/radiostations') {
          window.location.assign('/radiostations')
        }
      } catch { /* ignore */ }
    }
    // Show message for server errors (5xx). Use alert for cross-platform visibility (web/PWA/Android/iOS WebView).
    if (status >= 500 && status <= 599) {
      try {
        const data = error?.response?.data
        const msg = typeof data === 'string'
          ? data
          : (data?.message || 'Server error. Please try again later.')
        // ensure non-empty
        const text = (msg && String(msg).trim().length > 0) ? String(msg) : 'Server error. Please try again later.'
        if (typeof window !== 'undefined' && window.alert) window.alert(text)
      } catch { /* ignore */ }
    }
    const err = (error instanceof Error)
      ? error
      : new Error(
          typeof error === 'string'
            ? error
            : (error?.message ? String(error.message) : JSON.stringify(error))
        )
    return Promise.reject(err)
  }
)

// Convenience exports for special absolute endpoints (no /api prefix)
export const absoluteApi = {
  radioAllStations: `${baseWithoutApi}/radio/all-stations`
}

export default apiClient
