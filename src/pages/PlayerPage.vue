<template>
  <q-dialog v-model="dialogModel" maximized transition-show="slide-up" transition-hide="slide-down">
    <q-card>
      <q-bar class="mixpla-header-gradient text-white">
        <div class="text-h6 mixpla-title">Mixpla</div>
        <q-space />
        <q-btn flat dense round icon="expand_less" v-close-popup class="lt-sm" />
        <q-btn flat dense round icon="close" v-close-popup class="gt-xs" />
      </q-bar>
      <q-card-section class="q-pa-md player-content">
        <div class="station-info">
          <h1 class="station-name">{{ stationName }}</h1>
          <div class="station-meta" v-if="djName || countryCode">
            <span v-if="djName">DJ: {{ djName }}</span>
            <span v-if="djName && countryCode"> · </span>
            <span v-if="countryCode">Country: {{ countryCode }}</span>
          </div>
        </div>

        <div class="now-playing-info">
          <AnimatedText
            :text="nowPlaying"
            :animation-type="titleAnimation.enabled ? titleAnimation.type : 'static'"
            :animation-speed="titleAnimation.speed"
            :visual-style="titleAnimation.enabled ? 'glow' : 'none'"
            :station-color="stationColor || ''"
          />
        </div>

        <div class="controls">
          <q-btn
            round
            size="xl"
            color="grey-5"
            :icon="isPlaying ? 'pause' : 'play_arrow'"
            @click="togglePlay"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import AnimatedText from 'src/components/AnimatedText.vue'
import { usePlayerStore } from 'src/stores/playerStore'

const props = defineProps<{
  showFullscreen: boolean
}>()

const emit = defineEmits<{
  'update:showFullscreen': [value: boolean]
}>()

const dialogModel = computed({
  get: () => props.showFullscreen,
  set: (value: boolean) => emit('update:showFullscreen', value)
})

const playerStore = usePlayerStore()
const { stationName, djName, countryCode, stationColor, nowPlaying, isPlaying, titleAnimation } = storeToRefs(playerStore)

function togglePlay() {
  playerStore.togglePlay()
}
</script>

<style scoped>
.player-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  padding-top: 2rem;
}

.station-info {
  text-align: center;
}

.station-name {
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
}

.now-playing-info {
  text-align: center;
  font-size: 1.2rem;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls {
  margin: 1rem 0;
}

</style>
