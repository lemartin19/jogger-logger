<script lang="ts">
import ActivityData from '@/components/activity/ActivityData.vue';
import type { Activity } from '@/stores/activities/types';
import { useCurrentActivityStore } from '@/stores/current-activity';
import { dateToString, metersToMiles, secondsToHours } from '@/components/activity/formatData';

function identity<Key extends keyof Activity>(value: Activity[Key]) {
  return `${value}`;
}

const datum = [
  { key: 'sport_type', label: 'Sport', format: identity },
  { key: 'start_date_local', label: 'Time', format: dateToString },
  { key: 'distance', label: 'Distance', format: metersToMiles },
  { key: 'moving_time', label: 'Moving Time', format: secondsToHours },
  { key: 'total_elevation_gain', label: 'Elevation Gain', format: identity },
] as const;

export default {
  setup() {
    const currentActivityStore = useCurrentActivityStore();
    return { activity: currentActivityStore.currentActivity, datum };
  },
  components: { ActivityData },
};
</script>

<template>
  <div class="pa-4">
    <div v-if="activity">
      <h2>{{ activity.name }}</h2>
      <v-container class="ma-0">
        <v-row>
          <template v-for="{ key,label, format } in datum">
            <ActivityData :label="label" :value="activity[key]" :format="format" />
          </template>
        </v-row>
      </v-container>
    </div>
    <v-alert v-else type="error" class="ma-4"
      >Failed to display activity with id {{ $route.params.id }}</v-alert
    >
  </div>
</template>
