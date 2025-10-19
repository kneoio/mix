<template>
  <div class="column q-mt-none q-mb-none q-pt-none tight-top">
    <div class="row items-center q-mt-none q-pt-none">
      <div class="col-auto row items-center q-gutter-sm">
        <q-btn v-if="showBack" flat icon="arrow_back" @click="$emit('back')" class="lt-sm" />
        <q-btn v-if="showBack" flat icon="arrow_back" :label="$t('common.back')" @click="$emit('back')" class="gt-xs" />
        <q-btn v-if="showNew" color="primary" :label="$t('common.new')" unelevated @click="$emit('new')" />
        <q-btn v-if="showDelete" color="negative" :label="$t('common.delete')" unelevated @click="$emit('delete')" />
        <slot name="actions" />
      </div>
    </div>
    <div class="row q-mt-none">
      <div class="text-h5">
        <span>{{ title }}</span>
        <span v-if="subtitle" class="text-caption q-ml-sm" :class="subtitleClass">
          {{ subtitle }}
          <q-badge v-if="quantity !== undefined" class="q-ml-xs" color="primary" :label="quantity" />
        </span>
        <span v-else-if="quantity !== undefined" class="text-caption q-ml-sm" :class="subtitleClass">
          <q-badge color="primary" :label="quantity" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  subtitleClass?: string
  showBack?: boolean
  showNew?: boolean
  showDelete?: boolean
  quantity?: number | string
}>()
</script>
