<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Listeners</div>

    <q-linear-progress v-if="loading" indeterminate color="primary" />
    <q-table v-else :rows="filteredListeners" :columns="columns" row-key="id" flat :filter="searchTerm"
      :selected="selectedRows" @update:selected="updateSelected" selection="multiple" :visible-columns="visibleColumns"
      class="sticky-header-table" @row-click="(evt, row) => openListener(row.id)">
      <template v-slot:top>
        <q-btn-group>
          <q-btn color="primary" label="New" size="md" @click="handleNew" />
          <q-btn color="negative" :label="`Delete (${selectedRows.length})`" size="md"
            :disable="selectedRows.length === 0" @click="handleDelete" />
        </q-btn-group>
        <q-space />
        <q-input v-model="searchTerm" dense clearable debounce="200" placeholder="Search listeners" class="col-6" />
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

const listenersStore = useListenersStore()
const $q = useQuasar()
const router = useRouter()
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    await listenersStore.fetchListeners()
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
    await listenersStore.fetchListeners()
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.sticky-header-table :deep(thead tr th) {
  background-color: #f5f5f5;
  font-weight: 600;
}
</style>
