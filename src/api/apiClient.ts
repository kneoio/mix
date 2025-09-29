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

// Convenience exports for special absolute endpoints (no /api prefix)
export const absoluteApi = {
  radioAllStations: `${baseWithoutApi}/radio/all-stations`
}

export default apiClient
