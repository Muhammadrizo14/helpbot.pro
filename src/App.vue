<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/AuthStore";

const store = useAuthStore();

store.getUser()

</script>

<template>
  <RouterView />
</template>
