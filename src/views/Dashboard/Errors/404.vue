<template>
  <div class="container">
    <RouterLink to="/"
      ><img class="logo" src="@/assets/images/Logo.png" alt=""
    /></RouterLink>
    <div class="create flex align-items-center flex-column gap-3">
      <img src="@/assets/images/status/404.png" alt="404" />
      <h1>Ошибка</h1>
      <p class="text-500 text-center">
        К сожалению, запрашиваемая Вами <br> страница не найдена... Перейти на
        главную
      </p>
      <Button @click="router.push({path: '/'})"> Перейти на главную </Button>
    </div>
  </div>
</template>

<script setup>
import router from "@/router/index";
</script>

<style scoped lang="scss">
.container {
  padding: 30px 35px;
  background: var(--grey-07);
  height: 100vh;

  .logo {
    width: 209px;
  }

  .create {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    max-height: 100%;
    overflow: auto;
    scrollbar-width: none;
  }

}
</style>
