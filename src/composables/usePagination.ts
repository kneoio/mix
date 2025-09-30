import { computed, type Ref } from 'vue'
import type { ApiViewPageResponse } from 'src/types/models'

export function usePagination<T>(apiViewResponse: Ref<ApiViewPageResponse<T> | null>) {
  const getPagination = computed(() => {
    if (!apiViewResponse.value) return {
      page: 1,
      pageSize: 10,
      itemCount: 0,
      pageCount: 1,
      showSizePicker: true,
      pageSizes: [10, 20, 30, 40]
    }

    return {
      page: apiViewResponse.value.viewData.pageNum,
      pageSize: apiViewResponse.value.viewData.pageSize,
      itemCount: apiViewResponse.value.viewData.count,
      pageCount: apiViewResponse.value.viewData.maxPage,
      showSizePicker: true,
      pageSizes: [10, 20, 30, 40]
    }
  })

  return { getPagination }
}
