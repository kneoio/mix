<template>
  <div class="column q-gutter-sm">
    <div v-for="(entry, index) in localEntries" :key="index" class="row q-gutter-sm items-center">
      <q-select
        v-model="entry.language"
        :options="referencesStore.languageOptions"
        option-label="label"
        option-value="value"
        emit-value
        map-options
        label="Language"
        outlined
        dense
        style="width: 150px"
        @update:model-value="emitUpdate"
      />
      <q-input
        v-model="entry.name"
        label="Name"
        outlined
        dense
        class="col"
        @update:model-value="emitUpdate"
      />
      <q-btn
        flat
        dense
        round
        icon="remove"
        color="negative"
        @click="removeEntry(index)"
        :disable="localEntries.length === 1"
      />
      <q-btn
        v-if="index === localEntries.length - 1"
        flat
        dense
        round
        icon="add"
        color="primary"
        @click="addEntry"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useReferencesStore } from 'src/stores/referencesStore'

interface LocalizedEntry {
  language: string
  name: string
}

const props = defineProps<{
  modelValue?: Record<string, string>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, string>]
}>()

const referencesStore = useReferencesStore()

const localEntries = ref<LocalizedEntry[]>([])
const isInternalUpdate = ref(false)

function initializeEntries() {
  const entries = Object.entries(props.modelValue || {})
  if (entries.length === 0) {
    localEntries.value = [{ language: 'en', name: '' }]
  } else {
    localEntries.value = entries.map(([language, name]) => ({ language, name }))
  }
}

watch(() => props.modelValue, () => {
  if (!isInternalUpdate.value) {
    initializeEntries()
  }
  isInternalUpdate.value = false
}, { immediate: true, deep: true })

function addEntry() {
  localEntries.value.push({ language: 'en', name: '' })
}

function removeEntry(index: number) {
  if (localEntries.value.length > 1) {
    localEntries.value.splice(index, 1)
    emitUpdate()
  }
}

function emitUpdate() {
  isInternalUpdate.value = true
  const result: Record<string, string> = {}
  localEntries.value.forEach(entry => {
    if (entry.language && entry.name) {
      result[entry.language] = entry.name
    }
  })
  emit('update:modelValue', result)
}
</script>
