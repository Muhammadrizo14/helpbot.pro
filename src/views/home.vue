<script setup lang="ts">
import Button from "primevue/button";
import sidebar from "../layouts/sidebar.vue";
import Toast from "primevue/toast";
</script>

<template>
  <div class="wrap flex">
    <sidebar />
    <Toast position="bottom-right" />

    <div class="dashboard-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.p-toast {
  display: none;

  * {
    svg {
      display: none;
    }
  }
}

.wrap {
  font-size: 26px;
  background: var(--grey-07);
  height: 100%;

  .dashboard-content {
    margin-left: 360px; /* Same as the sidebar width */
    flex: 1;
    padding: 15px;
    width: 100%;
    min-height: 100vh;
    height: 100%;
  }
}
</style>
