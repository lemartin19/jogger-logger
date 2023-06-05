<script lang="ts">
import { format } from 'path';

export default {
  props: ['label', 'value', 'format'],

  setup(props){
    return {formattedData: props.format(props.value)}
  }
};
</script>

<template>
  <v-col cols="2">
    <v-card>
      <div class="pa-4">
        {{ label }}
        <div style="font-size: 2.25em">
          {{ value }}
        </div>
      </div>
    </v-card>
  </v-col>
</template>
