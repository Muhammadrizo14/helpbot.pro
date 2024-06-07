<script setup lang="ts">
import {reactive, ref} from 'vue';
import {useVuelidate} from '@vuelidate/core';
import {required, email, helpers} from '@vuelidate/validators';
import Box from '../../components/box.vue';
import Popup from '../../components/popup.vue';
import BaseInput from '../../components/base-input.vue';
import axios from "axios";
import {useAuthStore} from "../../stores/AuthStore";
import router from "../../router/index";

const store = useAuthStore()

const forgotPassword = ref(false);

const data = reactive({
  email: '',
  password: ''
});

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
  }
};

const v$ = useVuelidate(rules, data);

const submit = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    console.log('Form validation failed');
    return;
  }

  store.login(data.email, data.password)
      .then((res) => {
        store.addToken(res.data)
        router.push({path: '/create'})
      })
      .catch(err => console.log(err));
};


const submitForgotPassword = async () => {
  console.log('Verify email for forgot password');
};
</script>


<template>

  <div class="login">
    <Box>
      <h2>Войдите в аккаунт</h2>
      <form @submit.prevent="submit" class="login__form">
        <div class="login__form-email" :class="{ error: v$.email.$errors.length }">
          <BaseInput id="login__form-email" v-model="data.email" type="text" :invalid="v$.email.$errors.length > 0"
                     label="E-mail" placeholder="example@gmail.com"/>
          <label for="login__form-email" v-for="error in v$.email.$errors" :key="error.$uid"
                 style="color: var(--red)">{{ error.$message }}</label>
        </div>
        <div class="login__form-password" :class="{ error: v$.password.$errors.length }">
          <BaseInput id="login__form-password" v-model="data.password" type="password"
                     :invalid="v$.password.$errors.length > 0" label="Пароль" placeholder="******"/>
          <label for="login__form-password" v-for="error in v$.password.$errors" :key="error.$uid"
                 style="color: var(--red)">{{ error.$message }}</label>
        </div>
        <div class="login__form-check">
          <div class="df savepassword">
            <input type="checkbox" id="savepassword"/>
            <label for="savepassword">Запомнить пароль</label>
          </div>
          <a href="#" @click.prevent="forgotPassword = true">Забыли пароль?</a>
        </div>
        <button type="submit" class="login__form-button">Войти</button>
        <p class="login__form-signup">
          Еще нет аккаунта?
          <RouterLink to="/auth/register">Зарегистрируйтесь!</RouterLink>
        </p>
      </form>
    </Box>
  </div>
  <Popup v-if="forgotPassword" v-model="forgotPassword">
    <p>Введите адрес электронной почты, связанный <br> с вашей учетной записью, и мы вышлем вам <br> ссылку для сброса
      пароля</p>
    <form @submit.prevent="submitForgotPassword" class="restore__form">
      <div class="restore__form-email">
        <BaseInput id="restore__form-email" type="text" label="E-mail" placeholder="example@gmail.com"/>
      </div>
      <button type="submit" class="restore__form-submit">Отправить</button>
    </form>
  </Popup>
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

    @media (max-width: 1000px) {
      width: 80%;
    }

    h2 {
      padding-bottom: 40px;
    }

    .continue-google {
      background: var(--primary-04);
      border: 0;
      display: flex;
      align-items: center;
      padding: 16px 0;
      border-radius: 8px;
      width: 100%;
      justify-content: center;
      color: var(--primary-01);
      gap: 12px;
      margin-bottom: 40px;
      cursor: pointer;
    }

    .choice {
      gap: 20px;
      padding-bottom: 40px;

      span {
        color: var(--grey-02);
      }

      .line {
        width: 100%;
        height: 1px;
        background: var(--grey-06);
      }
    }

    .login__form {
      &-email {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-bottom: 24px;
      }

      &-password {
        display: flex;
        flex-direction: column;
        gap: 8px;

        input {
          border-radius: 8px;
          padding: 12px;
          border: 2px solid var(--grey-04);

          &::placeholder {
            color: var(--grey-04);
            font-size: 18px;
          }

          &:active {
            border: 2px solid var(--grey-02);
          }
        }

        padding-bottom: 24px;
      }

      &-check {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 40px;

        .savepassword {
          gap: 8px;

          label {
            color: var(--grey-02);
          }
        }
      }

      &-button {
        background: var(--primary-01);
        color: var(--grey-09);
        border: 0;
        cursor: pointer;
        bottom: 40px;
        width: 100%;
        padding: 16px 0;
        border-radius: 8px;
        margin-bottom: 40px;

        &:hover {
          background: var(--primary-02);
        }

        &:active {
          background: var(--primary-03);
        }

        &:disabled {
          background: var(--grey-06);
          color: var(--grey-03);
          cursor: auto;
        }
      }

      &-signup {
        text-align: center;

        a {
          text-decoration: none;
          font-size: inherit;
          color: var(--primary-01);

          &:hover {
            color: var(--primary-02);
          }
        }
      }
  }
}

.restore__form {
  &-email {
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;

    input {
      border-radius: 8px;
      padding: 12px;
      border: 2px solid var(--grey-04);

      &::placeholder {
        color: var(--grey-04);
        font-size: 18px;
      }

      &:active {
        border: 2px solid var(--grey-02);
      }
    }
  }

  &-submit {
    background: var(--primary-01);
    border: 0;
    padding: 16px 0;
    border-radius: 8px;
    width: 100%;
    color: var(--grey-09);
    cursor: pointer;
  }
}
</style>