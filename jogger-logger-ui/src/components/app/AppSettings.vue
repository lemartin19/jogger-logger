<script lang="ts">
import { getIsAuthed } from '@/stores/auth';
import { eventBus, COOKIE_SET } from '@/EventBus';
import LoginButton from './LoginButton.vue';
import ThemeSwitch from './ThemeSwitch.vue';

export default {
  data() {
    const isAuthed = Boolean(getIsAuthed(this.$cookies));
    return { isAuthed };
  },

  mounted() {
    eventBus.subscribe(COOKIE_SET, this.setIsAuthed);
  },

  unmounted() {
    eventBus.unsubscribe(COOKIE_SET, this.setIsAuthed);
  },

  components: { LoginButton, ThemeSwitch },

  methods: {
    setIsAuthed() {
      this.isAuthed = getIsAuthed(this.$cookies);
    },
  },
};
</script>

<template>
  <div class="mx-4 d-inline-flex">
    <ThemeSwitch />
    <LoginButton v-if="!isAuthed" />
  </div>
</template>
