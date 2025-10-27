<template>
  <q-page class="flex flex-center">
    <q-card flat style="width: 400px; max-width: 90vw;">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="username"
          label="Username"
          outlined
          dense
          :disable="loading"
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          outlined
          dense
          class="q-mt-md"
          :disable="loading"
          @keyup.enter="login"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Register"
          color="primary"
          :disable="loading"
          @click="$router.push('/register')"
        />
        <q-btn
          label="Login"
          color="primary"
          :loading="loading"
          @click="login"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { nativeAuth } from 'src/auth/nativeAuth'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)

async function login() {
  if (!username.value || !password.value) return

  loading.value = true
  try {
    await nativeAuth.login(username.value, password.value)
    await router.push('/radiostations')
  } catch (err) {
    console.error('Login error:', err)
    alert('Login failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
  } finally {
    loading.value = false
  }
}
</script>
