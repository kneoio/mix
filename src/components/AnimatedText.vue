<template>
  <div class="animated-text-container">
    <div class="static-text">
      {{ parsedText.title }}<span v-if="parsedText.artist"> • {{ parsedText.artist }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
}>()

const parsedText = computed(() => {
  if (props.text.includes('|')) {
    const parts = props.text.split('|')
    return {
      title: parts[0].trim(),
      artist: parts[1].trim()
    }
  }
  return {
    title: props.text,
    artist: null
  }
})
</script>

<style scoped>
.animated-text-container {
  display: inline-block;
  font-size: inherit;
  color: inherit;
}

.static-text {
  color: inherit;
}
</style>
