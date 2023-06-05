<script lang="ts">
import { useActivitiesStore } from '@/stores/activities';
import { getActivitiesByWeek } from '@/stores/activities/getActivitiesByWeek';
import { debounce } from '@/utils/debounce';
import TrainingWeek from './TrainingWeek.vue';
import { ACTIVITY_HEIGHT } from './constants';
import DebouncedVirtualScroll from './DebouncedVirtualScroll.vue';

const LOADER_HEIGHT = 48;
const ALERT_HEIGHT = 64;
const LOADING_BUFFER = ACTIVITY_HEIGHT;

export default {
  setup() {
    return {
      itemHeight: ACTIVITY_HEIGHT,
      loaderHeight: LOADER_HEIGHT,
      alertHeight: ALERT_HEIGHT,
      debounce,
    };
  },

  data() {
    const activitiesStore = useActivitiesStore();
    const trainingWeeks = getActivitiesByWeek({ activities: activitiesStore.activities });

    return {
      activitiesStore,
      trainingWeeks,
      loading: false,
      canLoadMore: true,
    };
  },

  computed: {
    maxHeightDiff() {
      return (this.loading ? LOADER_HEIGHT : 0) + (this.activitiesStore.error ? ALERT_HEIGHT : 0);
    },
  },

  components: { TrainingWeek, DebouncedVirtualScroll },

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

    scrollListener(event: Event) {
      const element = event.currentTarget || event.target;

      if (!element) return;

      // @ts-expect-error the scroll events have these values
      const currentHeight = element.scrollHeight - element.scrollTop;
      // @ts-expect-error the scroll events have these values
      const bottomHeight = element.clientHeight + this.maxHeightDiff;
      if (currentHeight <= bottomHeight + LOADING_BUFFER) {
        this.loadItems();
      }
    },
  },
};
</script>

<template>
  <DebouncedVirtualScroll
    class="px-8 py-4"
    :style="`max-height: calc(100vh - ${maxHeightDiff}px)`"
    :items="trainingWeeks"
    :item-height="itemHeight"
    :scroll="scrollListener"
  >
    <template v-slot="{ item }">
      <TrainingWeek :trainingWeek="item" />
    </template>
  </DebouncedVirtualScroll>
  <v-progress-circular v-if="loading" color="primary" indeterminate :height="loaderHeight" />
  <v-alert v-if="activitiesStore.error" type="error" :height="alertHeight">
    {{ activitiesStore.error }}
  </v-alert>
</template>
