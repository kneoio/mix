<template>
  <q-dialog v-model="model" persistent>
    <q-card style="max-width: 480px; width: 100%">
      <q-card-section class="text-h6">
        {{ title || 'Validation error' }}
      </q-card-section>
      <q-card-section>
        <div v-if="message" class="q-mb-sm">{{ message }}</div>
        <div v-if="hasErrors">
          <div v-for="(errs, field) in errors" :key="field" class="q-mb-sm">
            <div class="text-caption text-grey-7">{{ field }}</div>
            <ul class="q-ml-md q-mt-xs">
              <li v-for="(m, i) in errs" :key="i">{{ m }}</li>
            </ul>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat color="primary" label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
  message?: string
  errors?: Record<string, string[]>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v)
})

const hasErrors = computed(() => !!props.errors && Object.keys(props.errors).length > 0)
</script>
