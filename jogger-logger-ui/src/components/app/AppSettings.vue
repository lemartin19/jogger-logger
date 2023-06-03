<script lang="ts">
import { getIsAuthed } from '@/stores/auth';
import LoginButton from './LoginButton.vue';
import ThemeSwitch from './ThemeSwitch.vue';

export default {
  data() {
    const isAuthed = getIsAuthed(this.$cookies);
    return { isAuthed };
  },
  components: { LoginButton, ThemeSwitch },
};
</script>

<template>
  <div class="mx-4">
    <ThemeSwitch />
    <LoginButton v-if="!isAuthed" />
  </div>
</template>
