<script lang="ts">
import { WEEKDAYS, dateToLocaleDateString } from '@/utils/dates';
import TrainingDay from './TrainingDay.vue';
import { TRAINING_WEEK_HEIGHT } from './constants';
import { metersToMiles } from '../activity/formatData';
import { useActivitiesStore } from '@/stores/activities';
import { TrainingWeek } from '@/stores/activities/TrainingWeek';

export default {
  props: { trainingWeek: TrainingWeek },
  setup() {
    // debugger;
    return { WEEKDAYS, style: `height: ${TRAINING_WEEK_HEIGHT}px;` };
  },
  components: { TrainingDay },
  methods: {
    dateToLocaleDateString,
    calculateDistance() {
      const activitiesStore = useActivitiesStore();
      const totalDistance = this.trainingWeek
        ? this.trainingWeek.totalDistance(activitiesStore.filters)
        : 0;
      return metersToMiles(totalDistance);
    },
  },
};
</script>

<template>
  <v-row v-if="trainingWeek" class="flex-nowrap bottom-border" :style="style">
    <v-col class="ma-auto">
      {{ dateToLocaleDateString(trainingWeek.startDate) }}
    </v-col>

    <template v-for="day in WEEKDAYS" v-bind:key="day">
      <TrainingDay :trainingDay="trainingWeek.days[day]" />
    </template>

    <v-col class="ma-auto">
      {{ calculateDistance() }}
    </v-col>
  </v-row>
</template>

<style scoped>
.bottom-border {
  border-bottom: 5px solid rgb(var(--v-theme-surface));
}
</style>
