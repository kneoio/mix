<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card style="min-width: 360px; max-width: 420px; width: 100%" bordered>
      <q-card-section>
        <div class="text-h6">Login</div>
        <div class="text-caption text-grey-7">Use the Keycloak hosted login</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-gutter-md">
        <q-btn color="primary" label="Login with Keycloak" :loading="loggingIn" @click="login" />
      </q-card-section>

      <q-separator />

      <q-card-actions align="around">
        <q-btn flat to="/favorites" icon="favorite" label="Go to Favorites" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { keycloak } from 'src/boot/keycloak'

const loggingIn = ref(false)

async function login () {
  loggingIn.value = true
  try {
    await keycloak.login({ redirectUri: window.location.origin + '/' })
  } finally {
    loggingIn.value = false
  }
}
</script>
