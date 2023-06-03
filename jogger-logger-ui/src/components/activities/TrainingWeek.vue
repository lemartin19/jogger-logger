<script lang="ts">
import type { TrainingWeek } from '@/stores/activities/getActivitiesByWeek';
import type { PropType } from 'vue';
import Activity from './Activity.vue';

export default {
  props: { trainingWeek: Object as PropType<TrainingWeek> },
  components: { Activity },
};
</script>

<template>
  <v-row v-if="trainingWeek">
    <v-col class="ma-auto">
      {{
        trainingWeek.startDate.toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      }}
    </v-col>

    <template v-for="day in [1, 2, 3, 4, 5, 6, 0]">
      <v-col class="ma-auto">
        <template
          v-for="activity in trainingWeek.activities.filter(
            (activity) => activity.start_date.getDay() === day,
          )"
        >
          <Activity :activity="activity" />
        </template>
      </v-col>
    </template>
  </v-row>
</template>
