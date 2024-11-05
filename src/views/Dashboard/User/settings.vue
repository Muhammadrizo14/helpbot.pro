<template>
  <div>
    <h1>Настройки пользователя</h1>
    <div class="pt-6 user-data">
      <p class="label">Электронная почта</p>
      <div class="current">
        <p>{{auth.user?.email}}</p>
      </div>
      <button class="changer" @click="emailDialog = true">
        Изменить почту
      </button>
    </div>

    <div class="pt-6 user-data">
      <p class="label">Пароль</p>
      <router-link to="/user-password" class="changer">Изменить пароль</router-link>
    </div>

    <Dialog
      v-model:visible="emailDialog"
      modal
      dismissableMask
      :draggable="false"
    >
      <template #header>
        <div class="pb-3">
          <h2 class="pb-2">Изменить электронную почту</h2>
        </div>
      </template>


      <form>
        <div class="flex flex-column gap-2 pb-4">
          <label for="old_email" class="database-add__label"
          >Текущая электронная почта</label
          >
          <InputText
              id="current"
              placeholder="example@email.com"
              v-model="data.old_email"
              :invalid="v$.old_email.$errors.length > 0"
          />
          <label
              for="login__form-title"
              v-for="error in v$.old_email.$errors"
              :key="error.$uid"
              style="color: var(--red)"
          >{{ error.$message }}</label
          >
        </div>
        <div class="flex flex-column gap-2 pb-4">
          <label for="new_email" class="database-add__label">
            Новый адрес электронной почты
          </label>
          <InputText
              id="current"
              placeholder="example@email.com"
              v-model="data.new_email"
              :invalid="v$.new_email.$errors.length > 0"
          />
          <label
              for="login__form-title"
              v-for="error in v$.new_email.$errors"
              :key="error.$uid"
              style="color: var(--red)"
          >{{ error.$message }}
          </label>
        </div>
        <p class="agreement">
          Нажимая “Изменить”, вы соглашаетесь на обработку <br />
          ваших <a href="#">Персональных данных</a>
        </p>
        <div class="flex justify-content-center gap-3 pt-4">
          <Button  @click.prevent="changeemail" type="submit">Изменить</Button>
          <Button @click="emailDialog = false"  severity="light">Отменить</Button>
        </div>
      </form>
    </Dialog>
    <Toast />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {useAuthStore} from "../../../stores/AuthStore";
import {useToast} from "primevue/usetoast";


const auth = useAuthStore()
const toast = useToast();

const emailDialog = ref(false);

const data = reactive({
  old_email: "",
  new_email: "",
});

const customMessages = {
  required: "Это поле не может быть пустым",
};

const changeemail = ()=> {
  auth.changeEmail(data.old_email, data.new_email)
    .then(()=> {
      toast.add({ severity: 'success', summary: 'Почта изменена успешно.', life: 3000 });
    })
}

const rules = reactive({
  old_email: {
    required: helpers.withMessage(customMessages.required, required),
  },
  new_email: {
    required: helpers.withMessage(customMessages.required, required),
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
    padding: 0;
    color: var(--grey-01);
  }

  .agreement {
    color: var(--grey-02);

    a {
      color: var(--grey-01);
    }
  }
}
</style>
