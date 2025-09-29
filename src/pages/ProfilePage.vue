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
import { computed } from 'vue'
import { keycloak } from 'src/boot/keycloak'
import type { KeycloakTokenParsed } from 'keycloak-js'

const isAuthenticated = computed(() => !!keycloak.authenticated)
const clientId = computed(() => keycloak.clientId)
const tokenParsed = computed<KeycloakTokenParsed | undefined>(() => keycloak.tokenParsed)
const email = computed(() => tokenParsed.value?.email ?? '—')
const preferredUsername = computed(() => tokenParsed.value?.preferred_username ?? '—')

async function logout () {
  await keycloak.logout({ redirectUri: window.location.origin + '/' })
}
</script>
