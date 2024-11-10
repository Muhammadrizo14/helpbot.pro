<template>
  <div >
    <h1>Настройки</h1>

    <TabMenu
      v-model:activeIndex="active"
      :model="items"
      class="settings-tabmenu pt-3"
    />

    <form @submit.prevent="changeName" class="pt-3" v-if="active === 0">
      <div class="flex flex-column gap-2 pb-3">
        <label for="title">
          <p>Название</p>
        </label>
        <InputText
          v-model="data.title"
          class="w-25rem"
          :invalid="v$.title.$errors.length > 0"
          id="title"
          placeholder="Название"
          aria-describedby="username-help"
        />
        <label
          for="login__form-title"
          v-for="error in v$.title.$errors"
          :key="error.$uid"
          style="color: var(--red)"
          >{{ error.$message }}</label
        >
      </div>
      <Button
        type="submit"
        label="Сохранить"
        class="px-3 py-2 border-round-lg"
      />
    </form>

    <schedule v-if="active === 1"/>
    
    <form class="pt-5" v-if="active === 2">
      <div class="flex flex-column gap-3">
        <div class="flex flex-row align-items-center gap-2">
          <h2 class="pl-3">Настройка доступа</h2>
          <InputSwitch
            input-id="switch"
            input-class="default-switch"
            v-model="isAccessRestricted"
            @update:modelValue="changeAccessRestricted"
          />
        </div>
        <p class="pl-3">
          Регулируйте доступ к боту только для избранных
        </p>
        <div class="flex align-items-center pl-5" style="height: 52px; width: auto; background-color: #F0EDF9; margin-left: -15px; margin-right: -15px;">
          <p style="color: #747783;">
            Обратите внимание, на данный момент ограничение задается только на Telegram
          </p>
        </div>
        <div class="pt-4 pl-3" v-if="isAccessRestricted">
          <div class="flex flex-row gap-4">
            <InputText placeholder="Поиск" class="w-20rem border-none" />
            <Button
              label="Добавить пользователя"
              class="px-3 py-2 border-round-lg"
              icon="pi pi-plus"
              @click="addUserModal = true"
            />
            <Button
              label="Экспорт id из Excel"
              class="px-3 py-2 border-round-lg"
              @click="exportExcelModal = true"
            />
            <div 
              class="flex flex-row align-items-center gap-1"
              style="color: #7958DB;"
              @mouseover="showPatternTooltip = true"
              @mouseleave="showPatternTooltip = false"
            >
              <Transition>
                <div class="pattern-tooltip"  v-show="showPatternTooltip">
                  образцы, в соответствии с которыми пользователь получит уведомление в Telegram о предоставлении или ограничении доступа, задаются в административной панели “Шаблоны”
                </div>
              </Transition>
              <i class="pi pi-info-circle" />
              <p class="">Шаблоны</p>
            </div>
            <Button
              label="Удалить"
              icon="pi pi-trash"
              severity="danger"
              outlined
              class="px-3 py-2 border-round-lg ml-auto"
              @click="deleteSelectedAccessedUsers"
            />
          </div>
          <DataTable
            v-model:selection="selectedAccessedUsers"
            :value="accessedUsersList"
            :tableClass="'users-data'"
            paginator
            :rows="10"
            currentPageReportTemplate="Страница {currentPage} из {totalPages}"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
            pt:paginator:instance="justify-content-end"
            stripedRows
            class="pt-4">
            <Column
              selectionMode="multiple"
              headerStyle="width: 3rem"
            />
            <Column
              field="tg_user_id"
              header="Пользователи"
            />
            <template #paginatorfirstpagelinkicon>
              <div class="paginatorButton">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.25 7C17.25 7.41421 16.9142 7.75 16.5 7.75L6.58071 7.75L10.7468 11.9733C11.0377 12.2682 11.0345 12.743 10.7396 13.0339C10.4447 13.3248 9.96985 13.3216 9.67896 13.0267L4.25342 7.5267C3.96533 7.23466 3.96533 6.76534 4.25342 6.4733L9.67896 0.973297C9.96985 0.678414 10.4447 0.675177 10.7396 0.966067C11.0345 1.25696 11.0377 1.73182 10.7468 2.0267L6.58071 6.25L16.5 6.25C16.9142 6.25 17.25 6.58579 17.25 7ZM1.5 13.25C1.08579 13.25 0.749999 12.9142 0.749999 12.5L0.75 1.5C0.75 1.08579 1.08579 0.75 1.5 0.75C1.91421 0.75 2.25 1.08579 2.25 1.5L2.25 12.5C2.25 12.9142 1.91421 13.25 1.5 13.25Z" fill="#747783"/>
                </svg>
              </div>
            </template>
            <template #paginatorprevpagelinkicon>
              <div class="paginatorButton">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.53033 11.5303C6.82322 11.2374 6.82322 10.7626 6.53033 10.4697L2.06066 6L6.53033 1.53033C6.82322 1.23744 6.82322 0.762563 6.53033 0.469669C6.23744 0.176776 5.76256 0.176776 5.46967 0.469669L0.46967 5.46967C0.176776 5.76256 0.176776 6.23744 0.46967 6.53033L5.46967 11.5303C5.76256 11.8232 6.23744 11.8232 6.53033 11.5303Z" fill="#747783"/>
                </svg>
              </div>
            </template>
            <template #paginatornextpagelinkicon>
              <div class="paginatorButton">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L4.93934 6L0.469669 10.4697C0.176776 10.7626 0.176776 11.2374 0.469669 11.5303C0.762563 11.8232 1.23744 11.8232 1.53033 11.5303L6.53033 6.53033C6.82322 6.23744 6.82322 5.76256 6.53033 5.46967L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967Z" fill="#747783"/>
                </svg>
              </div>
            </template>
            <template #paginatorlastpagelinkicon>
              <div class="paginatorButton">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 7C0.75 7.41421 1.08579 7.75 1.5 7.75L11.4193 7.75L7.25318 11.9733C6.96229 12.2682 6.96552 12.743 7.26041 13.0339C7.55529 13.3248 8.03015 13.3216 8.32104 13.0267L13.7466 7.5267C14.0347 7.23466 14.0347 6.76534 13.7466 6.4733L8.32104 0.973297C8.03015 0.678414 7.55529 0.675177 7.26041 0.966067C6.96552 1.25696 6.96229 1.73182 7.25318 2.0267L11.4193 6.25L1.5 6.25C1.08579 6.25 0.75 6.58579 0.75 7ZM16.5 13.25C16.9142 13.25 17.25 12.9142 17.25 12.5L17.25 1.5C17.25 1.08579 16.9142 0.75 16.5 0.75C16.0858 0.75 15.75 1.08579 15.75 1.5L15.75 12.5C15.75 12.9142 16.0858 13.25 16.5 13.25Z" fill="#747783"/>
                </svg>
              </div>
            </template>
          </DataTable>
        </div>
      </div>

      <Dialog
        v-model:visible="addUserModal"
        modal
        :closable="false"
        :draggable="false">
        <template #header>
          <div class="pb-3">
            <h2 class="pb-2">Добавить пользователя</h2>
            <p>Введите id пользователя, которому хотите разрешить доступ</p>
          </div>
        </template>
        <img
          src="@/assets/images/icons/close.png"
          alt="Close"
          class="close-icon"
          @click="addUserModal = false"
        />
        <form @submit.prevent="addAccessedUser">
          <div class="flex flex-column gap-2 pb-4">
            <InputText
              id="tg-user-id"
              placeholder="id"
              :invalid="v$.tg_user_id.$errors.length > 0"
              v-model="data.tg_user_id"
            />
          </div>
          <div class="flex justify-content-center gap-2">
            <Button
              class="px-4 py-3"
              type="submit"
              label="Добавить"
            ></Button>
          </div>
        </form>
      </Dialog>
      <Dialog
          v-model:visible="exportExcelModal"
          modal
          :closable="false"
          :draggable="false"
          class="w-30rem">
        <template #header>
          <div class="pb-3">
            <h2>Экспорт из Excel</h2>
          </div>
        </template>
        <img
          src="@/assets/images/icons/close.png"
          alt="Close"
          class="close-icon"
          @click="exportExcelModal = false"
        />
        <form @submit.prevent="exportExcel">
          <div class="flex flex-column gap-2 pb-4">
            <label for="excel-file">Файл</label>
            <div
              class="file-upload"
              @drop.prevent="handleDrop"
              @dragover.prevent
              @dragenter.prevent>
              <input
                type="file"
                @change="handleFileUpload"
                ref="fileInput"
                class="file-input"
                accept=".xls,.xlsx"/>
              <div
                v-if="!upload_data.file"
                class="file-upload-text flex align-items-center gap-5">
                <p class="flex gap-2">
                  <span
                    @click="triggerFileInput"
                    class="upload-link flex align-item-center gap-1"
                    style="color: var(--primary-01)">
                    <svg
                      width="15"
                      height="20"
                      viewBox="0 0 15 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.75 2C2.05964 2 1.5 2.55964 1.5 3.25V15.75C1.5 16.4404 2.05964 17 2.75 17H4.5C4.91421 17 5.25 17.3358 5.25 17.75C5.25 18.1642 4.91421 18.5 4.5 18.5H2.75C1.23122 18.5 0 17.2688 0 15.75V3.25C0 1.73122 1.23122 0.5 2.75 0.5H6.75C6.94891 0.5 7.13968 0.579018 7.28033 0.71967L13.7803 7.21967C13.921 7.36032 14 7.55109 14 7.75V9.5C14 9.91421 13.6642 10.25 13.25 10.25C12.8358 10.25 12.5 9.91421 12.5 9.5V8.5H7.75C6.7835 8.5 6 7.7165 6 6.75V2H2.75ZM7.5 3.06066L11.4393 7H7.75C7.61193 7 7.5 6.88807 7.5 6.75V3.06066Z"
                        fill="#7958DB"/>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.5 10.7145C10.9142 10.7145 11.25 11.0503 11.25 11.4645V14.25H14.0355C14.4497 14.25 14.7855 14.5858 14.7855 15C14.7855 15.4142 14.4497 15.75 14.0355 15.75L11.25 15.75V18.5355C11.25 18.9497 10.9142 19.2855 10.5 19.2855C10.0858 19.2855 9.75 18.9497 9.75 18.5355V15.75L6.96447 15.75C6.55025 15.75 6.21447 15.4142 6.21447 15C6.21447 14.5858 6.55025 14.25 6.96447 14.25H9.75V11.4645C9.75 11.0503 10.0858 10.7145 10.5 10.7145Z"
                        fill="#7958DB"/>
                    </svg>
                  Загрузите
                  </span>
                  или перетащите файл сюда
                </p>
                <p>xls, xlsx</p>
              </div>
              <div v-if="upload_data.file" class="file-upload-text">
                {{ upload_data.file[0].name }}
              </div>
            </div>
          </div>
          <div class="flex justify-content-center gap-2">
            <Button
              class="px-4 py-3"
              type="submit"
              label="Добавить"
            ></Button>
          </div>
        </form>
      </Dialog>
    </form>

    <form class="pt-3" v-if="active === 3">
      <div class="flex flex-column gap-2 pb-3">
        <label for="title">
          <p>Полностью удалите данные бота</p>
        </label>
        <!--        <InputText v-model="data.title" class="w-25rem" :invalid="v$.title.$errors.length > 0" id="title"-->
        <!--                   placeholder="Название" aria-describedby="username-help"/>-->
        <p :style="{ color: 'var(--grey-02)', width: '360px' }">
          Если вы удалите бота, пути назад уже не будет. Пожалуйста, будьте
          уверены.
        </p>
      </div>
      <Button
        label="Удалить этого бота"
        icon="pi pi-trash"
        severity="danger"
        outlined
        class="px-3 py-2 border-round-lg"
        @click="sureDialog = true"
      />
    </form>

    <Dialog
      v-model:visible="sureDialog"
      modal
      header="Вы абсолютно уверены?"
      :draggable="false"
    >
      <span class="p-text-secondary block mb-5 w-27rem">
        Это действие не может быть отменено. Это приведет к безвозвратному
        удалению вашего бота и его данных с наших серверов..
      </span>

      <div class="flex flex-column gap-2 pb-4">
        <label for="title" class="database-add__label"
          >Пожалуйста, введите название бота для продолжения</label
        >
        <InputText
          id="title"
          placeholder="Название бота"
          v-model="data.title"
        />
      </div>

      <div class="flex justify-content-center gap-2">
        <Button
          type="button"
          label="Отмена"
          @click="(sureDialog = false), (data.title = '')"
        ></Button>
        <Button
          type="button"
          label="Удалить"
          :severity="data.title === store.selectedBot.name ? 'danger' : ''"
          outlined
          :disabled="data.title !== store.selectedBot.name"
          icon="pi pi-trash"
          @click="deleteBot"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { useBotStore } from "../../../stores/BotStore";
