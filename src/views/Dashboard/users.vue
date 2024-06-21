<template>
  <div class="users">
    <div class="users-header flex justify-content-between align-items-center pb-3">
      <h1>Пользователи</h1>
      <Button @click="inviteUser = true">Пригласить</Button>
    </div>
    <DataTable :value="products" :tableClass="'users-data'" class="users-table">
      <template #empty>
        asdfasd
      </template>
      <Column field="name" header="Имя">

      </Column>
      <Column field="email" header="E-mail"></Column>
      <Column field="role" header="Роль"></Column>
      <Column field="status" header="Статус"></Column>
      <Column field="status">
        <template #body="slotProps">
          <div v-if="slotProps.data.status === 'Ожидает'">
            <Button outlined>Отозвать приглашение</Button>
          </div>
          <div v-if="slotProps.data.role === 'Администратор' && slotProps.data.status !== 'Ожидает'"
               class="flex align-items-center gap-3">
            <Button icon="pi pi-pen-to-square"></Button>
            <Button icon="pi pi-trash" outlined severity="danger"></Button>
          </div>
        </template>
      </Column>
    </DataTable>


    <Dialog v-model:visible="inviteUser" dismissableMask modal :draggable="false" style="color: var(--grey-02)"
            :closable="false">
      <template #header>
        <div class="pb-3">
          <h2 class="pb-2">Добавить пользователя</h2>
          <p>Введите данные пользователя, которого хотите пригласить</p>
        </div>
      </template>
      <img src="../../assets/images/icons/close.png" alt="Close" class="close-icon" @click="inviteUser = false">


      <form @submit.prevent="sendInventation" class="flex flex-column gap-4">
        <div class="flex flex-column gap-2">
          <label for="email">Email</label>
          <InputText v-model="data.email" :invalid="v$.email.$errors.length > 0" id="username"
                     placeholder="example@gmail.com" aria-describedby="username-help"/>
          <label for="login__form-email" v-for="error in v$.email.$errors" :key="error.$uid"
                 style="color: var(--red)">{{ error.$message }}</label>
        </div>
        <div class="flex flex-column gap-2">
          <label for="identity">Имя и Фамилия</label>
          <InputText v-model="data.identity" :invalid="v$.identity.$errors.length > 0" id="identity"
                     placeholder="Пётр Петров" aria-describedby="username-help"/>
          <label for="login__form-email" v-for="error in v$.email.$errors" :key="error.$uid"
                 style="color: var(--red)">{{ error.$message }}</label>
        </div>

        <Dropdown class="default-select" v-model="selectedRole" :options="roles" optionLabel="title"/>

        <Button class="w-fit p-3 border-round-lg mt-3 mx-auto" type="submit">Отправить приглашение</Button>

      </form>

    </Dialog>

  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {email, helpers, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useToast} from "primevue/usetoast";

const toast = useToast();


const roles = ref([
  {title: 'Администратор', code: 'admin'},
  {title: 'Владелец', code: 'owner'}
]);
const selectedRole = ref(roles.value[0]);


const data = reactive({
  email: '',
  identity: '',
  role: ''
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
  identity: {
    required: helpers.withMessage(customMessages.required, required)
  }
};


const sendInventation = () => {
  toast.add({
    styleClass: 'users-error',
    severity: 'error',
    summary: 'Заголовок ошибки',
    detail: 'Текст ошибки текст ошибки текст ошибки текст ошибки текст ошибки текст ошибки текст ошибки текст ошибки',
    life: 30000,
  });
}

const v$ = useVuelidate(rules, data);

const inviteUser = ref(false)

const products = ref([
  {
    id: 3,
    name: 'Иван Иванов',
    email: 'ex@email.com',
    role: 'Владелец',
    status: ''
  },
  {
    id: 2,
    name: 'Олег Коржиков',
    email: 'exa2@email.com',
    role: 'Администратор',
    status: ''
  },

  {
    id: 1,
    name: 'Пётр Петров',
    email: 'ex3@email.com',
    role: 'Администратор',
    status: 'Ожидает'
  },
]);
</script>

<style scoped lang="scss">
.close-icon {
  width: 14px;
  height: 14px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>