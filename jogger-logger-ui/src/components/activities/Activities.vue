<script lang="ts">
import type { Activity } from '@/stores/activities/types';
import type { PropType } from 'vue';

export default {
  props: {'activities': Object as PropType<Activity[]>},
};
</script>

<template>
  <template v-for="activity in activities">
    <v-col cols="2">{{ activity.name }}</v-col>
  </template>
</template>
