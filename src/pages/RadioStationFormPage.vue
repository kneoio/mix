<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <div class="col-auto">
        <q-btn flat icon="arrow_back" label="Back" @click="goBack" />
      </div>
      <div class="col">
        <div class="text-h5">{{ station.slugName }}</div>
        <div class="text-caption" :class="getStatusClass(station.status)">{{ statusText(station.status) }}</div>
      </div>
    </div>

    <q-card flat bordered>
      <q-linear-progress v-if="loading" indeterminate color="primary" />
      <q-card-section v-else>
        <div v-if="!station.id" class="text-caption text-grey-7">Not found</div>
        <div v-else class="column q-col-gutter-sm">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">Title</div>
              <div class="text-body1">{{ station.title }}</div>
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">Country</div>
              <div class="text-body1">{{ station.country }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">Color</div>
              <div class="text-body1">{{ station.color }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="text-subtitle2">Description</div>
              <div class="text-body1">{{ station.description || '—' }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">URL</div>
              <div class="text-body1">{{ station.url || '—' }}</div>
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">HLS URL</div>
              <div class="text-body1">{{ station.hlsUrl || '—' }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRadioStationsStore } from 'src/stores/radioStationsStore'

const route = useRoute()
const router = useRouter()
const radioStationsStore = useRadioStationsStore()

const stationId = computed(() => String(route.params.id || ''))
const loading = ref(false)

const station = computed(() => radioStationsStore.getCurrent)

function goBack() {
  router.back()
}

function statusText(s?: string) {
  if (s === 'ON_LINE') return 'Online'
  if (s === 'WARMING_UP') return 'Online'
  if (s === 'OFF_LINE') return 'Offline'
  return 'Unknown'
}

function getStatusClass(status?: string): string {
  if (status === 'ON_LINE' || status === 'WARMING_UP') return 'text-positive'
  return 'text-grey-7'
}

onMounted(async () => {
  loading.value = true
  try {
    await radioStationsStore.fetchRadioStation(stationId.value)
  } finally {
    loading.value = false
  }
})
</script>
