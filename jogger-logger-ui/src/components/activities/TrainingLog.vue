<script lang="ts">
import { useActivitiesStore } from '@/stores/activities';
import { getActivitiesByWeek } from '@/stores/activities/getActivitiesByWeek';
import { debounce } from '@/utils/debounce';
import { TRAINING_WEEK_HEIGHT } from './constants';
import TrainingWeek from './TrainingWeek.vue';
import TrainingLogFilters from './TrainingLogFilters.vue';
import DebouncedVirtualScroll from './DebouncedVirtualScroll.vue';

const APP_BAR_HEIGHT = 64;
const LOADING_BUFFER = TRAINING_WEEK_HEIGHT;

export default {
  setup() {
    return {
      itemHeight: TRAINING_WEEK_HEIGHT,
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
      maxHeightDiff: APP_BAR_HEIGHT,
    };
  },

  watch: {
    ['activitiesStore.error']() {
      this.loading = false;
    },
  },

  mounted() {
    this.loadItemsIfScreenShort();
  },

  updated() {
    this.loadItemsIfScreenShort();
  },

  components: { TrainingWeek, DebouncedVirtualScroll, TrainingLogFilters },

  methods: {
    async loadItemsIfScreenShort() {
      const screenHeight = document.body.clientHeight;
      if (this.trainingWeeks && this.itemHeight * this.trainingWeeks.length <= screenHeight) {
        this.loadItems();
      }
    },

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
  <TrainingLogFilters />
  <DebouncedVirtualScroll
    class="px-8 py-4 w-100"
    :style="`max-height: calc(100vh - ${maxHeightDiff}px)`"
    :items="trainingWeeks"
    :item-height="itemHeight"
    :scroll="scrollListener"
  >
    <template v-slot="{ item }">
      <TrainingWeek :trainingWeek="item" />
    </template>
  </DebouncedVirtualScroll>
  <div class="d-flex flex-column align-center" style="position: absolute; bottom: 0">
    <v-alert v-if="activitiesStore.error" type="error" class="ma-4" height="64px">
      {{ activitiesStore.error }}
    </v-alert>
    <v-progress-circular v-if="loading" class="mb-4" color="primary" indeterminate height="48px" />
  </div>
</template>
