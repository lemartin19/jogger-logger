<script lang="ts">
import { getIsAuthed } from '@/stores/auth';
import { eventBus, COOKIE_SET } from '@/EventBus';
import LoginButton from './LoginButton.vue';
import ThemeToggle from './ThemeToggle.vue';

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

  components: { LoginButton, ThemeToggle },

  methods: {
    setIsAuthed() {
      this.isAuthed = getIsAuthed(this.$cookies);
    },
  },
};
</script>

<template>
  <div class="mx-4 d-inline-flex">
    <ThemeToggle />
    <LoginButton v-if="!isAuthed" />
  </div>
</template>
