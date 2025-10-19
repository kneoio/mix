<template>
  <q-page class="q-pa-md flex flex-center">
    <div class="column items-center q-gutter-md">
      <div class="text-h5">{{ $t('home.welcome') }}</div>
      <div class="text-body1 text-center">{{ $t('home.publicHome') }}</div>
      <div class="row q-gutter-sm">
        <q-btn color="primary" :label="$t('home.goToFavorites')" to="/favorites" />
        <q-btn color="secondary" :label="$t('menu.login')" to="/login" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
</script>
