<script lang="ts">
import { useActivitiesStore } from '@/stores/activities';
import { getActivitiesByWeek } from '@/stores/activities/getActivitiesByWeek';
import TrainingWeek from './TrainingWeek.vue';

export default {
  data() {
    const activitiesStore = useActivitiesStore();
    const trainingWeeks = getActivitiesByWeek({ activities: activitiesStore.activities });
    return { activitiesStore, trainingWeeks };
  },

  components: { TrainingWeek },

  // TODO: virtualize infinite scroll
  methods: {
    async loadItems({ done }: { done: (status: 'ok' | 'error' | 'empty') => void }) {
      const newActivities = await this.activitiesStore.fetchNextActivities(this.$cookies);

      if (!newActivities) {
        done('error');
      } else if (newActivities) {
        done('empty');
      } else {
        this.trainingWeeks = getActivitiesByWeek({ activities: this.activitiesStore.activities });
        done('ok');
      }
    },
  },
};
</script>

<template>
  <v-infinite-scroll @load="loadItems">
    <template v-for="(item, index) in trainingWeeks" :key="item">
      <v-card class="px-2" :color="index % 2 === 0 ? 'background' : 'surface'">
        <TrainingWeek :trainingWeek="item" />
      </v-card>
    </template>
  </v-infinite-scroll>
</template>
