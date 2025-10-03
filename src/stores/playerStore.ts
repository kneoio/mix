import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { unsecuredClient, absoluteApi } from 'src/api/apiClient'
import Hls from 'hls.js'
import type { RadioStationStatus } from 'src/types/models'

export const usePlayerStore = defineStore('player', () => {
  const stations = ref<RadioStationStatus[]>([])
  const radioName = ref('lumisonic')
  const radioSlug = ref('lumisonic')
  const stationName = ref('Lumisonic')
  const stationColor = ref<string | null>('#3D20E4')
  const djName = ref<string | null>(null)
  const djStatus = ref<string | null>(null)
  const nowPlaying = ref('|')
  const isAsleep = ref(false)
  const isBroadcasting = ref(false)
  const isWaitingForCurator = ref(false)
  const statusText = ref('Ready to play')
  const bufferStatus = ref('ok')
  const isPlaying = ref(false)
  const audioElement = ref<HTMLAudioElement | null>(null)

  let statusPollingInterval: NodeJS.Timeout | null = null
  let listPollingInterval: NodeJS.Timeout | null = null
  let hls: Hls | null = null

  const displayStatusText = computed(() => {
    if (isAsleep.value) {
      return 'Station is offline'
    }
    return statusText.value
  })

  const fetchRadioStations = async () => {
    const response = await unsecuredClient.get(absoluteApi.radioAllStations)
    stations.value = response.data
  }

  const fetchStationInfo = async () => {
    if (!radioSlug.value) return

    try {
      const response = await unsecuredClient.get(`/radiostations/${radioSlug.value}/status`)
      const data = response.data

      stationName.value = data.name || stationName.value
      djName.value = data.djName
      djStatus.value = data.djStatus

      const isOnline = data.currentStatus === 'ONLINE' || data.currentStatus === 'BROADCASTING'

      if (isOnline) {
        statusText.value = 'Station is online, waiting for curator...'
        isAsleep.value = false
        isBroadcasting.value = false
        isWaitingForCurator.value = true
      } else {
        isAsleep.value = false
        isBroadcasting.value = isOnline
        isWaitingForCurator.value = false

        if (data.currentSong && data.currentSong.trim() !== '') {
          nowPlaying.value = data.currentSong
        }

        const displayParts = []
        if (data.countryCode) displayParts.push(`Country: ${data.countryCode}`)
        if (data.djName) displayParts.push(`DJ: ${data.djName}`)
        statusText.value = displayParts.join(', ') || 'Broadcasting'
      }

      if (data.color && data.color.match(/^#[0-9a-fA-F]{6,8}$/)) {
        stationColor.value = data.color.length === 9 ? data.color.substring(0, 7) : data.color
      }
    } catch (error: unknown) {
      if ((error as { response?: { status?: number } }).response?.status === 404) {
        isAsleep.value = true
        isBroadcasting.value = false
        isWaitingForCurator.value = false
        statusText.value = 'Station is offline.'
        stopPolling()
        return
      }
      console.error('Failed to fetch station status:', error)
      statusText.value = 'Error: Could not fetch station status.'
    }
  }

  const setStation = (slugName: string) => {
    radioSlug.value = slugName
    isAsleep.value = false
    isBroadcasting.value = false
    isWaitingForCurator.value = false
    djName.value = null
    djStatus.value = null
    nowPlaying.value = ''
    statusText.value = 'Loading station information...'

    void fetchStationInfo()
  }

  const setBufferStatus = (status: string) => {
    if (['healthy', 'ok', 'poor', 'critical', 'stalling', 'fatal'].includes(status)) {
      bufferStatus.value = status
    }
  }

  const startPolling = () => {
    stopPolling()
    void fetchStationInfo()
    statusPollingInterval = setInterval(() => {
      void fetchStationInfo()
    }, 15000)
  }

  const stopPolling = () => {
    if (statusPollingInterval) {
      clearInterval(statusPollingInterval)
      statusPollingInterval = null
    }
  }

  const stopListPolling = () => {
    if (listPollingInterval) {
      clearInterval(listPollingInterval)
      listPollingInterval = null
    }
  }

  const initializeHls = (slug: string) => {
    if (hls) {
      hls.destroy()
      hls = null
    }

    if (!audioElement.value) return

    if (!Hls.isSupported()) {
      console.error('HLS is not supported in this browser')
      return
    }

    const streamUrl = `https://mixpla.online/${slug}/radio/stream.m3u8`

    hls = new Hls({
      debug: false,
      enableWorker: true,
      maxBufferLength: 30,
      maxMaxBufferLength: 600,
      backBufferLength: 0,
      liveSyncDuration: 3,
      liveMaxLatencyDuration: 10
    })

    hls.loadSource(streamUrl)
    hls.attachMedia(audioElement.value)

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      if (isPlaying.value && audioElement.value) {
        audioElement.value.play().catch(e => console.error('Play error:', e))
      }
    })

    hls.on(Hls.Events.FRAG_CHANGED, (event, data) => {
      const fragTitle = data.frag.title
      if (fragTitle) {
        nowPlaying.value = fragTitle
      }
    })

    hls.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        console.error('HLS fatal error:', data)
        setBufferStatus('fatal')
      }
    })
  }

  const setAudioElement = (element: HTMLAudioElement) => {
    audioElement.value = element
  }

  const togglePlay = () => {
    if (!audioElement.value) return

    if (audioElement.value.paused) {
      if (!hls) {
        initializeHls(radioSlug.value)
      }
      audioElement.value.play().catch(e => console.error('Play error:', e))
      isPlaying.value = true
      startPolling()
    } else {
      audioElement.value.pause()
      isPlaying.value = false
      stopPolling()
      if (hls) {
        hls.destroy()
        hls = null
      }
    }
  }

  const cleanup = () => {
    if (hls) {
      hls.destroy()
      hls = null
    }
    stopPolling()
    stopListPolling()
  }

  return {
    // State
    stations,
    radioName,
    radioSlug,
    stationName,
    stationColor,
    djName,
    djStatus,
    nowPlaying,
    isAsleep,
    isBroadcasting,
    isWaitingForCurator,
    statusText,
    bufferStatus,
    isPlaying,
    audioElement,

    // Getters
    displayStatusText,

    // Actions
    fetchRadioStations,
    fetchStationInfo,
    setStation,
    setBufferStatus,
    startPolling,
    stopPolling,
    stopListPolling,
    setAudioElement,
    togglePlay,
    cleanup
  }
})
