<script lang="ts">
import { TrainingDay } from '@/stores/activities/getActivitiesByWeek';
import { dateToLocaleDateString } from '@/utils/dates';
import Activity from './Activity.vue';
import TrainingDayPopover from './TrainingDayPopover.vue';

export default {
  props: { trainingDay: TrainingDay },
  components: { Activity, TrainingDayPopover },
};
</script>

<template>
  <v-col class="ma-auto" v-if="trainingDay">
    <template v-for="activity in trainingDay.activities">
      <Activity :activity="activity" />
    </template>
    <TrainingDayPopover :trainingDay="trainingDay" />
  </v-col>
</template>
