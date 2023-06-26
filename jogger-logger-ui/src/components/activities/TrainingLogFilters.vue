<script lang="ts">
const MENU_WIDTH = 300;

export default {
  data() {
    return { collapse: true, MENU_WIDTH };
  },
  methods: {
    openMenu() {
      this.collapse = false;
    },
    closeMenu() {
      this.collapse = true;
    },
    include() {
      return [document.querySelector('.filters-toggle')];
    },
  },
};
</script>

<template>
  <div class="filters-toolbar">
    <v-btn
      class="filters-toggle"
      :icon="`mdi-menu-${collapse ? 'right' : 'left'}`"
      size="40"
      @click="collapse = !collapse"
    />
    <v-expand-x-transition>
      <v-card
        v-show="!collapse"
        v-click-outside="{ handler: closeMenu, include }"
        :width="MENU_WIDTH"
        class="filters-menu h-100"
      />
    </v-expand-x-transition>
  </div>
</template>

<style scoped>
.filters-toolbar {
  z-index: 1;
  position: fixed;
  left: 0;
}

.filters-toggle {
  z-index: 2;
  position: fixed;
  top: 10%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.filters-menu {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
