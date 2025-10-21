import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { keycloak } from 'src/boot/keycloak'

export const apiServer: string = import.meta.env.VITE_API_SERVER || '/api'
export const publicApi =  import.meta.env.VITE_PUBLIC_API_SERVER

export const unsecuredClient: AxiosInstance = axios.create({
  baseURL: publicApi,
  withCredentials: false,
  headers: {
    'X-Client-ID': 'mixpla-web',
    'X-Mixpla-App': 'mixpla-mobile'
  }
})

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

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status
    if (status === 401 || status === 403) {
      try {
        const msg = status === 401 ? 'Your session has expired. Please sign in again.' : 'You are not authorized to perform this action.'
        if (typeof window !== 'undefined' && window.alert) window.alert(msg)
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
    // Generic alert for other 4xx (avoid double-alert for 400 which is handled by form flows)
    if (status >= 400 && status < 500 && status !== 401 && status !== 403 && status !== 400) {
      try {
        const data = error?.response?.data
        const text = typeof data === 'string'
          ? data
          : (data?.detail || data?.title || data?.message || 'Request failed')
        if (typeof window !== 'undefined' && window.alert) window.alert(String(text))
      } catch { /* ignore */ }
    }
    if (error instanceof Error) {
      return Promise.reject(error)
    }
    const fallback = (typeof error === 'string')
      ? new Error(error)
      : new Error(error?.message ? String(error.message) : 'Request failed')
    return Promise.reject(fallback)
  }
)

export const absoluteApi = {
  radioAllStations: `${publicApi}/radio/all-stations`
}

export default apiClient
