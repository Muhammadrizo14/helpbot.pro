<template>
  <div class="container">
    <RouterLink to="/"><img src="../assets/images/Logo.png" alt=""></RouterLink>
    <div class="create">
      <Box>
        <h2>Создайте вашего первого бота</h2>
        <form action="#" class="create__form">
          <div class="create__form-title">
              <BaseInput id="create__form-title" type="text" label="Название бота" placeholder="Мой_первый_бот"/>

          </div>
          <button type="submit" class="create__form-submit">
            Создать
          </button>
        </form>
      </Box>
    </div>
  </div>
</template>

<script setup lang="ts">
import Box from '../components/box.vue'
import BaseInput from "../components/base-input.vue";
</script>

<style lang="scss" scoped>
.container {
  padding: 30px 35px;
  background: var(--grey-07);
  height: 100vh;

  .create {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    &__form {
      &-title {
        padding: 40px 0;
        display: flex;
        flex-direction: column;
        gap: 8px;

        input {
          border-radius: 8px;
          padding: 12px;
          border: 2px solid var(--grey-04);


          &::placeholder {
            color: var(--grey-04);
            font-size: 18px;
          }

          &:active {
            border: 2px solid var(--grey-02);
          }
        }
        padding-bottom: 24px;
      }

      &-submit {
        background: var(--primary-01);
        color: var(--grey-09);
        border: 0;
        cursor: pointer;
        bottom: 40px;
        width: 100%;
        padding: 16px 0;
        border-radius: 8px;
      }
    }

  }
}
</style>