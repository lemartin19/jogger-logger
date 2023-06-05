<script lang="ts">
import { useCurrentActivityStore } from '@/stores/current-activity';

export default {
  setup() {
    const currentActivityStore = useCurrentActivityStore();
    return { activity: currentActivityStore.currentActivity };
  }
}
</script>

<template>
  <div class="pa-4">
    <div v-if="activity">
      <h2>{{ activity.name }}</h2>
    </div>
    <v-alert v-else type="error" class="ma-4">Failed to display activity with id {{ $route.params.id }}</v-alert>
  </div>
</template>
