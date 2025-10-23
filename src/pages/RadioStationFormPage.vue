<template>
  <q-page class="q-px-md q-pb-md q-pt-none">
    <FormHeader :title="station?.slugName || ''" :subtitle="statusText( station?.status )"
      :subtitle-class="getStatusClass( station?.status )" :show-save="true" :show-delete="true"
      :disable-save="loading || saving" :disable-delete="loading || saving" @back="goBack" @save="handleSave"
      @delete="handleDelete" />

    <q-card flat class="gt-sm" style="max-width: 50%;">
      <q-card-section v-if=" !loading " class="q-px-none">
        <div v-if=" !station.id && stationId !== 'new' " class="text-caption text-accent">{{ $t( 'errors.notFound' ) }}
        </div>
        <q-tabs v-else-if=" $q.screen.gt.sm " v-model="activeTab" dense class="text-accent" active-color="primary"
          indicator-color="primary" align="left">
          <q-tab name="properties" :label="$t( 'tabs.properties' )" />
          <q-tab name="aiAgent" :label="$t( 'tabs.aiAgent' )" />
          <q-tab name="profile" :label="$t( 'tabs.profile' )" />
          <q-tab name="contribution" :label="$t( 'tabs.contribution' )" />
        </q-tabs>
        <q-tab-panels v-if=" $q.screen.gt.sm && ( station.id || stationId === 'new' ) " v-model="activeTab" animated>
          <q-tab-panel name="properties">
            <q-form class="column q-col-gutter-md">
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <div class="text-subtitle2 q-mb-sm">{{ $t( 'fields.localizedNames' ) }}</div>
                  <LocalizedNameInput v-model="formData.localizedName" />
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-select v-model="formData.country" :options="referencesStore.countryOptions" option-label="label"
                    option-value="value" emit-value map-options :label="$t( 'fields.country' )" outlined dense />
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-input v-model="formData.color" :label="$t( 'fields.color' )" outlined dense>
                    <template v-slot:append>
                      <q-icon name="colorize" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-color v-model="formData.color" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-select v-model="formData.timeZone" :options="referencesStore.timezones" option-label="label"
                    option-value="value" emit-value map-options :label="$t( 'fields.timeZone' )" outlined dense />
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-select v-model="formData.managedBy" :options="referencesStore.managedByOptions"
                    option-label="label" option-value="value" emit-value map-options :label="$t( 'fields.managedBy' )"
                    outlined dense />
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-select v-model="formData.bitRate" :options="bitrateOptions" option-label="label"
                    option-value="value" emit-value map-options :label="$t( 'fields.bitRate' )" outlined dense />
                </div>
              </div>
            </q-form>
          </q-tab-panel>
          <q-tab-panel name="aiAgent">
            <q-form class="column q-col-gutter-md">
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-select v-model="formData.aiAgentId" :options="referencesStore.aiAgentOptions" option-label="label"
                    option-value="value" emit-value map-options :label="$t( 'fields.aiAgent' )" outlined dense />
                </div>
              </div>
            </q-form>
          </q-tab-panel>
          <q-tab-panel name="profile">
            <q-form class="column q-col-gutter-md">
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-select v-model="formData.profileId" :options="referencesStore.profileOptions" option-label="label"
                    option-value="value" emit-value map-options :label="$t( 'fields.profileName' )" outlined dense />
                </div>
              </div>
            </q-form>
          </q-tab-panel>
          <q-tab-panel name="contribution">
            <q-form class="column">
              <q-checkbox v-model="formData.messagingAllowed" :label="$t( 'fields.messagingAllowed' )" class="q-my-sm" />
              <q-checkbox v-model="formData.songSubmissionAllowed" :label="$t( 'fields.songSubmissionAllowed' )" class="q-my-sm" />
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
        <q-form v-else-if=" station.id || stationId === 'new' " class="column q-col-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <div class="text-subtitle2 q-mb-sm">{{ $t( 'fields.localizedNames' ) }}</div>
              <LocalizedNameInput v-model="formData.localizedName" />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select v-model="formData.country" :options="referencesStore.countryOptions" option-label="label"
                option-value="value" emit-value map-options :label="$t( 'fields.country' )" outlined dense />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="formData.color" :label="$t( 'fields.color' )" outlined dense>
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
              <q-select v-model="formData.timeZone" :options="referencesStore.timezones" option-label="label"
                option-value="value" emit-value map-options :label="$t( 'fields.timeZone' )" outlined dense />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select v-model="formData.managedBy" :options="referencesStore.managedByOptions" option-label="label"
                option-value="value" emit-value map-options :label="$t( 'fields.managedBy' )" outlined dense />
            </div>
            <div class="col-12 col-md-6">
              <q-select v-model="formData.bitRate" :options="bitrateOptions" option-label="label" option-value="value"
                emit-value map-options label="Bit Rate" outlined dense />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-select v-model="formData.aiAgentId" :options="referencesStore.aiAgentOptions" option-label="label"
                option-value="value" emit-value map-options :label="$t( 'fields.aiAgent' )" outlined dense />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-select v-model="formData.profileId" :options="referencesStore.profileOptions" option-label="label"
                option-value="value" emit-value map-options :label="$t( 'fields.profileName' )" outlined dense />
            </div>
          </div>
          <q-checkbox v-model="formData.messagingAllowed" :label="$t( 'fields.messagingAllowed' )" class="q-my-sm" />
          <q-checkbox v-model="formData.songSubmissionAllowed" :label="$t( 'fields.songSubmissionAllowed' )" class="q-my-sm" />
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input v-model="formData.description" :label="$t( 'fields.description' )" outlined dense type="textarea"
                :rows="3" />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-section v-else class="q-px-none column q-gutter-sm">
        <q-skeleton type="text" class="q-mb-sm" style="width: 40%" />
        <q-skeleton type="text" class="q-mb-sm" style="width: 60%" />
        <q-skeleton type="rect" height="38px" class="q-mb-sm" />
        <q-skeleton type="rect" height="38px" class="q-mb-sm" />
        <q-skeleton type="text" class="q-mb-sm" style="width: 50%" />
      </q-card-section>
    </q-card>

    <q-card flat class="lt-md">
      <q-card-section v-if=" !loading " class="q-px-none">
        <div v-if=" !station.id && stationId !== 'new' " class="text-caption text-accent">{{ $t( 'errors.notFound' ) }}
        </div>
        <q-form v-else class="column q-col-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <div class="text-subtitle2 q-mb-sm">{{ $t( 'fields.localizedNames' ) }}</div>
              <LocalizedNameInput v-model="formData.localizedName" />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-select v-model="formData.country" :options="referencesStore.countryOptions" option-label="label"
                option-value="value" emit-value map-options :label="$t( 'fields.country' )" outlined dense />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input v-model="formData.color" :label="$t( 'fields.color' )" outlined dense>
                <template v-slot:append>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-color v-model="formData.color" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-select v-model="formData.timeZone" :options="referencesStore.timezones" option-label="label"
                option-value="value" emit-value map-options :label="$t( 'fields.timeZone' )" outlined dense />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-select v-model="formData.bitRate" :options="[
                { label: '128 kbps', value: 128000 },
                { label: '192 kbps', value: 192000 },
                { label: '256 kbps', value: 256000 },
                { label: '320 kbps', value: 320000 }
              ]" option-label="label" option-value="value" emit-value map-options :label="$t( 'fields.bitRate' )"
                outlined dense />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-select v-model="formData.aiAgentId" :options="referencesStore.aiAgentOptions" option-label="label"
                option-value="value" emit-value map-options :label="$t( 'fields.aiAgent' )" outlined dense />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-select v-model="formData.profileId" :options="referencesStore.profileOptions" option-label="label"
                option-value="value" emit-value map-options :label="$t( 'fields.profileName' )" outlined dense />
            </div>
          </div>
          <q-checkbox v-model="formData.messagingAllowed" :label="$t( 'fields.messagingAllowed' )" style="margin-bottom: -20px;" />
          <q-checkbox v-model="formData.songSubmissionAllowed" :label="$t( 'fields.songSubmissionAllowed' )" />
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input v-model="formData.description" :label="$t( 'fields.description' )" outlined dense type="textarea"
                :rows="3" />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-card-section v-else class="q-px-none column q-gutter-sm">
        <q-skeleton type="text" class="q-mb-sm" style="width: 40%" />
        <q-skeleton type="text" class="q-mb-sm" style="width: 60%" />
        <q-skeleton type="rect" height="38px" class="q-mb-sm" />
        <q-skeleton type="rect" height="38px" class="q-mb-sm" />
        <q-skeleton type="text" class="q-mb-sm" style="width: 50%" />
      </q-card-section>
    </q-card>

    <ValidationDialog v-model="showValidationDialog" :message="validationMessage" :errors="validationErrors" />
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useRadioStationsStore } from 'src/stores/radioStationsStore'
import { useReferencesStore } from 'src/stores/referencesStore'
import { useUiStore } from 'src/stores/uiStore'
import FormHeader from 'src/components/FormHeader.vue'
import LocalizedNameInput from 'src/components/LocalizedNameInput.vue'
import ValidationDialog from 'src/components/ValidationDialog.vue'
import { parseValidationProblem } from 'src/api/validation'
import type { ManagedBy } from 'src/types/models'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const radioStationsStore = useRadioStationsStore()
const referencesStore = useReferencesStore()

