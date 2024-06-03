<script setup>
import Box from '../../components/box.vue'
import Popup from "../../components/popup.vue";
import {ref} from "vue";

const forgotPassword = ref(false)
</script>
<template>
  <div class="container">
    <RouterLink to="/"><img src="../../assets/images/Logo.png" alt=""></RouterLink>

    <div class="login">
      <Box>
        <h2>Войдите в аккаунт</h2>
        <button class="continue-google">
          Войти при помощи Google
          <img src="../../assets/images/icons/google.png" alt="">
        </button>
        <div class="choice df">
          <div class="line"></div>
          <p>или</p>
          <div class="line"></div>
        </div>
        <form action="#" class="login__form">
          <div class="login__form-email">
            <label for="email">E-mail</label>
            <input type="text" id="email" placeholder="example@email.com">
            <label for="email" style="color: var(--red)">Аккаунт не найден. Повторите попытку или
              зарегистрируйтесь</label>
          </div>
          <div class="login__form-password">
            <label for="password">Пароль</label>
            <input type="text" id="password" placeholder="******">
          </div>
          <div class="login__form-check">
            <div class="df savepassword">
              <input checked type="checkbox" id="savepassword">
              <label for="savepassword">Запомнить пароль</label>
            </div>
            <a href="#" @click='forgotPassword = true'>Забыли пароль?</a>
          </div>
          <button class="login__form-button">Войти</button>
          <p class="login__form-signup">
            Еще нет аккаунта? <RouterLink to="/register">Зарегистрируйтесь!</RouterLink>
          </p>
        </form>
      </Box>
    </div>
  </div>
  <Popup v-if="forgotPassword" v-model="forgotPassword">
    <p>Введите адрес электронной почты, связанный <br> с вашей учетной записью, и мы вышлем вам <br> ссылку для сброса пароля</p>
    <form action="#" class="restore__form">
      <div class="restore__form-email">
        <label for="restore-email">E-mail</label>
        <input type="text" id="restore-email" placeholder="example@email.com">
      </div>
      <button type="submit" class="restore__form-submit">
        Отправить
      </button>
    </form>
  </Popup>
</template>


<style scoped lang="scss">
.container {
  padding: 30px 35px;
  background: var(--grey-07);
  height: 100vh;

  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

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

        input {
          border-radius: 8px;
          padding: 12px;
          border: 2px solid var(--red);

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