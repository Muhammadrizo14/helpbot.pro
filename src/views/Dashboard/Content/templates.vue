<template>
  <div>
    <h1>Шаблоны</h1>
    <p class="pt-3 pb-5" style="color: var(--grey-02)">Задайте шаблоны сообщений для различных сценарий работы бота</p>

    <form class="flex flex-column gap-3 w-5">
      <div class="flex flex-column gap-2">
        <label for="welcomeMessage">Приветственное сообщение</label>
        <Textarea id="welcomeMessage" placeholder="Разместите контент здесь" rows="3" :autoResize="false"
                  v-model="data.welcomeMessage"
                  :invalid="v$.welcomeMessage.$errors.length > 0"/>
        <label for="login__form-email" v-for="error in v$.welcomeMessage.$errors" :key="error.$uid"
               style="color: var(--red)">{{ error.$message }}</label>
      </div>
      <div class="flex flex-column gap-2">
        <label for="operator">Перевод на оператора</label>
        <Textarea id="operator" placeholder="Сообщение" rows="3"  :autoResize="false"
                  v-model="data.operator"
                  :invalid="v$.operator.$errors.length > 0"/>
        <label for="login__form-email" v-for="error in v$.operator.$errors" :key="error.$uid"
               style="color: var(--red)">{{ error.$message }}</label>
      </div>
      <div class="flex flex-column gap-2">
        <label for="message">Сбор обратной связи по работе</label>
        <Textarea id="message" placeholder="Сообщение" rows="3"  :autoResize="false"
                  v-model="data.message"
                  :invalid="v$.message.$errors.length > 0"/>
        <label for="login__form-email" v-for="error in v$.message.$errors" :key="error.$uid"
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

const data = reactive({
  welcomeMessage: 'Здравствуйте, чем вам помочь?',
  operator: 'Хорошо, передал ваше обращение в работу — скоро вернёмся с ответом.',
  message: '',
});


const customMessages = {
  required: 'Это поле не может быть пустым',
};

const rules = reactive({
  welcomeMessage: {
    required: helpers.withMessage(customMessages.required, required)
  },
  operator: {
    required: helpers.withMessage(customMessages.required, required)
  },
  message: {
    required: helpers.withMessage(customMessages.required, required)
  }
});

const v$ = useVuelidate(rules, data);


</script>

<style scoped lang="scss">

</style>