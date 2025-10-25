<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="text-white" :style="headerStyle">
      <q-toolbar>
        <q-btn flat dense round icon="menu" :aria-label="$t( 'menu.title' )" @click="toggleLeftDrawer" />

        <q-toolbar-title class="mixpla-title">
          Mixpla
        </q-toolbar-title>

        <q-btn flat dense round :icon="playerStore.isPlaying ? 'pause' : 'play_arrow'" @click="togglePlay" />
      </q-toolbar>
      <q-linear-progress v-if=" ui.globalLoading " indeterminate color="white" class="absolute-bottom" />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>
          {{ $t( 'menu.title' ) }}
        </q-item-label>

        <q-item clickable to="/space" active-class="bg-grey-3 text-warning" exact-active-class="bg-grey-3 text-warning"
          v-ripple>
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

        <q-item clickable to="/profile" active-class="bg-grey-3 text-warning"
          exact-active-class="bg-grey-3 text-warning" v-ripple>
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

    <q-footer v-show="playerStore.isPlaying && ui.visualizerEnabled" style="background: transparent; box-shadow: none;" v-touch-swipe.mouse.down="handleSwipeDown" v-touch-swipe.mouse.left="handleSwipeLeft" v-touch-swipe.mouse.right="handleSwipeRight">
      <div :ref="el => { if ( el ) visualizerContainer = el as HTMLDivElement }" style="width: 100%; height: 60px;"></div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import AudioMotionAnalyzer from 'audiomotion-analyzer'
import { useRouter, useRoute } from 'vue-router'
import { keycloak } from 'src/boot/keycloak'
import { useUiStore } from 'src/stores/uiStore'
import { usePlayerStore } from 'src/stores/playerStore'
import { Capacitor } from '@capacitor/core'
import { nativeAuth } from 'src/auth/nativeAuth'
import { MIXPLA_GRADIENT, generateRandomGradient } from 'src/constants/theme'

const ui = useUiStore()
const playerStore = usePlayerStore()
const router = useRouter()
const route = useRoute()
const leftDrawerOpen = ref( false );
const isAuthenticated = ref( false )
const audioElement = ref<HTMLAudioElement | null>( null )
// eslint-disable-next-line prefer-const
let visualizerContainer: HTMLDivElement | null = null as HTMLDivElement | null
let audioMotion: AudioMotionAnalyzer | null = null
const currentGradient = ref(MIXPLA_GRADIENT)

const headerStyle = computed(() => {
  const colors = currentGradient.value.map(stop => `${stop.color} ${stop.pos * 100}%`).join(', ')
  return {
    paddingTop: 'env(safe-area-inset-top)',
    background: `linear-gradient(90deg, ${colors})`
  }
})

/*const currentStationName = computed(() => {
  const station = playerStore.stations.find(s => s.slugName === playerStore.radioSlug)
  return station?.name || playerStore.radioSlug
})*/


function updateAuthState() {
  const isNative = Capacitor.isNativePlatform()
  nativeAuth.loadFromStorage()

  if (isNative) {
    isAuthenticated.value = nativeAuth.isAuthenticated
  } else {
    isAuthenticated.value = keycloak.authenticated === true || nativeAuth.isAuthenticated
  }
}

watch(route, () => {
  updateAuthState()
})

onMounted( () => {
  const isNative = Capacitor.isNativePlatform()

  updateAuthState()

  if (!isNative) {
    keycloak.onAuthSuccess = () => { isAuthenticated.value = true }
    keycloak.onAuthLogout = () => { isAuthenticated.value = false }
    keycloak.onAuthRefreshSuccess = () => { isAuthenticated.value = true }
    keycloak.onTokenExpired = () => { isAuthenticated.value = !!keycloak.authenticated }
  }

  audioElement.value = new Audio()
  playerStore.setAudioElement( audioElement.value )

  router.afterEach( () => {
    ui.setGlobalLoading( false )
  } )
} );

const initVisualizer = async () => {
  if ( audioMotion ) {
    return
  }

  await nextTick()
  await nextTick()

  if ( visualizerContainer && playerStore.audioElement ) {
    audioMotion = new AudioMotionAnalyzer( visualizerContainer, {
      source: playerStore.audioElement,
      mode: 6,
      height: 60,
      barSpace: 0.1,
      ledBars: true,
      showScaleX: false,
      showScaleY: false,
      bgAlpha: 0,
      overlay: true
    } )

    audioMotion.registerGradient( 'mixpla-gradient', {
      colorStops: currentGradient.value
    } )
    audioMotion.gradient = 'mixpla-gradient'
  }
}

const destroyVisualizer = () => {
  if ( audioMotion ) {
    try {
      audioMotion.disconnectInput()
    } catch ( e ) {
      void e
    }
    audioMotion.destroy()
    audioMotion = null
  }
}

onBeforeUnmount( () => {
  destroyVisualizer()
} )

playerStore.$subscribe( ( mutation, state ) => {
  if ( state.isPlaying && ui.visualizerEnabled ) {
    void initVisualizer()
  }
} )

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function togglePlay() {
  playerStore.togglePlay()
}

function handleSwipeDown() {
  ui.visualizerEnabled = false
}

function handleSwipeLeft() {
  currentGradient.value = generateRandomGradient()
  if (audioMotion) {
    audioMotion.registerGradient('mixpla-gradient', {
      colorStops: currentGradient.value
    })
    audioMotion.gradient = 'mixpla-gradient'
  }
}

function handleSwipeRight() {
  currentGradient.value = MIXPLA_GRADIENT
  if (audioMotion) {
    audioMotion.registerGradient('mixpla-gradient', {
      colorStops: currentGradient.value
    })
    audioMotion.gradient = 'mixpla-gradient'
  }
}
</script>

<style scoped>
.q-header {
  transition: background 300ms ease;
}
</style>
