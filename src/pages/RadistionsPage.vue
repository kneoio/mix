<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Radiostations</div>

    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center q-col-gutter-sm q-mb-sm">
          <div class="col-auto text-subtitle2">Total:</div>
          <div class="col-auto text-subtitle2">{{ radioStationsStore.total ?? radioStationsStore.stations.length }}</div>
        </div>

        <div v-if="radioStationsStore.loading" class="text-caption text-grey-7">Loading...</div>
        <div v-else>
          <div v-if="radioStationsStore.stations.length === 0" class="text-caption text-grey-7">No stations</div>
          <q-list v-else bordered separator>
            <q-item v-for="s in radioStationsStore.stations" :key="s.slugName">
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
import { onMounted } from 'vue'
import { useRadioStationsStore } from 'src/stores/radioStationsStore'

const radioStationsStore = useRadioStationsStore()

onMounted(() => {
  // trigger initial load so network request is initiated
  void radioStationsStore.fetchRadioStations()
})
</script>
