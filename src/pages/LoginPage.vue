<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card style="min-width: 360px; max-width: 420px; width: 100%" bordered>
      <q-card-section>
        <div class="text-h6">Login</div>
        <div class="text-caption text-grey-7">Sign in to your account</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input
            v-model="email"
            type="email"
            label="Email"
            filled
            :rules="[val => !!val || 'Email is required']"
            autocomplete="email"
          />

          <q-input
            v-model="password"
            :type="showPwd ? 'text' : 'password'"
            label="Password"
            filled
            :rules="[val => !!val || 'Password is required']"
            autocomplete="current-password"
          >
            <template #append>
              <q-icon :name="showPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPwd = !showPwd" />
            </template>
          </q-input>

          <div class="row items-center justify-between q-mt-sm">
            <q-checkbox v-model="remember" label="Remember me" />
            <q-btn type="submit" color="primary" label="Sign in" :loading="submitting" />
          </div>
        </q-form>
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
import { useQuasar } from 'quasar'
import type { QNotifyCreateOptions } from 'quasar'

const $q = useQuasar()

const email = ref('')
const password = ref('')
const remember = ref(true)
const showPwd = ref(false)
const submitting = ref(false)

async function onSubmit () {
  submitting.value = true
  // Demo only: simulate API latency
  await new Promise(r => setTimeout(r, 700))
  submitting.value = false
  const opts: QNotifyCreateOptions = { type: 'positive', message: 'Logged in (demo)' }
  if (remember.value) {
    opts.caption = 'We will remember you on this device.'
  }
  $q.notify(opts)
}
</script>
