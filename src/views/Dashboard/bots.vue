<template>
  <div>
    <div class="flex align-items-center justify-content-between">
      <h1>Боты</h1>
      <Button @click="createDialog = true"> Создать бота</Button>
    </div>

    <div class="bots__wrap pt-3">
      <Box class="bot" v-for="bot in store.bots">
        <div class="bot__background1"></div>
        <div class="bot__text">
          <h1>{{ bot.name }}</h1>
        </div>
      </Box>
    </div>

    <Dialog
      v-model:visible="createDialog"
      :closable="false"
      modal
      :draggable="false"
      class="w-27rem"
    >
      <template #header>
        <div class="pb-2">
          <h2 class="pb-2">Ответить на вопрос</h2>
          <span class="p-text-secondary block">
            Еще один клик до нового бота
          </span>
        </div>
      </template>
      <img
        src="@/assets/images/icons/close.png"
        alt="Close"
        class="close-icon"
        @click="createDialog = false"
      />

      <div class="flex flex-column gap-2 pb-4">
        <label for="title" class="database-add__label"
          >Пожалуйста, введите название бота.</label
        >
        <InputText
          id="title"
          placeholder="Название бота"
          v-model="data.title"
          :invalid="v$.title.$errors.length > 0"
        />
        <label
          for="login__form-password"
          v-for="error in v$.title.$errors"
          :key="error.$uid"
          style="color: var(--red)"
          >{{ error.$message }}</label
        >
      </div>

      <div class="flex justify-content-center gap-2">
        <Button type="submit" label="Создать" @click="createBot"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { reactive, ref } from "vue";
import { useBotStore } from "../../stores/BotStore";

const createDialog = ref(false);

const store = useBotStore();

const data = reactive({
  title: "",
});

const customMessages = {
  required: "Это поле не может быть пустым",
};

const rules = {
  title: {
    required: helpers.withMessage(customMessages.required, required),
  },
};

const v$ = useVuelidate(rules, data);

const createBot = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    console.log("Form validation failed");
    return;
  }

  createDialog.value = false;

  store
    .createBot(data.title)
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: "Бот успешно удалено",
        life: 3000,
      })
      store.getAllBots()
    })
    .catch(() => {
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: "Попробуйте позже",
        life: 3000,
      });
    });
};
</script>

<style scoped lang="scss">
.bots__wrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;

  .bot {
    transition: all 0.6s ease;
    cursor: pointer;
    padding: 0px;
    margin: 0;

    &__background1 {
      width: 100%;
      height: 200px;
      background-color: #faf8fc;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='%23652bc0' fill-opacity='0.43' d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z'%3E%3C/path%3E%3C/svg%3E");
    }

    &__background2 {
      width: 100%;
      height: 200px;
      background-color: #f8f8f9;
      background-image: url("data:image/svg+xml,%3Csvg width='24' height='20' viewBox='0 0 24 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 18c0-1.105.887-2 1.998-2 1.104 0 2-.895 2.002-1.994V14v6h-4v-2zM0 13.998C0 12.895.888 12 2 12c1.105 0 2 .888 2 2 0 1.105.888 2 2 2 1.105 0 2 .888 2 2v2H0v-6.002zm16 4.004A1.994 1.994 0 0 1 14 20c-1.105 0-2-.887-2-1.998v-4.004A1.994 1.994 0 0 0 10 12c-1.105 0-2-.888-2-2 0-1.105-.888-2-2-2-1.105 0-2-.887-2-1.998V1.998A1.994 1.994 0 0 0 2 0a2 2 0 0 0-2 2V0h8v2c0 1.105.888 2 2 2 1.105 0 2 .888 2 2 0 1.105.888 2 2 2 1.105 0 2-.888 2-2 0-1.105.888-2 2-2 1.105 0 2-.888 2-2V0h4v6.002A1.994 1.994 0 0 1 22 8c-1.105 0-2 .888-2 2 0 1.105-.888 2-2 2-1.105 0-2 .887-2 1.998v4.004z' fill='%23511ea2' fill-opacity='0.37' fill-rule='evenodd'/%3E%3C/svg%3E");
    }

    &__text {
      padding: 20px;
    }

    &:hover {
      box-shadow: 0px 10px 23px 0px rgba(103, 96, 124, 0.2);
    }
  }
}
</style>
