<script setup lang="ts">
function initOAuth() {
  alert('Start OAuth');
}
</script>

<template>
  <button @click="initOAuth" class="tertiary medium">Login</button>
</template>

<style scoped>
button {
  margin: 16px 0;
}
</style>