import { reactive, ref, watch } from "vue";
import { email, helpers, numeric, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from 'primevue/usetoast';
import Schedule from "./schedule.vue";
import {useScheduleStore} from "../../../stores/ScheduleStore";
import { useTelegram } from "@/stores/TelegramStore";


const toast = useToast();

const store = useBotStore();
const telegramStore = useTelegram();




const sureDialog = ref(false);

const data = reactive({
  title: '',
  tg_user_id: '',
});

const customMessages = {
  required: "Это поле не может быть пустым",
  numeric: "Это поле может содержать только символы.",
};

const rules = {
  title: {
    required: helpers.withMessage(customMessages.required, required),
  },
  tg_user_id: {
    required: helpers.withMessage(customMessages.required, required),
    numeric: helpers.withMessage(customMessages.numeric, numeric),
  },
  upload_file: {

  }
};

const v$ = useVuelidate(rules, data);

const active = ref(0);
const items = ref([{ label: "Название бота" }, { label: "Расписание" }, { label: "Ограничение доступа"}, { label: "Удаление" }]);

const showPatternTooltip = ref(false)
const isAccessRestricted = ref(store.selectedBot.chat_access_restricted)
const accessedUsersList = ref([])
const selectedAccessedUsers = ref([])

const addUserModal = ref(false)
const exportExcelModal =  ref(false)

const deleteBot = () => {
  data.title = "";
  sureDialog.value = false;
  store.deleteBot(store.selectedBot.id)
    .then(()=>{
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Бот успешно удалено', life: 3000 });
    })
};

watch(sureDialog, (newState) => {
  if (newState === false) {
    data.title = store.bot;
  }
  if (newState === true) {
    data.title = "";
  }
});

const changeName = async () => {
  v$.value.title.$touch();
  if (v$.value.title.$invalid) {
    const error = v$.value.title.$errors[0]
    toast.add({ severity: 'error', summary: 'Ошибка', detail: error.$message, life: 3000 });
    return;
  }

  const newData = {
    name: data.title,
    is_active: store.selectedBot.is_active,
    welcome_message: store.selectedBot.welcome_message,
    operator_switch_message: store.selectedBot.operator_switch_message,
    feedback_message: store.selectedBot.feedback_message
  }

  store.editBot(newData)
};

const changeAccessRestricted = async (isAccessRestricted) => {
  const newData = {
    chat_access_restricted: isAccessRestricted
  }

  store.editBot(newData)
  if (isAccessRestricted) {
    getAccessedUsers();
  }
}

const getAccessedUsers = () => {
  telegramStore
    .getAccessedUsers(store.selectedBot.id)
    .then((res) => {
      accessedUsersList.value = res.data;
    })
    .catch((res) => {
      accessedUsersList.value = [];
    });
};

if (isAccessRestricted) {
  getAccessedUsers(); 
}

const addAccessedUser = async () => {
  v$.value.tg_user_id.$touch();
  if (v$.value.tg_user_id.$invalid) {
    const error = v$.value.tg_user_id.$errors[0]
    toast.add({ severity: 'error', summary: 'Ошибка', detail: error.$message, life: 3000 });
    return;
  }

  telegramStore
    .addAccessedUser(store.selectedBot.id, data.tg_user_id)
    .then((res) => {
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: "Пользователь добавлен",
        life: 3000,
      });
    })
    .catch((res) => {
    })
    .finally(() => {
      getAccessedUsers();
      addUserModal.value = false;
    });
};

