<script lang="ts">
import axios from 'axios';
import TrainingLog from '@/components/activities/TrainingLog.vue';
import { useActivitiesStore } from '@/stores/activities';
import type { Activity } from '@/stores/activities/types';
import { getAuthCookie } from '@/stores/auth';

export default {
  data() {
    const activitiesStore = useActivitiesStore();
    return { activitiesStore, error: null };
  },

  components: { TrainingLog },

  mounted() {
    const token = getAuthCookie(this.$cookies);
    axios
      .get<Activity[]>('https://www.strava.com/api/v3/athlete/activities', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.activitiesStore.activities = response.data.map((activity) => ({
          ...activity,
          start_date: new Date(activity.start_date),
          start_date_local: new Date(activity.start_date_local),
        }));
      })
      .catch((e) => (this.error = e.message));
  },
};
</script>

<template>
  <div class="d-flex align-center justify-center flex-fill">
    <TrainingLog v-if="activitiesStore.activities" class="align-self-start" />
    <v-alert v-else-if="error" type="error" variant="tonal" class="my-4">
      {{ error }}
    </v-alert>
    <v-progress-circular v-else color="primary" indeterminate />
  </div>
</template>
