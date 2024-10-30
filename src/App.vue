<script setup lang="ts">
  import { RouterView } from "vue-router";
  import { useAuthStore } from "./stores/AuthStore";
  import { useBotStore } from "./stores/BotStore";
  import Toast from 'primevue/toast';


  const AuthStore = useAuthStore();
  AuthStore.getUser()

</script>

<template>
  <div>
    <Toast/>
    
    <RouterView />
  </div>
</template>
