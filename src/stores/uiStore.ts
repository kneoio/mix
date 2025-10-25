import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const globalLoading = ref(false)
  const visualizerEnabled = ref(true)
  let lastStart = 0

  function setGlobalLoading(val: boolean) {
    if (val) {
      lastStart = Date.now()
      globalLoading.value = true
      return
    }
    const elapsed = Date.now() - lastStart
    const minDuration = 200
    if (elapsed >= minDuration) {
      globalLoading.value = false
    } else {
      const delay = minDuration - elapsed
      setTimeout(() => {
        globalLoading.value = false
      }, delay)
    }
  }

  function setVisualizerEnabled(val: boolean) {
    visualizerEnabled.value = val
  }

  return {
    globalLoading,
    setGlobalLoading,
    visualizerEnabled,
    setVisualizerEnabled,
  }
})
