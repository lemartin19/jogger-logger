<script lang="ts">
import TrainingLog from '@/components/activities/TrainingLog.vue';
import { useActivitiesStore } from '@/stores/activities';

export default {
  data() {
    const activitiesStore = useActivitiesStore();
    return { activitiesStore, error: null };
  },

  components: { TrainingLog },

  mounted() {
    this.activitiesStore.fetchInitialActivities(this.$cookies);
  },
};
</script>

<template>
  <div class="d-flex flex-column fill-height align-center justify-center">
    <TrainingLog v-if="activitiesStore.activities" />
    <v-alert v-else-if="activitiesStore.error" type="error" variant="tonal" class="my-4">
      {{ error }}
    </v-alert>
    <v-progress-circular v-else color="primary" indeterminate />
  </div>
</template>
