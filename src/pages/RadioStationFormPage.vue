<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <div class="col">
        <div class="text-h5">Radio Station</div>
        <div class="text-caption text-grey-7">{{ slugName }}</div>
      </div>
      <div class="col-auto">
        <q-btn flat icon="arrow_back" label="Back" @click="goBack" />
      </div>
    </div>

    <q-card flat bordered>
      <q-linear-progress v-if="loading" indeterminate color="primary" />
      <q-card-section v-else>
        <div v-if="!station" class="text-caption text-grey-7">Not found</div>
        <div v-else class="column q-col-gutter-sm">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">Name</div>
              <div class="text-body1">{{ station.name }}</div>
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">Country</div>
              <div class="text-body1">{{ station.countryCode }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">Status</div>
              <div class="text-body1">{{ station.currentStatus }}</div>
            </div>
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
              <div class="text-subtitle2">Available Songs</div>
              <div class="text-body1">{{ station.availableSongs }}</div>
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

const slugName = computed(() => String(route.params.slugName || ''))
const loading = ref(false)

const station = computed(() => 
  radioStationsStore.getEntries.find(s => s.slugName === slugName.value)
)

function goBack() {
  router.back()
}

onMounted(async () => {
  if (radioStationsStore.getEntries.length === 0) {
    loading.value = true
    try {
      await radioStationsStore.fetchRadioStations()
    } finally {
      loading.value = false
    }
  }
})
</script>
