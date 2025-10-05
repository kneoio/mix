<template>
  <div class="q-mb-md">
    <div class="row items-center q-mb-sm">
      <q-btn flat dense icon="arrow_back" label="Home" size="sm" @click="goHome" />
    </div>
    <div class="row items-center q-gutter-md">
      <div class="text-h6 ellipsis" style="max-width: 32%; min-width: 120px;">{{ brand }}</div>
      <q-separator vertical />
      <div class="column items-center" style="min-width: 40px;">
        <div class="text-caption text-grey-7">songs</div>
        <div class="text-h6" :style="{ color: colorCss || 'inherit' }">
          {{ availableSongs !== null ? availableSongs : '—' }}
        </div>
      </div>
      <q-separator v-if="description" vertical />
      <div v-if="description" class="text-caption text-grey-7 ellipsis-2-lines gt-xs" style="max-width: 58%;">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  brand: string
  description?: string
  availableSongs: number | null
  color?: string | null
}>()

const router = useRouter()

function goHome() {
  void router.push('/')
}

const colorCss = computed(() => {
  const c = props.color || ''
  const m = /^#([0-9a-fA-F]{8})$/.exec(c)
  if (m && m[1]) {
    const hex = m[1]
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    const a = parseInt(hex.slice(6, 8), 16) / 255
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
  return c
})
</script>
