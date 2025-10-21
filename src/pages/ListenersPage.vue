<template>
  <q-page class="q-px-md q-pb-md q-pt-none">
    <ListHeader
      title="Listeners"
      :quantity="listenersStore.getPagination.itemCount"
      :show-back="false"
      :show-new="true"
      :show-delete="true"
      :delete-disabled="selectedRows.length === 0"
      @new="handleNew"
      @delete="handleDelete"
    />

    <q-table :rows="filteredListeners" :columns="columns" row-key="id" flat :filter="searchTerm"
      :selected="selectedRows" @update:selected="updateSelected" selection="multiple" :visible-columns="visibleColumns"
      v-model:pagination="tablePagination" :rows-per-page-options="[0]"
      class="sticky-header-table" @row-click="(evt, row) => openListener(row.id)">
      <template v-slot:top>
        <q-input v-model="searchTerm" dense clearable debounce="200" placeholder="Search" class="col-6" />
        <q-space />
        <q-btn dense flat icon="chevron_left" :disable="page <= 1 || loading" @click="prevPage" />
        <div class="text-caption q-mx-sm">Page {{ page }} / {{ maxPage }}</div>
        <q-btn dense flat icon="chevron_right" :disable="loading || page >= maxPage" @click="nextPage" />
      </template>
      <template v-slot:body-cell-localizedName="props">
        <q-td :props="props">
          <div class="ellipsis" style="max-width: 200px">{{ props.value.en || Object.values(props.value)[0] }}</div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useListenersStore } from 'src/stores/listenersStore'
import type { Listener } from 'src/types/models'
import ListHeader from 'src/components/ListHeader.vue'

const listenersStore = useListenersStore()
const $q = useQuasar()
const router = useRouter()
const loading = ref(false)
const page = ref(1)
const pageSize = ref(10)
const maxPage = computed(() => listenersStore.getPagination.pageCount || 1)
const tablePagination = ref({ page: 1, rowsPerPage: 0 })

onMounted(async () => {
  loading.value = true
  try {
    await listenersStore.fetchListeners(page.value, pageSize.value, searchTerm.value)
  } finally {
    loading.value = false
  }
})

const searchTerm = ref('')
const selectedRows = ref<Listener[]>([])

const filteredListeners = computed(() => listenersStore.getEntries)

const columns = [
  { name: 'localizedName', label: 'Name', field: 'localizedName', align: 'left' as const },
  { name: 'slugName', label: 'Slug', field: 'slugName', align: 'left' as const },
  { name: 'country', label: 'Country', field: 'country', align: 'left' as const }
]

const visibleColumns = computed(() => {
  if ($q.screen.lt.sm) {
    return ['localizedName']
  }
  if ($q.screen.lt.md) {
    return ['localizedName', 'country']
  }
  return ['localizedName', 'slugName', 'country']
})

function updateSelected(rows: readonly Listener[]) {
  selectedRows.value = [...rows]
}

function openListener(id: string) {
  void router.push(`/listeners/${id}`)
}

function handleNew() {
  void router.push('/listeners/new')
}

async function handleDelete() {
  if (selectedRows.value.length === 0) return

  const confirmed = confirm(`Delete ${selectedRows.value.length} listener(s)?`)
  if (!confirmed) return

  try {
    loading.value = true
    await Promise.all(selectedRows.value.map(l =>
      listenersStore.deleteListener(l.id)
    ))
    selectedRows.value = []
    await listenersStore.fetchListeners(page.value, pageSize.value, searchTerm.value)
  } finally {
    loading.value = false
  }
}

function nextPage () {
  if (page.value < maxPage.value) {
    page.value += 1
    void listenersStore.fetchListeners(page.value, pageSize.value, searchTerm.value)
  }
}

function prevPage () {
  if (page.value > 1) {
    page.value -= 1
    void listenersStore.fetchListeners(page.value, pageSize.value, searchTerm.value)
  }
}
</script>