const stationId = computed( () => String( route.params.id || '' ) )
const loading = ref( false )
const saving = ref( false )
const ui = useUiStore()
const activeTab = ref( 'properties' )

const station = computed( () => radioStationsStore.getCurrent )

const showValidationDialog = ref( false )
const validationMessage = ref( '' )
const validationErrors = ref<Record<string, string[]>>( {} )

const formData = reactive( {
  localizedName: {} as Record<string, string>,
  country: '',
  description: '',
  color: '',
  timeZone: '',
  managedBy: 'MIX' as ManagedBy,
  bitRate: 192000,
  aiAgentId: '',
  profileId: '',
  messagingAllowed: false,
  songSubmissionAllowed: false
} )

const bitrateOptions = [
  { label: '128 kbps', value: 128000 },
  { label: '192 kbps', value: 192000 },
  { label: '256 kbps', value: 256000 },
  { label: '320 kbps', value: 320000 }
]

watch( station, ( newStation ) => {
  if ( newStation ) {
    formData.localizedName = newStation.localizedName || {}
    formData.country = newStation.country || ''
    formData.description = newStation.description || ''
    formData.color = newStation.color || ''
    formData.timeZone = newStation.timeZone || ''
    formData.managedBy = newStation.managedBy || 'MIX' as ManagedBy
    formData.bitRate = newStation.bitRate || 192000
    formData.aiAgentId = newStation.aiAgentId || ''
    formData.profileId = newStation.profileId || ''
    formData.messagingAllowed = ( newStation.messagingPolicy as string ) === 'ALLOWED'
    formData.songSubmissionAllowed = ( newStation.submissionPolicy as string ) === 'ALLOWED'
  }
}, { immediate: true } )