const handleFileUpload = (event) => {
  const files = event.target.files || event.dataTransfer.files;
  if (files.length) {
    upload_data.file = files;
  }
};

const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  if (files.length) {
    upload_data.file = files;
  }
};

const upload_data = reactive({
  file: null,
});

const upload_rules = reactive({
  file: {
    required: helpers.withMessage(customMessages.required, required),
  },
});

const e$ = useVuelidate(upload_rules, upload_data);

const fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const exportExcel = async () => {
  const result = await e$.value.$validate();
  if (!result) {
    const error = e$.value.$errors[0]
    toast.add({ severity: 'error', summary: 'Ошибка', detail: error.$message, life: 3000 });
    return;
  }

  telegramStore
    .exportAccessedUsersExcel(store.selectedBot.id, upload_data.file[0])
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: "Пользователи добавлены",
        life: 3000,
      });
    })
    .finally(() => {
      getAccessedUsers();
      upload_data.file = null;
      exportExcelModal.value = false;
    });
};

const deleteSelectedAccessedUsers = async () => {
  const ids = selectedAccessedUsers.value.map((item) => item.tg_user_id);
  if (selectedAccessedUsers.length <= 0) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: "Нужно выбрать хотябы одного пользователя", life: 3000 });
  }
  telegramStore
    .deleteSelectedAccessedUsers(store.selectedBot.id, ids)
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Успешно",
        detail: "Выбранные пользователи удалены",
        life: 3000,
      });
    })
    .finally(() => {
      getAccessedUsers()
    });
}
</script>

<style scoped lang="scss">
.settings {
  &-tabmenu {
  }
}
.pattern-tooltip {
  background-color: #FFFFFF;
  border: 1px solid #C4C7D3;
  position: absolute;
  font-size: 0.875rem;
  font-weight: 400;
  width: 19rem;
  color: #14182C;
  margin-bottom: 9rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: 0.2s;
  transition-timing-function: ease-in;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.file-upload {
  border: 1px dashed #b3b3b3;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  position: relative;
}

.file-input {
  display: none;
}

.file-upload-text {
  color: #6c757d;
}

.file-upload:hover {
  border-color: #007bff;
}

.paginatorButton {
  border: 1px solid #C4C7D3;
  width: 2rem; 
  height: 2rem; 
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
