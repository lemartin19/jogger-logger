<script lang="ts">
export default {
  props: ['message'],
};
</script>

<template>
  <h3>{{ message }}</h3>
</template>

<style scoped>
button {
  margin: 16px 0;
}
</style>
