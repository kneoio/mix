<template>
  <q-page class="q-pa-md-md q-pa-sm-none q-pa-xs-none full-height-page">
    <q-banner v-if="stationsLoadError" dense inline-actions class="bg-negative text-white q-mb-md">
      {{ $t('space.loadFailed') }}
    </q-banner>

    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      navigation
      padding
      arrows
      infinite
      class="rounded-borders full-height-carousel"
    >
      <q-carousel-slide
        v-for="station in radioStations"
        :key="station.slugName"
        :name="station.slugName"
        class="column no-wrap flex-center"
      >
        <q-card
          flat
          class="station-card full-width-mobile"
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

          <q-card-section class="text-center" style="margin-top: 40px; margin-bottom: 40px;">
            <transition name="fade-slide">
              <div v-if="isPlayingStation(station.slugName)" class="now-playing-info q-mb-lg">
                <AnimatedText
                  :text="playerStore.nowPlaying"
                  :animation-type="playerStore.titleAnimation.enabled ? playerStore.titleAnimation.type : 'static'"
                  :animation-speed="playerStore.titleAnimation.speed"
                  :visual-style="playerStore.titleAnimation.enabled ? 'glow' : 'none'"
                  :station-color="station.color || ''"
                />
              </div>
            </transition>
            <q-btn
              round
              size="lg"
              color="grey-5"
              :icon="playerStore.isPlaying ? 'pause' : 'play_arrow'"
              @click="togglePlay"
              class="q-mb-md q-mt-md"
            />
            <transition name="fade">
              <div v-if="!isPlayingStation(station.slugName)" class="text-body2">{{ station.description }}</div>
            </transition>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import AnimatedText from 'src/components/AnimatedText.vue'
import { usePlayerStore } from 'src/stores/playerStore'
import { useStationStatusStore } from 'src/stores/stationStatusStore'
import { useUiStore } from 'src/stores/uiStore'

const playerStore = usePlayerStore()
const stationStatusStore = useStationStatusStore()
const { formatStatusText } = stationStatusStore
const loading = ref(false)
const ui = useUiStore()
const audioElement = ref<HTMLAudioElement | null>(null)

const radioStations = computed(() => playerStore.stations)
const stationsLoadError = computed(() => playerStore.stationsLoadError)
const slide = ref('')

onMounted(async () => {
  loading.value = true
  try {
    await playerStore.fetchRadioStations()
    slide.value = radioStations.value[0]?.slugName || ''
    audioElement.value = new Audio()
    playerStore.setAudioElement(audioElement.value)
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  playerStore.cleanup()
})

watch(loading, (v) => ui.setGlobalLoading(v))

watch(slide, (newSlug) => {
  if (playerStore.isPlaying && playerStore.radioSlug !== newSlug) {
    playerStore.togglePlay()
    playerStore.setStation(newSlug)
    playerStore.togglePlay()
  }
})

function getStatusClass(status?: string): string {
  if (status === 'ON_LINE' || status === 'WARMING_UP') return 'text-positive'
  return 'text-accent'
}

function isPlayingStation(slugName: string): boolean {
  return playerStore.isPlaying && playerStore.radioSlug === slugName
}

function togglePlay() {
  if (playerStore.radioSlug !== slide.value) {
    playerStore.setStation(slide.value)
  }
  playerStore.togglePlay()
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

.full-width-mobile {
  width: 100%;
  max-width: 600px;
}

@media (max-width: 599px) {
  .full-width-mobile {
    max-width: 100%;
  }
}

.now-playing-info {
  text-align: center;
  font-size: 1rem;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.full-height-page {
  height: 100%;
}

.full-height-carousel {
  height: calc(100vh - 100px);
}
</style>
