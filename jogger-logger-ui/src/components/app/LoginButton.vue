<script setup lang="ts">
const { VITE_CLIENT_ID, VITE_OAUTH_SCOPE, VITE_APP_DOMAIN, DEV } = import.meta.env;

if (DEV && !VITE_CLIENT_ID) {
  throw new Error(`No client id declared. Given: ${VITE_CLIENT_ID}`);
}

const callback = encodeURI(`http://${DEV ? 'localhost:5173' : VITE_APP_DOMAIN}/exchange_token`);
const oauthUrl = `http://www.strava.com/oauth/authorize?client_id=${VITE_CLIENT_ID}&response_type=code&redirect_uri=${callback}&approval_prompt=force&scope=${VITE_OAUTH_SCOPE}`;
function initOAuth() {
  window.location.href = oauthUrl;
}
</script>

<template>
  <v-btn @click="initOAuth" class="tertiary medium ma-1">Login</v-btn>
</template>
