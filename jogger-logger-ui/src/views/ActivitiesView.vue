<script lang="ts">
import Activities from '@/components/activities/Activities.vue';

export default {
  data() {
    return { activities: null, error:null };
  },

  components: { Activities },

  mounted() {
    // fetch activities
    return;
  },
};
</script>

<template>
  <v-container class="fill-height">
    <v-row>
      <Activities v-if="activities" />
      <v-col v-else-if="error">
        <v-alert  type="error" variant="tonal" class="my-4">
          {{ error }}
        </v-alert>
      </v-col>
      <v-col v-else>
        <v-progress-circular color="primary" indeterminate />
      </v-col>
    </v-row>
  </v-container>
</template>
