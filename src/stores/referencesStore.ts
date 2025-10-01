import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from 'src/api/apiClient'

export const useReferencesStore = defineStore('references', () => {
  const genreOptions = ref<Array<{label: string, value: string}>>([])

  const fetchGenres = async () => {
    const response = await apiClient.get('/dictionary/genres?page=1&size=1000')
    if (!response?.data?.payload) throw new Error('Invalid API response')

    genreOptions.value = response.data.payload.viewData.entries
      .map((entry: {identifier: string, id: string}) => ({
        label: entry.identifier,
        value: entry.id
      }))
      .sort((a: {label: string}, b: {label: string}) => a.label.localeCompare(b.label))
  }

  return {
    genreOptions,
    fetchGenres
  }
})
