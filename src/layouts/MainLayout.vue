<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="mixpla-header-gradient text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" :aria-label="$t( 'menu.title' )" @click="toggleLeftDrawer" />

        <q-toolbar-title class="mixpla-title">
          Mixpla
        </q-toolbar-title>
      </q-toolbar>
      <q-linear-progress v-if=" ui.globalLoading " indeterminate color="white" class="absolute-bottom" />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>
          {{ $t( 'menu.title' ) }}
        </q-item-label>

        <q-item clickable to="/space" active-class="bg-grey-3 text-warning"
          exact-active-class="bg-grey-3 text-warning" v-ripple>
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.space' ) }}
          </q-item-section>
        </q-item>

        <q-item v-if=" isAuthenticated " clickable to="/radiostations" active-class="bg-grey-3 text-warning"
          exact-active-class="bg-grey-3 text-warning" v-ripple>
          <q-item-section avatar>
            <q-icon name="radio" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.radistions' ) }}
          </q-item-section>
        </q-item>

        <q-item v-if=" isAuthenticated " clickable to="/listeners" active-class="bg-grey-3 text-warning"
          exact-active-class="bg-grey-3 text-warning" v-ripple>
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.listeners' ) }}
          </q-item-section>
        </q-item>

        <q-item v-if=" isAuthenticated " clickable to="/fragments" active-class="bg-grey-3 text-warning"
          exact-active-class="bg-grey-3 text-warning" v-ripple>
          <q-item-section avatar>
            <q-icon name="library_music" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.soundFragments' ) }}
          </q-item-section>
        </q-item>

        <q-item v-if=" isAuthenticated " clickable to="/dashboard" active-class="bg-grey-3 text-warning"
          exact-active-class="bg-grey-3 text-warning" v-ripple>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.dashboard' ) }}
          </q-item-section>
        </q-item>

        <q-item clickable to="/profile" active-class="bg-grey-3 text-warning" exact-active-class="bg-grey-3 text-warning" v-ripple>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.account' ) }}
          </q-item-section>
        </q-item>

        <q-item v-if=" !isAuthenticated " clickable to="/login" active-class="bg-grey-3 text-warning"
          exact-active-class="bg-grey-3 text-warning" v-ripple>
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
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { keycloak } from 'src/boot/keycloak'
import { useUiStore } from 'src/stores/uiStore'

const ui = useUiStore()
const router = useRouter()
const leftDrawerOpen = ref( false );
const isAuthenticated = ref( false )

onMounted( () => {
  isAuthenticated.value = keycloak.authenticated === true
  keycloak.onAuthSuccess = () => { isAuthenticated.value = true }
  keycloak.onAuthLogout = () => { isAuthenticated.value = false }
  keycloak.onAuthRefreshSuccess = () => { isAuthenticated.value = true }
  keycloak.onTokenExpired = () => { isAuthenticated.value = !!keycloak.authenticated }

  router.afterEach( () => {
    ui.setGlobalLoading( false )
  } )
} );

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
</style>
