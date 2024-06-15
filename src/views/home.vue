<script setup lang="ts">
import Button from "primevue/button";
</script>

<template>
  <div class="wrap">
    <RouterLink to="/auth">
      <Button>GO TO AUTH</Button>
    </RouterLink>
    <br>
    <br>
    <RouterLink to="/create">
      <Button>GO TO CREATE</Button>
    </RouterLink>

  </div>
</template>

<style scoped lang="scss">


.wrap {
  padding: 30px;
  font-size: 26px;
}
</style>