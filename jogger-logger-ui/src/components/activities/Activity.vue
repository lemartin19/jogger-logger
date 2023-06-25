<script lang="ts">
import type { Activity } from '@/stores/activities/types';
import type { PropType } from 'vue';
import { MAX_ACTIVITY_RADIUS, MAX_METER_SCALAR, MIN_ACTIVITY_RADIUS } from './constants';
import { useActivitiesStore } from '@/stores/activities';

const MIN_ACTIVITY_DIAMETER = MIN_ACTIVITY_RADIUS * 2;
const MAX_ACTIVITY_DIAMETER = MAX_ACTIVITY_RADIUS * 2;

export default {
  props: { activity: Object as PropType<Activity>, topOffset: String },

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
        MIN_ACTIVITY_DIAMETER + (MAX_ACTIVITY_DIAMETER - MIN_ACTIVITY_DIAMETER) * distanceScalar;
      const sizePixels = `${activityDisplaySize}px`;
      return {
        height: sizePixels,
        width: sizePixels,
        top: this.topOffset,
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
        class="mx-auto activity"
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
  position: absolute;
  opacity: 0.5;
}
</style>
