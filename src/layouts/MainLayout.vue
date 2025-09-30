<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-grey-8">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="mixpla-title">
          Mixpla
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          @click="toggleDarkMode"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <q-item v-if=" isAuthenticated " clickable to="/favorites" v-ripple>
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.favorites' ) }}
          </q-item-section>
        </q-item>

        <q-item clickable to="/radiostations" v-ripple>
          <q-item-section avatar>
            <q-icon name="radio" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.radistions' ) }}
          </q-item-section>
        </q-item>

        <q-item v-if=" isAuthenticated " clickable to="/fragments" v-ripple>
          <q-item-section avatar>
            <q-icon name="library_music" />
          </q-item-section>
          <q-item-section>
            Sound Fragments
          </q-item-section>
        </q-item>

        <q-item clickable to="/profile" v-ripple>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            User Profile
          </q-item-section>
        </q-item>

        <q-item v-if=" !isAuthenticated " clickable to="/login" v-ripple>
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.login' ) }}
          </q-item-section>
        </q-item>


      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="showFullscreen = true" />
    </q-page-sticky>

    <q-dialog v-model="showFullscreen" maximized transition-show="slide-up" transition-hide="slide-down">
      <q-card>
        <q-bar class="bg-grey-8 text-white">
          <div class="text-h6 mixpla-title">Mixpla</div>
          <q-space />
          <q-btn flat dense round icon="close" v-close-popup />
        </q-bar>
        <q-card-section class="q-pa-md">
          <div class="text-h6">Full Screen Content</div>
          <p>This is a full-screen overlay that covers everything including the toolbar.</p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar'
import { keycloak } from 'src/boot/keycloak'

const $q = useQuasar()
const leftDrawerOpen = ref( false );
const isAuthenticated = ref( false )
const showFullscreen = ref( false )

onMounted( () => {
  isAuthenticated.value = keycloak.authenticated === true
  keycloak.onAuthSuccess = () => { isAuthenticated.value = true }
  keycloak.onAuthLogout = () => { isAuthenticated.value = false }
  keycloak.onAuthRefreshSuccess = () => { isAuthenticated.value = true }
  keycloak.onTokenExpired = () => { isAuthenticated.value = !!keycloak.authenticated }
} );

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleDarkMode() {
  $q.dark.toggle()
  localStorage.setItem('darkMode', String($q.dark.isActive))
}
</script>
