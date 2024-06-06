<script setup lang="ts">
import Box from '../../components/box.vue'
import router from "../../router/index";
import BaseInput from '../../components/base-input.vue'
import {reactive} from "vue";
import {email, helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

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
    // when form is invalid
    return;
  }
  // when form is valid
  console.log(data.email);
  console.log(data.password);
  router.push({ path: 'create' })
};
</script>

<template>
  <div class="container">
    <RouterLink to="/"><img src="../../assets/images/Logo.png" alt=""></RouterLink>

    <div class="register">
      <Box>
        <h2>Зарегистрируйтесь, чтобы начать</h2>
        <form @submit.prevent="submit" class="register__form">
          <div class="register__form-email"  :class="{ error: v$.email.$errors.length }">
            <BaseInput v-model="data.email"  :invalid="v$.email.$errors.length > 0" id="register__form-email" type="text" label="E-mail" placeholder="example@gmail.com"/>
            <label for="login__form-email" v-for="error in v$.email.$errors" :key="error.$uid" style="color: var(--red)">{{ error.$message }}</label>
          </div>
          <div class="register__form-password"  :class="{ error: v$.password.$errors.length }">
            <BaseInput v-model="data.password"  :invalid="v$.password.$errors.length > 0" id="register__form-password" type="password" label="Пароль" placeholder="******"/>
            <label for="login__form-password" v-for="error in v$.password.$errors" :key="error.$uid" style="color: var(--red)">{{ error.$message }}</label>
          </div>
          <div class="register__form-check">
            <div class="df register__form-check-agreement">
              <input type="checkbox" id="agreement">
              <label for="agreement">Согласен(-на) на рассылку рекламных материалов</label>
            </div>
            <p class="register__form-check-personal">
              Нажимая “Зарегистрироваться”, вы соглашаетесь на <br>
              обработку ваших <a href="#">Персональных данных</a>
            </p>
          </div>
          <button class="register__form-submit" type="submit">Зарегистрироваться</button>
          <p class="register__form-signup">
           <RouterLink to="/">Уже есть аккаунт?</RouterLink>
          </p>
        </form>
      </Box>
    </div>
  </div>
</template>


<style scoped lang="scss">
.container {
  padding: 30px 35px;
  background: var(--grey-07);
  height: 100vh;

  .register {
    width: 550px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

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

      p {
        color: var(--grey-02);
      }

      .line {
        width: 100%;
        height: 1px;
        background: var(--grey-06);
      }
    }

    &__form {
      &-email {
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
        flex-direction: column;
        gap: 40px;
        padding-bottom: 40px;

        &-agreement {
          gap: 8px;

          label {
            color: var(--grey-02);
          }
        }
        &-personal {
          color: var(--grey-02);
          a {
            font-size: inherit;
          }
        }
      }

      &-submit {
        background: var(--primary-01);
        color: var(--grey-09);
        border: 0;
        cursor: pointer;
        bottom: 40px;
        width: 100%;
        padding: 16px 0;
        border-radius: 8px;
        margin-bottom: 40px;

      }

      &-signup {
        text-align: center;

        a {
          text-decoration: none;
          font-size: 18px;
          color: var(--primary-01);

          &:hover {
            color: var(--primary-02);
          }
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