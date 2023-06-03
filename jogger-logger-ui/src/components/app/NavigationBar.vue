<script lang="ts">
import { getIsAuthed } from '@/stores/auth';
import LoginButton from './LoginButton.vue';
import { routeNameToTitle } from '@/router';
import { useRoute } from 'vue-router';

export default {
  data(): {
    isAuthed: boolean;
    drawer: boolean;
    pageName: string | null;
  } {
    const isAuthed = getIsAuthed(this.$cookies);
    const pageName = routeNameToTitle(this.$route.name);
    return { isAuthed, drawer: false, pageName };
  },

  watch: {
    $route(to, __from) {
      this.pageName = routeNameToTitle(to.name);
    },
  },

  components: { LoginButton },

  methods: {
    openDrawer() {
      this.drawer = true;
    },
    closeDrawer() {
      this.drawer = false;
    },
  },
};
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer" v-click-outside="closeDrawer" />
    <v-app-bar-title>
      <b>Jogger Logger</b>
      <span v-if="pageName" class="grey-lighten-2"> - {{ pageName }}</span>
    </v-app-bar-title>
    <LoginButton v-if="!isAuthed" v-slot:append />
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
