<template>
  <q-page class="q-px-md q-pb-md q-pt-none">
    <ListHeader
      :title="$t('menu.radistions')"
      :quantity="radioStationsStore.getPagination.itemCount"
      :show-back="false"
      :show-new="true"
      :show-delete="true"
      :delete-disabled="selectedRows.length === 0"
      @new="handleNew"
      @delete="handleDelete"
    />

    <q-table :rows="filteredStations" :columns="columns" row-key="id" flat :filter="searchTerm"
      :selected="selectedRows" @update:selected="updateSelected" selection="multiple" :visible-columns="visibleColumns"
      v-model:pagination="tablePagination" :rows-per-page-options="[0]"
      class="sticky-header-table" @row-click="( evt, row ) => openStation( row.id )">
      <template v-slot:top>
        <q-input v-model="searchTerm" dense clearable debounce="200" :placeholder="$t('common.search')" class="col-6" />
        <q-space />
        <q-btn dense flat icon="chevron_left" :disable="page <= 1 || loading" @click="prevPage" />
        <div class="text-caption q-mx-sm">{{ $t('common.page') }} {{ page }} / {{ maxPage }}</div>
        <q-btn dense flat icon="chevron_right" :disable="loading || page >= maxPage" @click="nextPage" />
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
import ListHeader from 'src/components/ListHeader.vue'

const radioStationsStore = useRadioStationsStore()
const $q = useQuasar()
const router = useRouter()
const loading = ref( false )
const page = ref(1)
const pageSize = ref(10)
const maxPage = computed(() => radioStationsStore.getPagination.pageCount || 1)
const tablePagination = ref({ page: 1, rowsPerPage: 0 })

onMounted( async () => {
  loading.value = true
  try {
    await radioStationsStore.fetchRadioStations(page.value, pageSize.value)
  } finally {
    loading.value = false
  }
} )

const searchTerm = ref( '' )
const selectedRows = ref<RadioStation[]>( [] )

const filteredStations = computed( () => radioStationsStore.getEntries )

import { i18n } from 'boot/i18n'

function formatStatus( s?: string ) {
  if ( s === 'ON_LINE' ) return 'Online'
  if ( s === 'WARMING_UP' ) return 'Warming Up'
  if ( s === 'QUEUE_SATURATED' ) return 'Queue Saturated'
  if ( s === 'WAITING_FOR_CURATOR' ) return 'Waiting for Curator'
  if ( s === 'IDLE' ) return 'Idle'
  if ( s === 'SYSTEM_ERROR' ) return 'System Error'
  if ( s === 'OFF_LINE' ) return 'Offline'
  return s || 'Unknown'
}

const columns = computed(() => [
  { name: 'title', label: i18n.global.t('columns.title'), field: 'slugName', align: 'left' as const },
  { name: 'country', label: i18n.global.t('columns.country'), field: 'country', align: 'left' as const },
  { name: 'status', label: i18n.global.t('columns.status'), field: (row: RadioStation) => formatStatus(row.status), align: 'left' as const },
  { name: 'description', label: i18n.global.t('columns.description'), field: 'description', align: 'left' as const }
])

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

  const confirmed = confirm( i18n.global.t('radiostations.confirmDelete', { count: selectedRows.value.length }) )
  if ( !confirmed ) return

  try {
    loading.value = true
    await Promise.all( selectedRows.value.map( s =>
      radioStationsStore.deleteRadioStation( s.id )
    ) )
    selectedRows.value = []
    await radioStationsStore.fetchRadioStations(page.value, pageSize.value)
  } finally {
    loading.value = false
  }
}

function nextPage () {
  if (page.value < maxPage.value) {
    page.value += 1
    void radioStationsStore.fetchRadioStations(page.value, pageSize.value)
  }
}

function prevPage () {
  if (page.value > 1) {
    page.value -= 1
    void radioStationsStore.fetchRadioStations(page.value, pageSize.value)
  }
}
</script>

<style scoped>
.sticky-header-table :deep(thead tr th) {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #111;
}
</style>
