<script lang="ts">
import { TrainingWeek } from '@/stores/activities/getActivitiesByWeek';
import { WEEKDAYS, dateToLocaleDateString } from '@/utils/dates';
import Activity from './Activity.vue';
import TrainingDayPopover from './TrainingDayPopover.vue';
import { ACTIVITY_HEIGHT } from './constants';

export default {
  props: { trainingWeek: TrainingWeek },
  setup() {
    return { WEEKDAYS, style: `height: ${ACTIVITY_HEIGHT}px` };
  },
  components: { Activity, TrainingDayPopover },
  methods: { dateToLocaleDateString },
};
</script>

<template>
  <v-row v-if="trainingWeek" class="flex-nowrap" :style="style">
    <v-col class="ma-auto">
      {{ dateToLocaleDateString(trainingWeek.startDate) }}
    </v-col>

    <template v-for="day in WEEKDAYS">
      <v-col class="ma-auto">
        <template v-for="activity in trainingWeek.days[day].activities">
          <Activity :activity="activity" />
        </template>
        <TrainingDayPopover :trainingDay="trainingWeek.days[day]" />
      </v-col>
    </template>
  </v-row>
</template>
