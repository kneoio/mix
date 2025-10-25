<template>
  <q-page class="q-pa-md-md q-pa-sm-none q-pa-xs-none full-height-page">
    <q-banner v-if=" stationsLoadError " dense inline-actions class="bg-negative text-white q-mb-md">
      {{ $t( 'space.loadFailed' ) }}
    </q-banner>

    <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
      control-color="gray-14" padding arrows infinite class="rounded-borders full-height-carousel">
      <q-carousel-slide v-for=" station in radioStations " :key="station.slugName" :name="station.slugName"
        class="column no-wrap flex-center">
        <div :class="['station-card', 'full-width-mobile', { playing: isPlayingStation( station.slugName ) }]">


          <div class="q-pa-md">
            <div class="row justify-center">
              <div class="text-h6 text-center" style="font-family: Roboto">{{ station.name }}</div>
            </div>
          </div>

           <div class="color-bar" :style="{ backgroundColor: station.color }">
            <div class="color-bar-wave" :style="{ backgroundColor: station.color }"></div>
          </div>
          
          <div class="q-pa-md text-center" style="margin-top: 40px; margin-bottom: 40px;">
            <div class="now-playing-info q-mb-lg" style="min-height: 60px;">
              <div v-show=" isPlayingStation( station.slugName ) " class="now-playing-container" :style="{ opacity: nowPlayingOpacity, transition: 'opacity 1s ease-out' }">
                <span class="text-left">{{ nowPlayingParts.left }}</span>
                <span class="dot">|</span>
                <span class="text-right">{{ nowPlayingParts.right }}</span>
              </div>
            </div>
            <q-btn round size="lg" color="grey-5" :icon="playerStore.isPlaying ? 'pause' : 'play_arrow'"
              @click="togglePlay" class="q-mb-md q-mt-md" />
            <div class="row justify-center items-center q-gutter-md q-mt-lg">
              <div class="text-caption" style="color: gray-9;">{{ station.countryCode }}</div>
              <div class="text-caption" style="color: gray-9;">{{ formatStatusText( station.currentStatus ) }}</div>
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'

import { usePlayerStore } from 'src/stores/playerStore'
import { useStationStatusStore } from 'src/stores/stationStatusStore'
import { useUiStore } from 'src/stores/uiStore'

const playerStore = usePlayerStore()
const stationStatusStore = useStationStatusStore()
const { formatStatusText } = stationStatusStore
const loading = ref( false )
const ui = useUiStore()

const radioStations = computed( () => playerStore.stations )
const stationsLoadError = computed( () => playerStore.stationsLoadError )
const slide = ref( '' )
const nowPlayingOpacity = ref( 1 )
let hideTimer: ReturnType<typeof setTimeout> | null = null


const nowPlayingParts = computed(() => {
  const text = playerStore.nowPlaying || '';
  const parts = text.split(/\s*(?:-|\u2013|\u2014|\|)\s*/);
  if (parts.length >= 2) {
    return {
      left: parts[0],
      right: parts.slice(1).join(' · ')
    };
  }
  return {
    left: text,
    right: ''
  };
});

onMounted( async () => {
  loading.value = true
  try {
    await playerStore.fetchRadioStations()
    slide.value = playerStore.radioSlug || radioStations.value[0]?.slugName || ''
  } finally {
    loading.value = false
  }
} )


watch( loading, ( v ) => ui.setGlobalLoading( v ) )

watch( slide, ( newSlug ) => {
  if ( playerStore.radioSlug !== newSlug ) {
    if ( playerStore.isPlaying ) {
      playerStore.togglePlay()
      playerStore.setStation( newSlug )
      playerStore.togglePlay()
    } else {
      playerStore.setStation( newSlug )
    }
  }
} )

watch(() => playerStore.isPlaying, (playing) => {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  
  if (playing) {
    nowPlayingOpacity.value = 1
    hideTimer = setTimeout(() => {
      nowPlayingOpacity.value = 0
    }, 60000)
  }
})

function togglePlay() {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  nowPlayingOpacity.value = 1
  
  if ( playerStore.radioSlug !== slide.value ) {
    playerStore.setStation( slide.value )
  }
  playerStore.togglePlay()
}

function isPlayingStation( slugName: string ): boolean {
  return playerStore.isPlaying && playerStore.radioSlug === slugName
}
</script>

<style scoped>
.station-card {
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.station-card:hover {
  transform: none;
  box-shadow: none;
}

.station-card.playing,
.station-card.playing:hover {
  transform: none;
  box-shadow: none;
  border: none;
}

.color-bar {
  height: 2px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.color-bar-wave {
  position: absolute;
  top: 0;
  left: -30%;
  height: 100%;
  width: 30%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
  animation: wave 5s ease-in-out infinite;
}

@keyframes wave {
  0% {
    left: -30%;
  }
  100% {
    left: 100%;
  }
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
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  padding: 0 1rem;
}

.now-playing-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
}

.text-left {
  text-align: right;
  flex: 1;
  min-width: 0;
  white-space: normal;
  word-wrap: break-word;
  padding-right: 0.5rem;
}

.dot {
  flex-shrink: 0;
  font-size: 2rem;
  padding: 0 0.25rem;
  align-self: flex-start;
  line-height: 1.5;
}

.text-right {
  text-align: left;
  flex: 1;
  min-width: 0;
  white-space: normal;
  word-wrap: break-word;
  padding-left: 0.5rem;
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
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

.q-page {
  background-color: transparent;
}
</style>
