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

    <q-footer elevated class="bg-grey-9">
      <div 
        v-touch-swipe.mouse.up="handleSwipeUp"
        class="cursor-pointer"
      >
        <div class="row justify-center q-pt-xs">
          <div class="bg-grey-6" style="width: 40px; height: 4px; border-radius: 2px;"></div>
        </div>
        <q-toolbar>
          <div class="text-caption q-mr-sm">{{ nowPlaying }}</div>
          <q-btn 
            flat 
            round 
            dense 
            :icon="isPlaying ? 'pause' : 'play_arrow'" 
            color="white" 
            @click="togglePlay"
          />
          <q-space />
          <q-btn flat round dense icon="expand_less" @click="showFullscreen = true" />
        </q-toolbar>
      </div>
    </q-footer>

    <audio ref="audioPlayer" style="display: none;"></audio>

    <q-dialog v-model="showFullscreen" maximized transition-show="slide-up" transition-hide="slide-down">
      <q-card>
        <q-bar class="bg-grey-8 text-white">
          <div class="text-h6 mixpla-title">Mixpla</div>
          <q-space />
          <q-btn flat dense round icon="close" v-close-popup />
        </q-bar>
        <q-card-section class="q-pa-md player-content">
          <div class="station-info">
            <h1 class="station-name">{{ stationName }}</h1>
          </div>

          <div class="now-playing-info">
            <AnimatedText :text="nowPlaying" />
          </div>

          <div class="controls">
            <q-btn 
              round 
              size="xl" 
              color="primary" 
              :icon="isPlaying ? 'pause' : 'play_arrow'"
              @click="togglePlay"
            />
          </div>

          <div class="station-status">
            <span>{{ displayStatusText }}</span>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { keycloak } from 'src/boot/keycloak'
import AnimatedText from 'src/components/AnimatedText.vue'
import { usePlayerStore } from 'src/stores/playerStore'

const $q = useQuasar()
const playerStore = usePlayerStore()
const leftDrawerOpen = ref( false );
const isAuthenticated = ref( false )
const showFullscreen = ref( false )
const audioPlayer = ref<HTMLAudioElement | null>(null)

const { stationName, nowPlaying, displayStatusText, isPlaying } = storeToRefs(playerStore)

onMounted( () => {
  isAuthenticated.value = keycloak.authenticated === true
  keycloak.onAuthSuccess = () => { isAuthenticated.value = true }
  keycloak.onAuthLogout = () => { isAuthenticated.value = false }
  keycloak.onAuthRefreshSuccess = () => { isAuthenticated.value = true }
  keycloak.onTokenExpired = () => { isAuthenticated.value = !!keycloak.authenticated }
  
  if (audioPlayer.value) {
    playerStore.setAudioElement(audioPlayer.value)
  }
} );

onBeforeUnmount(() => {
  playerStore.cleanup()
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleDarkMode() {
  $q.dark.toggle()
  localStorage.setItem('darkMode', String($q.dark.isActive))
}

function handleSwipeUp() {
  showFullscreen.value = true
}

function togglePlay() {
  playerStore.togglePlay()
}
</script>

<style scoped>
.player-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  padding-top: 2rem;
}

.station-info {
  text-align: center;
}

.station-name {
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
}

.now-playing-info {
  text-align: center;
  font-size: 1.2rem;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls {
  margin: 1rem 0;
}

.station-status {
  font-size: 0.75rem;
  color: #aaa;
}
</style>
