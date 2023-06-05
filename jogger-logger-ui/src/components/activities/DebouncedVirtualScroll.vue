<script lang="ts">
import { debounce } from '@/utils/debounce';

export default {
  props: ['class', 'style', 'items', 'itemHeight', 'scroll'],

  setup(props) {
    return { debouncedScroll: debounce(props.scroll, 400) };
  },
};
</script>

<template>
  <v-virtual-scroll
    :class="class"
    :style="style"
    :items="items"
    :item-height="itemHeight"
    @scroll.native="debouncedScroll"
  >
    <template v-slot:default="{ item }"><slot :item="item"></slot></template>
  </v-virtual-scroll>
</template>
