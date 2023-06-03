<script lang="ts">
import { useActivitiesStore } from '@/stores/activities';
import { getActivitiesByWeek } from '@/stores/activities/getActivitiesByWeek';
import TrainingWeek from './TrainingWeek.vue';

export default {
  data() {
    const activitiesStore = useActivitiesStore();
    const trainingWeeks = getActivitiesByWeek({ activities: activitiesStore.activities });
    return { trainingWeeks };
  },

  components: { TrainingWeek },
};
</script>

<template>
  <div class="ma-16">
    <v-virtual-scroll :items="trainingWeeks" max-height="100%" max-width="100%">
      <template v-slot:default="{ item }">
        <TrainingWeek :trainingWeek="item" />
      </template>
    </v-virtual-scroll>
  </div>
</template>
