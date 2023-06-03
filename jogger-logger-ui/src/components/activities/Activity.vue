<script lang="ts">
import type { Activity } from '@/stores/activities/types';
import type { PropType } from 'vue';

export default {
  props: { activity: Object as PropType<Activity> },
};
</script>

<template>
  <v-card v-if="activity" :title="activity.name" variant="tonal" class="ma-2" />
</template>
