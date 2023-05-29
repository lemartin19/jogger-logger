<script lang="ts">
import axios from 'axios';

const { VITE_SERVER, DEV, VITE_AUTH_COOKIE } = import.meta.env;

export default {
  data(): { loading: boolean; error: string | null } {
    return { loading: true, error: null };
  },

  mounted() {
    const { code } = this.$route.query;

    if (!code) {
      this.error = `Can't authorize to Strava without code parameter.`;
    }

    const serverEndpoint = `http://${
      DEV ? 'localhost:5173/api' : VITE_SERVER
    }/exchange?code=${code}`;
    axios
      .post(serverEndpoint)
      .then(({ data }) => {
        const accessToken = data['access_token'];
        const expiresIn = data['expires_in'];

        if (!accessToken) {
          throw new Error(`Auth unsuccessful, invalid access token or expiration time.`);
        }

        this.$cookies.set(VITE_AUTH_COOKIE, accessToken, expiresIn || 0);
        this.$router.push('/');
      })
      .catch((e) => {
        this.loading = false;
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
    <v-progress-circular v-else indeterminate />
  </main>
</template>
