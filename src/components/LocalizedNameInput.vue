<template>
  <div class="column q-gutter-y-sm q-px-none">
    <div v-for="(entry, index) in localEntries" :key="index" class="row items-center q-gutter-x-sm">
      <q-select
        v-model="entry.language"
        :options="referencesStore.languageOptions"
        :option-label="languageOptionLabel"
        option-value="value"
        emit-value
        map-options
        :label="languageLabel"
        outlined
        dense
        options-dense
        :hide-dropdown-icon="hideDropdownIcon"
        :style="{ width: selectWidth }"
        @update:model-value="emitUpdate"
      />
      <q-input
        v-model="entry.name"
        :label="$t('fields.name')"
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
import { ref, watch, computed } from 'vue'
import { i18n } from 'boot/i18n'
import { useQuasar } from 'quasar'
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
const $q = useQuasar()

const localEntries = ref<LocalizedEntry[]>([])
const isInternalUpdate = ref(false)

const languageOptionLabel = computed(() => {
  return $q.screen.lt.md ? (opt: { label: string; value: string }) => opt.value : 'label'
})

const languageLabel = computed(() => ($q.screen.lt.md ? '' : i18n.global.t('fields.language')))
const selectWidth = computed(() => ($q.screen.lt.md ? '84px' : '150px'))
const hideDropdownIcon = computed(() => $q.screen.lt.md)

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
