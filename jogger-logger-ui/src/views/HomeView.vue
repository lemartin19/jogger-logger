<script lang="ts">
import { useAuthStore } from '@/stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
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
      <!-- <v-row> -->
      <!-- What is this thing and how do you use it -->
      <!-- </v-row> -->
    </v-col>
    <v-spacer />
  </v-container>
</template>

<style scope></style>
