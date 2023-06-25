<script lang="ts">
import type { PropType } from 'vue';
import type { Activity, SportType } from '@/stores/activities/types';
import { useActivitiesStore } from '@/stores/activities';
import { MAX_ACTIVITY_RADIUS, MAX_METER_SCALAR, MIN_ACTIVITY_RADIUS } from './constants';
import ActivityTooltip from './ActivityTooltip.vue';

const MIN_ACTIVITY_DIAMETER = MIN_ACTIVITY_RADIUS * 2;
const MAX_ACTIVITY_DIAMETER = MAX_ACTIVITY_RADIUS * 2;

function sportToIconName(sport: SportType) {
  switch (sport) {
    case 'Ride':
    case 'VirtualRide':
    case 'MountainBikeRide':
    case 'EBikeRide':
    case 'EMountainBikeRide':
    case 'GravelRide':
    case 'Handcycle':
      return 'mdi-bike';
    case 'Run':
    case 'TrailRun':
    case 'VirtualRun':
      return 'mdi-run';
    case 'Crossfit':
    case 'WeightTraining':
      return 'mdi-weight-lifter';
    default:
      return 'mdi-chart-line-variant';
  }
}

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
    sportToIconName,
  },
  components: { ActivityTooltip },
};
</script>

<template>
  <v-hover v-if="activity">
    <template v-slot:default="{ isHovering, props }">
      <v-card
        :style="{ ...activityStyle, opacity: isHovering ? 1 : 0.5 }"
        class="d-flex justify-center align-center activity"
        v-bind="props"
        color="primary"
        @click="setCurrentActivity"
      >
        <v-icon :icon="sportToIconName(activity.sport_type)" />
        <ActivityTooltip :activity="activity" />
      </v-card>
    </template>
  </v-hover>
</template>

<style scoped>
.activity {
  clip-path: circle();
  position: absolute;
}
</style>
