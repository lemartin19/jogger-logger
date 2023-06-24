<script lang="ts">
import type { TrainingWeek } from '@/stores/activities/getActivitiesByWeek';
import type { PropType } from 'vue';
import Activity from './Activity.vue';
import { ACTIVITY_HEIGHT } from './constants';

export default {
  props: { trainingWeek: Object as PropType<TrainingWeek> },
  components: { Activity },
  computed: {
    style() {
      return `height: ${ACTIVITY_HEIGHT}px`;
    },
  },
};
</script>

<template>
  <v-row v-if="trainingWeek" class="flex-nowrap" :style="style">
    <v-col class="ma-auto">
      {{
        trainingWeek.startDate.toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      }}
    </v-col>

    <template v-for="day in [1,2,3,4,5,6,0] as const">
      <v-col class="ma-auto">
        <template v-for="activity in trainingWeek.days[day].activities">
          <Activity :activity="activity" />
        </template>
        <v-tooltip
          activator="parent"
          location="bottom"
          open-delay="400"
          :disabled="trainingWeek.days[day].hasActivities()"
        >
          <p>
            {{
              trainingWeek.days[day].date.toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            }}
          </p>
          <p v-for="activity in trainingWeek.days[day].activities">
            {{ activity.name }}
          </p>
        </v-tooltip>
      </v-col>
    </template>
  </v-row>
</template>
