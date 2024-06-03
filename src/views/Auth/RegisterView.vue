<script setup>
import Box from '../../components/box.vue'
import router from "../../router";
</script>

<template>
  <div class="container">
    <RouterLink to="/"><img src="../../assets/images/Logo.png" alt=""></RouterLink>

    <div class="login">
      <Box>
        <h2>Зарегистрируйтесь, чтобы начать</h2>
        <button class="continue-google">
          Зарегистрироваться при помощи Google
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
          </div>
          <div class="login__form-password">
            <label for="password">Пароль</label>
            <input type="text" id="password" placeholder="******">
          </div>
          <div class="login__form-check">
            <div class="df login__form-check-agreement">
              <input type="checkbox" id="agreement">
              <label for="agreement">Согласен(-на) на рассылку рекламных материалов</label>
            </div>
            <p class="login__form-check-personal">
              Нажимая “Зарегистрироваться”, вы соглашаетесь на <br>
              обработку ваших <a href="#">Персональных данных</a>
            </p>
          </div>


          <button class="login__form-submit" v-on:click.prevent="validate" @click="router.push({ path: 'create' })" type="submit">Зарегистрироваться</button>
          <p class="login__form-signup">
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