function goBack() {
  router.back()
}

function statusText( s?: string ) {
  if ( s === 'ON_LINE' ) return 'Online'
  if ( s === 'WARMING_UP' ) return 'Warming Up'
  if ( s === 'QUEUE_SATURATED' ) return 'Queue Saturated'
  if ( s === 'WAITING_FOR_CURATOR' ) return 'Waiting for Curator'
  if ( s === 'IDLE' ) return 'Idle'
  if ( s === 'SYSTEM_ERROR' ) return 'System Error'
  if ( s === 'OFF_LINE' ) return 'Offline'
  return s || 'Unknown'
}

function getStatusClass( status?: string ): string {
  if ( status === 'ON_LINE' ) return 'text-positive'
  if ( status === 'OFF_LINE' ) return 'text-accent'
  return 'text-accent'
}

async function handleSave() {
  try {
    saving.value = true
    const id = stationId.value === 'new' ? null : stationId.value
    const payload = {
      localizedName: formData.localizedName,
      country: formData.country,
      description: formData.description,
      color: formData.color,
      timeZone: formData.timeZone,
      managedBy: formData.managedBy,
      bitRate: formData.bitRate
    }
    await radioStationsStore.saveRadioStation( payload, id )
    $q.notify( { type: 'app-positive', message: 'Radio station saved successfully' } )
    await router.push( '/radiostations' )
  } catch ( error: unknown ) {
    const parsed = parseValidationProblem( error )
    if ( parsed ) {
      validationMessage.value = parsed.message
      validationErrors.value = parsed.fieldErrors
      showValidationDialog.value = true
      return
    }
    const err = error as Error & { message?: string }
    $q.notify( { type: 'app-negative', message: err?.message || 'Save failed' } )
  } finally {
    saving.value = false
  }
}

async function handleDelete() {
  if ( stationId.value === 'new' ) return
  const confirmed = confirm( 'Delete this radio station?' )
  if ( !confirmed ) return
  try {
    saving.value = true
    await radioStationsStore.deleteRadioStation( stationId.value )
    $q.notify( { type: 'app-positive', message: 'Radio station deleted' } )
    await router.push( '/radiostations' )
  } finally {
    saving.value = false
  }
}

onMounted( async () => {
  loading.value = true
  try {
    await Promise.all( [
      radioStationsStore.fetchRadioStation( stationId.value ),
      referencesStore.fetchAiAgents(),
      referencesStore.fetchProfiles()
    ] )
  } finally {
    loading.value = false
  }
} )

watch( loading, ( v ) => ui.setGlobalLoading( v ) )
watch( saving, ( v ) => ui.setGlobalLoading( v ) )

</script>
