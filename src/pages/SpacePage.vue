<template>
  <q-page class="q-pa-md">
    <q-banner v-if="stationsLoadError" dense inline-actions class="bg-negative text-white q-mb-md">
      {{ $t('space.loadFailed') }}
    </q-banner>

    <q-list bordered separator>
      <q-item
        v-for="station in radioStations"
        :key="station.slugName"
        clickable
        v-ripple
        :active="playerStore.radioSlug === station.slugName"
        active-class="bg-grey-3"
        @click="selectStation(station.slugName)"
      >
        <q-item-section avatar>
          <q-avatar :style="{ backgroundColor: station.color }" size="40px">
            <span class="text-white text-caption">{{ station.countryCode }}</span>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h6" style="font-family: Roboto">{{ station.name }}</q-item-label>
          <q-item-label caption>{{ formatStatusText(station.currentStatus) }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            round
            flat
            :icon="isPlayingStation(station.slugName) ? 'pause' : 'play_arrow'"
            :color="isPlayingStation(station.slugName) ? 'primary' : 'grey-7'"
            @click.stop="togglePlayStation(station.slugName)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <div v-if="radioStations.length === 0 && !stationsLoadError" class="text-center q-pa-lg text-grey">
      {{ $t('space.noOnlineStations') }}
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

import { usePlayerStore } from 'src/stores/playerStore'
import { useStationStatusStore } from 'src/stores/stationStatusStore'
import { useUiStore } from 'src/stores/uiStore'

const playerStore = usePlayerStore()
const stationStatusStore = useStationStatusStore()
const { formatStatusText } = stationStatusStore
const loading = ref(false)
const ui = useUiStore()
const router = useRouter()

const radioStations = computed(() => playerStore.stations.filter(
  s => s.currentStatus === 'ON_LINE' || s.currentStatus === 'WARMING_UP' || s.currentStatus === 'BROADCASTING'
))
const stationsLoadError = computed(() => playerStore.stationsLoadError)

onMounted(async () => {
  loading.value = true
  try {
    await playerStore.fetchRadioStations()
  } finally {
    loading.value = false
  }
})

watch(loading, (v) => ui.setGlobalLoading(v))

function selectStation(slugName: string) {
  playerStore.setStation(slugName)
  void router.push(`/player/${slugName}`)
}

function togglePlayStation(slugName: string) {
  if (playerStore.radioSlug !== slugName) {
    playerStore.setStation(slugName)
  }
  playerStore.togglePlay()
}

function isPlayingStation(slugName: string): boolean {
  return playerStore.isPlaying && playerStore.radioSlug === slugName
}
</script>

<style scoped>
</style>
