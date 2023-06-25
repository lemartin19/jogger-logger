<script lang="ts">
import { TrainingDay } from '@/stores/activities/getActivitiesByWeek';
import Activity from './Activity.vue';
import TrainingDayPopover from './TrainingDayPopover.vue';
import { TRAINING_WEEK_HEIGHT, MAX_ACTIVITY_RADIUS } from './constants';

export default {
  props: { trainingDay: TrainingDay },
  components: { Activity, TrainingDayPopover },
  setup(props) {
    const numberOfActivities = props.trainingDay?.activities.length || 1;
    const spaceBetweenActivities =
      (TRAINING_WEEK_HEIGHT - MAX_ACTIVITY_RADIUS) / (numberOfActivities + 1);
    return { spaceBetweenActivities };
  },
};
</script>

<template>
  <v-col class="h-100 d-flex justify-center" style="position: relative" v-if="trainingDay">
    <template v-for="(activity, index) in trainingDay.activities">
      <Activity :activity="activity" :topOffset="`${(index + 1) * spaceBetweenActivities}px`" />
    </template>
    <TrainingDayPopover :trainingDay="trainingDay" />
  </v-col>
</template>
