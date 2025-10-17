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
        if (window?.location?.pathname !== '/space') {
          window.location.assign('/space')
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

export const absoluteApi = {
  radioAllStations: `${publicApi}/radio/all-stations`
}

export default apiClient
