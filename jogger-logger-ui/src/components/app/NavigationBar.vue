<script lang="ts">
import LoginButton from './LoginButton.vue';

const { VITE_AUTH_COOKIE } = import.meta.env;

export default {
  data(): {
    isAuthed: boolean;
    isDrawerOpen: boolean;
  } {
    const isAuthed = Boolean(this.$cookies.get(VITE_AUTH_COOKIE));

    return { isAuthed, isDrawerOpen: false };
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
    <v-app-bar-nav-icon @click="openDrawer" v-click-outside="closeDrawer" />
    <v-navigation-drawer v-model="isDrawerOpen">
      <v-list>
        <v-list-item title="Home" to="/"></v-list-item>
        <v-list-item title="About" to="/about"></v-list-item>
        <v-list-item v-if="isAuthed" title="Activities" to="/activities"></v-list-item>
        <v-list-item v-if="isAuthed" title="Plan" to="/plan"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar-title>Jogger Logger</v-app-bar-title>

    <LoginButton vi-if="!isAuthed" v-slot:append />
  </v-app-bar>
</template>
