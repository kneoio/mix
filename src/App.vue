<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { onMounted } from 'vue'

const $q = useQuasar()

onMounted(() => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode !== null) {
    $q.dark.set(savedMode === 'true')
  } else {
    $q.dark.set('auto')
  }
})
</script>
