<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">User Profile</div>
            <div v-if="!isAuthenticated" class="text-negative q-mt-sm">
              Not authenticated.
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section v-if="isAuthenticated">
            <q-list bordered separator>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Client ID</q-item-label>
                  <q-item-label>{{ clientId }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Preferred Username</q-item-label>
                  <q-item-label>{{ preferredUsername }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Email</q-item-label>
                  <q-item-label>{{ email }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-separator v-if="isAuthenticated" />

          <q-card-section>
            <div class="text-subtitle2 q-mb-md">Preferences</div>
            <div class="row items-center q-col-gutter-md">
              <div class="col-auto">
                <q-btn
                  flat
                  dense
                  round
                  :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
                  :aria-label="$q.dark.isActive ? 'Switch to light theme' : 'Switch to dark theme'"
                  @click="toggleDark"
                />
              </div>
              <div class="col-auto">
                <q-btn-dropdown dense flat :label="currentLocale.toUpperCase()" aria-label="Change language">
                  <q-list>
                    <q-item v-for="loc in locales" :key="loc" clickable v-close-popup @click="changeLocale(loc)">
                      <q-item-section>{{ loc.toUpperCase() }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </div>
          </q-card-section>
          <q-separator v-if="isAuthenticated" />
          <q-card-actions align="right" v-if="isAuthenticated">
            <q-btn color="negative" outline label="Logout" @click="logout" />
          </q-card-actions>
        </q-card>
      </div>

      <!-- secondary column removed -->
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { i18n, setLocale } from 'boot/i18n'
import type { Locale } from 'boot/i18n'
import { keycloak } from 'src/boot/keycloak'
import type { KeycloakTokenParsed } from 'keycloak-js'

const isAuthenticated = computed(() => !!keycloak.authenticated)
const clientId = computed(() => keycloak.clientId)
const tokenParsed = computed<KeycloakTokenParsed | undefined>(() => keycloak.tokenParsed)
const email = computed(() => tokenParsed.value?.email ?? '—')
const preferredUsername = computed(() => tokenParsed.value?.preferred_username ?? '—')

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
const locales: readonly Locale[] = ['pt', 'en'] as const
const currentLocale = ref<Locale>(i18n.global.locale.value as Locale)
function changeLocale (loc: Locale) {
  if (locales.includes(loc)) {
    setLocale(loc)
    currentLocale.value = i18n.global.locale.value as Locale
  }
}

async function logout () {
  await keycloak.logout({ redirectUri: window.location.origin + '/' })
}
</script>
