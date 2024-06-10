<template>
  <div class="container">
    <RouterLink to="/"><img class="logo" src="../../assets/images/Logo.png" alt="Logo"/></RouterLink>
    <router-view/>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.container {
  padding: 30px 35px;
  background: var(--grey-07);
  height: 100vh;
}

.logo {
  width: 209px;
}
</style>