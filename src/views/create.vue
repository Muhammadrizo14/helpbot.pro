<template>
  <div class="container">
    <RouterLink to="/"><img class="logo" src="../assets/images/Logo.png" alt=""></RouterLink>
    <div class="create">
      <Box>
        <h2>Создайте вашего первого бота</h2>
        <form action="#" class="create__form pt-5 flex flex-column gap-5">
          <div class="create__form-title">
            <label for="create__form-title">Название бота</label>
            <InputText :style="{'width': '100%', 'margin-top': '10px'}" id="create__form-title" type="text" placeholder="Мой_первый_бот"/>
          </div>
          <Button type="submit" class="create__form-submit" label="Создать"/>
        </form>
      </Box>
    </div>
  </div>
</template>

<script setup lang="ts">
import Box from '../components/box.vue'
</script>

<style lang="scss" scoped>
.container {
  padding: 30px 35px;
  background: var(--grey-07);
  height: 100vh;

  .logo {
    width: 209px;
  }

  .create {
    width: 550px;
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