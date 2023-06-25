<script lang="ts">
import { dateToLocaleDateString } from '@/utils/dates';
import type { Activity } from '@/stores/activities/types';
import type { PropType } from 'vue';
import { metersToMiles } from '../activity/formatData';

export default {
  props: { activity: Object as PropType<Activity> },
  methods: { dateToLocaleDateString, metersToMiles },
};
</script>

<template>
  <v-tooltip activator="parent" location="bottom" open-delay="300" v-if="activity">
    <p>
      {{ dateToLocaleDateString(activity.start_date) }}
    </p>
    <p>
      {{ activity.name }}
    </p>
    <p>
      {{ metersToMiles(activity.distance) }}
    </p>
  </v-tooltip>
</template>
