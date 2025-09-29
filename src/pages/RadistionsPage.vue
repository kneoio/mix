<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Radiostations</div>

    <q-card flat bordered>
      <q-card-section>
        <div class="row q-col-gutter-sm q-mb-md">
          <div class="col-12 col-md-6">
            <q-input v-model="searchTerm" dense clearable debounce="200" placeholder="Search stations" />
          </div>
        </div>

        <div class="row items-center q-col-gutter-sm q-mb-sm">
          <div class="col-auto text-subtitle2">Total:</div>
          <div class="col-auto text-subtitle2">{{ displayedTotal }}</div>
        </div>

        <div v-if="radioStationsStore.loading" class="text-caption text-grey-7">Loading...</div>
        <div v-else>
          <div v-if="filteredStations.length === 0" class="text-caption text-grey-7">No stations</div>
          <q-list v-else bordered separator>
            <q-item v-for="s in filteredStations" :key="s.slugName">
              <q-item-section>
                <div class="text-body1">{{ s.name }}</div>
                <div class="text-caption text-grey-7">{{ s.countryCode }} · {{ s.currentStatus }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRadioStationsStore } from 'src/stores/radioStationsStore'

const radioStationsStore = useRadioStationsStore()

onMounted(() => {
  // trigger initial load so network request is initiated
  void radioStationsStore.fetchRadioStations()
})

// search state
const searchTerm = ref('')
const filteredStations = computed(() => {
  const q = searchTerm.value.trim().toLowerCase()
  if (!q) return radioStationsStore.stations
  return radioStationsStore.stations.filter(s => {
    const name = (s.name || '').toLowerCase()
    const country = (s.countryCode || '').toLowerCase()
    const status = (s.currentStatus || '').toLowerCase()
    return name.includes(q) || country.includes(q) || status.includes(q)
  })
})
const displayedTotal = computed(() => {
  const base = radioStationsStore.total ?? radioStationsStore.stations.length
  return searchTerm.value.trim() ? filteredStations.value.length : base
})
</script>
