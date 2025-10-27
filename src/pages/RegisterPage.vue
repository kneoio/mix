<template>
  <q-page class="flex flex-center bg-gradient-to-br from-primary to-secondary">
    <q-card class="q-pa-md" style="width: 100%; max-width: 400px;">
      <q-card-section>
        <div class="text-h6 text-center">Create Account</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleRegister">
          <q-input
            v-model="form.username"
            label="Username"
            outlined
            dense
            :rules="[val => !!val || 'Username is required']"
            class="q-mb-md"
          />

          <q-input
            v-model="form.email"
            label="Email"
            type="email"
            outlined
            dense
            :rules="[
              val => !!val || 'Email is required',
              val => /.+@.+\..+/.test(val) || 'Email must be valid'
            ]"
            class="q-mb-md"
          />

          <q-input
            v-model="form.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            outlined
            dense
            :rules="[
              val => !!val || 'Password is required',
              val => val.length >= 8 || 'Password must be at least 8 characters'
            ]"
            class="q-mb-md"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <q-input
            v-model="form.confirmPassword"
            label="Confirm Password"
            :type="showConfirmPassword ? 'text' : 'password'"
            outlined
            dense
            :rules="[
              val => !!val || 'Please confirm password',
              val => val === form.password || 'Passwords do not match'
            ]"
            class="q-mb-md"
          >
            <template v-slot:append>
              <q-icon
                :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </q-input>

          <q-btn
            type="submit"
            label="Register"
            color="primary"
            class="full-width q-mb-md"
            :loading="loading"
          />

          <div class="text-center">
            <q-btn
              flat
              label="Already have an account? Sign In"
              color="primary"
              @click="$router.push('/login')"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiClient } from 'src/api/apiClient'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

async function handleRegister() {
  loading.value = true
  try {
    await apiClient.post('/auth/register', {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    })
    
    $q.notify({
      type: 'positive',
      message: 'Registration successful. Please sign in.',
      position: 'top'
    })
    
    router.push('/login')
  } catch (err) {
    const message = (err as {response?: {data?: {detail?: string; message?: string}}})?.response?.data?.detail 
      || (err as {response?: {data?: {detail?: string; message?: string}}})?.response?.data?.message 
      || 'Registration failed'
    $q.notify({
      type: 'negative',
      message,
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}
</script>
