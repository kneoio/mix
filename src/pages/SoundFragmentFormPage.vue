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

    <q-card flat bordered>
      <q-linear-progress v-if="loading" indeterminate color="primary" />
      <q-card-section v-else>
        <div v-if="!fragment" class="text-caption text-grey-7">Not found</div>
        <div v-else class="column q-col-gutter-sm">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">Title</div>
              <div class="text-body1">{{ fragment.title || '—' }}</div>
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">Artist</div>
              <div class="text-body1">{{ fragment.artist || '—' }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">Type</div>
              <div class="text-body1">{{ fragment.type }}</div>
            </div>
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">Genres</div>
              <div class="text-body1">{{ (fragment.genres || []).join(', ') || '—' }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-subtitle2">Album</div>
              <div class="text-body1">{{ fragment.album || '—' }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSoundFragmentsStore } from 'src/stores/soundFragmentsStore'

const route = useRoute()
const router = useRouter()
const store = useSoundFragmentsStore()

const id = computed(() => String(route.params.id || ''))
const loading = computed(() => store.loading)
const fragment = computed(() => store.current)

function goBack () {
  router.back()
}

onMounted(async () => {
  if (id.value) {
    await store.fetchSoundFragment(id.value)
  }
})
</script>
