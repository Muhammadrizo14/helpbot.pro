<template>
  <div class="container">
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
            <Button @click.prevent="changePassword()" type="submit" label="Изменить"/>
            <Button label="Отменить"/>
          </div>
        </form>
      </Box>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {email, helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useAuthStore} from "@/stores/AuthStore.ts";


const store = useAuthStore()

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


const changePassword = ()=> {
  store.changePassword(data.cur, data.new)
}
</script>

<style lang="scss" scoped>
.container {
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