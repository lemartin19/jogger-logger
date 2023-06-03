<script lang="ts">
import type { Activity } from '@/stores/activities/types';
import type { PropType } from 'vue';

export default {
  props: { activity: Object as PropType<Activity> },
};
</script>

<template>
  <v-hover v-if="activity">
    <template v-slot:default="{ isHovering, props }">
      <v-card
        :title="activity.name"
        variant="tonal"
        class="ma-2"
        v-bind="props"
        :color="isHovering ? 'primary' : undefined"
      />
    </template>
  </v-hover>
</template>
