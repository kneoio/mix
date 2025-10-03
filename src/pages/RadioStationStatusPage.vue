<template>
  <q-page class="q-pa-md">
    <div class="column q-gutter-lg">
      <div class="station-header">
        <h1 class="station-name">{{ stationName }}</h1>
        <div class="text-caption text-grey-7">{{ stationSlug }}</div>
      </div>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1">Status</div>
          <div class="text-body2">{{ displayStatusText }}</div>
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1">Now Playing</div>
          <AnimatedText :text="nowPlaying" />
        </q-card-section>
      </q-card>

      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1">DJ</div>
          <div class="text-body2">{{ djName || 'N/A' }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import AnimatedText from 'src/components/AnimatedText.vue'
import { useStationStatusStore } from 'src/stores/stationStatusStore'

const route = useRoute()
const stationStatusStore = useStationStatusStore()
const stationSlug = computed( () => String( route.params.slug || '' ) )
const { stationName, nowPlaying, displayStatusText, djName } = storeToRefs( stationStatusStore )

onMounted( async () => {
  await stationStatusStore.fetchStation( stationSlug.value )
} )
</script>
