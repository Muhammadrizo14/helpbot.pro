<template>
  <div class="wrapper">
    <RouterLink to="/"><img class="logo" src="@/assets/images/Logo.png" alt=""></RouterLink>
    <div class="create">
      <Box>
        <h2>Изменить пароль</h2>
        <form class="create__form pt-5 flex flex-column gap-5">
          <div class="flex flex-column gap-2 w-full">
            <label for="cur">Введите текущий пароль</label>
            <div class="flex justify-content-start w-full">
              <Password v-model="data.cur" inputClass="custom-input" :inputStyle="{width: '100%'}" :svgStyle="{ margin: 'auto' }"
              :feedback="false" toggleMask
              :invalid="v$.cur.$errors.length > 0" id="cur" class="login-password"
              aria-describedby="password-help" placeholder="*****"/>
            </div>
            <label for="login__form-password" v-for="error in v$.new.$errors" :key="error.$uid"
            style="color: var(--red)">{{ error.$message }}</label>
          </div>
          <div class="flex flex-column gap-2 w-full">
            <label for="new">Укажите новый пароль</label>
            <div class="flex justify-content-start w-full">
              <Password v-model="data.new" inputClass="custom-input" :inputStyle="{width: '100%'}" :svgStyle="{ margin: 'auto' }"
              :feedback="false" toggleMask
              :invalid="v$.new.$errors.length > 0" id="new" class="login-password"
              aria-describedby="password-help" placeholder="*****"/>
            </div>
            <label for="login__form-password" v-for="error in v$.new.$errors" :key="error.$uid"
            style="color: var(--red)">{{ error.$message }}</label>
          </div>

          <div class="flex justify-content-center gap-3">
            <Button @click.prevent="handlePasswordChange()" type="submit" label="Изменить"/>
            <Button label="Отменить"/>
          </div>
        </form>
      </Box>
    </div>
    <Toast/>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from "vue";
  import { email, helpers, required } from "@vuelidate/validators";
  import { useVuelidate } from "@vuelidate/core";
  import { useAuthStore } from "@/stores/AuthStore.ts";
  import { useRouter } from "vue-router"; 
  import { useToast } from "primevue/usetoast";
  import Toast from 'primevue/toast';

  const store = useAuthStore();
  const router = useRouter(); 
  const toast = useToast();

  const data = reactive({
    cur: '',
    new: ''
  });

  const customMessages = {
    required: 'Это поле не может быть пустым',
  };

  const rules = {
    cur: {
      required: helpers.withMessage(customMessages.required, required),
    },
    new: {
      required: helpers.withMessage(customMessages.required, required)
    }
  };

  const v$ = useVuelidate(rules, data);

  const handlePasswordChange = () => {
    store.changePassword(data.cur, data.new)
    .then((res) => {
      if (res && res.status === 200) {
        toast.add({
          severity: "success",
          summary: "Пароль успешно изменен",
          detail: "Ваш пароль был обновлен.",
          life: 3000,
        });
        
        router.push('/');
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        console.log(error);
        toast.add({
          severity: "error",
          summary: "Ошибка аутентификации",
          detail: "Старый пароль введен неверно.",
          life: 3000,
        });
      } else if (error.response && error.response.status === 400) {
        toast.add({
          severity: "error",
          summary: "Неверный пароль",
          detail: "Новый пароль не соответствует требованиям.",
          life: 3000,
        });
      } else {
        toast.add({
          severity: "error",
          summary: "Не удалось изменить пароль",
          detail: "Произошла ошибка. Попробуйте еще раз позже.",
          life: 3000,
        });
      }
      console.error("Запрос на изменение пароля завершился с ошибкой:", error);
    });
  };

</script>


<style lang="scss" scoped>
  .wrapper {
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
    .login-password {
      width: 100%;


      * {
        margin: revert-layer;
      }
    }
  }
</style>