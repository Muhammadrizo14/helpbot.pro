<template>
  <div class="users">
    <div
      class="users-header flex justify-content-between align-items-center pb-3"
    >
      <h1>Пользователи</h1>
      <Button @click="inviteUser = true" v-if="currentUserProfile.value?.role !== 'EMPLOYEE'">Пригласить</Button>
    </div>
    <DataTable :value="users" :tableClass="'users-data'" class="users-table">
      <template #empty>
        <p class="text-center">Добавьте хотя бы одного пользователя</p>
      </template>
      <Column field="first_name" header="Имя"></Column>
      <Column field="email" header="E-mail"></Column>
      <Column field="role" header="Роль">
        <template #body="slotProps">
          <div v-if="slotProps.data.role === 'SUPERADMIN'">
            <p>Владелец</p>
          </div>
          <div v-if="slotProps.data.role === 'ADMIN'">
            <p>Администратор</p>
          </div>
          <div v-if="slotProps.data.role === 'EMPLOYEE'">
            <p>Модератор</p>
          </div>
        </template>
      </Column>
      <Column field="status" header="Статус"></Column>
      <Column field="status">
        <template #body="slotProps">
          <Button
            v-if="slotProps.data.status === 'PENDING'"
            outlined
            class="px-3 py-2"
            >Отозвать приглашение
          </Button>
          <div
            v-if="
              slotProps.data.role !== 'SUPERADMIN' &&
              slotProps.data.status !== 'PENDING' &&
              currentUserProfile.value?.role !== 'EMPLOYEE'
            "
            class="flex align-items-center gap-3"
          >
            <Button
              icon="pi pi-pen-to-square"
              @click="openUpdateUserProfileModal(slotProps.data)"
            ></Button>
            <Button
              icon="pi pi-trash"
              outlined
              severity="danger"
              @click="openDeleteUserProfileModal(slotProps.data)"
            ></Button>
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="inviteUser"
      dismissableMask
      modal
      :draggable="false"
      style="color: var(--grey-02)"
      :closable="false"
    >
      <template #header>
        <div class="pb-3">
          <h2 class="pb-2">Добавить пользователя</h2>
          <p>Введите данные пользователя, которого хотите пригласить</p>
        </div>
      </template>
      <img
        src="../../assets/images/icons/close.png"
        alt="Close"
        class="close-icon"
        @click="inviteUser = false"
      />

      <form @submit.prevent="sendInvitation" class="flex flex-column gap-4">
        <div class="flex flex-column gap-2">
          <label for="email">Почта</label>
          <InputText
            v-model="data.email"
            :invalid="v$.email.$errors.length > 0"
            id="username"
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

        <Button class="w-fit py-2 border-round-lg mt-3 mx-auto" type="submit"
          >Отправить приглашение
        </Button>
      </form>
    </Dialog>

    <Dialog
      v-model:visible="updateUser"
      dismissableMask
      modal
      :draggable="false"
      style="color: var(--grey-02)"
      :closable="false"
    >
      <template #header>
        <div class="pb-3">
          <h2 class="pb-2">Изменить пользователя</h2>
          <p>Введите новые данные пользователя</p>
        </div>
      </template>
      <img
        src="../../assets/images/icons/close.png"
        alt="Close"
        class="close-icon"
        @click="updateUser = false"
      />

      <form
        @submit.prevent="updateUserProfile"
        class="flex flex-column gap-4 w-30rem"
      >
        <Dropdown
          class="default-select"
          v-model="selectedRole"
          :options="roles"
          optionLabel="title"
        />

        <Button class="w-fit py-2 border-round-lg mt-3 mx-auto" type="submit"
          >Изменить
        </Button>
      </form>
    </Dialog>

    <Dialog
      v-model:visible="deleteDialog"
      dismissableMask
      modal
      :draggable="false"
      :closable="false"
    >
      <template #header>
        <div class="pb-3">
          <h2 class="pb-2">Удалить пользователя</h2>
          <p>Вы точно хотите удалить пользователя?</p>
        </div>
      </template>
      <img
        src="../../assets/images/icons/close.png"
        alt="Close"
        class="close-icon"
        @click="deleteDialog = false"
      />

      <form
        @submit.prevent="deleteUserProfile"
        class="flex justify-content-center gap-4 w-20rem"
      >
        <Button type="submit"> Да</Button>
        <Button severity="light" @click="deleteDialog = false">
          Отменить
        </Button>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { email, helpers, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from "primevue/usetoast";
import { useBotStore } from "../../stores/BotStore";
import { useAuthStore } from "@/stores/AuthStore";

const store = useBotStore();
const auth = useAuthStore();

const toast = useToast();

const deleteDialog = ref(false);
const updateUser = ref(false);
const inviteUser = ref(false);

const currentUserProfile = reactive({})
const users = ref([]);
const selectedUser = ref()

const roles = ref([
  { title: "Администратор", code: "ADMIN" },
  { title: "Модератор", code: "EMPLOYEE" },
]);
const selectedRole = ref();

const data = reactive({
  email: "",
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
};

const v$ = useVuelidate(rules, data);

const sendInvitation = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }
  store
    .inviteUser(data.email)
    .then((res) => {
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail:
            "Приглашение отправлено",
        life: 3000,
      });
      data.email = ''
      data.identity = ''
      inviteUser.value = false
    })
    .catch(() => {
      toast.add({
        styleClass: "users-error",
        severity: "error",
        summary: "Ошибка",
        detail:
          "Ошибка при добавлении пользователя.",
        life: 3000,
      });
    });
};

const openUpdateUserProfileModal = async (data) => {
  selectedUser.value = data
  updateUser.value = true;
  if (data.role === "EMPLOYEE") 
    selectedRole.value = { code: data.role, title: "Модератор"}
  else if (data.role === "ADMIN") 
    selectedRole.value = { code: data.role, title: "Администратор"}
}

const updateUserProfile = async () => {
  store
    .updateUserProfile(selectedUser.value.id, selectedRole.value.code)
    .then((res) => {
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail:
            "Роль изменена",
        life: 3000,
      });
      selectedUser.value = null
      updateUser.value = false
      store.getAllUsersOfBot().then((res) => {
        users.value = res.data;
      });
    })
    .catch(() => {
      toast.add({
        styleClass: "users-error",
        severity: "error",
        summary: "Ошибка",
        detail:
          "Ошибка при изменении роли.",
        life: 3000,
      });
    });
}

const openDeleteUserProfileModal = async (data) => {
  selectedUser.value = data
  deleteDialog.value = true;
}

const deleteUserProfile = async () => {
  store
    .deleteUserProfile(selectedUser.value.id)
    .then((res) => {
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail:
            "Пользователь удалён",
        life: 3000,
      });
      selectedUser.value = null
      deleteDialog.value = false
      store.getAllUsersOfBot().then((res) => {
        users.value = res.data;
      });
    })
    .catch(() => {
      toast.add({
        styleClass: "users-error",
        severity: "error",
        summary: "Ошибка",
        detail:
          "Ошибка при удалении пользователя.",
        life: 3000,
      });
    });
}

store.getCurrentUserBotProfile().then((res) => {
  currentUserProfile.value = res.data
})

store.getAllUsersOfBot().then((res) => {
  users.value = res.data;
});
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

input {
  font-size: 0.875rem;
}
</style>
