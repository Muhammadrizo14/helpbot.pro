<script setup lang="ts">
import Box from '../../components/box.vue'
import router from "../../router/index";
import {reactive, ref} from "vue";
import {email, helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useAuthStore} from "../../stores/AuthStore";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const store = useAuthStore()


const data = reactive({
  email: '',
  password: '',
  name: '',
  surname: '',
});

const agree = ref()

const customMessages = {
  required: 'Это поле не может быть пустым',
  email: 'Введите правильный адрес электронной почты'
};

const rules = {
  email: {
    required: helpers.withMessage(customMessages.required, required),
    email: helpers.withMessage(customMessages.email, email),
  },
  password: {
    required: helpers.withMessage(customMessages.required, required)
  },
  name: {
    required: helpers.withMessage(customMessages.required, required),
  },
  surname: {
    required: helpers.withMessage(customMessages.required, required),
  }
};

const v$ = useVuelidate(rules, data);



const submit = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }


  // when form is valid
  store.register(data.email, data.password, data.name, data.surname)
      .then((res) => {
        router.push({path: '/auth'})
      })
      .catch(err => {
        toast.add({ severity: 'error', summary: 'Ошибка', detail: `${err.response.status === 409 ? 'Пользователь уже зарегистрирован': ''}`, life: 3000 });
      })
};


</script>

<template>
  <div class="register m-auto">
    <Box>
      <h2 class="pb-5">Зарегистрируйтесь, чтобы начать</h2>
      <form @submit.prevent="submit" class="register__form">

        <div class="flex flex-column gap-2 pb-4" :class="{ error: v$.name.$errors.length }">
          <label for="username">Имя</label>
          <InputText class="custom-input" v-model="data.name" :invalid="v$.name.$errors.length > 0" id="username"
                     aria-describedby="username-help"/>
          <label for="login__form-name" v-for="error in v$.name.$errors" :key="error.$uid"
                 style="color: var(--red)">{{ error.$message }}</label>
        </div>

        <div class="flex flex-column gap-2 pb-4" :class="{ error: v$.surname.$errors.length }">
          <label for="surname">Фамилия</label>
          <InputText class="custom-input" v-model="data.surname" :invalid="v$.surname.$errors.length > 0" id="surname"
                     aria-describedby="surname-help"/>
          <label for="login__form-name" v-for="error in v$.surname.$errors" :key="error.$uid"
                 style="color: var(--red)">{{ error.$message }}</label>
        </div>

        <div class="flex flex-column gap-2 pb-4" :class="{ error: v$.email.$errors.length }">
          <label for="email">E-mail</label>
          <InputText class="custom-input" v-model="data.email" :invalid="v$.email.$errors.length > 0" id="email"
                     placeholder="example@gmail.com" aria-describedby="email-help"/>
          <label for="login__form-email" v-for="error in v$.email.$errors" :key="error.$uid"
                 style="color: var(--red)">{{ error.$message }}</label>
        </div>


        <div class="flex flex-column gap-2 pb-4 w-full" :class="{ error: v$.password.$errors.length }">
          <label for="password">Пароль</label>
          <div class="flex justify-content-start w-full">
            <Password inputClass="custom-input" :invalid="v$.password.$errors.length > 0" :inputStyle="{width: '100%'}"
                      :svgStyle="{ margin: 'auto' }" :feedback="false" toggleMask
                      id="password" class="register-password" v-model="data.password" aria-describedby="password-help"
                      placeholder="*****"/>
          </div>
          <label for="login__form-password" v-for="error in v$.password.$errors" :key="error.$uid"
                 style="color: var(--red)">{{ error.$message }}</label>
        </div>


        <div class="flex flex-column gap-3 pb-4">
          <div class="flex align-items-center">
            <Checkbox v-model="agree" inputId="ingredient1" name="save" :binary="true"/>
            <label for="ingredient1" class="ml-2">Согласен(-на) на рассылку рекламных материалов</label>
          </div>
          <p class="register__form-check-personal">
            Нажимая “Зарегистрироваться”, вы соглашаетесь на <br>
            обработку ваших <a href="#" class="link">Персональных данных</a>
          </p>
        </div>


        <Button type="submit" severity="submit" class="flex justify-content-center w-full p-3 mb-4">
          <p>Зарегистрироваться</p>
        </Button>


        <p class="register__form-signup text-center">
          <RouterLink to="/auth">Уже есть аккаунт?</RouterLink>
        </p>
      </form>
    </Box>
  </div>
</template>


<style scoped lang="scss">

.register {
  width: 550px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  max-height: 100%;
  overflow: auto;
  scrollbar-width: none;

  .register-password {
    width: 100%;

    * {
      margin: revert-layer;
    }
  }
}
</style>
