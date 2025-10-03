<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <div class="col-auto">
        <q-btn flat icon="arrow_back" label="Back" @click="goBack" />
      </div>
      <div class="col text-center">
        <div class="text-h5">{{ stationName }}</div>
        <div class="text-caption text-grey-7">{{ displayStatusText }}</div>
      </div>
      <div class="col-auto" style="width: 80px;"></div>
    </div>

    <div class="column q-gutter-lg">
      <q-card flat>
        <q-card-section>
          <div class="text-body2 q-mb-md">{{ formatStatusText(currentStatus) }}</div>
          <div class="text-subtitle2 q-mb-sm">Description</div>
          <div class="text-body2">{{ description }}</div>
        </q-card-section>
      </q-card>

      <q-card flat>

        
        <q-tabs v-if=" $q.screen.gt.sm " v-model="activeTab" dense class="text-grey" active-color="primary"
          indicator-color="primary" align="left">
          <q-tab name="submitSong" label="Submit Song" />
          <q-tab name="postMessage" label="Post Message" />
        </q-tabs>
        <q-tab-panels v-if=" $q.screen.gt.sm " v-model="activeTab" animated>
          <q-tab-panel name="submitSong">
            <div class="text-body2">Submit Song content</div>
          </q-tab-panel>
          <q-tab-panel name="postMessage">
            <div class="text-body2">Post Message content</div>
          </q-tab-panel>
        </q-tab-panels>
        <q-card-section v-else>
          <div class="text-subtitle1">Submit Song</div>
          <div class="text-body2 q-mb-md">Submit Song content</div>
          <q-separator class="q-my-md" />
          <div class="text-subtitle1">Post Message</div>
          <div class="text-body2">Post Message content</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useStationStatusStore } from 'src/stores/stationStatusStore'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const stationStatusStore = useStationStatusStore()
const stationSlug = computed( () => String( route.params.slug || '' ) )
const { stationName, currentStatus, description, displayStatusText } = storeToRefs( stationStatusStore )
const { formatStatusText } = stationStatusStore
const activeTab = ref( 'submitSong' )

function goBack() {
  router.back()
}

onMounted( async () => {
  await stationStatusStore.fetchStation( stationSlug.value )
} )
</script>
