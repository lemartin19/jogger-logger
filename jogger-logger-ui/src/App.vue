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
  <v-layout>
    <v-main style="min-height: 300px" :scrollable="false">
      <v-app>
        <NavigationBar />
        <RouterView />
      </v-app>
    </v-main>
  </v-layout>
</template>
