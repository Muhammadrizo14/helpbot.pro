<template>
  <div>
    <h1>Шаблоны</h1>
    <p class="pt-3 pb-5" style="color: var(--grey-02)">Задайте шаблоны сообщений для различных сценарий работы бота</p>

    <form @submit.prevent="sendTemplate" class="flex flex-column gap-3 w-5">
      <div class="flex flex-column gap-2">
        <label for="welcomeMessage">Приветственное сообщение</label>
        <Textarea id="welcomeMessage" placeholder="Разместите контент здесь" rows="3" :autoResize="false"
                  v-model="data.welcome_message"
                  :invalid="v$.welcome_message.$errors.length > 0"/>
        <label for="login__form-email" v-for="error in v$.welcome_message.$errors" :key="error.$uid"
               style="color: var(--red)">{{ error.$message }}</label>
      </div>
      <div class="flex flex-column gap-2">
        <label for="operator">Перевод на оператора</label>
        <Textarea id="operator" placeholder="Сообщение" rows="3"  :autoResize="false"
                  v-model="data.operator_switch_message"
                  :invalid="v$.operator_switch_message.$errors.length > 0"/>
        <label for="login__form-email" v-for="error in v$.operator_switch_message.$errors" :key="error.$uid"
               style="color: var(--red)">{{ error.$message }}</label>
      </div>
      <div class="flex flex-column gap-2">
        <label for="message">Сбор обратной связи по работе</label>
        <Textarea id="message" placeholder="Сообщение" rows="3"  :autoResize="false"
                  v-model="data.feedback_message"
                  :invalid="v$.feedback_message.$errors.length > 0"/>
        <label for="login__form-email" v-for="error in v$.feedback_message.$errors" :key="error.$uid"
               style="color: var(--red)">{{ error.$message }}</label>
      </div>

      <Button class="w-fit px-3 py-2" type="submit">Сохранить</Button>
    </form>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useBotStore} from "../../../stores/BotStore";
import { useToast } from "primevue/usetoast";
const toast = useToast();


const store = useBotStore()

const data = reactive({
  welcome_message: 'Здравствуйте, чем вам помочь?',
  operator_switch_message: 'Хорошо, передал ваше обращение в работу — скоро вернёмся с ответом.',
  feedback_message: '',
});


const customMessages = {
  required: 'Это поле не может быть пустым',
};

const rules = reactive({
  welcome_message: {
    required: helpers.withMessage(customMessages.required, required)
  },
  operator_switch_message: {
    required: helpers.withMessage(customMessages.required, required)
  },
  feedback_message: {
    required: helpers.withMessage(customMessages.required, required)
  }
});

const v$ = useVuelidate(rules, data);



const sendTemplate = async ()=> {
  const result = await v$.value.$validate();
  if (!result) {
    console.log("Form validation failed");
    return;
  }

  const newData = {
    name: store.selectedBot.name,
    ...data
  }

  store.editBot(newData)
    .then(()=> {
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Шаблон успешно сохранено', life: 3000 });
    })

}


</script>

<style scoped lang="scss">

</style>