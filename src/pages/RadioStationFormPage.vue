<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <div class="col-auto">
        <q-btn flat icon="arrow_back" label="Back" @click="goBack" />
      </div>
      <div class="col-auto">
        <q-btn color="primary" label="Save" size="md" @click="handleSave" />
      </div>
      <div class="col text-center">
        <div class="text-h5">{{ station.slugName }}</div>
        <div class="text-caption" :class="getStatusClass(station.status)">{{ statusText(station.status) }}</div>
      </div>
      <div class="col-auto" style="width: 80px;"></div>
    </div>

    <q-card flat>
      <q-linear-progress v-if="loading" indeterminate color="primary" />
      <q-card-section v-else>
        <div v-if="!station.id" class="text-caption text-grey-7">Not found</div>
        <q-tabs v-else-if="$q.screen.gt.sm" v-model="activeTab" dense class="text-grey" active-color="primary" indicator-color="primary" align="left">
          <q-tab name="properties" label="Properties" />
          <q-tab name="aiAgent" label="AI Agent" />
        </q-tabs>
        <q-tab-panels v-if="$q.screen.gt.sm && station.id" v-model="activeTab" animated>
          <q-tab-panel name="properties">
            <q-form class="column q-col-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <div class="text-subtitle2 q-mb-sm">Localized Names</div>
              <LocalizedNameInput v-model="formData.localizedName" />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select
                v-model="formData.country"
                :options="referencesStore.countryOptions"
                option-label="label"
                option-value="value"
                emit-value
                map-options
                label="Country"
                outlined
                dense
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.color"
                label="Color"
                outlined
                dense
              >
                <template v-slot:append>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-color v-model="formData.color" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-select
                v-model="formData.timeZone"
                :options="referencesStore.timezones"
                option-label="label"
                option-value="value"
                emit-value
                map-options
                label="Time Zone"
                outlined
                dense
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select
                v-model="formData.managedBy"
                :options="referencesStore.managedByOptions"
                option-label="label"
                option-value="value"
                emit-value
                map-options
                label="Managed By"
                outlined
                dense
              />
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle2 q-mb-sm">Bit Rate</div>
              <q-slider
                v-model="formData.bitRate"
                :min="128000"
                :max="320000"
                :step="64000"
                :marker-labels="{
                  128000: '128 kbps',
                  192000: '192 kbps',
                  256000: '256 kbps',
                  320000: '320 kbps'
                }"
                markers
                label
                :label-value="(formData.bitRate || 0) / 1000 + ' kbps'"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                v-model="formData.description"
                label="Description"
                outlined
                dense
                type="textarea"
                :rows="3"
              />
            </div>
          </div>
        </q-form>
          </q-tab-panel>
          <q-tab-panel name="aiAgent">
            <div class="text-body2">AI Agent configuration</div>
          </q-tab-panel>
        </q-tab-panels>
        <q-form v-else-if="station.id" class="column q-col-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <div class="text-subtitle2 q-mb-sm">Localized Names</div>
              <LocalizedNameInput v-model="formData.localizedName" />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select
                v-model="formData.country"
                :options="referencesStore.countryOptions"
                option-label="label"
                option-value="value"
                emit-value
                map-options
                label="Country"
                outlined
                dense
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.color"
                label="Color"
                outlined
                dense
              >
                <template v-slot:append>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-color v-model="formData.color" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-select
                v-model="formData.timeZone"
                :options="referencesStore.timezones"
                option-label="label"
                option-value="value"
                emit-value
                map-options
                label="Time Zone"
                outlined
                dense
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select
                v-model="formData.managedBy"
                :options="referencesStore.managedByOptions"
                option-label="label"
                option-value="value"
                emit-value
                map-options
                label="Managed By"
                outlined
                dense
              />
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle2 q-mb-sm">Bit Rate</div>
              <q-slider
                v-model="formData.bitRate"
                :min="128000"
                :max="320000"
                :step="64000"
                :marker-labels="{
                  128000: '128 kbps',
                  192000: '192 kbps',
                  256000: '256 kbps',
                  320000: '320 kbps'
                }"
                markers
                label
                :label-value="(formData.bitRate || 0) / 1000 + ' kbps'"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                v-model="formData.description"
                label="Description"
                outlined
                dense
                type="textarea"
                :rows="3"
              />
            </div>
          </div>
          <div class="text-body2 q-mt-lg">AI Agent configuration</div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useRadioStationsStore } from 'src/stores/radioStationsStore'
import { useReferencesStore } from 'src/stores/referencesStore'
import LocalizedNameInput from 'src/components/LocalizedNameInput.vue'
import type { ManagedBy } from 'src/types/models'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const radioStationsStore = useRadioStationsStore()
const referencesStore = useReferencesStore()

const stationId = computed(() => String(route.params.id || ''))
const loading = ref(false)
const activeTab = ref('properties')

const station = computed(() => radioStationsStore.getCurrent)

const formData = reactive({
  localizedName: {} as Record<string, string>,
  country: '',
  description: '',
  color: '',
  timeZone: '',
  managedBy: '' as ManagedBy | '',
  bitRate: 192000
})

watch(station, (newStation) => {
  if (newStation) {
    formData.localizedName = newStation.localizedName || {}
    formData.country = newStation.country || ''
    formData.description = newStation.description || ''
    formData.color = newStation.color || ''
    formData.timeZone = newStation.timeZone || ''
    formData.managedBy = newStation.managedBy || ''
    formData.bitRate = newStation.bitRate || 192000
  }
}, { immediate: true })

function goBack() {
  router.back()
}

function statusText(s?: string) {
  if (s === 'ON_LINE') return 'Online'
  if (s === 'OFF_LINE') return 'Offline'
  return 'Unknown'
}

function getStatusClass(status?: string): string {
  if (status === 'ON_LINE') return 'text-positive'
  if (status === 'OFF_LINE') return 'text-grey-7'
  return 'text-grey-7'
}

async function handleSave() {
  console.log('Save', formData)
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
