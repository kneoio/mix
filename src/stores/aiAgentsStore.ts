import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { apiClient } from 'src/api/apiClient'
import type { ApiViewPageResponse, ApiFormResponse } from 'src/types/api'

export interface AiAgent {
  id: string
  author: string
  regDate: string
  lastModifier: string
  lastModifiedDate: string
  name: string
  prompt: string
  talkativity: number
  preferredVoice: string
}

export const useAiAgentsStore = defineStore('aiAgents', () => {
  const apiViewResponse = ref<ApiViewPageResponse<AiAgent> | null>(null)
  const apiFormResponse = ref<ApiFormResponse<AiAgent> | null>(null)

  const getEntries = computed(() => {
    return apiViewResponse.value?.viewData.entries || []
  })

  const agentOptions = computed(() => {
    return getEntries.value.map(agent => ({
      label: agent.name,
      value: agent.id
    }))
  })

  const getCurrent = computed(() => {
    const defaultData = {
      id: '',
      author: '',
      regDate: '',
      lastModifier: '',
      lastModifiedDate: '',
      name: '',
      prompt: '',
      talkativity: 50,
      preferredVoice: ''
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

  const fetchAiAgents = async (page = 1, pageSize = 10) => {
    const response = await apiClient.get(`/aiagents?page=${page}&size=${pageSize}`)
    if (response?.data?.payload) {
      apiViewResponse.value = response.data.payload
    } else {
      throw new Error('Invalid API response structure')
    }
  }

  const fetchAiAgent = async (id: string) => {
    const response = await apiClient.get(`/aiagents/${id}`)
    if (response?.data?.payload) {
      apiFormResponse.value = response.data.payload
    } else {
      throw new Error('Invalid API response structure')
    }
  }

  const deleteAiAgent = async (id: string) => {
    await apiClient.delete(`/aiagents/${id}`)
  }

  return {
    getEntries,
    agentOptions,
    getCurrent,
    getPagination,
    fetchAiAgents,
    fetchAiAgent,
    deleteAiAgent
  }
})
