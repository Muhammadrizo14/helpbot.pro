<template>
  <div>
    <h1>Шаблоны</h1>
    <p class="pt-3 pb-5" style="color: var(--grey-02)">
      Задайте шаблоны сообщений для различных сценарий работы бота
    </p>

    <Accordion :activeIndex="0" class="max-w-[750px] custom__accordion">
      <AccordionTab header="Общие фразы">
        <form @submit.prevent="sendTemplate" class="flex flex-column gap-3 pt-3  w-[70%]">
          <div class="flex flex-column gap-2">
            <label for="welcomeMessage">Приветственное сообщение</label>
            <Textarea
                id="welcomeMessage"
                placeholder="Разместите контент здесь"
                rows="3"
                :autoResize="false"
                v-model="data.welcome_message"
                :invalid="v$.welcome_message.$errors.length > 0"
            />
            <label
                for="login__form-email"
                v-for="error in v$.welcome_message.$errors"
                :key="error.$uid"
                style="color: var(--red)"
            >{{ error.$message }}</label
            >
          </div>
          <div class="flex flex-column gap-2">
            <label for="operator">Перевод на оператора</label>
            <Textarea
                id="operator"
                placeholder="Сообщение"
                rows="3"
                :autoResize="false"
                v-model="data.operator_switch_message"
                :invalid="v$.operator_switch_message.$errors.length > 0"
            />
            <label
                for="login__form-email"
                v-for="error in v$.operator_switch_message.$errors"
                :key="error.$uid"
                style="color: var(--red)"
            >{{ error.$message }}</label
            >
          </div>
          <div class="flex flex-column gap-2">
            <label for="message">Сбор обратной связи по работе</label>
            <Textarea
                id="message"
                placeholder="Сообщение"
                rows="3"
                :autoResize="false"
                v-model="data.feedback_message"
                :invalid="v$.feedback_message.$errors.length > 0"
            />
            <label
                for="login__form-email"
                v-for="error in v$.feedback_message.$errors"
                :key="error.$uid"
                style="color: var(--red)"
            >{{ error.$message }}</label
            >
          </div>

        </form>

      </AccordionTab>
      <AccordionTab header="Ограничение доступа" :disabled="true">
        <form @submit.prevent="sendTemplate" class="flex flex-column gap-3  pt-3 w-[70%]">
          <div class="flex flex-column gap-2">
            <label for="welcomeMessage">Сообщение, если пользователю выдали доступ</label>
            <Textarea
                id="welcomeMessage"
                placeholder="Разместите контент здесь"
                rows="3"
                :autoResize="false"
                v-model="data.welcome_message"
                :invalid="v$.welcome_message.$errors.length > 0"
            />
            <label
                for="login__form-email"
                v-for="error in v$.welcome_message.$errors"
                :key="error.$uid"
                style="color: var(--red)"
            >{{ error.$message }}</label
            >
          </div>
          <div class="flex flex-column gap-2">
            <label for="operator">Сообщение, если пользователю запрещен доступ</label>
            <Textarea
                id="operator"
                placeholder="Сообщение"
                rows="3"
                :autoResize="false"
                v-model="data.operator_switch_message"
                :invalid="v$.operator_switch_message.$errors.length > 0"
            />
            <label
                for="login__form-email"
                v-for="error in v$.operator_switch_message.$errors"
                :key="error.$uid"
                style="color: var(--red)"
            >{{ error.$message }}</label
            >
          </div>
          <div class="flex flex-column gap-2">
            <label for="message">Сообщение, если пользователю ограничили доступ</label>
            <Textarea
                id="message"
                placeholder="Сообщение"
                rows="3"
                :autoResize="false"
                v-model="data.feedback_message"
                :invalid="v$.feedback_message.$errors.length > 0"
            />
            <label
                for="login__form-email"
                v-for="error in v$.feedback_message.$errors"
                :key="error.$uid"
                style="color: var(--red)"
            >{{ error.$message }}</label
            >
          </div>

        </form>

      </AccordionTab>
    </Accordion>
    <Button class="w-fit px-3 py-2" type="submit">Сохранить</Button>

  </div>
</template>

<script setup>
import {reactive} from "vue";
import {helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useBotStore} from "../../../stores/BotStore";
import {useToast} from "primevue/usetoast";

const toast = useToast();

const store = useBotStore();

const data = reactive({
  welcome_message: store.selectedBot.welcome_message,
  operator_switch_message: store.selectedBot.operator_switch_message,
  feedback_message: store.selectedBot.feedback_message,
});

const customMessages = {
  required: "Это поле не может быть пустым",
};

const rules = reactive({
  welcome_message: {
    required: helpers.withMessage(customMessages.required, required),
  },
  operator_switch_message: {
    required: helpers.withMessage(customMessages.required, required),
  },
  feedback_message: {
    required: helpers.withMessage(customMessages.required, required),
  },
});

const v$ = useVuelidate(rules, data);

const sendTemplate = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    console.log("Form validation failed");
    return;
  }

  const newData = {
    name: store.selectedBot.name,
    ...data,
  };

  store
      .editBot(newData)
      .then(() => {
        toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Шаблон успешно сохранено",
          life: 3000,
        });
      })
      .catch(() => {
        toast.add({
          severity: "error",
          summary: "Ошибка",
          life: 3000,
        });
      });
};
</script>

<style scoped lang="scss"></style>
