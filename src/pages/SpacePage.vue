<template>
  <q-page class="q-pa-md">
    <q-linear-progress v-if="loading" indeterminate color="primary" />

    <div v-else class="row q-col-gutter-md">
      <div
        v-for="station in radioStations"
        :key="station.slugName"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card
          flat
          class="station-card cursor-pointer"
          @click="openStation(station.slugName)"
        >
          <div class="color-bar" :style="{ backgroundColor: station.color }"></div>

          <q-card-section>
            <div class="row items-center q-gutter-sm">
              <div class="text-h6">{{ station.name }}</div>
              <div class="text-caption text-accent">{{ station.countryCode }}</div>
              <q-space />
              <div class="text-caption" :class="getStatusClass(station.currentStatus)">
                {{ formatStatusText(station.currentStatus) }}
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="text-body2 ellipsis-2-lines">{{ station.description }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePlayerStore } from 'src/stores/playerStore'
import { useStationStatusStore } from 'src/stores/stationStatusStore'

const playerStore = usePlayerStore()
const stationStatusStore = useStationStatusStore()
const { formatStatusText } = stationStatusStore
const router = useRouter()
const loading = ref(false)

const radioStations = computed(() => playerStore.stations)

onMounted(async () => {
  loading.value = true
  try {
    await playerStore.fetchRadioStations()
  } finally {
    loading.value = false
  }
})

function openStation(slugName: string) {
  void router.push(`/station/${slugName}`)
}

function getStatusClass(status?: string): string {
  if (status === 'ON_LINE' || status === 'WARMING_UP') return 'text-positive'
  return 'text-accent'
}
</script>

<style scoped>
.station-card {
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.station-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.color-bar {
  height: 4px;
  width: 100%;
}

.ellipsis-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.4em;
}
</style>
