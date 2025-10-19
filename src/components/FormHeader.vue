<template>
  <div class="column q-mt-none q-mb-none q-pt-none tight-top">
    <div class="row items-center q-mt-none q-pt-none">
      <div class="col-auto row items-center q-gutter-xs">
        <q-btn flat icon="arrow_back" @click="$emit('back')" class="lt-sm" />
        <q-btn flat icon="arrow_back" :label="$t('common.back')" @click="$emit('back')" class="gt-xs" />
        <q-btn v-if="showSave" color="primary" :label="$t('common.save')" size="md" unelevated @click="$emit('save')" />
        <q-btn v-if="showDelete" color="negative" :label="$t('common.delete')" size="md" unelevated @click="$emit('delete')" />
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
  showSave?: boolean
  showDelete?: boolean
}>()
</script>
