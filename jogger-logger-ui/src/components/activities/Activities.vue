<script lang="ts">
export default {
  props: ['activities'],
};
</script>

<template>
  <template v-for="activity in activities">
    <v-col cols="2"></v-col>
  </template>
</template>
