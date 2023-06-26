<script lang="ts">
import { TrainingWeek } from '@/stores/activities/getActivitiesByWeek';
import { WEEKDAYS, dateToLocaleDateString } from '@/utils/dates';
import TrainingDay from './TrainingDay.vue';
import { TRAINING_WEEK_HEIGHT } from './constants';
import { metersToMiles } from '../activity/formatData';

export default {
  props: { trainingWeek: TrainingWeek },
  setup() {
    return { WEEKDAYS, style: `height: ${TRAINING_WEEK_HEIGHT}px;` };
  },
  components: { TrainingDay },
  methods: { dateToLocaleDateString, metersToMiles },
};
</script>

<template>
  <v-row v-if="trainingWeek" class="flex-nowrap bottom-border" :style="style">
    <v-col class="ma-auto">
      {{ dateToLocaleDateString(trainingWeek.startDate) }}
    </v-col>

    <template v-for="day in WEEKDAYS">
      <TrainingDay :trainingDay="trainingWeek.days[day]" />
    </template>

    <v-col class="ma-auto">
      {{ metersToMiles(trainingWeek.totalDistance()) }}
    </v-col>
  </v-row>
</template>

<style scoped>
.bottom-border {
  border-bottom: 5px solid rgb(var(--v-theme-surface));
}
</style>
