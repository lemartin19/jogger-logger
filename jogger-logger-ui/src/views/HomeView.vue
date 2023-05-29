<script lang="ts">
import { getIsAuthed } from '@/stores/auth';

export default {
  data(): { isAuthed: boolean } {
    const isAuthed = getIsAuthed(this.$cookies);
    return { isAuthed };
  },
};
</script>

<template>
  <v-container class="fill-height">
    <v-spacer />
    <v-col cols="6">
      <h1>👋 Hey there</h1>
      <p>Welcome to Jogger Logger! Glad to have you here.</p>
      <!-- <v-row> -->
      <!-- What is this thing and how do you use it -->
      <!-- </v-row> -->
    </v-col>
    <v-spacer />
  </v-container>
</template>

<style scope></style>
