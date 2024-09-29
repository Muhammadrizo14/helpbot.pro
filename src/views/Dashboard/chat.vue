<template>
  <div class="integration">
    <h1>Чат</h1>
    <p class="py-2 text-gray-500">Спросите бота о ваших данных</p>

    <Divider/>

    <div class="chat">
      <div class="chat__messages bg-white rounded-md p-3 mt-3">
        <div class="user">
          <div class="user__message">
            <p>Hello!</p>
          </div>
          <div class="user__icon">
            <h3 class="user__icon-letter">T</h3>
            <!--          {{ auth.user?.first_name.slice(0, 1) }}-->
          </div>
        </div>
        <div class="bot">
          <div class="bot__icon">
            <h3 class="bot__icon-letter">
              <i class="pi pi-microchip-ai"></i>
            </h3>
          </div>
          <div class="bot__message">
            <p>Hey, how can i help you?</p>
          </div>
        </div>
      </div>
      <form @submit.prevent="send"  class="chat__input">
        <InputText type="text" v-model="message" />
        <Button type="submit" label="Отправить" />
      </form>
    </div>


  </div>
</template>


<script setup lang="ts">
import {useAuthStore} from "@/stores/AuthStore.ts";
import {ref} from "vue";

const auth = useAuthStore();

const message = ref('')

const send = ()=> {
  console.log(`${message.value} message to be sended`)
}

</script>

<style lang="scss">

.chat {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 100px);
  height: 100%;
  gap: 10px;
  &__messages {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
    border-radius: 6px;
    .user {
      display: flex;
      justify-content: end;
      align-items: stretch;
      gap: 10px;
      padding-bottom: 10px;

      &__message {
        background-color: var(--grey-05);
        border-radius: 16px;
        padding: 15px 10px;
        border-top-right-radius: 0px;

        p {
          font-size: 16px;
        }
      }

      &__icon {
        width: 30px;
        max-height: 30px;
        display: flex;
        align-items:center;
        background-color: var(--grey-06);
        border-radius: 100%;
        justify-content: center;

        &-letter {
          font-size: 16px;
        }

      }
    }

    .bot {
      display: flex;
      justify-content: start;
      align-items: stretch;
      gap: 10px;
      padding-bottom: 10px;


      &__message {
        background-color: var(--grey-05);
        border-radius: 16px;
        padding: 15px 10px;
        border-top-left-radius: 0px;

        p {
          font-size: 16px;
        }
      }

      &__icon {
        width: 30px;
        max-height: 30px;
        display: flex;
        align-items:center;
        background-color: var(--grey-06);
        border-radius: 100%;
        justify-content: center;

        &-letter {
          font-size: 16px;
        }

      }
    }
  }

  &__input {
    display: flex;
    gap: 10px;
    input {
      width: 95%;
      padding: 10px;
    }
  }
}

</style>