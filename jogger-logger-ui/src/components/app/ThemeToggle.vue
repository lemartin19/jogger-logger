<script lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs';

export default {
  data() {
    const theme = useTheme();
    return { theme };
  },

  methods: {
    toggleTheme() {
      // @ts-expect-error typed as readonly but it's not
      this.theme.global.name = this.theme.global.current.dark ? 'light' : 'dark';
    },
  },
};
</script>

<template>
  <v-btn
    @click="toggleTheme"
    color="primary"
    icon="mdi-theme-light-dark"
    size="medium"
    class="px-2 ma-1"
  />
</template>
