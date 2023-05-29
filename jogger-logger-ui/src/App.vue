<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import NavigationBar from './components/app/NavigationBar.vue';

export default {
  data() {
    return { auth: null };
  },

  components: { RouterLink, RouterView, NavigationBar },
};
</script>

<template>
  <v-app>
    <v-layout>
      <NavigationBar />

      <v-main style="min-height: 300px">
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>
