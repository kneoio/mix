import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from 'src/api/apiClient'
import type { SoundFragment, SoundFragmentFilterDTO } from 'src/types/models'

export const useSoundFragmentsStore = defineStore('soundFragments', () => {
  const items = ref<SoundFragment[]>([])
  const total = ref<number | null>(null)
  const loading = ref(false)
  const current = ref<SoundFragment | null>(null)

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

  const fetchSoundFragment = async (id: string) => {
    loading.value = true
    try {
      const { data } = await apiClient.get(`/soundfragments/${encodeURIComponent(id)}`)
      const entity: SoundFragment = (data?.payload?.viewData?.current) || data?.item || data
      current.value = entity as SoundFragment
      return current.value
    } finally {
      loading.value = false
    }
  }

  function reset () {
    items.value = []
    total.value = null
    loading.value = false
    current.value = null
  }

  return {
    items,
    total,
    loading,
    current,
    fetchSoundFragments,
    fetchSoundFragment,
    reset
  }
})
