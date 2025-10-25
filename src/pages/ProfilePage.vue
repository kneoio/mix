<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card flat>
          <q-card-section>
            <div class="text-h6">{{ $t('menu.account') }}</div>
            <div v-if="!isAuthenticated" class="text-negative q-mt-sm">
              {{ $t('profile.notAuthenticated') }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section v-if="isAuthenticated">
            <q-list bordered separator>
              <q-item>
                <q-item-section>
                  <q-item-label caption>{{ $t('profile.clientId') }}</q-item-label>
                  <q-item-label>{{ clientId }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>{{ $t('profile.preferredUsername') }}</q-item-label>
                  <q-item-label>{{ preferredUsername }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>{{ $t('profile.email') }}</q-item-label>
                  <q-item-label>{{ email }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-separator v-if="isAuthenticated" />

          <q-card-section>
            <div class="text-subtitle2 q-mb-md">{{ $t('profile.preferences') }}</div>
            <div class="row items-center q-col-gutter-md q-mb-md">
              <div class="col-auto">
                <q-btn
                  flat
                  dense
                  round
                  :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
                  :aria-label="$q.dark.isActive ? $t('theme.switchToLight') : $t('theme.switchToDark')"
                  @click="toggleDark"
                />
              </div>
              <div class="col-auto">
                <q-btn-dropdown dense flat :label="currentLocale.toUpperCase()" :aria-label="$t('profile.changeLanguage')">
                  <q-list>
                    <q-item v-for="loc in locales" :key="loc" clickable v-close-popup @click="changeLocale(loc)">
                      <q-item-section>{{ loc.toUpperCase() }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </div>
            <q-item tag="label" v-ripple>
              <q-item-section>
                <q-item-label>Audio Visualizer</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="ui.visualizerEnabled" />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-separator v-if="isAuthenticated" />
          <q-card-actions align="right" v-if="isAuthenticated">
            <q-btn color="negative" outline :label="$t('profile.logout')" @click="logout" />
          </q-card-actions>
          <q-card-section>
            <div class="text-caption text-grey text-center">v{{ appVersion }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- secondary column removed -->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { i18n, setLocale } from 'boot/i18n'
import type { Locale } from 'boot/i18n'
import { keycloak } from 'src/boot/keycloak'
import type { KeycloakTokenParsed } from 'keycloak-js'
import { useUiStore } from 'src/stores/uiStore'
import { Capacitor } from '@capacitor/core'
import { nativeAuth } from 'src/auth/nativeAuth'
import packageJson from '../../package.json'

const ui = useUiStore()
const router = useRouter()
const appVersion = packageJson.version

const isNative = Capacitor.isNativePlatform()

const isAuthenticated = computed(() => isNative ? nativeAuth.isAuthenticated : (!!keycloak.authenticated || nativeAuth.isAuthenticated))
const clientId = computed(() => keycloak.clientId)
const tokenParsed = computed<KeycloakTokenParsed | undefined>(() => keycloak.tokenParsed)
const email = computed(() => {
  if (isNative || !keycloak.authenticated) return nativeAuth.user?.email ?? '—'
  return tokenParsed.value?.email ?? '—'
})
const preferredUsername = computed(() => {
  if (isNative || !keycloak.authenticated) return nativeAuth.user?.preferred_username ?? '—'
  return tokenParsed.value?.preferred_username ?? '—'
})

// theme
const $q = useQuasar()
const THEME_KEY = 'app:prefers-dark'
function toggleDark () {
  $q.dark.set(!$q.dark.isActive)
  try {
    localStorage.setItem(THEME_KEY, $q.dark.isActive ? '1' : '0')
  } catch (err) {
    void err
  }
}
onMounted(() => {
  nativeAuth.loadFromStorage()
  
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved !== null) {
      $q.dark.set(saved === '1')
    }
  } catch (err) {
    void err
  }
})

// language
const locales = i18n.global.availableLocales as unknown as readonly Locale[]
const currentLocale = ref<Locale>(i18n.global.locale.value as Locale)
function changeLocale (loc: Locale) {
  if (locales.includes(loc)) {
    setLocale(loc)
    currentLocale.value = i18n.global.locale.value as Locale
  }
}

async function logout () {
  if (isNative || !keycloak.authenticated) {
    await nativeAuth.logout()
    await router.push('/space')
  } else {
    await keycloak.logout({ redirectUri: window.location.origin + '/space' })
  }
}
</script>
