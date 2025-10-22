import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { apiClient } from 'src/api/apiClient'
import type { ApiViewPageResponse, ApiFormResponse } from 'src/types/api'
import type { RadioStation } from 'src/types/models'
import { BrandStatus } from 'src/types/models'

export const useRadioStationsStore = defineStore('radioStations', () => {
  const apiViewResponse = ref<ApiViewPageResponse<RadioStation> | null>(null)
  const apiFormResponse = ref<ApiFormResponse<RadioStation> | null>(null)

  const getEntries = computed(() => {
    return apiViewResponse.value?.viewData.entries || []
  })

  const getCurrent = computed(() => {
    const defaultData: Partial<RadioStation> = {
      id: '',
      author: '',
      regDate: '',
      lastModifier: '',
      lastModifiedDate: '',
      slugName: '',
      country: '',
      status: BrandStatus.OFF_LINE,
      title: '',
      localizedName: {},
      description: '',
      color: '',
      url: '',
      hlsUrl: '',
      actionUrl: ''
    }

    return apiFormResponse.value?.docData || defaultData
  })

  const getPagination = computed(() => {
    if (!apiViewResponse.value) {
      return {
        page: 1,
        pageSize: 10,
        itemCount: 0,
        pageCount: 1,
        showSizePicker: true,
        pageSizes: [10, 20, 30, 40]
      }
    }

    const { viewData } = apiViewResponse.value
    return {
      page: viewData.pageNum,
      pageSize: viewData.pageSize,
      itemCount: viewData.count,
      pageCount: viewData.maxPage,
      showSizePicker: true,
      pageSizes: [10, 20, 30, 40]
    }
  })

  const fetchRadioStations = async (page = 1, pageSize = 10) => {
    const response = await apiClient.get(`/radiostations?page=${page}&size=${pageSize}`)
    if (response?.data?.payload) {
      apiViewResponse.value = response.data.payload
    } else {
      throw new Error('Invalid API response structure')
    }
  }

  const fetchRadioStation = async (id: string) => {
    const response = await apiClient.get(`/radiostations/${id}`)
    if (response?.data?.payload) {
      apiFormResponse.value = response.data.payload
    } else {
      throw new Error('Invalid API response structure')
    }
  }

  const saveRadioStation = async (data: unknown, id: string | null) => {
    const url = id ? `/radiostations/${id}` : '/radiostations/new'
    const response = await apiClient.post(url, data)
    if (response?.data?.payload) {
      apiFormResponse.value = response.data.payload
      return apiFormResponse.value
    } else {
      throw new Error('Invalid API response structure')
    }
  }

  const deleteRadioStation = async (id: string) => {
    await apiClient.delete(`/radiostations/${id}`)
  }

  return {
    getEntries,
    getCurrent,
    getPagination,
    fetchRadioStations,
    fetchRadioStation,
    saveRadioStation,
    deleteRadioStation
  }
})
