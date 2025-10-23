import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiClient } from 'src/api/apiClient'
import { keycloak } from 'src/boot/keycloak'

export interface StationDashboard {
  brandName: string
  status: string
  currentListeners: number
  heartbeat: boolean
  [key: string]: unknown
}

export const useDashboardStore = defineStore('dashboard', () => {
  const stationWebsockets = ref<Record<string, WebSocket>>({})
  const stationData = ref<Record<string, StationDashboard>>({})
  const stationLastUpdate = ref<Record<string, Date>>({})
  const stationPollingIntervals = ref<Record<string, NodeJS.Timeout>>({})
  const activeStationPolling = ref<Set<string>>(new Set())
  const POLLING_INTERVAL = 3000

  const buildWebSocketUrl = (brandName: string): string => {
    const baseUrl = apiClient.defaults.baseURL || ''
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const urlObject = new URL(baseUrl)
    const host = urlObject.host
    const wsUrl = `${wsProtocol}//${host}/api/ws/dashboard/station/${brandName}`
    const token = keycloak.token
    return token ? `${wsUrl}?token=${token}` : wsUrl
  }

  const connectStation = (brandName: string) => {
    if (stationWebsockets.value[brandName]?.readyState === WebSocket.OPEN) return

    const ws = new WebSocket(buildWebSocketUrl(brandName))
    
    ws.onopen = () => {
      ws.send(JSON.stringify({ action: 'getStation' }))
    }

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)
        if (data.error) {
          console.error(`Station ${brandName} error:`, data.error)
          return
        }
        if (data.payload?.station) {
          stationData.value[brandName] = data.payload.station
          stationLastUpdate.value[brandName] = new Date()
        }
      } catch (error) {
        console.error('Error parsing station message:', error)
      }
    }

    ws.onclose = (event: CloseEvent) => {
      if ([1000, 1001, 1006].includes(event.code)) {
        setTimeout(() => {
          if (stationWebsockets.value[brandName]) {
            connectStation(brandName)
          }
        }, 3000)
      }
    }

    ws.onerror = (error: Event) => {
      console.error(`Station ${brandName} WebSocket error:`, error)
    }

    stationWebsockets.value[brandName] = ws
  }

  const disconnectStation = (brandName: string) => {
    if (stationWebsockets.value[brandName]) {
      stationWebsockets.value[brandName].close()
      delete stationWebsockets.value[brandName]
      delete stationLastUpdate.value[brandName]
    }
  }

  const fetchStation = (brandName: string) => {
    if (stationWebsockets.value[brandName]?.readyState === WebSocket.OPEN) {
      stationWebsockets.value[brandName].send(JSON.stringify({ action: 'getStation' }))
    }
  }

  const getStationData = (brandName: string) => {
    return stationData.value[brandName] || null
  }

  const getStationLastUpdate = (brandName: string) => {
    return stationLastUpdate.value[brandName] || null
  }

  const startStationPolling = (brandName: string) => {
    if (stationPollingIntervals.value[brandName]) {
      clearInterval(stationPollingIntervals.value[brandName])
    }
    
    activeStationPolling.value.add(brandName)
    connectStation(brandName)
    
    stationPollingIntervals.value[brandName] = setInterval(() => {
      fetchStation(brandName)
    }, POLLING_INTERVAL)
  }

  const stopStationPolling = (brandName: string) => {
    activeStationPolling.value.delete(brandName)
    if (stationPollingIntervals.value[brandName]) {
      clearInterval(stationPollingIntervals.value[brandName])
      delete stationPollingIntervals.value[brandName]
    }
    disconnectStation(brandName)
  }

  return {
    stationWebsockets,
    stationData,
    stationLastUpdate,
    connectStation,
    disconnectStation,
    fetchStation,
    getStationData,
    getStationLastUpdate,
    startStationPolling,
    stopStationPolling
  }
})
