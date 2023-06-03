<script lang="ts">
import axios from 'axios';
import Activities from '@/components/activities/Activities.vue';
import { useActivitiesStore } from '@/stores/activities';
import type { Activity } from '@/stores/activities/types';
import { getAuthCookie } from '@/stores/auth';

export default {
  data() {
    const activitiesStore = useActivitiesStore();
    return { activitiesStore, error: null };
  },

  components: { Activities },

  mounted() {
    const token = getAuthCookie(this.$cookies);
    axios
      .get<Activity[]>('https://www.strava.com/api/v3/athlete/activities', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.activitiesStore.activities = response.data;
      })
      .catch((e) => (this.error = e.message));
    return;
  },
};
</script>

<template>
  <v-container class="fill-height">
    <v-row>
      <Activities v-if="activitiesStore.activities" :activities="activitiesStore.activities" />
      <v-col v-else-if="error">
        <v-alert type="error" variant="tonal" class="my-4">
          {{ error }}
        </v-alert>
      </v-col>
      <v-col v-else>
        <v-progress-circular color="primary" indeterminate />
      </v-col>
    </v-row>
  </v-container>
</template>
