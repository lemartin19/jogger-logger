<script lang="ts">
import { useActivitiesStore } from '@/stores/activities';
import { getActivitiesByWeek } from '@/stores/activities/getActivitiesByWeek';
import TrainingWeek from './TrainingWeek.vue';
import { ACTIVITY_HEIGHT } from './constants';

export default {
  data() {
    const activitiesStore = useActivitiesStore();
    const trainingWeeks = getActivitiesByWeek({ activities: activitiesStore.activities });
    return { activitiesStore, trainingWeeks, loading: false, canLoadMore: true };
  },

  computed: {
    itemHeight() {
      return ACTIVITY_HEIGHT;
    },
  },

  components: { TrainingWeek },

  methods: {
    async loadItems() {
      if (!this.canLoadMore) return;

      this.loading = true;
      const newActivities = await this.activitiesStore.fetchNextActivities(this.$cookies);
      this.loading = false;

      this.canLoadMore = Boolean(newActivities && newActivities.length !== 0);
      if (newActivities && newActivities.length !== 0) {
        this.trainingWeeks = getActivitiesByWeek({ activities: this.activitiesStore.activities });
      }
    },

    // TODO: debounce
    scrollListener(event: Event) {
      const element = event.currentTarget || event.target;
      // @ts-expect-error the scroll events have these values
      if (element && element.scrollHeight - element.scrollTop === element.clientHeight) {
        this.loadItems();
      }
    },
  },
};
</script>

<template>
  <v-virtual-scroll
    class="px-8 py-4"
    style="max-height: calc(100vh - 64px)"
    :items="trainingWeeks"
    :item-height="itemHeight"
    @scroll.native="scrollListener"
  >
    <template v-slot:default="{ item }">
      <TrainingWeek :trainingWeek="item" />
    </template>
  </v-virtual-scroll>
  <v-progress-circular v-if="loading" color="primary" indeterminate />
  <v-alert v-if="activitiesStore.error" type="error">{{activitiesStore.error}}</v-alert>
</template>
