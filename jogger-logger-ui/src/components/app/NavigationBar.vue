<script lang="ts">
import { getAuthCookie } from '@/stores/auth';
import { routeNameToTitle } from '@/router';
import { eventBus, COOKIE_SET } from '@/EventBus';
import AppSettings from './AppSettings.vue';

export default {
  data(): {
    isAuthed: boolean;
    drawer: boolean;
    pageName: string | null;
  } {
    const isAuthed = Boolean(getAuthCookie(this.$cookies));
    const pageName = routeNameToTitle(this.$route.name);
    return { isAuthed, drawer: false, pageName };
  },

  watch: {
    $route(to, __from) {
      this.pageName = routeNameToTitle(to.name);
    },
  },

  components: { AppSettings },

  mounted() {
    eventBus.subscribe(COOKIE_SET, this.setIsAuthed);
  },

  unmounted() {
    eventBus.unsubscribe(COOKIE_SET, this.setIsAuthed);
  },

  methods: {
    openDrawer() {
      this.drawer = true;
    },
    closeDrawer() {
      this.drawer = false;
    },
    setIsAuthed() {
      this.isAuthed = getIsAuthed(this.$cookies);
    },
  },
};
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer" v-click-outside="closeDrawer" />
    <v-app-bar-title>
      <h1>
        Jogger Logger
        <span v-if="pageName" class="text-medium-emphasis"> - {{ pageName }}</span>
      </h1>
    </v-app-bar-title>
    <AppSettings v-slot:append />
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list>
      <v-list-item title="Home" to="/" />
      <v-list-item title="About" to="/about" />
      <v-list-item v-if="isAuthed" title="Activities" to="/activities" />
      <v-list-item v-if="isAuthed" title="Plan" to="/plan" />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
h1 {
  font-size: 1.2em;
  font-weight: 500;
}
</style>
