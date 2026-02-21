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
  const countryCode = ref<string | null>(null)
  const nowPlaying = ref('|')
  const isAsleep = ref(false)
  const isBroadcasting = ref(false)
  const isWaitingForCurator = ref(false)
  const statusText = ref('')
  const bufferStatus = ref('ok')
  const isPlaying = ref(false)
  const audioElement = ref<HTMLAudioElement | null>(null)
  const stationsLoadError = ref(false)

  const titleAnimation = ref<{ enabled: boolean; type: 'static' | 'marquee'; speed: number }>({
    enabled: false,
    type: 'static',
    speed: 1
  })

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
    try {
      const response = await unsecuredClient.get(absoluteApi.radioAllStations)
      stations.value = response.data
      stationsLoadError.value = false
    } catch {
      stations.value = []
      stationsLoadError.value = true
    }
  }

  const fetchStationInfo = async () => {
    if (!radioSlug.value) return

    try {
      const response = await unsecuredClient.get(`https://mixpla.online/${radioSlug.value}/radio/status`)
      const data = response.data

      stationName.value = data.name || stationName.value
      djName.value = data.djName
      djStatus.value = data.djStatus
      countryCode.value = data.countryCode || null

      const isOnline = data.currentStatus === 'WARMING_UP' || data.currentStatus === 'ON_LINE'

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
        displayParts.push(data.countryCode)
        displayParts.push(`DJ: ${data.djName}`)
        statusText.value = displayParts.join(', ')
      }

      if (data.color && data.color.match(/^#[0-9a-fA-F]{6,8}$/)) {
        stationColor.value = data.color
      }

      if (data.animation) {
        const rawType = typeof data.animation.type === 'string' ? data.animation.type.toLowerCase() : 'static'
        const mappedType = rawType === 'marquee' ? 'marquee' : 'static'
        const spd = typeof data.animation.speed === 'number' && data.animation.speed > 0 ? data.animation.speed : 1
        titleAnimation.value = {
          enabled: !!data.animation.enabled,
          type: mappedType,
          speed: spd
        }
      } else {
        titleAnimation.value = { enabled: false, type: 'static', speed: 1 }
      }
    } catch (error: unknown) {
      if ((error as { response?: { status?: number } }).response?.status === 404) {
        isAsleep.value = true
        isBroadcasting.value = false
        isWaitingForCurator.value = false
        statusText.value = 'offline'
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
  }

  const setBufferStatus = (status: string) => {
    if (['healthy', 'ok', 'poor', 'critical', 'stalling', 'fatal'].includes(status)) {
      bufferStatus.value = status
    }
  }

  const startPolling = () => {
    stopPolling()
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

    const streamUrl = `https://mixpla.online/${slug}/radio/master.m3u8`

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
    stationsLoadError,
    radioName,
    radioSlug,
    stationName,
    stationColor,
    djName,
    djStatus,
    countryCode,
    nowPlaying,
    isAsleep,
    isBroadcasting,
    isWaitingForCurator,
    statusText,
    bufferStatus,
    isPlaying,
    audioElement,
    titleAnimation,

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
