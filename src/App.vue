<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/AuthStore";
import { useBotStore } from "./stores/BotStore";


const AuthStore = useAuthStore();
AuthStore.getUser()

</script>

<template>
  <RouterView />
</template>
