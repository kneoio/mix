<template>
  <q-page class="q-px-md q-pb-md q-pt-none">
    <FormHeader :title="formData.title || $t( 'menu.soundFragments' )" :subtitle="formData.artist || ''"
      :show-save="true" :show-delete="true" @back="goBack" @save="handleSave" @delete="handleDelete" />

    <q-card flat class="gt-sm" style="max-width: 50%;">
      <q-card-section v-if=" !loading " class="q-px-none">
        <div v-if=" !fragment " class="text-caption text-grey-7">{{ $t( 'errors.notFound' ) }}</div>
        <q-form v-else class="column q-gutter-md">
          <q-input v-model="formData.title" :label="$t( 'columns.title' )" outlined dense />
          <q-input v-model="formData.artist" :label="$t( 'columns.artist' )" outlined dense />
          <q-select v-model="formData.type" :options="typeOptions" :label="$t( 'columns.type' )" outlined dense />
          <q-select v-model="formData.genres" :options="referencesStore.genreOptions" option-label="label"
            option-value="value" emit-value map-options :label="$t( 'columns.genres' )" outlined dense multiple
            use-chips>
            <template v-slot:selected-item=" scope ">
              <q-chip dense square size="md" removable @remove="scope.removeAtIndex( scope.index )"
                :tabindex="scope.tabindex">
                {{ scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
          <q-select v-model="formData.labels" :options="referencesStore.labelOptions" option-label="label"
            option-value="value" emit-value map-options :label="$t( 'columns.labels' )" outlined dense multiple
            use-chips>
            <template v-slot:selected-item=" scope ">
              <q-chip dense square size="md" removable @remove="scope.removeAtIndex( scope.index )"
                :tabindex="scope.tabindex"
                :style="{ backgroundColor: scope.opt.color || '#e5e7eb', color: scope.opt.fontColor || '#111827' }">
                {{ scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
          <q-input v-model="formData.album" :label="$t( 'fields.album' )" outlined dense />
          <q-uploader
            v-model="fileList"
            :label="$t( 'fields.uploadFile' )"
            accept="audio/*,.mp3,.wav"
            :max-files="1"
            flat
            bordered
            style="width: 100%"
            @added="handleUploaderAdded"
            @removed="handleUploaderRemoved"
          />
          <div v-if="attachedFiles.length" class="text-caption">
            <template v-for="(f, i) in attachedFiles" :key="f.name">
              <template v-if="f.url">
                <a :href="f.url" target="_blank" rel="noopener">{{ f.name }}</a>
              </template>
              <template v-else>
                {{ f.name }}
              </template>
              <span v-if="i < attachedFiles.length - 1">, </span>
            </template>
          </div>
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
            option-value="value" emit-value map-options label="Genres" outlined dense multiple use-chips>
            <template v-slot:selected-item=" scope ">
              <q-chip dense square removable @remove="scope.removeAtIndex( scope.index )" :tabindex="scope.tabindex">
                {{ scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
          <q-select v-model="formData.labels" :options="referencesStore.labelOptions" option-label="label"
            option-value="value" emit-value map-options label="Labels" outlined dense multiple use-chips>
            <template v-slot:selected-item=" scope ">
              <q-chip dense square size="md" removable @remove="scope.removeAtIndex( scope.index )"
                :tabindex="scope.tabindex"
                :style="{ backgroundColor: scope.opt.color || '#e5e7eb', color: scope.opt.fontColor || '#111827' }">
                {{ scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
          <q-input v-model="formData.album" label="Album" outlined dense />
          <q-uploader
            v-model="fileList"
            :label="$t('fields.uploadFile')"
            accept="audio/*,.mp3,.wav"
            :max-files="1"
            flat
            dense
            bordered
            @added="handleUploaderAdded"
            @removed="handleUploaderRemoved"
          />
          <div v-if="attachedFiles.length" class="text-caption">
            <template v-for="(f, i) in attachedFiles" :key="f.name">
              <template v-if="f.url">
                <a :href="f.url" target="_blank" rel="noopener">{{ f.name }}</a>
              </template>
              <template v-else>
                {{ f.name }}
              </template>
              <span v-if="i < attachedFiles.length - 1">, </span>
            </template>
          </div>
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
import apiClient from 'src/api/apiClient'

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
  labels: [],
  album: ''
} )

type QUploadFile = { name: string; __status?: string }
const fileList = ref<QUploadFile[]>([])

type AttachedFile = { name: string; url?: string }
const attachedFiles = computed<AttachedFile[]>( () => {
  const anyFrag = fragment.value as unknown as { uploadedFiles?: AttachedFile[] } | null
  return (anyFrag?.uploadedFiles || [])
} )

watch( fragment, ( newFragment ) => {
  if ( newFragment ) {
    formData.title = newFragment.title || ''
    formData.artist = newFragment.artist || ''
    formData.type = newFragment.type
    formData.genres = newFragment.genres || []
    formData.labels = newFragment.labels || []
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
      referencesStore.fetchGenres(),
      referencesStore.fetchLabels()
    ] )
  } finally {
    loading.value = false
  }
} )

watch( loading, ( v ) => ui.setGlobalLoading( v ) )

async function handleUploaderAdded(files: readonly File[] | readonly { file?: File }[]) {
  try {
    if (!files || files.length === 0) return
    const first = files[0]
    let f: File | null = null
    if (typeof first === 'object' && 'file' in first) {
      const maybe = (first as { file?: File }).file
      if (maybe instanceof File) f = maybe
    } else if (first instanceof File) {
      f = first
    }
    if (!f) return
    if (!id.value) return
    const uploadId = (globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Date.now()))
    const form = new FormData()
    form.append('file', f)
    await apiClient.post(`/soundfragments/files/${encodeURIComponent(id.value)}?uploadId=${encodeURIComponent(uploadId)}`, form)
  } catch { /* ignore */ }
}

function handleUploaderRemoved() {
  // no-op; UI list is managed by q-uploader
}
</script>
