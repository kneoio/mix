import { defineStore } from 'pinia'
import { ref } from 'vue'
import { absoluteApi, unsecuredClient } from 'src/api/apiClient'
import type { RadioStationStatus, PageParams } from 'src/types/models'

export const useRadioStationsStore = defineStore('radioStations', () => {
  const stations = ref<RadioStationStatus[]>([])
  const total = ref<number | null>(null)
  const loading = ref(false)

  const fetchRadioStations = async (params: PageParams = {}) => {
    loading.value = true
    try {
      const { page, size } = params
      const response = await unsecuredClient.get(absoluteApi.radioAllStations, {
        params: { page, size }
      })
      const data = response.data

      const items: RadioStationStatus[] = Array.isArray(data)
        ? data
        : (data?.payload?.viewData?.entries || data?.stations || [])

      stations.value = items
      total.value = (typeof data?.payload?.viewData?.total === 'number')
        ? data.payload.viewData.total
        : (Array.isArray(data) ? data.length : (data?.total ?? items.length))

      return items
    } finally {
      loading.value = false
    }
  }

  return {
    stations,
    total,
    loading,
    fetchRadioStations
  }
})
