import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useStationStatusStore = defineStore('stationStatus', () => {
  const radioSlug = ref('')
  const stationName = ref('')
  const djName = ref<string | null>(null)
  const djStatus = ref<string | null>(null)
  const nowPlaying = ref('')
  const isAsleep = ref(false)
  const statusText = ref('Ready to play')

  const displayStatusText = computed(() => {
    if (isAsleep.value) {
      return 'Station is offline'
    }
    return statusText.value
  })

  const fetchStation = async (slugName: string) => {
    radioSlug.value = slugName
    isAsleep.value = false
    djName.value = null
    djStatus.value = null
    nowPlaying.value = ''
    statusText.value = 'Loading station information...'

    try {
      const response = await axios.get(`/${slugName}/radio/status`)
      const data = response.data

      stationName.value = data.name || stationName.value
      djName.value = data.djName
      djStatus.value = data.djStatus

      const isOnline = data.currentStatus === 'ONLINE' || data.currentStatus === 'BROADCASTING'

      if (isOnline) {
        statusText.value = 'Station is online, waiting for curator...'
        isAsleep.value = false
      } else {
        isAsleep.value = false

        if (data.currentSong && data.currentSong.trim() !== '') {
          nowPlaying.value = data.currentSong
        }

        const displayParts = []
        if (data.countryCode) displayParts.push(`Country: ${data.countryCode}`)
        if (data.djName) displayParts.push(`DJ: ${data.djName}`)
        statusText.value = displayParts.join(', ') || 'Broadcasting'
      }
    } catch (error: unknown) {
      if ((error as { response?: { status?: number } }).response?.status === 404) {
        isAsleep.value = true
        statusText.value = 'Station is offline.'
        return
      }
      console.error('Failed to fetch station status:', error)
      statusText.value = 'Error: Could not fetch station status.'
    }
  }

  return {
    radioSlug,
    stationName,
    djName,
    djStatus,
    nowPlaying,
    isAsleep,
    statusText,
    displayStatusText,
    fetchStation
  }
})
