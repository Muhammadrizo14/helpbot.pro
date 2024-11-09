<template>
  <div class="pt-3">
    <div class="flex items-center gap-3">
      <h1>Настройка доступа</h1>
      <InputSwitch
          input-id="switch"
          input-class="default-switch"
          v-model="access"
      />
    </div>
    <p class="pt-1">Регулируйте доступ к боту только для избранных</p>
    <div class="relative min-h-[52px]">
      <div class="p-3 bg-[#F0EDF9] attention mt-3 absolute left-[5px] ">
        <p class="text-[#747783]">Обратите внимание, на данный момент ограничение задается только на Telegram</p>
      </div>
    </div>


    <div class="flex items-center justify-between py-5">
      <div class="flex items-center gap-4">
        <InputText type="text" v-model="value" placeholder="Поиск..." class="w-[332px] border-none"/>
        <Button icon="pi pi-plus" label="Добавить пользователя" @click="addUserWindow = true"/>
        <Button label="Экспорт id из Excel" @click="uploadExcel = true"/>
        <div class="relative">
          <button class="bg-transparent border-0 flex items-center gap-2 cursor-pointer"
                  @mouseenter="templateInfo = true"
                  @mouseleave="templateInfo = false">
            <i class="pi pi-exclamation-circle text-[#7958DB]"></i>
            <span class="text-[#7958DB]">Шаблоны</span>
          </button>

          <div class="absolute pb-2 bottom-[100%] "
               @mouseenter="templateInfo = true"
               @mouseleave="templateInfo = false"
               v-if="templateInfo">
            <div class="bg-white p-3 rounded-xl w-[368px] border border-solid border-[#C4C7D3]">
              <p class="text-[18px]">образцы, в соответствии с которыми пользователь получит уведомление в Telegram о
                предоставлении или ограничении доступа, задаются в административной панели
                <router-link to="/content/templates">“Шаблоны”</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button label="Удалить" icon="pi pi-trash" severity="danger" outlined/>
    </div>

    <div class="pt-3">
      <DataTable
          v-model:selection="selectedUsers"
          :tableClass="'users-data'"
          :value="data"
          paginator
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          tableStyle="min-width: 50rem"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} до {last} от {totalRecords}"
      >
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="id" header="Пользователи"></Column>
      </DataTable>
    </div>


    <!--  !access denied-->
    <Dialog
        v-model:visible="accessDenied"
        modal header="У вас нет доступа :("
        :style="{ maxWidth: '600px' }"
        dismissableMask
        :draggable="false"
    >
      <div class="text-center">
        <p class="text-[#747783] text-[16px]">Только администратор может включать данный функционал</p>
        <Button class="mt-2" @click="accessDenied = false">ОК</Button>
      </div>
    </Dialog>


    <!--!Adding new user by its id-->
    <Dialog
        v-model:visible="addUserWindow"
        modal
        header="Добавить пользователя"
        :style="{ maxWidth: '600px' }"
        dismissableMask
        :draggable="false"
        :closable="false"
    >
      <img
          src="@/assets/images/icons/close.png"
          alt="Close"
          class="close-icon"
          @click="addUserWindow = false"
      />
      <div class="text-center">
        <p class="text-[#747783] text-[16px]">Введите id пользователя, которому хотите разрешить доступ</p>
        <form class="flex items-center gap-1 pt-2 flex-col">
          <inputText placeholder="id" class="w-full" v-model="newUserId"/>
          <Button class="mt-2" @click="addUser()">Добавить</Button>
        </form>
      </div>
    </Dialog>


    <!--!Export them from excel-->
    <Dialog
        v-model:visible="uploadExcel"
        modal
        header="Экспорт из Excel"
        :style="{ maxWidth: '600px', width: '100%' }"
        dismissableMask
        :draggable="false"
        :closable="false"
    >
      <img
          src="@/assets/images/icons/close.png"
          alt="Close"
          class="close-icon"
          @click="uploadExcel = false"
      />
      <p class="text-[16px] pb-1">Файл</p>
      <div
          class="file-upload"
          @drop.prevent="handleDrop"
          @dragover.prevent
          @dragenter.prevent
      >
        <input
            type="file"
            @change="handleFileUpload"
            ref="fileInput"
            class="file-input"
            accept=".xls"
        />
        <div
            v-if="!upload_data.file"
            class="file-upload-text flex align-items-center justify-content-between"
        >
          <p class="flex gap-2">
              <span
                  @click="triggerFileInput"
                  class="upload-link flex align-item-center gap-1"
                  style="color: var(--primary-01)"
              >
                <svg
                    width="15"
                    height="20"
                    viewBox="0 0 15 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.75 2C2.05964 2 1.5 2.55964 1.5 3.25V15.75C1.5 16.4404 2.05964 17 2.75 17H4.5C4.91421 17 5.25 17.3358 5.25 17.75C5.25 18.1642 4.91421 18.5 4.5 18.5H2.75C1.23122 18.5 0 17.2688 0 15.75V3.25C0 1.73122 1.23122 0.5 2.75 0.5H6.75C6.94891 0.5 7.13968 0.579018 7.28033 0.71967L13.7803 7.21967C13.921 7.36032 14 7.55109 14 7.75V9.5C14 9.91421 13.6642 10.25 13.25 10.25C12.8358 10.25 12.5 9.91421 12.5 9.5V8.5H7.75C6.7835 8.5 6 7.7165 6 6.75V2H2.75ZM7.5 3.06066L11.4393 7H7.75C7.61193 7 7.5 6.88807 7.5 6.75V3.06066Z"
                      fill="#7958DB"
                  />
                  <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.5 10.7145C10.9142 10.7145 11.25 11.0503 11.25 11.4645V14.25H14.0355C14.4497 14.25 14.7855 14.5858 14.7855 15C14.7855 15.4142 14.4497 15.75 14.0355 15.75L11.25 15.75V18.5355C11.25 18.9497 10.9142 19.2855 10.5 19.2855C10.0858 19.2855 9.75 18.9497 9.75 18.5355V15.75L6.96447 15.75C6.55025 15.75 6.21447 15.4142 6.21447 15C6.21447 14.5858 6.55025 14.25 6.96447 14.25H9.75V11.4645C9.75 11.0503 10.0858 10.7145 10.5 10.7145Z"
                      fill="#7958DB"
                  />
                </svg>
                Загрузите
              </span>
            или перетащите файл сюда
          </p>
          <p>xls</p>
        </div>
        <div v-if="upload_data.file" class="file-upload-text">
          {{ upload_data.file[0].name }}
        </div>
      </div>
      <Button class="mt-4 flex mx-auto" @click="accessDenied = false">Добавить</Button>

    </Dialog>

  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useBotStore} from "../../../stores/BotStore";


const access = ref(false)
const addUserWindow = ref(false)
const accessDenied = ref(false)
const uploadExcel = ref(false)
const templateInfo = ref(false)
const newUserId = ref('')

const fileInput = ref(null);

const store = useBotStore()
const selectedUsers = ref()

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const files = event.target.files || event.dataTransfer.files;
  if (files.length) {
    upload_data.file = files;
    // Process the files here
  }
};

const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  if (files.length) {
    upload_data.file = files;
  }
}
const upload_data = reactive({
  title: "",
  file: null,
});

const data = ref([
  {id: '1'},
  {id: '2'},
  {id: '3'},
  {id: '4'},
  {id: '5'},
  {id: '6'},
  {id: '7'},
]);


const addUser = () => {
  store.addUser(newUserId)
}

</script>

<style lang="scss" scoped>
.attention {
  margin-left: -20px;
  width: calc(100% + 20px);
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

@media (max-width: 1220px) {
  .sub__header {
    flex-direction: column;
    justify-content: start !important;
    align-items: start !important;
    gap: 30px;
  }
}
</style>