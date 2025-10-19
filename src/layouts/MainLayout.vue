.player-footer {
  background-color: #1e3b8a;
}
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

        <q-item v-if=" !isAuthenticated " clickable to="/space" active-class="text-warning"
          exact-active-class="text-warning" v-ripple>
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.space' ) }}
          </q-item-section>
        </q-item>

        <q-item v-if=" isAuthenticated " clickable to="/radiostations" active-class="text-warning"
          exact-active-class="text-warning" v-ripple>
          <q-item-section avatar>
            <q-icon name="radio" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.radistions' ) }}
          </q-item-section>
        </q-item>

        <q-item v-if=" isAuthenticated " clickable to="/listeners" active-class="text-warning"
          exact-active-class="text-warning" v-ripple>
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.listeners' ) }}
          </q-item-section>
        </q-item>

        <q-item v-if=" isAuthenticated " clickable to="/fragments" active-class="text-warning"
          exact-active-class="text-warning" v-ripple>
          <q-item-section avatar>
            <q-icon name="library_music" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.soundFragments' ) }}
          </q-item-section>
        </q-item>

        <q-item clickable to="/profile" active-class="text-warning" exact-active-class="text-warning" v-ripple>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            {{ $t( 'menu.account' ) }}
          </q-item-section>
        </q-item>

        <q-item v-if=" !isAuthenticated " clickable to="/login" active-class="text-warning"
          exact-active-class="text-warning" v-ripple>
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

    <q-footer class="text-white player-footer">
      <div v-touch-swipe.mouse.up="handleSwipeUp" class="cursor-pointer">
        <div class="row justify-center q-pt-xs">
          <div class="bg-white" style="width: 40px; height: 4px; border-radius: 2px;"></div>
        </div>
        <q-toolbar>
          <div class="text-caption footer-text">{{ nowPlayingParts.title }}</div>
          <q-btn flat round dense :icon="isPlaying ? 'pause' : 'play_arrow'" color="white" @click="togglePlay"
            class="footer-play-btn" />
          <div class="text-caption footer-text">{{ nowPlayingParts.artist }}</div>
          <q-btn flat round dense icon="expand_less" @click="showFullscreen = true" class="gt-xs" />
        </q-toolbar>
      </div>
    </q-footer>

    <audio ref="audioPlayer" style="display: none;"></audio>

    <PlayerPage v-model:showFullscreen="showFullscreen" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { keycloak } from 'src/boot/keycloak'
import PlayerPage from 'src/pages/PlayerPage.vue'
import { usePlayerStore } from 'src/stores/playerStore'
import { useUiStore } from 'src/stores/uiStore'

const playerStore = usePlayerStore()
const ui = useUiStore()
const router = useRouter()
const leftDrawerOpen = ref( false );
const isAuthenticated = ref( false )
const showFullscreen = ref( false )
const audioPlayer = ref<HTMLAudioElement | null>( null )

const { nowPlaying, isPlaying } = storeToRefs( playerStore )

const nowPlayingParts = computed( () => {
  if ( nowPlaying.value.includes( '|' ) ) {
    const parts = nowPlaying.value.split( '|' )
    return {
      title: ( parts[0] || '' ).trim(),
      artist: ( parts[1] || '' ).trim()
    }
  }
  return {
    title: nowPlaying.value,
    artist: ''
  }
} )

onMounted( () => {
  isAuthenticated.value = keycloak.authenticated === true
  keycloak.onAuthSuccess = () => { isAuthenticated.value = true }
  keycloak.onAuthLogout = () => { isAuthenticated.value = false }
  keycloak.onAuthRefreshSuccess = () => { isAuthenticated.value = true }
  keycloak.onTokenExpired = () => { isAuthenticated.value = !!keycloak.authenticated }

  if ( audioPlayer.value ) {
    playerStore.setAudioElement( audioPlayer.value )
  }

  router.afterEach( () => {
    ui.setGlobalLoading( false )
  } )
} );

onBeforeUnmount( () => {
  playerStore.cleanup()
} );

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function handleSwipeUp() {
  showFullscreen.value = true
}

function togglePlay() {
  playerStore.togglePlay()
}
</script>

<style scoped>
.footer-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(50% - 24px);
}

.footer-text:last-of-type {
  text-align: right;
}

.footer-play-btn {
  flex-shrink: 0;
  margin: 0 8px;
}


</style>
