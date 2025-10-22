import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { apiClient } from 'src/api/apiClient'
import type { ApiViewPageResponse, ApiFormResponse } from 'src/types/api'
import type { Listener, ListenerSave } from 'src/types/models'

export const useListenersStore = defineStore('listeners', () => {
  const apiViewResponse = ref<ApiViewPageResponse<Listener> | null>(null)
  const apiFormResponse = ref<ApiFormResponse<Listener> | null>(null)

  const getEntries = computed(() => {
    return apiViewResponse.value?.viewData.entries || []
  })

  const getCurrent = computed(() => {
    const defaultData: Partial<Listener> = {
      id: '',
      author: '',
      regDate: '',
      lastModifier: '',
      lastModifiedDate: '',
      localizedName: { en: '' },
      userId: 0,
      country: '',
      nickName: { en: '' },
      slugName: '',
      archived: 0
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

  const fetchListeners = async (page = 1, pageSize = 10, searchQuery = '') => {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('size', pageSize.toString())
    if (searchQuery) {
      params.append('q', searchQuery)
    }
    const baseUrl = searchQuery ? '/listeners/search' : '/listeners'
    const url = `${baseUrl}?${params.toString()}`
    const response = await apiClient.get(url)
    if (response?.data?.payload) {
      apiViewResponse.value = response.data.payload
    } else {
      throw new Error('Invalid API response structure')
    }
  }

  const fetchListener = async (id: string) => {
    const response = await apiClient.get(`/listeners/${id}`)
    if (response?.data?.payload) {
      apiFormResponse.value = response.data.payload
    } else {
      throw new Error('Invalid API response structure')
    }
  }

  const saveListener = async (data: ListenerSave, id: string | null) => {
    const url = id ? `/listeners/${id}` : '/listeners/new'
    const response = await apiClient.post(url, data)
    if (response?.data?.payload) {
      apiFormResponse.value = response.data.payload
      return apiFormResponse.value
    } else {
      throw new Error('Invalid API response structure')
    }
  }

  const deleteListener = async (id: string) => {
    await apiClient.delete(`/listeners/${id}`)
  }

  return {
    getEntries,
    getCurrent,
    getPagination,
    fetchListeners,
    fetchListener,
    saveListener,
    deleteListener
  }
})
