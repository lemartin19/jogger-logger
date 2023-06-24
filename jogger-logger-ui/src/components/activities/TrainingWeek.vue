<script lang="ts">
import { TrainingWeek } from '@/stores/activities/getActivitiesByWeek';
import { WEEKDAYS, dateToLocaleDateString } from '@/utils/dates';
import TrainingDay from './TrainingDay.vue';
import { ACTIVITY_HEIGHT } from './constants';

export default {
  props: { trainingWeek: TrainingWeek },
  setup() {
    return { WEEKDAYS, style: `height: ${ACTIVITY_HEIGHT}px` };
  },
  components: { TrainingDay },
  methods: { dateToLocaleDateString },
};
</script>

<template>
  <v-row v-if="trainingWeek" class="flex-nowrap" :style="style">
    <v-col class="ma-auto">
      {{ dateToLocaleDateString(trainingWeek.startDate) }}
    </v-col>

    <template v-for="day in WEEKDAYS">
      <TrainingDay :trainingDay="trainingWeek.days[day]" />
    </template>
  </v-row>
</template>
