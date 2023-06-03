<script lang="ts">
import Activities from '@/components/activities/Activities.vue';

export default {
  data() {
    return { activities: null };
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
      <v-col cols="12" v-else>
        <v-progress-circular indeterminate />
      </v-col>
    </v-row>
  </v-container>
</template>
