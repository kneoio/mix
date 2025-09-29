<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{$t('appTitle')}}
        </q-toolbar-title>

        <div class="q-mr-md">Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <q-item v-if="isAuthenticated" clickable to="/favorites" v-ripple>
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section>
            {{$t('menu.favorites')}}
          </q-item-section>
        </q-item>

        <q-item clickable to="/radistions" v-ripple>
          <q-item-section avatar>
            <q-icon name="radio" />
          </q-item-section>
          <q-item-section>
            {{$t('menu.radistions')}}
          </q-item-section>
        </q-item>

        <q-item clickable to="/fragments" v-ripple>
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

        <q-item v-if="!isAuthenticated" clickable to="/login" v-ripple>
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>
            {{$t('menu.login')}}
          </q-item-section>
        </q-item>

        
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { keycloak } from 'src/boot/keycloak'

const leftDrawerOpen = ref(false);
const $q = useQuasar();

const THEME_KEY = 'app:prefers-dark';

onMounted(() => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved !== null) {
      $q.dark.set(saved === '1');
    }
  } catch (err) {
    // ignore read errors
    void err
  }
  // set initial auth state
  isAuthenticated.value = keycloak.authenticated === true
  // keep auth state in sync with keycloak callbacks
  keycloak.onAuthSuccess = () => { isAuthenticated.value = true }
  keycloak.onAuthLogout = () => { isAuthenticated.value = false }
  keycloak.onAuthRefreshSuccess = () => { isAuthenticated.value = true }
  keycloak.onTokenExpired = () => { isAuthenticated.value = !!keycloak.authenticated }
});

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// i18n language switcher state
// moved to Profile page

// auth state
const isAuthenticated = ref(false)
</script>
