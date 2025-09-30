import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from 'src/api/apiClient'
import type { SoundFragment, SoundFragmentFilterDTO } from 'src/types/models'

export const useSoundFragmentsStore = defineStore('soundFragments', () => {
  const items = ref<SoundFragment[]>([])
  const total = ref<number | null>(null)
  const loading = ref(false)

  const fetchSoundFragments = async (
    page = 1,
    pageSize = 10,
    searchQuery = '',
    filters: SoundFragmentFilterDTO = {}
  ) => {
    loading.value = true
    try {
      const params: Record<string, unknown> = {
        page,
        size: pageSize,
      }
      if (searchQuery) params.q = searchQuery
      Object.assign(params, filters)

      const { data } = await apiClient.get('/soundfragments', { params })

      const list: SoundFragment[] = Array.isArray(data)
        ? data
        : (data?.payload?.viewData?.entries || data?.items || [])

      items.value = list
      total.value = (typeof data?.payload?.viewData?.total === 'number')
        ? data.payload.viewData.total
        : (Array.isArray(data) ? data.length : (data?.total ?? list.length))

    } finally {
      loading.value = false
    }
  }

  function reset () {
    items.value = []
    total.value = null
    loading.value = false
  }

  return {
    items,
    total,
    loading,
    fetchSoundFragments,
    reset
  }
})
