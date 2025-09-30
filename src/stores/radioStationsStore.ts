import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { absoluteApi, unsecuredClient } from 'src/api/apiClient'
import type { RadioStationStatus } from 'src/types/models'

export const useRadioStationsStore = defineStore('radioStations', () => {
  const entries = ref<RadioStationStatus[]>([])

  const getEntries = computed(() => entries.value)

  const getPagination = computed(() => ({
    itemCount: entries.value.length,
    pageNum: 1,
    maxPage: 1,
    pageSize: entries.value.length
  }))

  const fetchRadioStations = async () => {
    const response = await unsecuredClient.get(absoluteApi.radioAllStations)
    entries.value = response.data
  }

  return {
    getPagination,
    getEntries,
    fetchRadioStations
  }
})
