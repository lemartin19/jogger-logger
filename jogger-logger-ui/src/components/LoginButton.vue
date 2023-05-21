<script setup lang="ts">
const CLIENT_ID = process.env.CLIENT_ID;
const SCOPE = process.env.SCOPE;
const CALLBACK = process.env.CALLBACK;

if (!CLIENT_ID) {
  throw new Error(`No client id declared.`)
}

const OAUTH_URL = `http://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${CALLBACK}&approval_prompt=force&scope=${SCOPE}`
</script>

<template>
  <button :href="OAUTH_URL" class="tertiary medium">Login</button>
</template>

<style scoped>
button {
  margin: 16px 0;
}
</style>
