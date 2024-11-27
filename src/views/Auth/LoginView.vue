<script setup lang="ts">
import {reactive, ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {required, email, helpers} from "@vuelidate/validators";
import Box from "../../components/box.vue";
import {useAuthStore} from "../../stores/AuthStore";
import router from "../../router/index";
import {useBotStore} from "../../stores/BotStore";
import {useToast} from "primevue/usetoast";

const store = useAuthStore();
const toast = useToast();

const botStore = useBotStore();

const restore = ref<boolean>(false);
const remember = ref<boolean>(false);

const data = reactive({
  email: "",
  password: "",
});

const customMessages = {
  required: "Это поле не может быть пустым",
  email: "Введите правильный адрес электронной почты",
};

const rules = {
  email: {
    required: helpers.withMessage(customMessages.required, required),
    email: helpers.withMessage(customMessages.email, email),
  },
  password: {
    required: helpers.withMessage(customMessages.required, required),
  },
};

const v$ = useVuelidate(rules, data);

const submit = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }

  store
      .login(data.email, data.password)
      .then((res) => {
        store.addToken(res.data);
        store.getUser();
        botStore.getAllBots()
          .then(res => {
            if (res.length) {
              router.push({path: '/'})
            }
          })
          .catch(err => {
            router.push({path: '/create'})
          })
      })
      .catch((err) => {
        console.log(err)
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: `${err.response.status === 401 && 'Пользователь не найден'}`,
          life: 3000
        });
      });
};

const reset = async () => {
  store.resetPassword(data.email)
      .then(() => {
        restore.value = false
        toast.add({severity: 'success', summary: 'Проверьте почту.', life: 3000});
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.add({severity: 'error', summary: 'Пользователь с таким адресом не найдено', life: 3000});
        }
      })
};

store.checkUserBotInvitation()

</script>

<template>
  <div class="login m-auto">
    <Box>
      <h2 class="pb-5">Войдите в аккаунт</h2>
      <form @submit.prevent="submit" class="flex flex-column gap-4">
        <div class="flex flex-column gap-2">
          <label for="email">Email</label>
          <InputText
              class="custom-input"
              v-model="data.email"
              :invalid="v$.email.$errors.length > 0"
              id="email"
              placeholder="example@gmail.com"
              aria-describedby="username-help"
          />
          <label
              for="login__form-email"
              v-for="error in v$.email.$errors"
              :key="error.$uid"
              style="color: var(--red)"
          >{{ error.$message }}</label
          >
        </div>
        <div class="flex flex-column gap-2 w-full">
          <label for="password">Пароль</label>
          <div class="flex justify-content-start w-full">
            <Password
                v-model="data.password"
                inputClass="custom-input"
                :inputStyle="{ width: '100%' }"
                :svgStyle="{ margin: 'auto' }"
                :feedback="false"
                toggleMask
                :invalid="v$.password.$errors.length > 0"
                id="password"
                class="login-password"
                aria-describedby="password-help"
                placeholder="*****"
            />
          </div>
          <label
              for="login__form-password"
              v-for="error in v$.password.$errors"
              :key="error.$uid"
              style="color: var(--red)"
          >{{ error.$message }}</label
          >
        </div>

        <div class="flex justify-content-between">
          <div class="flex align-items-center">
            <Checkbox
                v-model="remember"
                inputId="ingredient1"
                name="save"
                :binary="true"
            />
            <label for="ingredient1" class="ml-2">Запомнить пароль</label>
          </div>
          <RouterLink to="#" @click="restore = true" class="link">
            Забыли пароль?
          </RouterLink>
        </div>

        <Button
            class="flex justify-content-center w-full p-3"
            severity="submit"
            type="submit"
            label="Войти"
        />
      </form>

      <p class="pt-4 text-center">
        Еще нет аккаунта?
        <RouterLink class="nonunderlined" to="auth/register">
          Зарегистрируйтесь!
        </RouterLink>
      </p>
    </Box>

    <Dialog
        v-model:visible="restore"
        dismissableMask
        :closable="false"
        modal
        :draggable="false"
        :style="{ width: '550px' }"
    >
      <img
          src="../../assets/images/icons/close.png"
          alt="Close"
          class="close-icon"
          @click="restore = false"
      />
      <p class="block mb-5">
        Введите адрес электронной почты, связанный <br/>
        с вашей учетной записью, и мы вышлем вам <br/>
        ссылку для сброса пароля <br/>
      </p>
      <form>
        <div class="flex flex-column align-items-start gap-2 mb-3">
          <label for="username">Email</label>
          <InputText
              v-model="data.email"
              :invalid="v$.email.$errors.length > 0"
              class="w-full custom-input"
              id="username"
              aria-describedby="username-help"
              placeholder="example@gmail.com"
          />
        </div>

        <Button
            class="w-full"
            type="submit"
            severity="submit"
            label="Отправить"
            @click.prevent="reset"
        />
      </form>
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 550px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  max-height: 100%;
  overflow: auto;

  .login-password {
    width: 100%;

    * {
      margin: revert-layer;
    }
  }
}

.close-icon {
  width: 14px;
  height: 14px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
