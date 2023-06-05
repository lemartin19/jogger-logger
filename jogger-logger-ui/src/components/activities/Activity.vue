<script lang="ts">
import type { Activity } from '@/stores/activities/types';
import type { PropType } from 'vue';
import { ACTIVITY_HEIGHT } from './constants';
import { useActivitiesStore } from '@/stores/activities';

export default {
  props: { activity: Object as PropType<Activity> },

  setup() {
    const activitiesStore = useActivitiesStore();
    return { activitiesStore };
  },

  computed: {
    maxHeight() {
      return ACTIVITY_HEIGHT;
    },
  },

  methods: {
    setCurrentActivity() {
      if (this.activity) {
        this.$router.push(`/activities/${this.activity.id}`);
        this.activitiesStore.currentActivity = this.activity;
      }
    },
  },
};
</script>

<template>
  <v-hover v-if="activity">
    <template v-slot:default="{ isHovering, props }">
      <v-card
        :text="activity.name"
        variant="tonal"
        class="ma-2"
        v-bind="props"
        :color="isHovering ? 'secondary' : 'primary'"
        :max-height="maxHeight"
        @click="setCurrentActivity"
      />
    </template>
  </v-hover>
</template>
