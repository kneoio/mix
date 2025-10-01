import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiClient } from 'src/api/apiClient'
import Hls from 'hls.js'
import type { RadioStationStatus } from 'src/types/models'

export const usePlayerStore = defineStore('player', () => {
  // State
  const stations = ref<RadioStationStatus[]>([])
  const radioName = ref('lumisonic')
  const radioSlug = ref('lumisonic')
  const stationName = ref('Lumisonic')
  const stationColor = ref<string | null>('#3D20E4')
  const djName = ref<string | null>(null)
  const djStatus = ref<string | null>(null)
  const nowPlaying = ref('Song Title | Artist Name')
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

  // Getters
  const displayStatusText = computed(() => {
    if (isAsleep.value) {
      return 'Station is offline'
    }
    return statusText.value
  })

  // Actions
  const fetchStations = async () => {
    try {
      const response = await apiClient.get('/radiostations')
      stations.value = response.data
      
      // Auto-select first online station if none selected
      if (!radioName.value && stations.value.length > 0) {
        const onlineStation = stations.value.find(s => s.currentStatus === 'ONLINE')
        if (onlineStation) {
          setStation(onlineStation.slugName)
        }
      }
    } catch (error) {
      console.error('Failed to fetch stations:', error)
    }
  }

  const fetchStationInfo = async () => {
    if (!radioSlug.value) return
    
    try {
      const response = await apiClient.get(`/radiostations/${radioSlug.value}/status`)
      const data = response.data
      
      stationName.value = data.name || stationName.value
      djName.value = data.djName
      djStatus.value = data.djStatus
      
      const isOnline = data.currentStatus === 'ONLINE' || data.currentStatus === 'BROADCASTING'
      
      if (isOnline && data.currentSong === 'Waiting for curator to start the broadcast...') {
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

  const setStation = (stationSlugOrName: string) => {
    const station = stations.value.find(s => 
      s.slugName === stationSlugOrName || s.name === stationSlugOrName
    )
    
    if (station) {
      radioName.value = station.name
      radioSlug.value = station.slugName
      stationName.value = station.name
      stationColor.value = station.color || null
      isAsleep.value = false
      isBroadcasting.value = false
      isWaitingForCurator.value = false
      djName.value = null
      djStatus.value = null
      nowPlaying.value = ''
      statusText.value = 'Loading station information...'
      
      startPolling()
    }
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

  const startListPolling = () => {
    listPollingInterval = setInterval(() => {
      void fetchStations()
    }, 60000)
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
    initializeHls('lumisonic')
  }

  const togglePlay = () => {
    if (!audioElement.value) return

    if (audioElement.value.paused) {
      if (!hls) {
        initializeHls('lumisonic')
      }
      audioElement.value.play().catch(e => console.error('Play error:', e))
      isPlaying.value = true
    } else {
      audioElement.value.pause()
      isPlaying.value = false
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
    fetchStations,
    fetchStationInfo,
    setStation,
    setBufferStatus,
    startPolling,
    stopPolling,
    startListPolling,
    stopListPolling,
    setAudioElement,
    togglePlay,
    cleanup
  }
})
