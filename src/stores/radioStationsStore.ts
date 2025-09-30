import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { absoluteApi, unsecuredClient } from 'src/api/apiClient'
import { usePagination } from 'src/composables/usePagination'
import type { ApiViewPageResponse, RadioStationStatus } from 'src/types/models'

export const useRadioStationsStore = defineStore('radioStations', () => {
  const apiViewResponse = ref<ApiViewPageResponse<RadioStationStatus> | null>(null)

  const getEntries = computed(() => apiViewResponse.value?.viewData?.entries || [])

  const { getPagination } = usePagination(apiViewResponse)

  const fetchRadioStations = async (page = 1, pageSize = 10) => {
    const params = { page, size: pageSize }
    const response = await unsecuredClient.get(absoluteApi.radioAllStations, { params })
    apiViewResponse.value = response.data.payload
  }

  return {
    getPagination,
    getEntries,
    fetchRadioStations
  }
})
