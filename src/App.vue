<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/AuthStore";
import { useBotStore } from "./stores/BotStore";

const AuthStore = useAuthStore();
const BotStore = useBotStore();

AuthStore.getUser()
BotStore.getAllBots()

</script>

<template>
  <RouterView />
</template>
