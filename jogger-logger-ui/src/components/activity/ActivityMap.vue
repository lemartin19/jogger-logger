<script lang="ts">
import type { PolylineMap } from '@/stores/activities/types';
import type { PropType } from 'vue';

// TODO: show polyline on google maps
export default {
  props: { map: Object as PropType<PolylineMap> },
};
</script>

<template>
  <div v-if="map">
    {{ map.id }}
  </div>
</template>
