<script lang="ts">
import { TrainingDay } from '@/stores/activities/getActivitiesByWeek';
import { dateToLocaleDateString } from '@/utils/dates';

export default {
  props: { trainingDay: TrainingDay },
  methods: { dateToLocaleDateString },
};
</script>

<template>
  <v-tooltip activator="parent" location="bottom" open-delay="400" v-if="trainingDay">
    <p>
      {{ dateToLocaleDateString(trainingDay.date) }}
    </p>
    <p v-for="activity in trainingDay.activities">
      {{ activity.name }}
    </p>
  </v-tooltip>
</template>
