<script lang="ts">
import ActivityData from '@/components/activity/ActivityData.vue';
import type { Activity } from '@/stores/activities/types';
import { useCurrentActivityStore } from '@/stores/current-activity';

interface DataToShow {
  key: keyof Activity;
  label: string;
}

export default {
    setup() {
        const currentActivityStore = useCurrentActivityStore();
        const datum: DataToShow[] = [
            { key: "sport_type", label: "Sport" },
            { key: "distance", label: "Distance" },
            { key: "moving_time", label: "Moving Time" },
            { key: "total_elevation_gain", label: "Elevation Gain" },
        ];
        return { activity: currentActivityStore.currentActivity, datum };
    },
    components: { ActivityData }
};
</script>

<template>
  <div class="pa-4">
    <div v-if="activity">
      <h2>{{ activity.name }}</h2>
      <v-container class="ma-0">
        <v-row>
          <template v-for="data in datum">
            <ActivityData :label="data.label" :value="activity[data.key]" />
          </template>
        </v-row>
      </v-container>
    </div>
    <v-alert v-else type="error" class="ma-4"
      >Failed to display activity with id {{ $route.params.id }}</v-alert
    >
  </div>
</template>
