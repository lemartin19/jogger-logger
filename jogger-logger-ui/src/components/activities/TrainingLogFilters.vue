<script lang="ts">
import { useActivitiesStore } from '@/stores/activities';
import type { SportType } from '@/stores/activities/types';
import { ALL } from 'dns';

const MENU_WIDTH = 300;
const ALLOWED_SPORT_FILTERS: SportType[] = ['Run', 'Ride'];

export default {
  data() {
    const activitiesStore = useActivitiesStore();
    const filtersCopy = activitiesStore.copyFilters;
    const localFilters = { sportTypes: filtersCopy.sportTypes || ALLOWED_SPORT_FILTERS };
    return {
      activitiesStore,
      ALLOWED_SPORT_FILTERS,
      collapse: true,
      MENU_WIDTH,
      localFilters,
    };
  },
  methods: {
    applyFilters() {
      const skipSportTypeFilter =
        this.localFilters.sportTypes.length === 0 ||
        this.localFilters.sportTypes.length === ALLOWED_SPORT_FILTERS.length;
      const newSportTypes = skipSportTypeFilter ? null : this.localFilters.sportTypes;

      this.activitiesStore.setFilters({ sportTypes: newSportTypes });
      this.collapse = true;
    },
    openMenu() {
      this.collapse = false;
    },
    closeMenu() {
      this.collapse = true;
    },
    include() {
      return [document.querySelector('.filters-toggle'), ...document.querySelectorAll('.filter')];
    },
  },
};
</script>

<template>
  <div class="filters-toolbar">
    <v-btn
      class="filters-toggle"
      flat
      :icon="`mdi-menu-${collapse ? 'right' : 'left'}`"
      :style="collapse ? '' : `transform: translateX(${MENU_WIDTH}px)`"
      @click="collapse = !collapse"
    />
    <v-expand-x-transition>
      <v-card
        v-show="!collapse"
        v-click-outside="{ handler: closeMenu, include }"
        :width="MENU_WIDTH"
        class="filters-menu h-100 mt-16 pa-4 pl-2"
      >
        <v-select
          class="filter"
          v-model="localFilters.sportTypes"
          :items="ALLOWED_SPORT_FILTERS"
          label="Select"
          multiple
          hint="Pick the sport types to display"
          persistent-hint
        />
        <v-btn class="mt-1 ml-2" color="primary" @click="applyFilters">Apply</v-btn>
      </v-card>
    </v-expand-x-transition>
  </div>
</template>

<style scoped>
.filters-toolbar {
  z-index: 1;
  position: fixed;
  left: 0;
}

.filters-toggle {
  z-index: 2;
  position: fixed;
  top: 10%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.filters-menu {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
