<template>
  <div class="wrapper">
    <RouterLink to="/"><img class="logo" src="../../assets/images/Logo.png" alt="Logo"/></RouterLink>
    <router-view/>
    <Toast />
  </div>
</template>

<script setup>
import Toast from 'primevue/toast';
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 30px 35px;
  background: var(--grey-07);
  height: 100vh;
}

.logo {
  width: 209px;

}
</style>