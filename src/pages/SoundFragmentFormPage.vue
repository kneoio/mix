<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <div class="col">
        <div class="text-h5">Sound Fragment</div>
        <div class="text-caption text-grey-7">ID: {{ id }}</div>
      </div>
      <div class="col-auto">
        <q-btn flat icon="arrow_back" label="Back" @click="goBack" />
      </div>
    </div>

    <q-card flat class="gt-sm" style="max-width: 50%;">
      <q-linear-progress v-if=" loading " indeterminate color="primary" />
      <q-card-section v-else>
        <div v-if=" !fragment " class="text-caption text-grey-7">Not found</div>
        <q-form v-else class="q-gutter-md">
          <div class="row items-center">
            <div class="col-3 text-caption text-right q-pr-md">Title</div>
            <div class="col">
              <q-input
                v-model="formData.title"
                outlined
                dense
              />
            </div>
          </div>
          <div class="row items-center">
            <div class="col-3 text-caption text-right q-pr-md">Artist</div>
            <div class="col">
              <q-input
                v-model="formData.artist"
                outlined
                dense
              />
            </div>
          </div>
          <div class="row items-center">
            <div class="col-3 text-caption text-right q-pr-md">Type</div>
            <div class="col-6">
              <q-select
                v-model="formData.type"
                :options="typeOptions"
                outlined
                dense
              />
            </div>
          </div>
          <div class="row items-start">
            <div class="col-3 text-caption text-right q-pr-md" style="padding-top: 8px;">Genres</div>
            <div class="col-9">
              <q-select
                v-model="formData.genres"
                :options="referencesStore.genreOptions"
                option-label="label"
                option-value="value"
                emit-value
                map-options
                outlined
                dense
                multiple
                use-chips
              />
            </div>
          </div>
          <div class="row items-center">
            <div class="col-3 text-caption text-right q-pr-md">Album</div>
            <div class="col">
              <q-input
                v-model="formData.album"
                outlined
                dense
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <q-card flat class="lt-md">
      <q-linear-progress v-if=" loading " indeterminate color="primary" />
      <q-card-section v-else>
        <div v-if=" !fragment " class="text-caption text-grey-7">Not found</div>
        <q-form v-else class="column q-col-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.title"
                label="Title"
                outlined
                dense
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.artist"
                label="Artist"
                outlined
                dense
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select
                v-model="formData.type"
                :options="typeOptions"
                label="Type"
                outlined
                dense
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select
                v-model="formData.genres"
                :options="referencesStore.genreOptions"
                option-label="label"
                option-value="value"
                emit-value
                map-options
                label="Genres"
                outlined
                dense
                multiple
                use-chips
              />
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData.album"
                label="Album"
                outlined
                dense
              />
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
import { useSoundFragmentsStore } from 'src/stores/soundFragmentsStore'
import { useReferencesStore } from 'src/stores/referencesStore'
import type { SoundFragment } from 'src/types/models'
import { FragmentType } from 'src/types/models'

const route = useRoute()
const router = useRouter()
const soundFragmentsStore = useSoundFragmentsStore()
const referencesStore = useReferencesStore()

const id = computed( () => String( route.params.id || '' ) )
const loading = ref( false )

const fragment = computed(() => soundFragmentsStore.apiFormResponse?.docData)

const typeOptions = Object.values(FragmentType)

const formData = reactive<Partial<SoundFragment>>({
  title: '',
  artist: '',
  type: FragmentType.SONG,
  genres: [],
  album: ''
})

watch(fragment, (newFragment) => {
  if (newFragment) {
    formData.title = newFragment.title || ''
    formData.artist = newFragment.artist || ''
    formData.type = newFragment.type
    formData.genres = newFragment.genres || []
    formData.album = newFragment.album || ''
  }
}, { immediate: true })

function goBack() {
  router.back()
}

onMounted( async () => {
  if ( !id.value ) return
  loading.value = true
  try {
    await Promise.all([
      soundFragmentsStore.fetchSoundFragment( id.value ),
      referencesStore.fetchGenres()
    ])
  } finally {
    loading.value = false
  }
} )
</script>
