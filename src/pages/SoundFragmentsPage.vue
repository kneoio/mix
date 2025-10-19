<template>
  <q-page class="q-px-md q-pb-md q-pt-none">
    <ListHeader
      :title="$t('menu.soundFragments')"
      :quantity="store.getPagination.itemCount"
      :show-back="false"
      :show-new="true"
      :show-delete="true"
      :delete-disabled="selectedRows.length === 0"
      @new="handleNew"
      @delete="handleDelete"
    />

    <q-table
      :rows="items"
      :columns="columns"
      row-key="id"
      flat
      :selected="selectedRows"
      v-model:pagination="tablePagination"
      :rows-per-page-options="[0]"
      @update:selected="updateSelected"
      selection="multiple"
      :visible-columns="visibleColumns"
      @row-click="(evt, row) => openFragment(row.id)"
      class="sticky-header-table"
    >
      <template v-slot:top>
        <q-input v-model="search" dense clearable debounce="300" :placeholder="$t('common.search')" @update:model-value="onSearch" class="col-6" />
        <q-space />
        <q-btn dense flat icon="chevron_left" :disable="page <= 1 || loading" @click="prevPage" />
        <div class="text-caption q-mx-sm">{{ $t('common.page') }} {{ page }} / {{ maxPage }}</div>
        <q-btn dense flat icon="chevron_right" :disable="loading || page >= maxPage" @click="nextPage" />
      </template>
      <template v-slot:body-cell-title="props">
        <q-td :props="props">
          <div class="ellipsis" style="max-width: 300px">{{ props.value || props.row.slugName }}</div>
        </q-td>
      </template>
      <template v-slot:body-cell-genres="props">
        <q-td :props="props">
          <div class="ellipsis" style="max-width: 200px">{{ props.value?.join(', ') || '—' }}</div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useSoundFragmentsStore } from 'src/stores/soundFragmentsStore'
import { useUiStore } from 'src/stores/uiStore'
import ListHeader from 'src/components/ListHeader.vue'
import type { SoundFragment } from 'src/types/models'

const store = useSoundFragmentsStore()
const router = useRouter()
const $q = useQuasar()
const page = ref(1)
const pageSize = ref(10)
const search = ref('')

const items = computed(() => store.getEntries)
const loading = ref(false)
const ui = useUiStore()
const maxPage = computed(() => store.getPagination.pageCount || 1)
const selectedRows = ref<SoundFragment[]>([])
const tablePagination = ref({ page: 1, rowsPerPage: 0 })

import { i18n } from 'boot/i18n'
const columns = computed(() => [
  { name: 'title', label: i18n.global.t('columns.title'), field: 'title', align: 'left' as const },
  { name: 'artist', label: i18n.global.t('columns.artist'), field: 'artist', align: 'left' as const },
  { name: 'type', label: i18n.global.t('columns.type'), field: 'type', align: 'left' as const },
  { name: 'genres', label: i18n.global.t('columns.genres'), field: 'genres', align: 'left' as const }
])

const visibleColumns = computed(() => {
  if ($q.screen.lt.sm) {
    return ['title', 'type']
  }
  if ($q.screen.lt.md) {
    return ['title', 'artist', 'type']
  }
  return ['title', 'artist', 'type', 'genres']
})

async function load () {
  loading.value = true
  try {
    await store.fetchSoundFragments(page.value, pageSize.value, search.value)
  } finally {
    loading.value = false
  }
}

function onSearch () {
  page.value = 1
  void load()
}

function nextPage () {
  if (page.value < maxPage.value) {
    page.value += 1
    void load()
  }
}

function prevPage () {
  if (page.value > 1) {
    page.value -= 1
    void load()
  }
}

function openFragment (id: string) {
  void router.push(`/fragments/${encodeURIComponent(id)}`)
}

function updateSelected(rows: readonly SoundFragment[]) {
  selectedRows.value = [...rows]
}

function handleNew() {
  void router.push('/fragments/new')
}

function handleDelete() {
  if (selectedRows.value.length === 0) {
    $q.notify({ type: 'warning', message: i18n.global.t('common.noItemsSelected') })
    return
  }
  $q.notify({ type: 'info', message: i18n.global.t('common.deleteNNotImplemented', { count: selectedRows.value.length }) })
}

onMounted(() => {
  void load()
})

watch(loading, (v) => ui.setGlobalLoading(v))
</script>

<style scoped>
.sticky-header-table :deep(thead tr th) {
  background-color: #f5f5f5;
  font-weight: 600;
}
</style>
