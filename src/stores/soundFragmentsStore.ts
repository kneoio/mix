import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import apiClient from 'src/api/apiClient'
import type {ApiFormResponse, ApiViewPageResponse, SoundFragment, SoundFragmentFilterDTO} from 'src/types/models'

export const useSoundFragmentsStore = defineStore('soundFragments', () => {
  const apiViewResponse = ref<ApiViewPageResponse<SoundFragment> | null>(null);
  const apiFormResponse = ref<ApiFormResponse<SoundFragment> | null>(null);

  const getEntries = computed(() => apiViewResponse.value?.viewData?.entries || []);

  const getPagination = computed(() => {
    if (!apiViewResponse.value) return {
      page: 1,
      pageSize: 10,
      itemCount: 0,
      pageCount: 1,
      showSizePicker: true,
      pageSizes: [10, 20, 30, 40]
    };

    return {
      page: apiViewResponse.value.viewData.pageNum,
      pageSize: apiViewResponse.value.viewData.pageSize,
      itemCount: apiViewResponse.value.viewData.count,
      pageCount: apiViewResponse.value.viewData.maxPage,
      showSizePicker: true,
      pageSizes: [10, 20, 30, 40]
    };
  });

  const fetchSoundFragments = async (
    page = 1,
    pageSize = 10,
    searchQuery = '',
    filters: SoundFragmentFilterDTO = {}
  ) => {
    const params: Record<string, unknown> = {
      page,
      size: pageSize,
    }
    if (searchQuery) params.q = searchQuery
    Object.assign(params, filters)
    const response = await apiClient.get('/soundfragments', {params})
    apiViewResponse.value = response.data.payload;
  }

  const fetchSoundFragment = async (id: string) => {
    const response = await apiClient.get(`/soundfragments/${encodeURIComponent(id)}`)
    apiFormResponse.value = response.data.payload;
  }

  return {
    apiFormResponse,
    getPagination,
    getEntries,
    fetchSoundFragments,
    fetchSoundFragment,
  }
})
