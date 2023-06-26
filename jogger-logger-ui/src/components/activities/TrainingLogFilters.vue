<script lang="ts">
export default {
  data() {
    return { collapse: true };
  },
  methods: {
    toggleToolbar() {
      this.collapse = !this.collapse;
    },
  },
};
</script>

<template>
  <v-btn class="training-log-filters" icon="mdi-menu-right" size="40" />
</template>

<style scoped>
.training-log-filters {
  position: fixed;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  top: 10%;
  left: 0;
}
</style>
