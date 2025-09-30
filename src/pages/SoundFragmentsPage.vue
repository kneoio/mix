<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Sound Fragments</div>

    <q-card flat>
      <q-card-section>
        <div class="row q-col-gutter-sm q-mb-md">
          <div class="col-12 col-md-6">
            <q-input v-model="search" dense clearable debounce="300" placeholder="Search fragments" @update:model-value="onSearch" />
          </div>
        </div>

        <div class="row items-center q-col-gutter-sm q-mb-sm">
          <div class="col-auto text-subtitle2">Total:</div>
          <div class="col-auto text-subtitle2">{{ totalDisplay }}</div>
          <div class="col-auto">
            <q-checkbox
              :model-value="allSelectedOnPage"
              :indeterminate="hasAnySelected && !allSelectedOnPage"
              dense
              @update:model-value="(v) => (v ? selectAll() : clear())"
              label="Select page"
            />
          </div>
          <div class="col-auto text-caption" v-if="hasAnySelected">Selected: {{ selectedCount }}</div>
          <div class="col q-gutter-sm flex justify-end">
            <q-btn dense flat icon="chevron_left" :disable="page <= 1 || loading" @click="prevPage" />
            <div class="text-caption">Page {{ page }} / {{ maxPage }}</div>
            <q-btn dense flat icon="chevron_right" :disable="loading || page >= maxPage" @click="nextPage" />
          </div>
        </div>

        <div v-if="loading" class="q-mb-sm">
          <q-linear-progress indeterminate rounded color="primary" />
        </div>
        <div v-else>
          <div v-if="items.length === 0" class="text-caption text-grey-7">No fragments</div>
          <q-list v-else separator>
            <q-item v-for="f in items" :key="f.id" clickable @click="openFragment(f.id)">
              <q-item-section side>
                <q-checkbox
                  :model-value="isSelected(f)"
                  @update:model-value="(v) => toggle(f, v as boolean)"
                  @click.stop
                  dense
                />
              </q-item-section>
              <q-item-section>
                <div class="text-body1">{{ f.title || f.slugName }}</div>
                <div class="text-caption text-grey-7">{{ f.artist || '—' }} · {{ f.type }} · {{ f.genres?.join(', ') }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSoundFragmentsStore } from 'src/stores/soundFragmentsStore'
import { useSelection } from 'src/composables/useSelection'

const store = useSoundFragmentsStore()
const router = useRouter()
const page = ref(1)
const pageSize = ref(10)
const search = ref('')

const items = computed(() => store.getEntries)
const loading = ref(false)
const totalDisplay = computed(() => store.getPagination.itemCount)
const maxPage = computed(() => store.getPagination.pageCount || 1)

// selection
const itemsArray = computed(() => items.value)
const { isSelected, toggle, clear, selectAll, selectedCount, hasAnySelected, allSelectedOnPage } =
  useSelection(itemsArray, (f) => f.id)

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

onMounted(() => {
  void load()
})
</script>
