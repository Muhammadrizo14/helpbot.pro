<script setup lang="ts">
  import { RouterView } from "vue-router";
  import { useAuthStore } from "./stores/AuthStore";
  import { useBotStore } from "./stores/BotStore";
  import Toast from 'primevue/toast';
  import {useScheduleStore} from "./stores/ScheduleStore";


  const AuthStore = useAuthStore();
  AuthStore.getUser().then(()=> {
    const ScheduleStore = useScheduleStore();
  })

</script>

<template>
  <div>
    <Toast/>
    
    <RouterView />
  </div>
</template>
