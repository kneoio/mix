import axios from 'axios'
import { Capacitor } from '@capacitor/core'

interface TokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
}

interface UserInfo {
  sub: string
  email?: string
  preferred_username?: string
  name?: string
}

class NativeAuth {
  private accessToken: string | null = null
  private refreshToken: string | null = null
  private userInfo: UserInfo | null = null

  get isAuthenticated(): boolean {
    return !!this.accessToken
  }

  get token(): string | null {
    return this.accessToken
  }

  get user(): UserInfo | null {
    return this.userInfo
  }

  private parseJwt(token: string): UserInfo | null {
    try {
      const parts = token.split('.')
      if (parts.length !== 3 || !parts[1]) return null
      const base64Url = parts[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch {
      return null
    }
  }

  async login(username: string, password: string): Promise<void> {
    const params = new URLSearchParams()
    params.append('grant_type', 'password')
    params.append('client_id', 'mixpla_mobile')
    params.append('username', username)
    params.append('password', password)

    const response = await axios.post<TokenResponse>(
      'https://auth.semantyca.com/realms/mixpla/protocol/openid-connect/token',
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )

    console.log('Login response:', response.data)

    if (!response.data.access_token) {
      throw new Error('No access token in response')
    }

    this.accessToken = response.data.access_token
    this.refreshToken = response.data.refresh_token
    this.userInfo = this.parseJwt(this.accessToken)

    if (Capacitor.isNativePlatform()) {
      try {
        localStorage.setItem('native_access_token', this.accessToken)
        localStorage.setItem('native_refresh_token', this.refreshToken)
      } catch (e) {
        void e
      }
    }
  }

  async logout(): Promise<void> {
    this.accessToken = null
    this.refreshToken = null
    this.userInfo = null

    if (Capacitor.isNativePlatform()) {
      try {
        localStorage.removeItem('native_access_token')
        localStorage.removeItem('native_refresh_token')
      } catch (e) {
        void e
      }
    }
  }

  loadFromStorage(): void {
    if (Capacitor.isNativePlatform()) {
      try {
        this.accessToken = localStorage.getItem('native_access_token')
        this.refreshToken = localStorage.getItem('native_refresh_token')
        if (this.accessToken) {
          this.userInfo = this.parseJwt(this.accessToken)
        }
      } catch (e) {
        void e
      }
    }
  }
}

export const nativeAuth = new NativeAuth()
