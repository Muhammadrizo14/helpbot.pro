<script setup>
import Box from '../components/Box/box.vue'
</script>

<template>
  <div class="container">
      <img src="../assets/images/Logo.png" alt="">
    <div class="login">
      <Box>
        <h2>Войдите в аккаунт</h2>
        <button class="continue-google">
          Войти при помощи Google
          <img src="../assets/images/icons/google.png" alt="">
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
            <label for="email" style="color: var(--red)">Аккаунт не найден. Повторите попытку или зарегистрируйтесь</label>
          </div>
          <div class="login__form-password">
            <label for="password">Password</label>
            <input type="text" id="password" placeholder="******">
          </div>
          <div class="login__form-check">
            <div class="df savepassword">
              <input checked type="checkbox" id="savepassword">
              <label for="savepassword">Запомнить пароль</label>
            </div>
            <a href="#">Забыли пароль?</a>
          </div>
          <button class="login__form-button">Войти</button>
          <p class="login__form-signup">
            Еще нет аккаунта? <a href="#">Зарегистрируйтесь!</a>
          </p>
        </form>
      </Box>
    </div>
  </div>
</template>


<style scoped lang="scss">
.container {
  padding: 30px 35px;
  background: rgba(246, 246, 249, 1);
  height: calc(100vh - 60px);
  .login {
    width: 550px;
    max-height: 704px;
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
      gap: 12px ;
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
        padding-bottom:   40px;
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
</style>