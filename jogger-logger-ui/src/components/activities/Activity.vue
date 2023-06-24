<script lang="ts">
import type { Activity } from '@/stores/activities/types';
import type { PropType } from 'vue';
import { ACTIVITY_HEIGHT, MAX_METER_SCALAR, MIN_ACTIVITY_DISPLAY_SIZE } from './constants';
import { useActivitiesStore } from '@/stores/activities';

export default {
  props: { activity: Object as PropType<Activity> },

  setup() {
    const activitiesStore = useActivitiesStore();
    return { activitiesStore };
  },

  computed: {
    activityStyle() {
      const distanceScalar = this.activity
        ? Math.min(this.activity.distance, MAX_METER_SCALAR) / MAX_METER_SCALAR
        : 0;
      const activityDisplaySize =
        MIN_ACTIVITY_DISPLAY_SIZE + (ACTIVITY_HEIGHT - MIN_ACTIVITY_DISPLAY_SIZE) * distanceScalar;
      const sizePixels = `${activityDisplaySize}px`;
      return {
        height: sizePixels,
        width: sizePixels,
      };
    },
  },

  methods: {
    setCurrentActivity() {
      if (this.activity) {
        this.$router.push(`/activities/${this.activity.id}`);
        this.activitiesStore.currentActivity = this.activity;
      }
    },
  },
};
</script>

<template>
  <v-hover v-if="activity">
    <template v-slot:default="{ isHovering, props }">
      <v-card
        :style="activityStyle"
        variant="tonal"
        class="ma-2 activity"
        v-bind="props"
        :color="isHovering ? 'secondary' : 'primary'"
        @click="setCurrentActivity"
      />
    </template>
  </v-hover>
</template>

<style scoped>
.activity {
  clip-path: circle();
}
</style>
