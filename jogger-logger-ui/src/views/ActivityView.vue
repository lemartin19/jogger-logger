<script lang="ts">
import ActivityData from '@/components/activity/ActivityData.vue';
import { useActivitiesStore } from '@/stores/activities';
import type { Activity } from '@/stores/activities/types';
import { dateToString, metersToMiles, secondsToHours } from '@/components/activity/formatData';

function identity<Key extends keyof Activity>(value: Activity[Key]) {
  return `${value}`;
}

// TODO: make the displayed data configurable
const datum = [
  { key: 'sport_type', label: 'Sport', format: identity },
  { key: 'start_date_local', label: 'Time', format: dateToString },
  { key: 'distance', label: 'Distance', format: metersToMiles },
  { key: 'moving_time', label: 'Moving Time', format: secondsToHours },
  { key: 'total_elevation_gain', label: 'Elevation Gain', format: identity },
] as const;

export default {
  setup() {
    // TODO: loading + error state
    const activitiesStore = useActivitiesStore();
    return { activitiesStore, datum };
  },

  mounted() {
    if (!this.activitiesStore.currentActivity) {
      const { id } = this.$route.params;
      this.activitiesStore.fetchActivity(this.$cookies, `${id}`);
    }
  },

  components: { ActivityData },
};
</script>

<template>
  <div class="pa-4">
    <div v-if="activitiesStore.currentActivity">
      <h2>{{ activitiesStore.currentActivity.name }}</h2>
      <v-container class="ma-0">
        <v-row>
          <template v-for="{ key, label, format } in datum">
            <ActivityData :label="label" :value="activitiesStore.currentActivity[key]" :format="format" />
          </template>
        </v-row>
      </v-container>
      <ActivityMap :map="activitiesStore.currentActivity.map" />
    </div>
    <v-alert v-else type="error" class="ma-4"
      >Failed to display activity with id {{ $route.params.id }}</v-alert
    >
  </div>
</template>
