<script lang="ts">
import { RouterView } from 'vue-router';
import NavigationBar from './components/app/NavigationBar.vue';

export default {
  data() {
    return { auth: null };
  },

  components: { RouterView, NavigationBar },
};
</script>

<template>
  <v-layout>
    <v-main>
      <v-app>
        <NavigationBar />
        <div class="pt-16 fill-height">
          <RouterView />
        </div>
      </v-app>
    </v-main>
  </v-layout>
</template>
