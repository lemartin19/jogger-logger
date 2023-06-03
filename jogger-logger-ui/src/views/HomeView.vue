<script lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const { query } = useRoute();
    return { authStore, loginRequired: query && query.loginRequired };
  },
};
</script>

<template>
  <v-container class="fill-height">
    <v-spacer />
    <v-col cols="6">
      <h1>
        👋 Hey there<span v-if="authStore.profileName"> {{ authStore.profileName }}</span>
      </h1>
      <p>Welcome to Jogger Logger! Glad to have you here.</p>
      <v-alert v-if="loginRequired" type="error" variant="tonal" class="my-4"
        >Must login to see your {{ loginRequired }}</v-alert
      >
      <!-- <v-row> -->
      <!-- What is this thing and how do you use it -->
      <!-- </v-row> -->
    </v-col>
    <v-spacer />
  </v-container>
</template>
