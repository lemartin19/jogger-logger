<script lang="ts">
import LoginButton from './LoginButton.vue';

const { VITE_AUTH_COOKIE } = import.meta.env;

export default {
  data(): {
    isAuthed: boolean;
    drawer: boolean;
  } {
    const isAuthed = Boolean(this.$cookies.get(VITE_AUTH_COOKIE));

    return { isAuthed, drawer: false };
  },

  components: { LoginButton },

  methods: {
    openDrawer() {
      this.isAuthed = true;
    },
    closeDrawer() {
      this.isAuthed = false;
    },
  },
};
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer" v-click-outside="closeDrawer" />
    <v-app-bar-title>Jogger Logger</v-app-bar-title>
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
