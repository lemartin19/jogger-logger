<script lang="ts">
import { TrainingDay } from '@/stores/activities/getActivitiesByWeek';
import TrainingDayActivity from './TrainingDayActivity.vue';
import { TRAINING_WEEK_HEIGHT, MAX_ACTIVITY_RADIUS } from './constants';
import { useActivitiesStore } from '@/stores/activities';

export default {
  props: { trainingDay: TrainingDay },
  components: { TrainingDayActivity },
  data() {
    const activitiesStore = useActivitiesStore();
    const filteredActivities =
      this.trainingDay?.getFilteredActivities(activitiesStore.filters) || [];

    const numberOfActivities = filteredActivities.length || 1;
    const spaceBetweenActivities =
      (TRAINING_WEEK_HEIGHT - MAX_ACTIVITY_RADIUS) / (numberOfActivities + 1);

    return { activitiesStore, filteredActivities, spaceBetweenActivities };
  },
  watch: {
    'activitiesStore.filters'(newFilters) {
      this.filteredActivities = this.trainingDay?.getFilteredActivities(newFilters) || [];
      const numberOfActivities = this.filteredActivities.length || 1;
      this.spaceBetweenActivities =
        (TRAINING_WEEK_HEIGHT - MAX_ACTIVITY_RADIUS) / (numberOfActivities + 1);
    },
  },
};
</script>

<template>
  <v-col class="h-100 d-flex justify-center" style="position: relative" v-if="trainingDay">
    <template v-for="(activity, index) in filteredActivities" v-bind:key="index">
      <TrainingDayActivity :activity="activity" :topOffset="`${(index + 1) * spaceBetweenActivities}px`" />
    </template>
  </v-col>
</template>
