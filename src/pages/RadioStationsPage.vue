<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Radiostations</div>

    <q-linear-progress v-if="loading" indeterminate color="primary" />
    <q-table
      v-else
      :rows="filteredStations"
      :columns="columns"
      row-key="slugName"
      flat
      :filter="searchTerm"
      :selected="selectedRows"
      @update:selected="updateSelected"
      selection="multiple"
      :visible-columns="visibleColumns"
      class="sticky-header-table"
      @row-click="(evt, row) => openStation(row.slugName)"
    >
      <template v-slot:top>
        <q-input v-model="searchTerm" dense clearable debounce="200" placeholder="Search stations" class="col-6" />
      </template>
      <template v-slot:body-cell-description="props">
        <q-td :props="props">
          <div class="ellipsis" style="max-width: 300px">{{ props.value }}</div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useRadioStationsStore } from 'src/stores/radioStationsStore'
import type { RadioStationStatus } from 'src/types/models'

const radioStationsStore = useRadioStationsStore()
const $q = useQuasar()
const router = useRouter()
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    await radioStationsStore.fetchRadioStations()
  } finally {
    loading.value = false
  }
})

const searchTerm = ref('')
const selectedRows = ref<RadioStationStatus[]>([])

const filteredStations = computed(() => radioStationsStore.getEntries)

const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' as const },
  { name: 'countryCode', label: 'Country', field: 'countryCode', align: 'left' as const },
  { name: 'currentStatus', label: 'Status', field: 'currentStatus', align: 'left' as const },
  { name: 'description', label: 'Description', field: 'description', align: 'left' as const }
]

const visibleColumns = computed(() => {
  if ($q.screen.lt.sm) {
    return ['name', 'currentStatus']
  }
  if ($q.screen.lt.md) {
    return ['name', 'countryCode', 'currentStatus']
  }
  return ['name', 'countryCode', 'currentStatus', 'description']
})

function updateSelected(rows: readonly RadioStationStatus[]) {
  selectedRows.value = [...rows]
}

function openStation(slugName: string) {
  void router.push(`/radiostations/${encodeURIComponent(slugName)}`)
}
</script>

<style scoped>
.sticky-header-table :deep(thead tr th) {
  background-color: #f5f5f5;
  font-weight: 600;
}
</style>
