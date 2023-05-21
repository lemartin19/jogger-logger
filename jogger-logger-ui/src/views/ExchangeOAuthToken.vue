<script lang="ts">
import axios from 'axios';

const { VITE_SERVER, DEV } = import.meta.env;

export default {
  data(): { error: string | null } {
    return { error: null };
  },

  mounted() {
    const { code } = this.$route.params;

    if (!code) {
      this.error = `Can't authorize to Strava without code parameter.`;
    }

    const serverEndpoint = `http://${DEV ? 'localhost:3000' : VITE_SERVER}/exchange`;
    axios
      .get(serverEndpoint)
      .then((response) => {
        console.log(`response: ${response}`);
        window.open('/home');
      })
      .catch((e) => {
        this.error = e.message;
      });
  },
};
</script>

<template>
  <main>
    <h2>Exchanging code</h2>
    <p v-if="error">
      {{ error }}
    </p>
  </main>
</template>
