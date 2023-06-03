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

  // TODO: virtualize infinite scroll
  methods: {
    loadItems() {
      // TODO: fetch more items
      return this.trainingWeeks;
    },
  },
};
</script>

<template>
  <div class="ma-16">
    <v-infinite-scroll mode="manual" @load="loadItems" max-height="100%" max-width="100%">
      <template v-for="item in trainingWeeks" :key="item">
        <TrainingWeek :trainingWeek="item" />
      </template>
    </v-infinite-scroll>
  </div>
</template>
