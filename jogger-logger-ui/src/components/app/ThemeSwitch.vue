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
  <v-switch
    value="theme"
    @change="toggleTheme"
    :label="`${theme.global.name} mode`"
    color="primary"
    hide-details
    inset
    true-value="dark"
    false-value="light"
  />
</template>
