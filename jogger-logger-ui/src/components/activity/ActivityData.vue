<script lang="ts">
export default {
  props: ['label', 'value', 'format'],

  setup(props) {
    return { formattedData: props.format(props.value) };
  },
};
</script>

<template>
  <v-col cols="4">
    <v-card>
      <div class="pa-4">
        {{ label }}
        <div style="font-size: 2em">
          {{ formattedData }}
        </div>
      </div>
    </v-card>
  </v-col>
</template>
