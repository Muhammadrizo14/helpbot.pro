<template>
  <div class="box">
    <slot/>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.box {
  margin: 20px 0;
  width: 100%;
  height: 100%;
  padding: 40px;
  box-shadow: 0px 10px 23px 0px #7759D70D;
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
}
</style>