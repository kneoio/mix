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
          <q-select
            v-model="formData.representedInBrands"
            :options="brandOptions"
            option-label="label"
            option-value="value"
            emit-value
            map-options
            :label="$t('columns.representedInBrands') || 'Assign To'"
            outlined
            dense
            multiple
            use-chips
          >
            <template v-slot:selected-item=" scope ">
              <q-chip dense square size="md" removable @remove="scope.removeAtIndex( scope.index )"
                :tabindex="scope.tabindex">
                {{ scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
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
          <q-input v-model="formData.description" :label="$t('fields.description')" type="textarea" autogrow outlined />
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
          <q-select
            v-model="formData.representedInBrands"
            :options="brandOptions"
            option-label="label"
            option-value="value"
            emit-value
            map-options
            label="Assign To"
            outlined
            dense
            multiple
            use-chips
          >
            <template v-slot:selected-item=" scope ">
              <q-chip dense square removable @remove="scope.removeAtIndex( scope.index )" :tabindex="scope.tabindex">
                {{ scope.opt.label }}
              </q-chip>
            </template>
          </q-select>
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
          <q-input v-model="formData.description" label="Description" type="textarea" autogrow outlined />
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
import { useRadioStationsStore } from 'src/stores/radioStationsStore'
import type { SoundFragment } from 'src/types/models'
import { FragmentType } from 'src/types/models'
import { useUiStore } from 'src/stores/uiStore'
import apiClient from 'src/api/apiClient'

type SaveDTO = Partial<SoundFragment> & { newlyUploaded: string[] | null }

const route = useRoute()
const router = useRouter()
const soundFragmentsStore = useSoundFragmentsStore()
const referencesStore = useReferencesStore()
const radioStationsStore = useRadioStationsStore()

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
  album: '',
  representedInBrands: [],
  description: ''
} )

type QUploadFile = { name: string; __status?: string }
const fileList = ref<QUploadFile[]>([])
const uploadedFileNames = ref<string[]>([])

type AttachedFile = { name: string; url?: string }
const attachedFiles = computed<AttachedFile[]>( () => {
  const anyFrag = fragment.value as unknown as { uploadedFiles?: AttachedFile[] } | null
  return (anyFrag?.uploadedFiles || [])
} )

const brandOptions = computed(() =>
  radioStationsStore.getEntries.map(rs => ({ label: rs.slugName, value: rs.id }))
)

watch( fragment, ( newFragment ) => {
  if ( newFragment ) {
    formData.title = newFragment.title || ''
    formData.artist = newFragment.artist || ''
    formData.type = newFragment.type
    formData.genres = newFragment.genres || []
    formData.labels = newFragment.labels || []
    formData.album = newFragment.album || ''
    // Optional fields (may be absent in backend response)
    const opt = newFragment as Partial<{ representedInBrands: string[]; description: string }>
    formData.representedInBrands = opt.representedInBrands || []
    formData.description = opt.description || ''
  }
}, { immediate: true })

function goBack() {
  router.back()
}

async function handleSave() {
  if (!id.value) return
  const dto: Partial<SoundFragment> = {}
  if (formData.type) dto.type = formData.type
  if (typeof formData.title !== 'undefined') dto.title = formData.title
  if (typeof formData.artist !== 'undefined') dto.artist = formData.artist
  if (Array.isArray(formData.genres)) dto.genres = formData.genres as unknown as string[]
  if (Array.isArray(formData.labels)) dto.labels = formData.labels as unknown as string[]
  if (typeof formData.album !== 'undefined') dto.album = formData.album
  if (Array.isArray(formData.representedInBrands)) dto.representedInBrands = formData.representedInBrands as unknown as string[]
  if (typeof formData.description !== 'undefined') dto.description = formData.description
  const payload: SaveDTO = {
    ...dto,
    newlyUploaded: uploadedFileNames.value.length > 0 ? uploadedFileNames.value : null,
  }
  await soundFragmentsStore.updateSoundFragment(id.value, payload as unknown as Partial<SoundFragment>)
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
      radioStationsStore.fetchRadioStations(1, 100),
      referencesStore.fetchGenres(),
      referencesStore.fetchLabels()
    ] )
    uploadedFileNames.value = []
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
    if (!uploadedFileNames.value.includes(f.name)) uploadedFileNames.value.push(f.name)
  } catch { /* ignore */ }
}

function handleUploaderRemoved() {
  const current = new Set((fileList.value || []).map(f => f.name))
  uploadedFileNames.value = uploadedFileNames.value.filter(n => current.has(n))
}
</script>
