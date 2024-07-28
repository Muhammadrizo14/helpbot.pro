<template>
  <div class="container">
    <RouterLink to="/"
      ><img class="logo" src="../assets/images/Logo.png" alt=""
    /></RouterLink>
    <div class="create">
      <Box>
        <h2>Создайте вашего первого бота {{ store.user?.first_name }}</h2>
        <form
          class="create__form pt-5 flex flex-column gap-5"
          @submit.prevent="createBot()"
        >
          <div class="create__form-title">
            <label for="create__form-title">Название бота</label>
            <InputText
              v-model="data.title"
              :invalid="v$.title.$errors.length > 0"
              :style="{ width: '100%', 'margin-top': '10px' }"
              id="create__form-title"
              type="text"
              placeholder="Мой_первый_бот"
            />
            <label
              for="create__form-title"
              v-for="error in v$.title.$errors"
              :key="error.$uid"
              style="color: var(--red)"
              >{{ error.$message }}</label
            >
          </div>
          <Button type="submit" class="create__form-submit" label="Создать" />
        </form>
      </Box>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBotStore } from "@/stores/BotStore";
import Box from "../components/box.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { reactive } from "vue";
import { helpers, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import router from "../router/index";

const store = useAuthStore();
const bot = useBotStore();

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
  bot.createBot(data.title)
  .then(()=> {
    router.push({path: '/'})
  })
};
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
