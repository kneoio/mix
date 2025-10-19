<template>
  <div class="column q-mt-none q-mb-none q-pt-none tight-top">
    <div class="row items-center q-mt-none q-pt-none">
      <div class="col-auto row items-center q-gutter-sm">
        <q-btn v-if="showBack" flat icon="arrow_back" @click="$emit('back')" class="lt-sm" />
        <q-btn v-if="showBack" flat icon="arrow_back" label="Back" @click="$emit('back')" class="gt-xs" />
        <q-btn v-if="showNew" color="primary" label="New" unelevated @click="$emit('new')" />
        <q-btn v-if="showDelete" color="negative" label="Delete" unelevated @click="$emit('delete')" />
        <slot name="actions" />
      </div>
    </div>
    <div class="row q-mt-none">
      <div class="text-h5">
        <span>{{ title }}</span>
        <span v-if="subtitle" class="text-caption q-ml-sm" :class="subtitleClass">{{ subtitle }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  title: string
  subtitle?: string
  subtitleClass?: string
  showBack?: boolean
  showNew?: boolean
  showDelete?: boolean
}>()
</script>
