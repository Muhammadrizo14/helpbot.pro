<template>
  <div>
    <h1>Настройки пользователя</h1>
    <div class="pt-6 user-data">
      <p class="label">Электронная почта</p>
      <div class="current">
        <p>ex@email.com</p>
      </div>
      <button class="changer" @click="emailDialog = true">Изменить почту</button>
    </div>

    <div class="pt-6 user-data">
      <p class="label">Пароль</p>
      <button class="changer">Изменить пароль</button>
    </div>


    <Dialog v-model:visible="emailDialog" modal :closable="false">
      <template #header>
        <div class="pb-3">
          <h2 class="pb-2">Ответить на вопрос</h2>
        </div>
      </template>
      <img
          src="@/assets/images/icons/close.png"
          alt="Close"
          class="close-icon"
          @click="emailDialog = false"
      />

      <div class="flex flex-column gap-2 pb-4">
        <label for="current" class="database-add__label">Текущая электронная почта</label>
        <InputText
            id="current"
            placeholder="URL источника данных"
            v-model="data.current"
            :invalid="v$.current.$errors.length > 0"
        />
        <label
            for="login__form-title"
            v-for="error in v$.current.$errors"
            :key="error.$uid"
            style="color: var(--red)"
        >{{ error.$message }}</label
        >
      </div>


    </Dialog>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";



const emailDialog = ref(false);

const data = reactive({
  current: 'example@email.com',
  new: '',
});


const customMessages = {
  required: 'Это поле не может быть пустым',
};

const rules = reactive({
  current: {
    required: helpers.withMessage(customMessages.required, required)
  },
  new: {
    required: helpers.withMessage(customMessages.required, required)
  },
});

const v$ = useVuelidate(rules, data);


</script>

<style lang="scss" scoped>
.user-data {
  .label {
    font-size: 16px;
    font-weight: 400;
    color: var(--grey-02);
    margin-bottom: 10px;
  }
  .current {
    padding: 14px 24px;
    border-radius: 8px;
    background-color: var(--grey-09);
    width: 360px;
  }
  .changer {
    border: 0;
    background: none;
    text-decoration: underline;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
