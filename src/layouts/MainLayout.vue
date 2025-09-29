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

        <q-btn-dropdown dense flat :label="currentLocale.toUpperCase()" aria-label="Change language">
          <q-list>
            <q-item v-for="loc in locales" :key="loc" clickable v-close-popup @click="changeLocale(loc)">
              <q-item-section>{{ loc.toUpperCase() }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn
          flat
          dense
          round
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          :aria-label="$q.dark.isActive ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleDark"
        />
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

        <q-item clickable to="/favorites" v-ripple>
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

        <q-item clickable to="/login" v-ripple>
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
import { i18n, setLocale } from 'boot/i18n';
import type { Locale } from 'boot/i18n';

const leftDrawerOpen = ref(false);
const $q = useQuasar();

const THEME_KEY = 'app:prefers-dark';

function toggleDark () {
  $q.dark.set(!$q.dark.isActive);
  try {
    localStorage.setItem(THEME_KEY, $q.dark.isActive ? '1' : '0');
  } catch (err) {
    // ignore persistence errors
    void err
  }
}

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
});

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// i18n language switcher state
const locales: readonly Locale[] = ['pt', 'en'] as const;
const currentLocale = ref<Locale>(i18n.global.locale.value as Locale);

function changeLocale (loc: Locale) {
  if (locales.includes(loc)) {
    setLocale(loc);
    currentLocale.value = i18n.global.locale.value as Locale;
  }
}
</script>
