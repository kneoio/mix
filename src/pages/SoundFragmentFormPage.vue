<template>
  <q-page class="q-px-md q-pb-md q-pt-none">
    <FormHeader :title="formData.title || $t('menu.soundFragments')" :subtitle="formData.artist || ''" :show-save="true"
      :show-delete="true" @back="goBack" @save="handleSave" @delete="handleDelete" />

    <q-card flat class="gt-sm" style="max-width: 50%;">
      <q-card-section v-if=" !loading " class="q-px-none">
        <div v-if=" !fragment " class="text-caption text-grey-7">{{ $t('errors.notFound') }}</div>
        <q-form v-else class="column q-gutter-md">
          <q-input v-model="formData.title" :label="$t('columns.title')" outlined dense />
          <q-input v-model="formData.artist" :label="$t('columns.artist')" outlined dense />
          <q-select v-model="formData.type" :options="typeOptions" :label="$t('columns.type')" outlined dense />
          <q-select v-model="formData.genres" :options="referencesStore.genreOptions" option-label="label"
            option-value="value" emit-value map-options :label="$t('columns.genres')" outlined dense multiple use-chips />
          <q-input v-model="formData.album" :label="$t('fields.album')" outlined dense />
        </q-form>
      </q-card-section>
      <q-card-section v-else class="q-px-none column q-gutter-sm">
        <q-skeleton type="text" class="q-mb-sm" style="width: 60%" />
        <q-skeleton type="text" class="q-mb-sm" style="width: 40%" />
        <q-skeleton type="rect" height="38px" class="q-mb-sm" />
        <q-skeleton type="rect" height="38px" class="q-mb-sm" />
        <q-skeleton type="text" class="q-mb-sm" style="width: 50%" />
      </q-card-section>
    </q-card>

    <q-card flat class="lt-md">
      <q-card-section v-if=" !loading " class="q-px-none">
        <div v-if=" !fragment " class="text-caption text-grey-7">Not found</div>
        <q-form v-else class="column q-gutter-md">
          <q-input v-model="formData.title" label="Title" outlined dense />
          <q-input v-model="formData.artist" label="Artist" outlined dense />
          <q-select v-model="formData.type" :options="typeOptions" label="Type" outlined dense />
          <q-select v-model="formData.genres" :options="referencesStore.genreOptions" option-label="label"
            option-value="value" emit-value map-options label="Genres" outlined dense multiple use-chips />
          <q-input v-model="formData.album" label="Album" outlined dense />
        </q-form>
      </q-card-section>
      <q-card-section v-else class="q-px-none column q-gutter-sm">
        <q-skeleton type="text" class="q-mb-sm" style="width: 60%" />
        <q-skeleton type="text" class="q-mb-sm" style="width: 40%" />
        <q-skeleton type="rect" height="38px" class="q-mb-sm" />
        <q-skeleton type="rect" height="38px" class="q-mb-sm" />
        <q-skeleton type="text" class="q-mb-sm" style="width: 50%" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormHeader from 'src/components/FormHeader.vue'
import { useSoundFragmentsStore } from 'src/stores/soundFragmentsStore'
import { useReferencesStore } from 'src/stores/referencesStore'
import type { SoundFragment } from 'src/types/models'
import { FragmentType } from 'src/types/models'
import { useUiStore } from 'src/stores/uiStore'

const route = useRoute()
const router = useRouter()
const soundFragmentsStore = useSoundFragmentsStore()
const referencesStore = useReferencesStore()

const id = computed( () => String( route.params.id || '' ) )
const loading = ref( false )
const ui = useUiStore()

const fragment = computed( () => soundFragmentsStore.apiFormResponse?.docData )

const typeOptions = Object.values( FragmentType )

const formData = reactive<Partial<SoundFragment>>( {
  title: '',
  artist: '',
  type: FragmentType.SONG,
  genres: [],
  album: ''
} )

watch( fragment, ( newFragment ) => {
  if ( newFragment ) {
    formData.title = newFragment.title || ''
    formData.artist = newFragment.artist || ''
    formData.type = newFragment.type
    formData.genres = newFragment.genres || []
    formData.album = newFragment.album || ''
  }
}, { immediate: true } )

function goBack() {
  router.back()
}

function handleSave() {
  console.log( 'Save Sound Fragment', formData )
}

function handleDelete() {
  console.log( 'Delete Sound Fragment', id.value )
}

onMounted( async () => {
  if ( !id.value ) return
  loading.value = true
  try {
    await Promise.all( [
      soundFragmentsStore.fetchSoundFragment( id.value ),
      referencesStore.fetchGenres()
    ] )
  } finally {
    loading.value = false
  }
} )

watch(loading, (v) => ui.setGlobalLoading(v))
</script>
