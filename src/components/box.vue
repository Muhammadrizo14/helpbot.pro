<template>
  <div class="box">
    <slot/>
  </div>
</template>

<script setup>

</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 40px;
  box-shadow: 0px 10px 23px 0px rgba(119, 89, 215, 0.05);
  box-shadow: 0px 41px 41px 0px rgba(119, 89, 215, 0.04);
  box-shadow: 0px 92px 55px 0px rgba(119, 89, 215, 0.03);
  box-shadow: 0px 164px 66px 0px rgba(119, 89, 215, 0.01);
  box-shadow: 0px 257px 72px 0px rgba(119, 89, 215, 0);
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
}
</style>