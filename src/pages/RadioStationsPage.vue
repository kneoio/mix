<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Radiostations</div>

    <q-linear-progress v-if=" loading " indeterminate color="primary" />
    <q-table v-else :rows="filteredStations" :columns="columns" row-key="id" flat :filter="searchTerm"
      :selected="selectedRows" @update:selected="updateSelected" selection="multiple" :visible-columns="visibleColumns"
      class="sticky-header-table" @row-click="( evt, row ) => openStation( row.id )">
      <template v-slot:top>
        <q-btn-group>
          <q-btn color="primary" label="New" size="md" @click="handleNew" />
          <q-btn color="negative" :label="`Delete (${selectedRows.length})`" size="md"
            :disable="selectedRows.length === 0" @click="handleDelete" />
        </q-btn-group>
        <q-space />
        <q-input v-model="searchTerm" dense clearable debounce="200" placeholder="Search stations" class="col-6" />
      </template>
      <template v-slot:body-cell-description=" props ">
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
import type { RadioStation } from 'src/types/models'

const radioStationsStore = useRadioStationsStore()
const $q = useQuasar()
const router = useRouter()
const loading = ref( false )

onMounted( async () => {
  loading.value = true
  try {
    await radioStationsStore.fetchRadioStations()
  } finally {
    loading.value = false
  }
} )

const searchTerm = ref( '' )
const selectedRows = ref<RadioStation[]>( [] )

const filteredStations = computed( () => radioStationsStore.getEntries )

const columns = [
  { name: 'title', label: 'Title', field: 'slugName', align: 'left' as const },
  { name: 'country', label: 'Country', field: 'country', align: 'left' as const },
  { name: 'status', label: 'Status', field: 'status', align: 'left' as const },
  { name: 'description', label: 'Description', field: 'description', align: 'left' as const }
]

const visibleColumns = computed( () => {
  if ( $q.screen.lt.sm ) {
    return ['title', 'status']
  }
  if ( $q.screen.lt.md ) {
    return ['title', 'country', 'status']
  }
  return ['title', 'country', 'status', 'description']
} )

function updateSelected( rows: readonly RadioStation[] ) {
  selectedRows.value = [...rows]
}

function openStation( id: string ) {
  void router.push( `/radiostations/${id}` )
}

function handleNew() {
  void router.push( '/radiostations/new' )
}

async function handleDelete() {
  if ( selectedRows.value.length === 0 ) return

  const confirmed = confirm( `Delete ${selectedRows.value.length} station(s)?` )
  if ( !confirmed ) return

  try {
    loading.value = true
    await Promise.all( selectedRows.value.map( s =>
      radioStationsStore.deleteRadioStation( s.id )
    ) )
    selectedRows.value = []
    await radioStationsStore.fetchRadioStations()
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
