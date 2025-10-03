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
        <div class="text-h5">{{ listener.slugName || 'New Listener' }}</div>
      </div>
      <div class="col-auto" style="width: 80px;"></div>
    </div>

    <q-card flat>
      <q-linear-progress v-if=" loading " indeterminate color="primary" />
      <q-card-section v-else>
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
            <div class="col-12 col-md-6">
              <q-select v-model="formData.country" :options="referencesStore.countryOptions" option-label="label"
                option-value="value" emit-value map-options label="Country" outlined dense />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select v-model="formData.listenerOf" :options="radioStationOptions" option-label="label"
                option-value="value" emit-value map-options multiple label="Listener Of" outlined dense />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useListenersStore } from 'src/stores/listenersStore'
import { useRadioStationsStore } from 'src/stores/radioStationsStore'
import { useReferencesStore } from 'src/stores/referencesStore'
import LocalizedNameInput from 'src/components/LocalizedNameInput.vue'
import type { ListenerSave } from 'src/types/models'
import type { AxiosError } from 'axios'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const listenersStore = useListenersStore()
const radioStationsStore = useRadioStationsStore()
const referencesStore = useReferencesStore()

const listenerId = computed( () => String( route.params.id || '' ) )
const loading = ref( false )

const listener = computed( () => listenersStore.getCurrent )

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
    loading.value = true
    const dataToSave: ListenerSave = {
      localizedName: formData.localizedName,
      nickName: formData.nickName,
      country: formData.country,
      listenerOf: formData.listenerOf
    }

    const id = listenerId.value === 'new' ? null : listenerId.value
    await listenersStore.saveListener(dataToSave, id)
    $q.notify({ type: 'positive', message: 'Listener saved successfully' })
    await router.push('/listeners')
  } catch (error: unknown) {
    const err = error as AxiosError
    $q.notify({
      type: 'negative',
      message: (err.response?.data as string) || err.message
    })
  } finally {
    loading.value = false
  }
}

onMounted( async () => {
  loading.value = true
  try {
    if ( listenerId.value !== 'new' ) {
      await listenersStore.fetchListener( listenerId.value )
    }
    await radioStationsStore.fetchRadioStations()
  } finally {
    loading.value = false
  }
} )
</script>
