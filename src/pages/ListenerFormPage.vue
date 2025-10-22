<template>
  <q-page class="q-px-md q-pb-md q-pt-none">
    <FormHeader
      :title="listener?.slugName || 'New Listener'"
      :show-save="true"
      :show-delete="true"
      :disable-save="loading || saving"
      :disable-delete="loading || saving"
      @back="goBack"
      @save="handleSave"
      @delete="handleDelete"
    />

    <!-- Desktop: constrained card, no inner horizontal padding -->
    <q-card flat class="gt-sm" style="max-width: 50%;">
      <q-card-section v-if=" !loading " class="q-px-none">
        <div v-if=" !listener.id && listenerId !== 'new' " class="text-caption text-grey-7">Not found</div>
        <q-form v-else class="column q-col-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <div class="text-subtitle2 q-mb-sm">Localized Names</div>
              <LocalizedNameInput v-model="formData.localizedName" />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <div class="text-subtitle2 q-mb-sm">Nick Names</div>
              <LocalizedNameInput v-model="formData.nickName" />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
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
                options-dense
                popup-content-style="max-height: 240px"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-select v-model="formData.listenerOf" :options="radioStationOptions" option-label="label"
                option-value="value" emit-value map-options multiple label="Listener Of" outlined dense />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Mobile: full-width card, no inner horizontal padding -->
    <q-card flat class="lt-md">
      <q-card-section v-if=" !loading " class="q-px-none">
        <div v-if=" !listener.id && listenerId !== 'new' " class="text-caption text-grey-7">Not found</div>
        <q-form v-else class="column q-col-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <div class="text-subtitle2 q-mb-sm">Localized Names</div>
              <LocalizedNameInput v-model="formData.localizedName" />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <div class="text-subtitle2 q-mb-sm">Nick Names</div>
              <LocalizedNameInput v-model="formData.nickName" />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
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
                options-dense
                popup-content-style="max-height: 240px"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-select v-model="formData.listenerOf" :options="radioStationOptions" option-label="label"
                option-value="value" emit-value map-options multiple label="Listener Of" outlined dense />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <ValidationDialog
      v-model="showValidationDialog"
      :message="validationMessage"
      :errors="validationErrors"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useListenersStore } from 'src/stores/listenersStore'
import { useRadioStationsStore } from 'src/stores/radioStationsStore'
import { useReferencesStore } from 'src/stores/referencesStore'
import { useUiStore } from 'src/stores/uiStore'
import FormHeader from 'src/components/FormHeader.vue'
import LocalizedNameInput from 'src/components/LocalizedNameInput.vue'
import ValidationDialog from 'src/components/ValidationDialog.vue'
import type { ListenerSave } from 'src/types/models'
import type { AxiosError } from 'axios'
import { parseValidationProblem } from 'src/api/validation'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const listenersStore = useListenersStore()
const radioStationsStore = useRadioStationsStore()
const referencesStore = useReferencesStore()
const ui = useUiStore()

const listenerId = computed( () => String( route.params.id || '' ) )
const loading = ref(false)
const saving = ref(false)

const listener = computed( () => listenersStore.getCurrent )

const showValidationDialog = ref(false)
const validationMessage = ref('')
const validationErrors = ref<Record<string, string[]>>({})

const formData = reactive( {
  localizedName: {} as Record<string, string>,
  nickName: {} as Record<string, string>,
  country: '',
  listenerOf: [] as string[]
} )

const radioStationOptions = computed( () => {
  return radioStationsStore.getEntries.map( station => ( {
    label: station.slugName,
    value: station.id
  } ) )
} )

watch( listener, ( newListener ) => {
  if ( newListener ) {
    formData.localizedName = newListener.localizedName || {}
    formData.nickName = newListener.nickName || {}
    formData.country = newListener.country || ''
    formData.listenerOf = []
  }
}, { immediate: true } )

function goBack() {
  router.back()
}

async function handleSave() {
  try {
    saving.value = true
    const dataToSave: ListenerSave = {
      localizedName: formData.localizedName,
      nickName: formData.nickName,
      country: formData.country,
      listenerOf: formData.listenerOf
    }

    const id = listenerId.value === 'new' ? null : listenerId.value
    await listenersStore.saveListener(dataToSave, id)
    $q.notify({ type: 'app-positive', message: 'Listener saved successfully' })
    await router.push('/listeners')
  } catch (error: unknown) {
    const err = error as AxiosError
    const parsed = parseValidationProblem(err)
    if (parsed) {
      validationMessage.value = parsed.message
      validationErrors.value = parsed.fieldErrors
      showValidationDialog.value = true
    } else {
      const data = err.response?.data
      let text: string
      if (typeof data === 'string') {
        text = data
      } else if (data && typeof data === 'object') {
        const d = data as { detail?: string; title?: string; message?: string }
        text = d.detail || d.title || d.message || err.message
      } else {
        text = err.message
      }
      $q.notify({ type: 'app-negative', message: text })
    }
  } finally {
    saving.value = false
  }
}

async function handleDelete() {
  if (listenerId.value === 'new') return
  const confirmed = confirm('Delete this listener?')
  if (!confirmed) return
  try {
    saving.value = true
    await listenersStore.deleteListener(listenerId.value)
    $q.notify({ type: 'app-positive', message: 'Listener deleted' })
    await router.push('/listeners')
  } finally {
    saving.value = false
  }
}

onMounted( async () => {
  loading.value = true
  try {
    await listenersStore.fetchListener( listenerId.value )
    await radioStationsStore.fetchRadioStations()
  } finally {
    loading.value = false
  }
} )

watch( loading, ( v ) => ui.setGlobalLoading( v ) )
</script>
